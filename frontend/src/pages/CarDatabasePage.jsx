//src/pages/CarDatabasePage.jsx
import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import { modelImages } from "../constants/media.js";
import Modal from "../components/Modal.jsx";
export default function CarDatabasePage(){
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const [modal, setModal] = useState({show: false, title: "", car: null})
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    useEffect(() => {
        let mounted = true;     //zmienna pomocnicza określająca, czy komponent istnieje na ekranie, chroni przed próbą ustawienia state na NIEISTNIEJĄCYM komponencie
        (async () => {
            setLoading(true);
            const carListfromApi = await api.all(); //asynchroniczność - pobieranie api może trochę potrwać, więc do czasu pobrania nie blokuje całej reszty komponentu
            if(!mounted) return; //jeśli poszedł request do api, ale user zdążył już wyłączyć stronę (mounted == false) to przerwij asynchroniczny proces
            if(Array.isArray(carListfromApi)){
                const normalizedList = carListfromApi.filter((list) => list && list.marka && list.model).map((list) => ({marka: list.marka, model: list.model}));
                setCars(normalizedList);
            } else {
                setCars([]);
            }
            setLoading(false);
        })();
        return () => {
            mounted = false;
        };
    }, []);
    async function openCarModal(model){
        const clickedCar = await api.selectedByModel(model);
        if (!clickedCar || clickedCar.error || !clickedCar.model) {
            setModal({ show: true, title: "Błąd", car: { error: true } });
            return;
        }
        setModal({
            show: true,
            title: `${clickedCar.marka || ""} ${clickedCar.model || ""}`.trim(),
            car: clickedCar,
        });
    }
    const groupedCars = useMemo(() => {
        const groups = cars.reduce((acc, car) => {
            if (!acc[car.marka]) acc[car.marka] = [];
            acc[car.marka].push(car);
            return acc;
        }, {});

        return Object.entries(groups) //Zmienia obiekt na tablicę par
            .sort((a, b) => a[0].localeCompare(b[0], "pl"))
            .map(([marka, models]) => ({
                marka,
                models: models.sort((a, b) => a.model.localeCompare(b.model, "pl")),
            }));
    }, [cars]);
// DOSTAJĘ:
//     [
//   {
//     marka: "Audi",
//     models: [
//       { marka: "Audi", model: "R8" },
//       { marka: "Audi", model: "RS6" }
//     ]
//   },
//   {
//     marka: "BMW",
//     models: [
//       { marka: "BMW", model: "M3" },
//       { marka: "BMW", model: "M4" }
//     ]
//   }
// ]
    return(
        <main className="container my-4">
            <header className="text-center mb-4">
                <h1 className="display-6 fw-bold site-title">
                    cars<span className="text-danger">Dle</span>.pl
                </h1>
                <p className="text-muted mb-0">Kliknij na samochód, aby zobaczyć specyfikację</p>
            </header>

            <section className="mb-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">O bazie danych - przeczytaj proszę :)</h5>

                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    maxHeight: descriptionExpanded ? "none" : "145px",
                                    overflow: "hidden",
                                    position: "relative",
                                    transition: "max-height 0.25s ease",
                                    whiteSpace: "pre-line",
                                    lineHeight: "1.7",
                                }}
                            >
                                {`Bazę danych zaprojektowałem według zasady „agregacja + ograniczenia logiczne”.
Oznacza to, że każdy model samochodu w bazie nie reprezentuje jednej konkretnej konfiguracji pojazdu, lecz całą rodzinę modelową, obejmującą wszystkie generacje, wersje i odmiany danego auta. W efekcie pojedynczy rekord w bazie nie opisuje jednego egzemplarza samochodu, lecz zbiór cech, które występowały w historii danego modelu lub całej jego serii.
Zdecydowałem się na takie uproszczenie ze względu na bardziej zbilansowaną rozgrywkę oraz kwestie techniczne. Dodawanie każdej konfiguracji i odmiany modelu do bazy jako oddzielne auto kolidowałoby z założeniami gry.
Jako przykład przytoczę Lamborghini Huracana, który ma aż 14 odmian. Zgadnięcie tego właściwego byłoby bardziej strzelaniem na oślep niż faktyczną dedukcją. Do tego dochodzą hipersamochody, które oprócz pełnej personalizacji wyglądu często oferują unikatowe konfiguracje mechaniczne (Pagani Zonda i jej kilkanaście wersji z różnymi silnikami i nadwoziami). W takim wypadku nawet pojedyncze egzemplarze powinny mieć własny rekord w bazie.
Obecna logika jest połączeniem zrównoważonej rozgrywki z rzetelnym oddaniem rzeczywistych cech pojazdów. Użytkownik może wykazać się znajomością parametrów, porównując ze sobą zbiory cech samochodów. W ten sposób zgadywanie jest proste i przyjemne.`}
                            </div>

                            {!descriptionExpanded ? (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        height: "70px",
                                        background:
                                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,1) 100%)",
                                        pointerEvents: "none",
                                    }}
                                />
                            ) : null}
                        </div>

                        <button
                            type="button"
                            className="btn btn-link p-0 mt-2 text-decoration-underline"
                            onClick={() => setDescriptionExpanded((prev) => !prev)} //jeśli jest false to ustaw true, jeśli jest true to ustaw false
                        >
                            {descriptionExpanded ? "Zwiń" : "Rozwiń"}
                        </button>
                    </div>
                </div>
            </section>

            {loading ? <div className="text-center text-muted">Ładowanie…</div> : null}

            {!loading && groupedCars.length === 0 ? (
                <div className="text-center text-muted">Brak samochodów w bazie.</div>
            ) : null}

            {!loading &&
                groupedCars.map((group) => (
                    <section key={group.marka} className="mb-5">
                        <p className="fs-4 fw-bold mb-3 border-bottom pb-2">{group.marka}</p>

                        <div
                            className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3"
                            id={`listaSamochodow_${group.marka}`}
                        >
                            {group.models.map((s) => {
                                const img = modelImages[s.model] || "";

                                return (
                                    <div className="col" key={`${s.marka}_${s.model}`}>
                                        <div
                                            className="card h-100 shadow-sm car-item"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => openCarModal(s.model)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    openCarModal(s.model);
                                                }
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
                    </section>
                ))}

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