//src/components/History.jsx - robiłem sam konsultując się z AI - nie kopiowałem kodu, to nie vibecoding
import { brandLogo, countryFlag } from "../constants/media.js";

//funkcja która na podstawie matchState przyznaje klasy css zmieniające kolor komórki tabeli
const assignCellColor = (matchState) => {
    if(matchState === "ok"){return "cell-ok";}
    else if(matchState === "partial"){return "cell-partial";}
    else{return "cell-bad";}
}
function cssRevealClass(activeRevealId, rowId){
    if(!activeRevealId || activeRevealId !== rowId) return ""; //pusta klasa
    return "history-reveal-cell"; //zwraca klasę css z animacjami odkrywania
}
function cssRevealStyles(activeRevealId, rowId, revealOrder){
    if(!activeRevealId || activeRevealId !== rowId) return undefined;
    return { "--reveal-order": revealOrder }; //czym jest "--reveal-order": order?
}
function Tile({ label, value, matchState, className = "", tileStyles }){
    return (
        // "chip cell-partial history-reveal-cell"
        <div className={`chip ${assignCellColor(matchState)} ${className}`.trim()} style={tileStyles}> 
            <div className="small fw-semibold">{label}</div>
            <div>{value}</div>
        </div>
    );
}
function BuildTableCell({ cellClassName, cellStyles, label }) { //argumenty funkcji dodatkowo w {} bo komponent musi dostać jeden obiekt propsów a nie trzy argumenty
    return <td className={cellClassName} style={cellStyles}>{label}</td>;
}
export default function History({ rows: tableRows, activeRevealId = null }) { //z propsa przychodzi rows ale lokalnie używam czytelniejszej nazwy tableRows, kiedyś zmienie tą nazwe
    return (
    <>
        {/* tabela na komputer */}
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
                    {tableRows.map((historyItem) => {
                        const brandLogoImg = brandLogo(historyItem.car.marka);
                        const countryFlagImg = countryFlag(historyItem.car.kraj);

                        return (
                            <tr key={historyItem.id}>
                                <BuildTableCell
                                    cellClassName={`logo-cell ${assignCellColor(historyItem.states.brandState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 0)}
                                    label={ brandLogoImg ? <img src={brandLogoImg} alt={historyItem.car.marka} /> : historyItem.car.marka}
                                />
                                <BuildTableCell
                                    cellClassName={`fw-semibold ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 1)}
                                    label={historyItem.car.model}
                                />
                                <BuildTableCell
                                    cellClassName={`${assignCellColor(historyItem.states.roczState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 2)}
                                    label={historyItem.states.rocznikiZeStrzalkami}
                                />
                                <BuildTableCell
                                    cellClassName={`${assignCellColor(historyItem.states.napedState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 3)}
                                    label={historyItem.car.napedy}
                                />
                                <BuildTableCell
                                    cellClassName={`${assignCellColor(historyItem.states.nadState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 4)}
                                    label={historyItem.car.nadwozia}
                                />
                                <BuildTableCell
                                    cellClassName={`${assignCellColor(historyItem.states.skrzState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 5)}
                                    label={historyItem.car.skrzynie}
                                />
                                <BuildTableCell
                                    cellClassName={`${assignCellColor(historyItem.states.krajState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                    cellStyles={cssRevealStyles(activeRevealId, historyItem.id, 6)}
                                    label={countryFlagImg ? <img src={countryFlagImg} alt={historyItem.car.kraj} style={{ width: 36, height: "auto" }} /> : historyItem.car.kraj}
                                />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        {/* karty na telefon */}
        <div id="historiaCards" className="d-md-none mt-3">
            {tableRows.map((historyItem) => {
                const brandLogoImg = brandLogo(historyItem.car.marka);
                const countryFlagImg = countryFlag(historyItem.car.kraj);

                return(
                    <div className="history-card" key={historyItem.id}>
                        <div className="brand-row">
                            <div
                                className={`state-badge ${assignCellColor(historyItem.states.brandState)} ${cssRevealClass(activeRevealId, historyItem.id)}`}
                                style={cssRevealStyles(activeRevealId, historyItem.id, 0)}
                            >
                                {brandLogoImg ? <img src={brandLogoImg} alt={historyItem.car.marka} /> : <span style={{ fontSize: ".8rem" }}>{historyItem.car.marka}</span>}
                            </div>

                            <div
                                className={cssRevealClass(activeRevealId, historyItem.id)}
                                style={cssRevealStyles(activeRevealId, historyItem.id, 1)}
                            >
                                <div className="fw-bold">{historyItem.car.marka}</div>
                                <div>{historyItem.car.model}</div>
                            </div>

                            <div
                                className={`state-badge ${assignCellColor(historyItem.states.krajState)} ${cssRevealClass(activeRevealId, historyItem.id)}`.trim()}
                                style={cssRevealStyles(activeRevealId, historyItem.id, 6)}
                            >
                                {countryFlagImg ? <img src={countryFlagImg} alt={historyItem.car.kraj} /> : <span style={{ fontSize: ".8rem" }}>{historyItem.car.kraj}</span>}
                            </div>
                        </div>
                        <div className="chips"> {/*chips to mobilna klasa css */}
                            <Tile
                                label="Rocznik"
                                value={historyItem.states.rocznikiZeStrzalkami}
                                matchState={historyItem.states.roczState}
                                className={cssRevealClass(activeRevealId, historyItem.id)}
                                tileStyles={cssRevealStyles(activeRevealId, historyItem.id, 2)}
                            />
                            <Tile
                                label="Napędy"
                                value={historyItem.car.napedy}
                                matchState={historyItem.states.napedState}
                                className={cssRevealClass(activeRevealId, historyItem.id)}
                                tileStyles={cssRevealStyles(activeRevealId, historyItem.id, 3)}
                            />
                            <Tile
                                label="Nadwozia"
                                value={historyItem.car.nadwozia}
                                matchState={historyItem.states.nadState}
                                className={cssRevealClass(activeRevealId, historyItem.id)}
                                tileStyles={cssRevealStyles(activeRevealId, historyItem.id, 4)}
                            />
                            <Tile
                                label="Skrzynie"
                                value={historyItem.car.skrzynie}
                                matchState={historyItem.states.skrzState}
                                className={cssRevealClass(activeRevealId, historyItem.id)}
                                tileStyles={cssRevealStyles(activeRevealId, historyItem.id, 5)}
                            />
                        </div>
                    </div>
                )
            })}            
        </div>
    </>
    )
}