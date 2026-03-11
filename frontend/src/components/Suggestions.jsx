import { modelImages } from "../constants/media.js";

export default function Suggestions({ items, onPick }) {
    if (!items) return null;

    if (items.length === 0) {
        return (
            <div id="sugestie" className="list-group mt-3" role="listbox" aria-label="Sugestie modeli">
                <div className="list-group-item text-muted">Brak wyników…</div>
            </div>
        );
    }

    return (
        <div id="sugestie" className="list-group mt-3" role="listbox" aria-label="Sugestie modeli">
            {items.map((s) => {
                const img = modelImages[s.model] || "";
                return (
                    <button
                        key={`${s.marka}__${s.model}`}
                        type="button"
                        className="list-group-item list-group-item-action d-flex align-items-center gap-3 suggestion"
                        onClick={() => onPick(s)}
                    >
                        {img ? <img className="car-thumb rounded" src={img} alt={`Zdjęcie ${s.model}`} /> : null}
                        <span className="model-name">{s.marka} {s.model}</span>
                    </button>
                );
            })}
        </div>
    );
}