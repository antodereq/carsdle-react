//src/components/History.jsx
import { brandLogo, countryFlag } from "../constants/media.js";

const stateToClass = (s) => (s === "ok" ? "cell-ok" : s === "partial" ? "cell-partial" : "cell-bad");

function Chip({ label, value, state }) {
    return (
        <div className={`chip ${stateToClass(state)}`}>
            <div className="small fw-semibold">{label}</div>
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
}

export default function History({ rows }) {
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
                            <tr key={idx}>
                                <td className={`logo-cell ${stateToClass(r.states.brandState)}`}>
                                    {bLogo ? <img src={bLogo} alt={r.car.marka} /> : r.car.marka}
                                </td>
                                <td className="fw-semibold">{r.car.model}</td>
                                <td
                                    className={stateToClass(r.states.roczState)}
                                    dangerouslySetInnerHTML={{ __html: r.states.rocznikiZeStrzalkami }}
                                />
                                <td className={stateToClass(r.states.napedState)}>{r.car.napedy}</td>
                                <td className={stateToClass(r.states.nadState)}>{r.car.nadwozia}</td>
                                <td className={stateToClass(r.states.skrzState)}>{r.car.skrzynie}</td>
                                <td className={stateToClass(r.states.krajState)}>
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
                        <div className="history-card" key={`m_${idx}`}>
                            <div className="brand-row">
                                <div className={`state-badge ${stateToClass(r.states.brandState)}`}>
                                    {bLogo ? <img src={bLogo} alt={r.car.marka} /> : <span style={{ fontSize: ".8rem" }}>{r.car.marka}</span>}
                                </div>
                                <div>
                                    <div className="fw-bold">{r.car.marka}</div>
                                    <div>{r.car.model}</div>
                                </div>
                                <div className={`state-badge ${stateToClass(r.states.krajState)}`}>
                                    {flag ? <img src={flag} alt={r.car.kraj} /> : <span style={{ fontSize: ".8rem" }}>{r.car.kraj}</span>}
                                </div>
                            </div>

                            <div className="chips">
                                <Chip label="Rocznik" value={r.states.rocznikiZeStrzalkami} state={r.states.roczState} />
                                <Chip label="Napędy" value={r.car.napedy} state={r.states.napedState} />
                                <Chip label="Nadwozia" value={r.car.nadwozia} state={r.states.nadState} />
                                <Chip label="Skrzynie" value={r.car.skrzynie} state={r.states.skrzState} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}