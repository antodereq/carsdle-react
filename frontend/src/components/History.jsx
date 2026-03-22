//src/components/History.jsx
import { brandLogo, countryFlag } from "../constants/media.js";

const stateToClass = (s) => (s === "ok" ? "cell-ok" : s === "partial" ? "cell-partial" : "cell-bad");

function revealClass(activeRevealId, rowId, order) {
    if (!activeRevealId || activeRevealId !== rowId) return "";
    return "history-reveal-cell";
}

function revealStyle(activeRevealId, rowId, order) {
    if (!activeRevealId || activeRevealId !== rowId) return undefined;
    return { "--reveal-order": order };
}

function Chip({ label, value, state, className = "", style }) {
    return (
        <div className={`chip ${stateToClass(state)} ${className}`.trim()} style={style}>
            <div className="small fw-semibold">{label}</div>
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
}

export default function History({ rows, activeRevealId = null }) {
    return (
        <>
            {/* tabela (desktop/tablet) */}
            <div className="table-responsive mt-4 d-none d-md-block">
                <table className="table table-striped table-bordered align-middle mb-0 car-specs-table" id="historiaTable">
                    <colgroup>
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "13%" }} />
                        <col style={{ width: "14%" }} />
                        <col style={{ width: "23%" }} />
                        <col style={{ width: "13%" }} />
                        <col style={{ width: "7%" }} />
                    </colgroup>
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
                    <tbody id="historiaBody">
                        {rows.map((r, idx) => {
                            const bLogo = brandLogo(r.car.marka);
                            const flag = countryFlag(r.car.kraj);

                            return (
                                <tr key={r.id ?? idx}>
                                    <td
                                        className={`logo-cell ${stateToClass(r.states.brandState)} ${revealClass(activeRevealId, r.id, 0)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 0)}
                                    >
                                        {bLogo ? <img src={bLogo} alt={r.car.marka} /> : r.car.marka}
                                    </td>

                                    <td
                                        className={`fw-semibold ${revealClass(activeRevealId, r.id, 1)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 1)}
                                    >
                                        {r.car.model}
                                    </td>

                                    <td
                                        className={`${stateToClass(r.states.roczState)} ${revealClass(activeRevealId, r.id, 2)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 2)}
                                        dangerouslySetInnerHTML={{ __html: r.states.rocznikiZeStrzalkami }}
                                    />

                                    <td
                                        className={`${stateToClass(r.states.napedState)} ${revealClass(activeRevealId, r.id, 3)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 3)}
                                    >
                                        {r.car.napedy}
                                    </td>

                                    <td
                                        className={`${stateToClass(r.states.nadState)} ${revealClass(activeRevealId, r.id, 4)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 4)}
                                    >
                                        {r.car.nadwozia}
                                    </td>

                                    <td
                                        className={`${stateToClass(r.states.skrzState)} ${revealClass(activeRevealId, r.id, 5)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 5)}
                                    >
                                        {r.car.skrzynie}
                                    </td>

                                    <td
                                        className={`${stateToClass(r.states.krajState)} ${revealClass(activeRevealId, r.id, 6)}`.trim()}
                                        style={revealStyle(activeRevealId, r.id, 6)}
                                    >
                                        {flag ? <img src={flag} alt={r.car.kraj} style={{ width: 36, height: "auto" }} /> : r.car.kraj}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* karty (mobile) */}
            <div id="historiaCards" className="d-md-none mt-3">
                {rows.map((r, idx) => {
                    const bLogo = brandLogo(r.car.marka);
                    const flag = countryFlag(r.car.kraj);

                    return (
                        <div className="history-card" key={r.id ? `m_${r.id}` : `m_${idx}`}>
                            <div className="brand-row">
                                <div
                                    className={`state-badge ${stateToClass(r.states.brandState)} ${revealClass(activeRevealId, r.id, 0)}`.trim()}
                                    style={revealStyle(activeRevealId, r.id, 0)}
                                >
                                    {bLogo ? <img src={bLogo} alt={r.car.marka} /> : <span style={{ fontSize: ".8rem" }}>{r.car.marka}</span>}
                                </div>

                                <div
                                    className={revealClass(activeRevealId, r.id, 1)}
                                    style={revealStyle(activeRevealId, r.id, 1)}
                                >
                                    <div className="fw-bold">{r.car.marka}</div>
                                    <div>{r.car.model}</div>
                                </div>

                                <div
                                    className={`state-badge ${stateToClass(r.states.krajState)} ${revealClass(activeRevealId, r.id, 6)}`.trim()}
                                    style={revealStyle(activeRevealId, r.id, 6)}
                                >
                                    {flag ? <img src={flag} alt={r.car.kraj} /> : <span style={{ fontSize: ".8rem" }}>{r.car.kraj}</span>}
                                </div>
                            </div>

                            <div className="chips">
                                <Chip
                                    label="Rocznik"
                                    value={r.states.rocznikiZeStrzalkami}
                                    state={r.states.roczState}
                                    className={revealClass(activeRevealId, r.id, 2)}
                                    style={revealStyle(activeRevealId, r.id, 2)}
                                />
                                <Chip
                                    label="Napędy"
                                    value={r.car.napedy}
                                    state={r.states.napedState}
                                    className={revealClass(activeRevealId, r.id, 3)}
                                    style={revealStyle(activeRevealId, r.id, 3)}
                                />
                                <Chip
                                    label="Nadwozia"
                                    value={r.car.nadwozia}
                                    state={r.states.nadState}
                                    className={revealClass(activeRevealId, r.id, 4)}
                                    style={revealStyle(activeRevealId, r.id, 4)}
                                />
                                <Chip
                                    label="Skrzynie"
                                    value={r.car.skrzynie}
                                    state={r.states.skrzState}
                                    className={revealClass(activeRevealId, r.id, 5)}
                                    style={revealStyle(activeRevealId, r.id, 5)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}