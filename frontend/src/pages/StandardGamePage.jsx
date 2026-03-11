import { useEffect, useRef, useState } from "react";
import Suggestions from "../components/Suggestions.jsx";
import History from "../components/History.jsx";
import WinOverlay from "../components/WinOverlay.jsx";
import { api } from "../services/api.js";
import { compareCars } from "../utils/compare.js";
import { modelImages } from "../constants/media.js";

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

export default function StandardGamePage() {
    const [locked, setLocked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);

    const [target, setTarget] = useState(null);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState(null);

    const [history, setHistory] = useState([]);

    const [winData, setWinData] = useState({
        show: false,
        imgSrc: "",
        marka: "",
        model: "",
    });

    const pollRef = useRef(null);

    function stopPolling() {
        if (pollRef.current) {
            window.clearInterval(pollRef.current);
            pollRef.current = null;
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
                    window.location.reload();
                }
            } catch (err) {
                console.error("Polling checkGameStatus failed:", err);
            }
        }, 1000);
    }

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
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
        };
    }, []);

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
        if (locked) return;

        const all = await api.all();
        if (Array.isArray(all)) {
            setSuggestions(all.map((x) => ({ marka: x.marka, model: x.model })));
        } else {
            setSuggestions(null);
        }
    }

    async function onQueryChange(v) {
        setQuery(v);
        if (locked) return;

        const q = v.trim();
        if (!q) {
            setSuggestions(null);
            return;
        }

        const found = await api.search(q);
        if (Array.isArray(found)) {
            setSuggestions(found);
        } else {
            setSuggestions([]);
        }
    }

    async function pickSuggestion(s) {
        if (locked) return;

        setQuery("");
        setSuggestions(null);

        const chosen = await api.selectedByModel(s.model);
        if (!chosen || chosen.error) return;
        if (!target || !target.model) return;

        if (target.model === chosen.model) {
            const img = getModelImg(target.model, "");

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
        } else {
            const states = compareCars(target, chosen);
            setHistory((prev) => [{ car: chosen, states }, ...prev]);
        }
    }

    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="display-6 fw-bold">
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
                            placeholder={locked ? "Zagrałeś dziś — wróć jutro 🙂" : "Wyszukaj samochód..."}
                            disabled={locked}
                            value={query}
                            onClick={loadAllSuggestions}
                            onChange={(e) => onQueryChange(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            {suggestions !== null ? <Suggestions items={suggestions} onPick={pickSuggestion} /> : null}

            <History rows={history} />

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