//src/components/Modal.jsx
import { useEffect } from "react";

export default function Modal({ show, title, onClose, children, size = "xl" }) {
    useEffect(() => {
        function onEsc(e) {
            if (e.key === "Escape") onClose?.();
        }
        if (show) document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
                <div className={`modal-dialog modal-${size} modal-dialog-centered`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Zamknij" onClick={onClose} />
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose} />
        </>
    );
}