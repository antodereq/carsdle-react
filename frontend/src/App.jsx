//src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar.jsx";

import StandardGamePage from "./pages/StandardGamePage.jsx";
import EndlessGamePage from "./pages/EndlessGamePage.jsx";
import CarDatabasePage from "./pages/CarDatabasePage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ReportBugPage from "./pages/ReportBugPage.jsx";

export default function App() {
    return (
        <>
            <SiteNavbar />
            <Routes>
                {/* Gdy ktoś wchodzi na /, jest przekierowany na /standard - zabezpieczenie przed "zabawą" adresem strony */}
                <Route path="/" element={<Navigate to="/standard" replace />} />

                <Route path="/standard" element={<StandardGamePage />} />
                <Route path="/endless" element={<EndlessGamePage />} />
                <Route path="/baza" element={<CarDatabasePage />} />
                <Route path="/jak-grac" element={<HowToPlayPage />} />
                <Route path="/o-autorze" element={<AboutPage />} />
                <Route path="/zglos-blad" element={<ReportBugPage />} />

                {/* przekierowania ze starych nazw plików */}
                <Route path="/carsDle.html" element={<Navigate to="/standard" replace />} />
                <Route path="/endlessMode.html" element={<Navigate to="/endless" replace />} />
                <Route path="/bazaSamochodow.html" element={<Navigate to="/baza" replace />} />
                <Route path="/jakGrac.html" element={<Navigate to="/jak-grac" replace />} />
                <Route path="/oAutorze.html" element={<Navigate to="/o-autorze" replace />} />

                {/* Każdy nieznany adres przekierowuje na /standard */}
                <Route path="*" element={<Navigate to="/standard" replace />} />
            </Routes>
        </>
    );
}