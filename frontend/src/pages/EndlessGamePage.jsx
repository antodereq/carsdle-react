// src/pages/EndlessGamePage.jsx
import { useEffect, useRef, useState } from "react";
import Suggestions from "../components/Suggestions.jsx";
import History from "../components/History.jsx";
import WinOverlay from "../components/WinOverlay.jsx";
import { api } from "../services/api.js";
import { modelImages } from "../constants/media.js";
import { compareCars } from "../utils/compare.js";

const REVEAL_TIME = 1500;

//funkcja tworzy unikalne klucz dla każdego samochodu - string np. bmw__m3
function carKey(car) {
    const marka = String(car?.marka || "").trim().toLowerCase();
    const model = String(car?.model || "").trim().toLowerCase();
    return marka + "__" + model;
}

export default function EndlessGamePage() {
    const [roundOver, setRoundOver] = useState(false);
    const [score, setScore] = useState(0);
    const [tries, setTries] = useState(0);

    const [target, setTarget] = useState(null);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState(null);
    const [history, setHistory] = useState([]);

    const [overlay, setOverlay] = useState({
        show: false,
        imgSrc: "",
        title: "",
    });

    const [isRevealing, setIsRevealing] = useState(false);
    const [activeRevealId, setActiveRevealId] = useState(null);
    const [dropdownStyle, setDropdownStyle] = useState(null);

    const inputGroupRef = useRef(null);
    const timeoutRef = useRef(null);

    function clearRevealTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }
    //menu pozycji jest renderowane globalnie, trzeba obliczać jego pozycje - ta funkcja ją zwraca
    function updateDropdownPosition() {
        const element = inputGroupRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();

        setDropdownStyle({
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
        });
    }

    //sprawdza po kluczach czy ten samochód już był wcześniej wybierany
    function isAlreadyGuessed(car) {
        const key = carKey(car);

        for (let i = 0; i < history.length; i++) {
            if (carKey(history[i].car) === key) {
                return true;
            }
        }

        return false;
    }
    //wywala z listy wszystie auta, które już były wybierane, aby uniknąć duplikacji przy zgadywaniu
    function filterAlreadyGuessed(list) {
        if (!Array.isArray(list)) {
            return [];
        }

        const result = [];

        for (let i = 0; i < list.length; i++) {
            if (!isAlreadyGuessed(list[i])) {
                result.push(list[i]);
            }
        }

        return result;
    }

    async function newRound() {
        clearRevealTimeout();

        setRoundOver(false);
        setTries(0);
        setQuery("");
        setSuggestions(null);
        setHistory([]);
        setIsRevealing(false);
        setActiveRevealId(null);
        setDropdownStyle(null);

        setOverlay({
            show: false,
            imgSrc: "",
            title: "",
        });

        const rnd = await api.randomEndless();

        if (rnd && !rnd.error) {
            setTarget(rnd);
        }
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
        function handleWindowChange() {
            if (suggestions !== null) {
                updateDropdownPosition();
            }
        }

        window.addEventListener("resize", handleWindowChange);
        window.addEventListener("scroll", handleWindowChange, true);

        return () => {
            window.removeEventListener("resize", handleWindowChange);
            window.removeEventListener("scroll", handleWindowChange, true);
        };
    }, [suggestions]);

    useEffect(() => {
        function handleDocumentClick(e) {
            const clickedInsideAnchor = e.target.closest(".suggestions-anchor");
            const clickedInsidePortal = e.target.closest(".suggestions-portal");

            if (!clickedInsideAnchor && !clickedInsidePortal) {
                setSuggestions(null);
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    async function loadAllSuggestions() {
        if (roundOver || isRevealing) {
            return;
        }

        updateDropdownPosition();

        const all = await api.all();

        if (Array.isArray(all) && all.length > 0) {
            setSuggestions(filterAlreadyGuessed(all));
        } else {
            setSuggestions([]);
        }
    }

    async function handleInputChange(value) {
        setQuery(value);
        if (roundOver || isRevealing) {
            return;
        }

        const text = value.trim();

        if (text === "") {
            setSuggestions(null);
            return;
        }

        updateDropdownPosition();

        const found = await api.search(text);

        if (Array.isArray(found) && found.length > 0) {
            setSuggestions(filterAlreadyGuessed(found));
        } else {
            setSuggestions([]);
        }
    }

    function addHistoryRowWithReveal(car, states, afterReveal) {
        const rowId = Date.now() + "_" + Math.random().toString(36).slice(2, 8);

        const newRow = {
            id: rowId,
            car: car,
            states: states,
        };

        setHistory(function (prev) {
            return [newRow, ...prev];
        });

        setActiveRevealId(rowId);
        setIsRevealing(true);

        clearRevealTimeout();

        timeoutRef.current = setTimeout(function () {
            setActiveRevealId(null);
            setIsRevealing(false);
            timeoutRef.current = null;

            if (afterReveal) {
                afterReveal();
            }
        }, REVEAL_TIME);
    }

    async function pickSuggestion(suggestion) {
        if (roundOver || isRevealing) {
            return;
        }

        if (isAlreadyGuessed(suggestion)) {
            return;
        }

        setQuery("");
        setSuggestions(null);

        const chosen = await api.selectedByModel(suggestion.model);

        if (!chosen || chosen.error) {
            return;
        }

        if (!target || !target.model) {
            return;
        }

        if (isAlreadyGuessed(chosen)) {
            return;
        }

        const states = compareCars(target, chosen);

        if (chosen.model === target.model) {
            addHistoryRowWithReveal(chosen, states, function () {
                setScore(function (prev) {
                    return prev + 1;
                });

                setOverlay({
                    show: true,
                    imgSrc: modelImages[chosen.model] || "",
                    title: `Brawo! Trafiłeś: <strong>${target.marka} ${target.model}</strong>.`,
                });

                setRoundOver(true);
            });
        } else {
            addHistoryRowWithReveal(chosen, states, function () {
                setTries(function (prev) {
                    return prev + 1;
                });
            });
        }
    }

    let placeholder = "Wyszukaj samochód...";

    if (roundOver) {
        placeholder = "Runda zakończona — kliknij Graj dalej";
    } else {
        if (isRevealing) {
            placeholder = "Odkrywanie wyniku...";
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

            <section
                className="bg-white p-3 rounded shadow-sm mx-auto text-center"
                style={{ maxWidth: 800 }}
            >
                <div className="d-flex justify-content-between align-items-center px-3">
                    <div>Score: {score}</div>
                    <div>Prób: {tries}</div>
                </div>
            </section>

            <form
                className="row g-2 justify-content-center mt-3"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="col-12 col-sm-10 col-lg-8">
                    <div className="suggestions-anchor">
                        <div className="input-group" ref={inputGroupRef}>
                            <span className="input-group-text">🔎</span>

                            <input
                                type="text"
                                id="pole_szukania"
                                className="form-control"
                                placeholder={placeholder}
                                disabled={roundOver || isRevealing}
                                value={query}
                                onFocus={loadAllSuggestions}
                                onClick={loadAllSuggestions}
                                onChange={(e) => handleInputChange(e.target.value)}
                                autoComplete="off"
                            />

                            {roundOver && (
                                <button
                                    type="button"
                                    id="playAgainBtn"
                                    className="btn btn-success"
                                    onClick={newRound}
                                >
                                    Graj dalej
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            {suggestions !== null && dropdownStyle && (
                <Suggestions
                    items={suggestions}
                    onPick={pickSuggestion}
                    style={dropdownStyle}
                />
            )}

            <History rows={history} activeRevealId={activeRevealId} />

            <WinOverlay
                show={overlay.show}
                imgSrc={overlay.imgSrc}
                title={overlay.title}
                onClose={() =>
                    setOverlay(function (prev) {
                        return {
                            ...prev,
                            show: false,
                        };
                    })
                }
            />
        </main>
    );
}