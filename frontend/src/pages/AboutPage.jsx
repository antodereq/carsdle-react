//src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
export default function AboutPage() {
    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="site-title display-6 fw-bold">
                    cars<span className="text-danger">Dle</span>.pl
                </h1>
            </header>

            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="card shadow-sm p-3 mb-4">
                        <div className="row g-3 align-items-start">
                            <div className="col-md-5 text-center">
                                <img src="img/antoniUlaczyk.jpg" alt="Zdjęcie autora" className="img-fluid rounded shadow" />
                                <p className="mt-2 text-muted small mb-0">Pagani Zonda Revo Barchetta, Modena 2024</p>
                            </div>
                            <div className="col-md-7">
                                <h2 className="h4">O autorze</h2>
                                <p>Witam Cię na mojej stronie! Dzięki, że jesteś!</p>
                                <p>Nazywam się Antoni Ulaczyk, uczę się w technikum w Katowicach na kierunku programista.</p>
                                <p>Pomysł na grę narodził się z mojej pasji do motoryzacji, sportowych samochodów oraz programowania.</p>
                                <p>Mocno inspirowałem się stroną <a href="https://genshindle.com">genshindle.com</a> – polecam!</p>
                                <p>
                                    To mój pierwszy większy projekt, dlatego liczę na feedback. <br/>
                                    Napisz: <strong>carsdle.pl@gmail.com</strong> lub skorzystaj z{" "}
                                    <Link to="/zglos-blad">formularza zgłoszeń</Link>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm p-3">
                        <h2 className="h4">O stronie</h2>
                        <p>Strona powstała w React JS i PHP + MySQL. Do stylizacji używałem głównie Bootstrapa.</p>
                        <p>Użyłem darmowych grafik ze stron takich jak: 
                            <a href="https://pixabay.com/pl/">Pixabay</a>,
                            <a href="https://www.pexels.com/pl-pl/">Pexels</a>,
                            <a href="https://unsplash.com/">Unsplash</a>.
                        </p>
                        <p>Wszystko jest legalne; jeśli coś budzi wątpliwość, napisz maila.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}