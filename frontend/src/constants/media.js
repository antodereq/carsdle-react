export const modelImages = {
    "Aventador": "modele/aventador.jpg",
    "Huracan": "modele/huracan.jpg",
    "Countach": "modele/countach.jpg",
    "Diablo": "modele/diablo.jpg",
    "911 GT3 RS": "modele/911gt3rs.jpg",
    "918 Spyder": "modele/918spyder.jpg",
    "Carrera GT": "modele/carreragt.jpg",
    "Supra MK4": "modele/supramk4.jpg",
    "Supra MK5": "modele/supramk5.jpg",
    "GT-R": "modele/gtr.jpg",
    "Skyline R34": "modele/skyline.jpg",
    "919 Hybrid Evo": "modele/919hybridevo.jpg",
    "Gallardo": "modele/gallardo.jpg",
    "Murcielago": "modele/murcielago.jpg",
    "Revuelto": "modele/revuelto.jpg",
    "Urus": "modele/urus.jpg",
    "F40": "modele/f40.jpg",
    "F50": "modele/f50.jpg",
    "LaFerrari": "modele/laferrari.jpg",
    "812": "modele/812.jpg",
    "SF90": "modele/sf90.jpg",
    "Enzo": "modele/enzo.jpg",
    "Zonda": "modele/zonda.jpg",
    "Huayra": "modele/huayra.jpg",
    "Utopia": "modele/utopia.jpg",
    "M3 E30": "modele/m3e30.jpg",
    "M3 E36": "modele/m3e36.jpg",
    "M3 E46": "modele/m3e46.jpg",
    "M3 E90/E92/E93": "modele/m3e92.jpg",
    "M3 F80": "modele/m3f80.jpg",
    "M3 G80": "modele/m3g80.jpg",
    "M4 F82": "modele/m4f82.jpg",
    "M4 G82": "modele/m4g82.jpg",
    "M5 E28": "modele/m5e28.jpg",
    "M5 E34": "modele/m5e34.jpg",
    "M5 E39": "modele/m5e39.jpg",
    "M5 E60": "modele/m5e60.jpg",
    "M5 F10": "modele/m5f10.jpg",
    "M5 F90": "modele/m5f90.jpg",
    "AMG ONE": "modele/amgone.jpg",
    "AMG GT Black Series": "modele/amggtblackseries.jpg",
    "R8": "modele/r8.jpg",
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
        default: return "";
    }
}