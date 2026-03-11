export default function HowToPlayPage() {
    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="site-title display-6 fw-bold">
                    {" "}
                    Jak grać w cars<span className="text-danger">Dle</span>?
                </h1>
                <p className="text-muted mb-0">Krótka instrukcja krok po kroku</p>
            </header>

            <section className="bg-white p-4 rounded shadow-sm mx-auto" style={{ maxWidth: "900px" }}>
                <ol className="text-start pe-1">
                    <li className="fw-bold mb-2">Wybieranie samochodu</li>
                    <p>
                        W polu „Wyszukaj samochód” wpisz <strong>model</strong> (np. <em>F40</em>), a nie markę.
                    </p>

                    <li className="fw-bold mb-2">Pola tabeli – co oznaczają kolory?</li>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <h6 className="mb-1">Marka</h6>
                            <ul className="mb-3">
                                <li>Zawiera logo marki wybranego samochodu.</li>
                                <li>
                                    🟢 <span className="text-success fw-semibold">Zielony</span> – marki są takie same.
                                </li>
                                <li>
                                    🔴 <span className="text-danger fw-semibold">Czerwony</span> – marki są różne.
                                </li>
                            </ul>

                            <h6 className="mb-1">Model</h6>
                            <ul className="mb-3">
                                <li>Zawsze czarne tło/tekst – to tylko nazwa modelu.</li>
                            </ul>

                            <h6 className="mb-1">Kraj</h6>
                            <ul className="mb-0">
                                <li>
                                    🟢 <span className="text-success fw-semibold">Zielony</span> – kraje są takie same.
                                </li>
                                <li>
                                    🔴 <span className="text-danger fw-semibold">Czerwony</span> – kraje są różne.
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <h6 className="mb-1">Rocznik</h6>
                            <ul className="mb-3">
                                <li>Dwie daty: początek i koniec produkcji.</li>
                                <li>
                                    🟢 <span className="text-success fw-semibold">Zielony</span> – obie daty zgodne.
                                </li>
                                <li>
                                    🟡 <span className="text-warning fw-semibold">Żółty</span> – jedna z dat zgodna.
                                </li>
                                <li>
                                    🔴 <span className="text-danger fw-semibold">Czerwony</span> – żadna nie jest zgodna.
                                </li>
                                <li>Strzałki przy datach podpowiadają kierunek.</li>
                            </ul>

                            <h6 className="mb-1">Napędy / Nadwozia / Skrzynie</h6>
                            <ul className="mb-0">
                                <li>
                                    🟢 <span className="text-success fw-semibold">Zielony</span> – zestawy są takie same.
                                </li>
                                <li>
                                    🟡 <span className="text-warning fw-semibold">Żółty</span> – częściowa zgodność.
                                </li>
                                <li>
                                    🔴 <span className="text-danger fw-semibold">Czerwony</span> – brak zgodności.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <li className="fw-bold mt-3 mb-2">Zgadywanie</li>
                    <p>
                        Analizuj kolory i wskazówki, wybieraj kolejny model i powtarzaj aż trafisz. Wszystkie próby zapisują się
                        poniżej, by ułatwić grę.
                    </p>
                </ol>
            </section>
        </main>
    );
}