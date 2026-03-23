//src/components/WinOverlay.jsx
export default function WinOverlay({ show, imgSrc, title, countdownText, onClose }) {
    if (!show) return null;
    function handleClose() {
        const el = document.querySelector(".win-overlay"); //szuka <div className="win-overlay">, teraz będzie jego odniesieniem
        if (!el) return onClose();

        el.classList.add("closing");

        setTimeout(() => {
            onClose();
        }, 220);
    }

    return (
        <div
            className="win-overlay"
            role="dialog"
            aria-modal="true"
            aria-live="polite"
            aria-label="Okno wygranej"
        >
            <div className="win-panel bg-white rounded-4 shadow border position-relative overflow-hidden">
                <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-3"
                    aria-label="Zamknij"
                    onClick={handleClose}
                />

                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt="Zdjęcie samochodu"
                        className="win-img border-bottom"
                    />
                ) : null}

                <div className="p-4 text-center">
                    <div
                        className="fw-bold fs-4 lh-sm"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    {countdownText ? (
                        <div className="text-muted mt-2">
                            {countdownText}
                        </div>
                    ) : null}

                    <button
                        type="button"
                        className="btn btn-outline-secondary win-close"
                        onClick={handleClose}
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
}