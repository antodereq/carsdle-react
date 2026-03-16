export const modelImages = {
    "Aventador": "modele/aventador.jpg",
    "Huracan": "modele/huracan.jpg",
    "Countach": "modele/countach.jpg",
    "Diablo": "modele/diablo.jpg",
    "911 GT3 RS": "modele/911gt3rs.jpg",
    "918 Spyder": "modele/918spyder.jpg",
    "Carrera GT": "modele/carreragt.jpg",
    "Boxster": "modele/boxster.jpg",
    "Supra": "modele/supramk4.jpg",
    "86" : "modele/86.jpg",
    "Silvia": "modele/s13.jpg",
    "GT-R": "modele/gtr.jpg",
    "350Z": "modele/350z.jpg",
    "370Z": "modele/370z.jpg",
    "Skyline GT-R R34": "modele/skyline.jpg",
    "919 Hybrid Evo": "modele/919hybridevo.jpg",
    "Civic": "modele/civic.jpg",
    "Prelude": "modele/prelude.jpg",
    "Accord": "modele/accord.jpg",
    "Impreza": "modele/impreza.jpg",
    "BRZ": "modele/brz.jpg",
    "Lancer Evolution": "modele/evo.jpg",
    "Challenger": "modele/challenger.jpg",
    "Charger": "modele/charger.jpg",
    "Viper": "modele/viper.jpg",
    "Mustang": "modele/mustang.jpg",
    "GT": "modele/gt.jpg",
    "GT40": "modele/gt40.jpg",
    "Genesis Coupe": "modele/genesisCoupe.jpg",
    "Gallardo": "modele/gallardo.jpg",
    "Murcielago": "modele/murcielago.jpg",
    "Revuelto": "modele/revuelto.jpg",
    "Sian": "modele/sian.jpg",
    "Veneno": "modele/veneno.jpg",
    "Centenario": "modele/centenario.jpg",
    "Temerario": "modele/temerario.jpg",
    "Urus": "modele/urus.jpg",
    "F40": "modele/f40.jpg",
    "F50": "modele/f50.jpg",
    "LaFerrari/Aperta": "modele/laferrari.jpg",
    "296 GTB/GTS": "modele/296.jpg",
    "Purosangue": "modele/purosangue.jpg",
    "12Cilindri/Spider": "modele/12Cilindri.jpg",
    "812 Superfast/GTS": "modele/812.jpg",
    "Roma/Spider": "modele/roma.jpg",
    "F12 Berlinetta": "modele/f12.jpg",
    "F8": "modele/f8.jpg",
    "488": "modele/488.jpg",
    "308 GTB": "modele/308.jpg",
    "Daytona SP3" : "modele/daytonasp3.jpg",
    "Portofino": "modele/portofino.jpg",
    "FXX K" : "modele/fxxk.jpg",
    "458": "modele/458.jpg",
    "Testarossa": "modele/testarossa.jpg",
    "SF90": "modele/sf90.jpg",
    "Enzo": "modele/enzo.jpg",
    "Zonda": "modele/zonda.jpg",
    "Huayra": "modele/huayra.jpg",
    "Utopia": "modele/utopia.jpg",
    "M3": "modele/m3f80.jpg",
    "M4": "modele/m4f82.jpg",
    "M5": "modele/m5f90.jpg",
    "AMG ONE": "modele/amgone.jpg",
    "AMG GT Black Series": "modele/amggtblackseries.jpg",
    "R8": "modele/r8.jpg",
    "RS7": "modele/rs7.jpg",
    "RS6": "modele/rs6.jpg",
    "RS3": "modele/rs3.jpg",
    "TT": "modele/tt.jpg",
    "RX-7": "modele/rx7.jpg",
    "MX-5": "modele/mx5.jpg",
    "EB110": "modele/eb110.jpg",
    "Veyron": "modele/veyron.jpg",
    "Chiron": "modele/chiron.jpg",
    "Tourbillon": "modele/tourbillon.jpg",
    "Bolide": "modele/bolide.jpg",
    "Jesko": "modele/jesko.jpg",
    "One:1": "modele/one1.jpg",
    "Agera": "modele/agera.jpg",
    "F1": "modele/f1.jpg",
    "Senna": "modele/senna.jpg",
    "720S": "modele/720s.jpg",
    "P1": "modele/p1.jpg"
};

export function brandLogo(marka) {
    switch (marka) {
        case "Lamborghini": return "img/lamborghiniLogo2.png";
        case "Porsche": return "img/porscheLogo2.png";
        case "Nissan": return "img/nissanLogo3.png";
        case "Toyota": return "img/toyotaLogo6.png";
        case "Ferrari": return "img/ferrariLogo.png";
        case "BMW": return "img/bmwLogo.png";
        case "Pagani": return "img/paganiLogo.png";
        case "McLaren": return "img/mclarenLogo.png";
        case "Bugatti": return "img/bugattiLogo.png";
        case "Koenigsegg": return "img/koenigseggLogo.png";
        case "Mazda": return "img/mazdaLogo.png";
        case "Mercedes": return "img/mercedesLogo.png";
        case "Audi": return "img/audiLogo.png";
        case "Dodge": return "img/dodgeLogo.png";
        case "Honda": return "img/hondaLogo.png";
        case "Subaru": return "img/subaruLogo.png";
        case "Mitsubishi": return "img/mitsubishiLogo.png";
        case "Ford": return "img/fordLogo.png";
        case "Hyundai": return "img/hyundaiLogo.png"
        default: return "";
    }
}

export function countryFlag(kraj) {
    switch (kraj) {
        case "Wlochy": return "img/italy.png";
        case "Niemcy": return "img/germany2.png";
        case "Japonia": return "img/japan2.png";
        case "Szwecja": return "img/sweden.png";
        case "Francja": return "img/france.png";
        case "W.Brytania": return "img/uk.png";
        case "Ameryka": return "img/america.png";
        case "Korea": return "img/korea.png";
        default: return "";
    }
}