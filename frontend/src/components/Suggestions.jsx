//src/components/Suggestions.jsx
import { createPortal } from "react-dom"; //renderuj ten komponent gdzie indziej w DOM (np. w body) -> trzeba potem podać jego położenie w StandardGame i EndlessGame
import { modelImages } from "../constants/media.js";
//Suggestions to okno z podpowiedziami modeli samochodów, ale ważne - on sam nic nie wyszukuje, on tylko dostaje listę items, renderuje ją mówi parentowi: „kliknięto ten element”
export default function Suggestions({ items, onPick, style }) {
    if (!items || !style) return null;

    const content = (
        <div
            id="sugestie"
            className="suggestions-panel suggestions-portal list-group shadow"
            role="listbox"
            aria-label="Sugestie modeli"
            style={{                //Pochodzi z updateDropdownPosition() czyli parent liczy pozycję inputa i przekazuje ją do komponentu
                position: "fixed",
                top: `${style.top}px`,
                left: `${style.left}px`,
                width: `${style.width}px`,
            }}
        >
            {items.length === 0 ? (
                <div className="list-group-item text-muted">Brak wyników…</div>
            ) : (
                items.map((item) => {
                    const img = modelImages[item.model] || "";

                    return (
                        <button
                            key={`${item.marka}__${item.model}`}
                            type="button"
                            className="list-group-item list-group-item-action d-flex align-items-center gap-3"
                            onClick={() => onPick(item)}
                        >
                            {img ? (
                                <img
                                    className="car-thumb rounded"
                                    src={img}
                                    alt={`Zdjęcie ${item.model}`}
                                />
                            ) : null}

                            <span className="fw-semibold">
                                {item.marka} {item.model}
                            </span>
                        </button>
                    );
                })
            )}
        </div>
    );
    //React mówi "ten komponent logicznie należy do parenta, ale fizycznie wrzuć go do <body>" - to rozwiązuje problemy z overflow, z-index, layout
    return createPortal(content, document.body); 
}