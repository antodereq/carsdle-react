export default function WinOverlay({ show, imgSrc, title, countdownText, onClose }) {
    if (!show) return null;

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
                    onClick={onClose}
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
                        className="btn btn-dark mt-4 px-4"
                        onClick={onClose}
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
}