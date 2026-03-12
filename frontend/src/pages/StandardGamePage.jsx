import { useEffect, useMemo, useRef, useState } from "react";
import Suggestions from "../components/Suggestions.jsx";
import History from "../components/History.jsx";
import WinOverlay from "../components/WinOverlay.jsx";
import { api } from "../services/api.js";
import { compareCars } from "../utils/compare.js";
import { modelImages } from "../constants/media.js";

const HISTORY_STORAGE_KEY = "carsdle_standard_history_v1";
const REVEAL_STEP_MS = 180;
const REVEAL_CELLS = 7;
const REVEAL_TOTAL_MS = REVEAL_STEP_MS * REVEAL_CELLS + 220;

function formatCountdown(rt) {
    if (!rt) return "";
    return `Kolejna gra za: ${rt.hours}h ${rt.minutes}m ${rt.seconds}s`;
}

function getModelImg(model, fallbackPath) {
    if (model && modelImages && modelImages[model]) return modelImages[model];
    if (fallbackPath) return fallbackPath;
    return "";
}

/**
 * W tym backendzie:
 * true  = już zagrano dziś
 * false = można grać
 */
function isAlreadyPlayed(value) {
    if (value === true || value === 1 || value === "1" || value === "true") return true;
    if (value === false || value === 0 || value === "0" || value === "false") return false;
    return Boolean(value);
}

function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function loadSavedHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return [];

        if (parsed.dayKey !== getTodayKey()) {
            localStorage.removeItem(HISTORY_STORAGE_KEY);
            return [];
        }

        return Array.isArray(parsed.rows) ? parsed.rows : [];
    } catch {
        return [];
    }
}

function saveHistory(rows) {
    try {
        localStorage.setItem(
            HISTORY_STORAGE_KEY,
            JSON.stringify({
                dayKey: getTodayKey(),
                rows,
            })
        );
    } catch {}
}

function clearSavedHistory() {
    try {
        localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {}
}

function carKey(car) {
    return `${String(car?.marka || "").trim().toLowerCase()}__${String(car?.model || "").trim().toLowerCase()}`;
}

function addIdsToRows(rows) {
    return rows.map((r, idx) => ({
        id: r?.id ?? `${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 8)}`,
        ...r,
    }));
}

export default function StandardGamePage() {
    const [locked, setLocked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);

    const [target, setTarget] = useState(null);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState(null);

    const [history, setHistory] = useState([]);
    const [isRevealing, setIsRevealing] = useState(false);
    const [activeRevealId, setActiveRevealId] = useState(null);

    const [winData, setWinData] = useState({
        show: false,
        imgSrc: "",
        marka: "",
        model: "",
    });

    const pollRef = useRef(null);
    const revealTimeoutRef = useRef(null);

    const guessedKeys = useMemo(() => new Set(history.map((r) => carKey(r.car))), [history]);

    function stopPolling() {
        if (pollRef.current) {
            window.clearInterval(pollRef.current);
            pollRef.current = null;
        }
    }

    function clearRevealTimeout() {
        if (revealTimeoutRef.current) {
            window.clearTimeout(revealTimeoutRef.current);
            revealTimeoutRef.current = null;
        }
    }

    function startPolling() {
        if (pollRef.current) return;

        pollRef.current = window.setInterval(async () => {
            try {
                const st = await api.checkGameStatus();
                const alreadyPlayed = isAlreadyPlayed(st?.czyMoznaZagrac);

                if (alreadyPlayed && st?.remainingTime) {
                    setRemainingTime(st.remainingTime);
                }

                if (!alreadyPlayed) {
                    stopPolling();
                    clearSavedHistory();
                    window.location.reload();
                }
            } catch (err) {
                console.error("Polling checkGameStatus failed:", err);
            }
        }, 1000);
    }

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

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const restoredHistory = addIdsToRows(loadSavedHistory());
                if (mounted && restoredHistory.length) {
                    setHistory(restoredHistory);
                }

                const st = await api.checkGameStatus();
                if (!mounted) return;

                const alreadyPlayed = isAlreadyPlayed(st?.czyMoznaZagrac);

                if (alreadyPlayed) {
                    const m = st?.wybranyModel || "";

                    setLocked(true);
                    setRemainingTime(st?.remainingTime || null);
                    setWinData({
                        show: true,
                        imgSrc: getModelImg(m, st?.sciezkaDoZdjecia || ""),
                        marka: st?.wybranaMarka || "",
                        model: m,
                    });

                    startPolling();
                } else {
                    setLocked(false);
                    setRemainingTime(null);
                    setWinData({
                        show: false,
                        imgSrc: "",
                        marka: "",
                        model: "",
                    });

                    const rnd = await api.randomStandard();
                    if (rnd && !rnd.error) {
                        setTarget(rnd);
                    }
                }
            } catch (err) {
                console.error("Initial checkGameStatus failed:", err);
            }
        })();

        return () => {
            mounted = false;
            stopPolling();
            clearRevealTimeout();
        };
    }, []);

    useEffect(() => {
        saveHistory(history);
    }, [history]);

    useEffect(() => {
        function onDocClick(e) {
            if (!e.target.closest("#pole_szukania") && !e.target.closest("#sugestie")) {
                setSuggestions(null);
            }
        }

        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    async function loadAllSuggestions() {
        if (locked || isRevealing) return;

        const all = await api.all();
        if (Array.isArray(all)) {
            setSuggestions(filterAlreadyGuessed(all.map((x) => ({ marka: x.marka, model: x.model }))));
        } else {
            setSuggestions(null);
        }
    }

    async function onQueryChange(v) {
        setQuery(v);
        if (locked || isRevealing) return;

        const q = v.trim();
        if (!q) {
            setSuggestions(null);
            return;
        }

        const found = await api.search(q);
        if (Array.isArray(found)) {
            setSuggestions(filterAlreadyGuessed(found));
        } else {
            setSuggestions([]);
        }
    }

    async function pickSuggestion(s) {
        if (locked || isRevealing) return;
        if (guessedKeys.has(carKey(s))) return;

        setQuery("");
        setSuggestions(null);

        const chosen = await api.selectedByModel(s.model);
        if (!chosen || chosen.error) return;
        if (!target || !target.model) return;
        if (guessedKeys.has(carKey(chosen))) return;

        const states = compareCars(target, chosen);

        if (target.model === chosen.model) {
            const img = getModelImg(target.model, "");

            appendHistoryWithReveal(chosen, states, async () => {
                await api.checkGameStatus({
                    czyJuzZagrano: "true",
                    sciezkaDoZdjecia: img,
                    wybranyModel: target.model,
                    wybranaMarka: target.marka,
                });

                const st = await api.checkGameStatus();

                setLocked(true);
                setRemainingTime(st?.remainingTime || null);
                setWinData({
                    show: true,
                    imgSrc: img,
                    marka: target.marka,
                    model: target.model,
                });

                startPolling();
            });
        } else {
            appendHistoryWithReveal(chosen, states);
        }
    }

    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="display-6 fw-bold site-title">
                    cars<span className="text-danger">Dle</span>.pl
                </h1>
            </header>

            <div className="text-center small text-muted">
                {locked && remainingTime ? formatCountdown(remainingTime) : ""}
            </div>

            <form className="row g-2 justify-content-center mt-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-12 col-sm-10 col-lg-8">
                    <div className="input-group">
                        <span className="input-group-text">🔎</span>
                        <input
                            type="text"
                            id="pole_szukania"
                            className="form-control"
                            placeholder={
                                locked
                                    ? "Zagrałeś dziś — wróć jutro 🙂"
                                    : isRevealing
                                    ? "Odkrywanie wyniku..."
                                    : "Wyszukaj samochód..."
                            }
                            disabled={locked || isRevealing}
                            value={query}
                            onClick={loadAllSuggestions}
                            onChange={(e) => onQueryChange(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            {suggestions !== null ? <Suggestions items={suggestions} onPick={pickSuggestion} /> : null}

            <History rows={history} activeRevealId={activeRevealId} />

            <WinOverlay
                show={winData.show}
                imgSrc={winData.imgSrc}
                title={
                    winData.marka && winData.model
                        ? `Zagrałeś dziś! Trafiłeś: <strong>${winData.marka} ${winData.model}</strong>`
                        : "Zagrałeś dziś — wróć jutro 🙂"
                }
                countdownText={locked && remainingTime ? formatCountdown(remainingTime) : ""}
                onClose={() => setWinData((w) => ({ ...w, show: false }))}
            />
        </main>
    );
}