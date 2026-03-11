export function compareCars(wylosowany, wybrany) {
    const safeSplitRange = (str) => {
        const s = String(str || "").trim();
        if (!s.includes("-")) return [s, s];
        return s.split("-").map((x) => x.trim());
    };

    const [rokPStart, rokPEnd] = safeSplitRange(wylosowany.roczniki);
    const [rokWStart, rokWEnd] = safeSplitRange(wybrany.roczniki);

    const arrowStart = (rokWStart > rokPStart) ? "↓" : (rokWStart < rokPStart) ? "↑" : "✓";
    const arrowEnd   = (rokWEnd   > rokPEnd)   ? "↓" : (rokWEnd   < rokPEnd)   ? "↑" : "✓";
    const rocznikiZeStrzalkami = `${arrowStart}${rokWStart} - ${rokWEnd}${arrowEnd}`;

    const roczState =
        (rokPStart == rokWStart && rokPEnd == rokWEnd) ? "ok" :
            ((rokPStart == rokWStart || rokPEnd == rokWEnd) ? "partial" : "bad");

    const split2 = (str) => {
        const s = String(str || "").replace(/\s+/g, "");
        const parts = s ? s.split(",") : [];
        return [parts[0] || null, parts[1] || null];
    };

    const split3 = (str) => {
        const s = String(str || "").replace(/\s+/g, "");
        const parts = s ? s.split(",") : [];
        return [parts[0] || null, parts[1] || null, parts[2] || null];
    };

    const [pNapWyl1, pNapWyl2] = split2(wylosowany.napedy);
    const [pNapWyb1, pNapWyb2] = split2(wybrany.napedy);

    const napedState = (() => {
        if ((pNapWyl1 === pNapWyb1 && pNapWyl2 === pNapWyb2) || (pNapWyl1 === pNapWyb2 && pNapWyl2 === pNapWyb1)) return "ok";
        if ([pNapWyb1, pNapWyb2].some((x) => x && (x === pNapWyl1 || x === pNapWyl2))) return "partial";
        return "bad";
    })();

    const [n1Wyl, n2Wyl, n3Wyl] = split3(wylosowany.nadwozia);
    const [n1Wyb, n2Wyb, n3Wyb] = split3(wybrany.nadwozia);

    const nadState = (() => {
        const equalAll =
            (n1Wyl === n1Wyb && n2Wyl === n2Wyb && n3Wyl === n3Wyb) ||
            (n2Wyl === null && n2Wyb === null && n1Wyl === n1Wyb && n3Wyl === null && n3Wyb === null);
        if (equalAll) return "ok";
        const poolWyl = [n1Wyl, n2Wyl, n3Wyl].filter(Boolean);
        const poolWyb = [n1Wyb, n2Wyb, n3Wyb].filter(Boolean);
        if (poolWyb.some((x) => poolWyl.includes(x))) return "partial";
        return "bad";
    })();

    const [s1Wyl, s2Wyl] = split2(wylosowany.skrzynie);
    const [s1Wyb, s2Wyb] = split2(wybrany.skrzynie);

    const skrzState = (() => {
        if ((s1Wyl === s1Wyb && s2Wyl === s2Wyb) || (s1Wyl === s2Wyb && s2Wyl === s1Wyb)) return "ok";
        if ([s1Wyb, s2Wyb].some((x) => x && (x === s1Wyl || x === s2Wyl))) return "partial";
        return "bad";
    })();

    const krajState = (wylosowany.kraj === wybrany.kraj) ? "ok" : "bad";
    const brandState = (wylosowany.marka === wybrany.marka) ? "ok" : "bad";

    return {
        brandState,
        roczState,
        rocznikiZeStrzalkami,
        napedState,
        nadState,
        skrzState,
        krajState
    };
}