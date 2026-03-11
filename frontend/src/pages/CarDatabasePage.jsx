import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import { modelImages } from "../constants/media.js";
import Modal from "../components/Modal.jsx";

export default function CarDatabasePage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ show: false, title: "", car: null });

    useEffect(() => {
        let mounted = true;

        (async () => {
            setLoading(true);
            const list = await api.all();

            if (!mounted) return;

            if (Array.isArray(list)) {
                // normalizujemy minimalnie do { marka, model } (reszta nie jest tu potrzebna)
                const normalized = list
                    .filter((x) => x && x.marka && x.model)
                    .map((x) => ({ marka: x.marka, model: x.model }));
                setCars(normalized);
            } else {
                setCars([]);
            }

            setLoading(false);
        })();

        return () => {
            mounted = false;
        };
    }, []);

    async function openCar(model) {
        const car = await api.selectedByModel(model);

        if (!car || car.error || !car.model) {
            setModal({ show: true, title: "Błąd", car: { error: true } });
            return;
        }

        setModal({ show: true, title: `${car.marka || ""} ${car.model || ""}`.trim(), car });
    }

    const grid = useMemo(() => cars, [cars]);

    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="display-6 fw-bold">
                    cars<span className="text-danger">Dle</span>.pl
                </h1>
                <p className="text-muted mb-0">Kliknij na samochód, aby zobaczyć specyfikację</p>
            </header>

            {loading ? <div className="text-center text-muted">Ładowanie…</div> : null}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3" id="listaSamochodow">
                {grid.map((s) => {
                    const img = modelImages[s.model] || "";
                    return (
                        <div className="col" key={`${s.marka}_${s.model}`}>
                            <div
                                className="card h-100 shadow-sm car-item"
                                role="button"
                                tabIndex={0}
                                onClick={() => openCar(s.model)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") openCar(s.model);
                                }}
                            >
                                {img ? (
                                    <img
                                        src={img}
                                        className="card-img-top"
                                        alt={`Zdjęcie ${s.model}`}
                                        style={{ aspectRatio: "16/9", objectFit: "cover" }}
                                    />
                                ) : null}
                                <div className="card-body">
                                    <div className="small text-muted">{s.marka}</div>
                                    <h6 className="card-title mb-0">{s.model}</h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal
                show={modal.show}
                title={modal.title}
                onClose={() => setModal({ show: false, title: "", car: null })}
                size="xl"
            >
                {modal.car?.error ? (
                    <div className="alert alert-danger">Nie można wczytać specyfikacji.</div>
                ) : modal.car ? (
                    <div className="row g-3 align-items-start">
                        <div className="col-md-5">
                            {modelImages[modal.car.model] ? (
                                <img
                                    src={modelImages[modal.car.model]}
                                    alt={`Zdjęcie ${modal.car.model}`}
                                    className="img-fluid rounded shadow-sm"
                                />
                            ) : null}
                        </div>

                        <div className="col-md-7">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered align-middle mb-0">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>Marka</th>
                                        <th>Model</th>
                                        <th>Rocznik</th>
                                        <th>Napędy</th>
                                        <th>Nadwozia</th>
                                        <th>Skrzynie</th>
                                        <th>Kraj</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{modal.car.marka}</td>
                                        <td className="fw-semibold">{modal.car.model}</td>
                                        <td>{modal.car.roczniki}</td>
                                        <td>{modal.car.napedy}</td>
                                        <td>{modal.car.nadwozia}</td>
                                        <td>{modal.car.skrzynie}</td>
                                        <td>{modal.car.kraj}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </main>
    );
}