export function compareCars(wylosowany, wybrany){
    //funkcja która robi z "2010 - 2016" -> ["2010", "2016"] albo "2024" -> ["2024", "2024"]
    function splitDatesIntoArray(str){
        const datesString = String(str || "").trim();   
        if(!datesString.includes("-")){ 
            const twoDatesArr = [datesString, datesString];
            return twoDatesArr;
        }
        const twoDatesArr = datesString.split("-").map((x) => x.trim());
        return twoDatesArr;
    }
    const [drawnStartYear, drawnEndYear] = splitDatesIntoArray(wylosowany.roczniki);
    const [chosenStartYear, chosenEndYear] = splitDatesIntoArray(wybrany.roczniki);
    
    function getArrow(drawn, chosen){
        if(Number(drawn) > Number(chosen)){return "↑"}
        if(Number(drawn) < Number(chosen)){return "↓"}
        return "✓";
    }
    const startArrow = getArrow(drawnStartYear, chosenStartYear);
    const endArrow = getArrow(drawnEndYear, chosenEndYear);
    const yearsWithArrows = `${startArrow}${chosenStartYear} - ${chosenEndYear}${endArrow}`; //string

    function getYearsMatchStatus(drawnStart, drawnEnd, chosenStart, chosenEnd){
        let matchStatus = "";
        if(drawnStart === chosenStart && drawnEnd === chosenEnd){matchStatus = "ok";}
        else if(drawnStart === chosenStart || drawnEnd === chosenEnd){matchStatus = "partial";}
        else{matchStatus = "bad";}
        return matchStatus;
    }
    const yearsMatchStatus = getYearsMatchStatus(
        drawnStartYear,
        drawnEndYear,
        chosenStartYear,
        chosenEndYear
    );
    
    function splitValuesIntoArray(str){
        const stringValues = String(str || "").trim();
        if(stringValues === ""){return [];}
        const valuesArray = stringValues.split(",").map((x) => x.trim()).filter(Boolean);
        return valuesArray; //np ["automat", "manual"] albo ["coupe", "sedan", "roadster"]
    }
    const drawnBodyTypes = splitValuesIntoArray(wylosowany.nadwozia);
    const chosenBodyTypes = splitValuesIntoArray(wybrany.nadwozia);

    const drawnGearboxes = splitValuesIntoArray(wylosowany.skrzynie);
    const chosenGearboxes = splitValuesIntoArray(wybrany.skrzynie);

    const drawnDrives = splitValuesIntoArray(wylosowany.napedy);
    const chosenDrives = splitValuesIntoArray(wybrany.napedy);

    function getArrayMatchStatus(drawnArr, chosenArr) {
        const hasSameLength = drawnArr.length === chosenArr.length; //true lub false
        //↓ np.["manual", "automat"] - kolejność ważna
        const sortedDrawn = [...drawnArr].sort(); 
        const sortedChosen = [...chosenArr].sort(); 

        const isExactMatch = hasSameLength && sortedDrawn.every((value, index) => value === sortedChosen[index]); // sprawdzam czy "manual" === sortedChosen[0] 

        if (isExactMatch) {return "ok";}
        const hasPartialMatch = chosenArr.some((value) => drawnArr.includes(value));
        
        if (hasPartialMatch) {return "partial";}
        return "bad";
    }
    const bodyMatchStatus = getArrayMatchStatus(drawnBodyTypes, chosenBodyTypes);
    const gearboxMatchStatus = getArrayMatchStatus(drawnGearboxes, chosenGearboxes);
    const driveMatchStatus = getArrayMatchStatus(drawnDrives, chosenDrives);

    function compareOneParam(drawn, chosen){
        if(drawn === chosen){
            return "ok";
        } else {
            return "bad";
        }
    }

    const brandMatchStatus = compareOneParam(wylosowany.marka, wybrany.marka);
    const countryMatchStatus = compareOneParam(wylosowany.kraj, wybrany.kraj);

    //stare klucze używane w innych plikach, TODO: zmienić w przyszłości aby nie używać kluczy
    return {
        brandState: brandMatchStatus,
        roczState: yearsMatchStatus,
        rocznikiZeStrzalkami: yearsWithArrows,
        napedState: driveMatchStatus,
        nadState: bodyMatchStatus,
        skrzState: gearboxMatchStatus,
        krajState: countryMatchStatus
    };
}