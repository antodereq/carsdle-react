export default function WinOverlay({ show, imgSrc, title, countdownText, onClose, actions }) {
    if (!show) return null;

    return (
        <div className="win-overlay show" aria-live="polite" id="win">
            <button className="win-close" onClick={onClose} aria-label="Zamknij overlay">
                &times;
            </button>

            <div className="win-card">
                {imgSrc ? <img src={imgSrc} alt="Zdjęcie samochodu" className="win-img" /> : null}
                <div className="win-body">
                    <div className="win-title mb-2" dangerouslySetInnerHTML={{ __html: title }} />
                    {countdownText ? <div className="countdown">{countdownText}</div> : null}
                    {actions ? <div className="mt-3">{actions}</div> : null}
                </div>
            </div>
        </div>
    );
}