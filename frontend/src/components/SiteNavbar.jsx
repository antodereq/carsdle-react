import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={to}>
                {children}
            </NavLink>
        </li>
    );
}

export default function SiteNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/standard">
                    cars<span className="text-danger">Dle</span>.pl
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Przełącz nawigację"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-1">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Graj
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink className="dropdown-item" to="/standard">Standard Mode</NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item text-danger" to="/endless">Endless Mode</NavLink>
                                </li>
                            </ul>
                        </li>

                        <NavItem to="/jak-grac">Jak grać?</NavItem>
                        <NavItem to="/baza">Baza samochodów</NavItem>
                        <NavItem to="/o-autorze">O autorze i stronie</NavItem>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/zglos-blad">
                                Zgłoś błąd
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}