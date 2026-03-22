//src/pages/EndlessGamePage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import Suggestions from "../components/Suggestions.jsx";
import History from "../components/History.jsx";
import WinOverlay from "../components/WinOverlay.jsx";
import { api } from "../services/api.js";
import { modelImages } from "../constants/media.js";
import { compareCars } from "../utils/compare.js";

const REVEAL_STEP_MS = 180;
const REVEAL_CELLS = 7;
const REVEAL_TOTAL_MS = REVEAL_STEP_MS * REVEAL_CELLS + 220;

function carKey(car) {
    return `${String(car?.marka || "").trim().toLowerCase()}__${String(car?.model || "").trim().toLowerCase()}`;
}

export default function EndlessGamePage() {
    const [roundOver, setRoundOver] = useState(false);
    const [score, setScore] = useState(0);
    const [tries, setTries] = useState(0);

    const [target, setTarget] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [query, setQuery] = useState("");
    const [history, setHistory] = useState([]);

    const [overlay, setOverlay] = useState({ show: false, imgSrc: "", title: "" });
    const [isRevealing, setIsRevealing] = useState(false);
    const [activeRevealId, setActiveRevealId] = useState(null);

    const [dropdownStyle, setDropdownStyle] = useState(null);

    const inputGroupRef = useRef(null);
    const revealTimeoutRef = useRef(null);

    const guessedKeys = useMemo(() => new Set(history.map((r) => carKey(r.car))), [history]);

    function clearRevealTimeout() {
        if (revealTimeoutRef.current) {
            window.clearTimeout(revealTimeoutRef.current);
            revealTimeoutRef.current = null;
        }
    }

    function updateDropdownPosition() {
        const el = inputGroupRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        setDropdownStyle({
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
        });
    }

    async function newRound() {
        clearRevealTimeout();

        setRoundOver(false);
        setTries(0);
        setQuery("");
        setSuggestions(null);
        setHistory([]);
        setOverlay({ show: false, imgSrc: "", title: "" });
        setIsRevealing(false);
        setActiveRevealId(null);

        const rnd = await api.randomEndless();
        if (rnd && !rnd.error) setTarget(rnd);
    }

    useEffect(() => {
        newRound();

        return () => {
            clearRevealTimeout();
        };
    }, []);

    useEffect(() => {
        if (suggestions !== null) {
            updateDropdownPosition();
        }
    }, [suggestions]);

    useEffect(() => {
        function handleViewportChange() {
            if (suggestions !== null) updateDropdownPosition();
        }

        window.addEventListener("resize", handleViewportChange);
        window.addEventListener("scroll", handleViewportChange, true);

        return () => {
            window.removeEventListener("resize", handleViewportChange);
            window.removeEventListener("scroll", handleViewportChange, true);
        };
    }, [suggestions]);

    function filterAlreadyGuessed(list) {
        if (!Array.isArray(list)) return [];
        return list.filter((x) => !guessedKeys.has(carKey(x)));
    }

    function appendHistoryWithReveal(car, states, onFinish) {
        const rowId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const newRow = { id: rowId, car, states };

        setHistory((prev) => [newRow, ...prev]);
        setActiveRevealId(rowId);
        setIsRevealing(true);

        clearRevealTimeout();
        revealTimeoutRef.current = window.setTimeout(() => {
            setActiveRevealId(null);
            setIsRevealing(false);
            revealTimeoutRef.current = null;
            onFinish?.();
        }, REVEAL_TOTAL_MS);
    }

    async function loadAllSuggestions() {
        if (roundOver || isRevealing) return;

        updateDropdownPosition();

        const all = await api.all();
        if (Array.isArray(all) && all.length) {
            setSuggestions(filterAlreadyGuessed(all));
        } else {
            setSuggestions(null);
        }
    }

    async function onQueryChange(v) {
        setQuery(v);

        if (roundOver || isRevealing) return;

        const q = v.trim();
        if (!q) {
            setSuggestions(null);
            return;
        }

        updateDropdownPosition();

        const found = await api.search(q);
        if (Array.isArray(found) && found.length) {
            setSuggestions(filterAlreadyGuessed(found));
        } else {
            setSuggestions([]);
        }
    }

    function hideSuggestions() {
        setSuggestions(null);
    }

    useEffect(() => {
        function onDocClick(e) {
            if (!e.target.closest(".suggestions-anchor") && !e.target.closest(".suggestions-portal")) {
                hideSuggestions();
            }
        }

        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    async function pickSuggestion(s) {
        if (roundOver || isRevealing) return;
        if (guessedKeys.has(carKey(s))) return;

        setQuery("");
        hideSuggestions();

        const chosen = await api.selectedByModel(s.model);
        if (!chosen || chosen.error) return;
        if (!target || !target.model) return;
        if (guessedKeys.has(carKey(chosen))) return;

        const states = compareCars(target, chosen);

        if (target.model === chosen.model) {
            appendHistoryWithReveal(chosen, states, () => {
                setScore((x) => x + 1);
                setOverlay({
                    show: true,
                    imgSrc: modelImages[chosen.model] || "",
                    title: `Brawo! Trafiłeś: <strong>${target.marka} ${target.model}</strong>.`,
                });
                setRoundOver(true);
            });
        } else {
            setTries((x) => x + 1);
            appendHistoryWithReveal(chosen, states);
        }
    }

    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="site-title display-6 fw-bold">
                    cars<span className="text-danger">Dle</span>.pl
                </h1>
                <p className="text-muted mb-0">
                    Tryb <span className="text-danger">Endless</span> – zgaduj bez końca
                </p>
            </header>

            <section className="bg-white p-3 rounded shadow-sm mx-auto text-center" style={{ maxWidth: 800 }}>
                <div className="d-flex justify-content-between align-items-center px-3">
                    <div>Score: {score}</div>
                    <div>Prób: {tries}</div>
                </div>
            </section>

            <form className="row g-2 justify-content-center mt-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-12 col-sm-10 col-lg-8">
                    <div className="suggestions-anchor">
                        <div className="input-group" ref={inputGroupRef}>
                            <span className="input-group-text">🔎</span>

                            <input
                                type="text"
                                id="pole_szukania"
                                className="form-control"
                                placeholder={
                                    roundOver
                                        ? "Runda zakończona — kliknij Graj dalej"
                                        : isRevealing
                                        ? "Odkrywanie wyniku..."
                                        : "Wyszukaj samochód..."
                                }
                                disabled={roundOver || isRevealing}
                                value={query}
                                onClick={loadAllSuggestions}
                                onFocus={loadAllSuggestions}
                                onChange={(e) => onQueryChange(e.target.value)}
                                autoComplete="off"
                            />

                            <button
                                type="button"
                                id="playAgainBtn"
                                className={`btn btn-success ${roundOver ? "" : "d-none"}`}
                                onClick={newRound}
                            >
                                Graj dalej
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {suggestions !== null && dropdownStyle ? (
                <Suggestions
                    items={suggestions}
                    onPick={pickSuggestion}
                    style={dropdownStyle}
                />
            ) : null}

            <History rows={history} activeRevealId={activeRevealId} />

            <WinOverlay
                show={overlay.show}
                imgSrc={overlay.imgSrc}
                title={overlay.title}
                onClose={() => setOverlay((o) => ({ ...o, show: false }))}
            />
        </main>
    );
}