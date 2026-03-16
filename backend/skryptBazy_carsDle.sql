DROP DATABASE IF EXISTS carsDle;
CREATE DATABASE carsDle;
USE carsDle;

/*
    KONCEPCJA BAZY: "AGREGACJA + OGRANICZENIA LOGICZNE"

    Każdy model samochodu w bazie reprezentuje całą rodzinę modelową
    (wszystkie generacje, wersje i odmiany), a nie pojedynczą konfigurację.

    Rekordy w tabeli `samochody` są agregowane – oznacza to, że dla jednego
    modelu może istnieć kilka rekordów opisujących różne cechy występujące
    w historii modelu (np. różne nadwozia, napędy lub skrzynie biegów).

    Widok `wszystkie_samochody` łączy te rekordy w jeden model poprzez
    agregację (GROUP_CONCAT), pokazując wszystkie możliwe cechy, jakie
    występowały w danej rodzinie samochodu.

    Celem takiej struktury jest uproszczenie bazy do zastosowań w grze
    typu Carsdle – zamiast odwzorowywać każdą wersję pojazdu osobno,
    baza przechowuje zbiór cech, które kiedykolwiek wystąpiły w danym modelu.

    "Ograniczenia logiczne" oznaczają, że do agregacji dodawane są tylko
    realne kombinacje występujące w historii modelu. Nie są tworzone
    sztuczne konfiguracje, które nigdy nie istniały w rzeczywistości.

    Dzięki temu:
    - baza pozostaje niewielka i czytelna
    - modele są łatwiejsze do zgadywania w grze
    - zachowana jest zgodność z rzeczywistą motoryzacją
*/

/*
    JASNA ZASADA PROJEKTOWA DLA CAŁEJ BAZY

    1. Pole `model` oznacza rodzinę modelową, a nie generację, kod nadwozia,
       chassis ani konkretną wersję wyposażenia.
    2. Jeżeli samochód występował w wielu generacjach, ale nadal należy do
       tej samej rodziny modelowej, wszystkie generacje są łączone w jeden model
       (np. M3, RS6, Silvia, Supra).
    3. Do jednego modelu można dodać wiele rekordów technicznych tylko wtedy,
       gdy są potrzebne do zapisania realnie istniejących cech historycznych
       tej rodziny (np. inne nadwozie, napęd, skrzynia).
    4. Nie rozbijamy modeli na generacje typu E30, F82, C7, MK4, S15 itd.,
       jeśli łamałoby to zasadę jednej rodziny modelowej = jeden model w grze.
    5. Wyjątki są dopuszczalne tylko wtedy, gdy mamy do czynienia z faktycznie
       inną rodziną modelową, a nie tylko kolejną generacją tego samego auta.
    6. Priorytetem bazy jest spójność zasad i grywalność, a nie pełne
       encyklopedyczne odwzorowanie rynku motoryzacyjnego.
*/

CREATE TABLE IF NOT EXISTS `marki` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `marka` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `kraje` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `kraj` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `nadwozia` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `nadwozie` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `skrzynie` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `skrzynia` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `napedy` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `naped` varchar(4) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `samochody` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `marka_id` int NOT NULL,
    `model` varchar(100) NOT NULL,
    `naped_id` int NOT NULL,
    `nadwozie_id` int NOT NULL,
    `skrzynia_id` int NOT NULL,
    `kraj_id` int NOT NULL,
    `rocznik` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FOREIGN KEY (`marka_id`) REFERENCES `marki`(`id`),
    CONSTRAINT FOREIGN KEY (`naped_id`) REFERENCES `napedy`(`id`),
    CONSTRAINT FOREIGN KEY (`nadwozie_id`) REFERENCES `nadwozia`(`id`),
    CONSTRAINT FOREIGN KEY (`skrzynia_id`) REFERENCES `skrzynie`(`id`),
    CONSTRAINT FOREIGN KEY (`kraj_id`) REFERENCES `kraje`(`id`)
);

INSERT INTO marki (marka) VALUES 
('Lamborghini'),
('Ferrari'),
('Pagani'),
('Porsche'),
('BMW'),
('Audi'),
('Mercedes'),
('Koenigsegg'),
('Bugatti'),
('Nissan'),
('Toyota'),
('Mazda'),
('Honda'),
('Subaru'),
('Mitsubishi'),
('Dodge'),
('Ford'),
('McLaren'),
('Hyundai');

INSERT INTO kraje (kraj) VALUES 
('Wlochy'),
('Niemcy'),
('Szwecja'),
('Francja'),
('Japonia'),
('Ameryka'),
('W.Brytania'),
('Korea');

INSERT INTO nadwozia (nadwozie) VALUES 
('Sedan'),
('Coupe'),
('Hatchback'),
('Suv'), 
('Kombi'),
('Roadster'),
('Cabrio'),
('Targa');

INSERT INTO skrzynie (skrzynia) VALUES 
('Manualna'),
('Automatyczna'),
('Sekwencyjna');

INSERT INTO napedy (naped) VALUES 
('RWD'),
('AWD'),
('FWD');


/*
    // =============================================================== //
    //                          LAMBORGHINI                            //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(1, 'Aventador', 2, 2, 2, 1, 2011),
(1, 'Aventador', 2, 6, 2, 1, 2022),

(1, 'Huracan', 2, 2, 2, 1, 2014),
(1, 'Huracan', 1, 6, 2, 1, 2023),

(1, 'Gallardo', 2, 2, 2, 1, 2003),
(1, 'Gallardo', 1, 6, 1, 1, 2013),

(1, 'Murcielago', 2, 2, 1, 1, 2001),
(1, 'Murcielago', 2, 6, 2, 1, 2010),

(1, 'Diablo', 1, 2, 1, 1, 1990),
(1, 'Diablo', 2, 6, 1, 1, 2001),

(1, 'Countach', 1, 2, 1, 1, 1974),
(1, 'Countach', 1, 2, 1, 1, 1990),

(1, 'Revuelto', 2, 2, 2, 1, 2023),
(1, 'Revuelto', 2, 2, 2, 1, 2026),

(1, 'Urus', 2, 4, 2, 1, 2018),
(1, 'Urus', 2, 4, 2, 1, 2025),

(1, 'Temerario', 2, 2, 2, 1, 2024),
(1, 'Temerario', 2, 2, 2, 1, 2026),

(1, 'Sian', 2, 2, 2, 1, 2019),
(1, 'Sian', 2, 6, 2, 1, 2021),

(1, 'Veneno', 2, 2, 2, 1, 2013),
(1, 'Veneno', 2, 6, 2, 1, 2015),

(1, 'Centenario', 2, 2, 2, 1, 2016),
(1, 'Centenario', 2, 6, 2, 1, 2017);

/*
    // =============================================================== //
    //                            Ferrari                              //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(2, 'F40', 1, 2, 1, 1, 1987),
(2, 'F40', 1, 2, 1, 1, 1992),

(2, 'F50', 1, 8, 1, 1, 1995),
(2, 'F50', 1, 8, 1, 1, 1997),

(2, 'LaFerrari/Aperta', 1, 2, 2, 1, 2013),
(2, 'LaFerrari/Aperta', 1, 6, 2, 1, 2018),

(2, '812 Superfast/GTS', 1, 2, 2, 1, 2017),
(2, '812 Superfast/GTS', 1, 6, 2, 1, 2025),

(2, 'SF90', 2, 2, 2, 1, 2019),
(2, 'SF90', 2, 6, 2, 1, 2024),

(2, 'Enzo', 1, 2, 2, 1, 2002),
(2, 'Enzo', 1, 2, 2, 1, 2004),

(2, 'Daytona SP3', 1, 8, 2, 1, 2021),
(2, 'Daytona SP3', 1, 8, 2, 1, 2026),

(2, 'F80', 2, 2, 2, 1, 2024),
(2, 'F80', 2, 2, 2, 1, 2026),

(2, 'Roma/Spider', 1, 2, 2, 1, 2019),
(2, 'Roma/Spider', 1, 6, 2, 1, 2026),

(2, '296 GTB/GTS', 1, 2, 2, 1, 2021),
(2, '296 GTB/GTS', 1, 6, 2, 1, 2026),

(2, '12Cilindri/Spider', 1, 2, 2, 1, 2024),
(2, '12Cilindri/Spider', 1, 6, 2, 1, 2026),

(2, 'Purosangue', 2, 4, 2, 1, 2022),
(2, 'Purosangue', 2, 4, 2, 1, 2026),

(2, 'F12 Berlinetta', 1, 2, 2, 1, 2012),
(2, 'F12 Berlinetta', 1, 2, 2, 1, 2017),

(2, '308 GTB', 1, 2, 1, 1, 1975),
(2, '308 GTB', 1, 2, 1, 1, 1985),

(2, '488', 1, 2, 2, 1, 2015),
(2, '488', 1, 6, 2, 1, 2020),

(2, 'F8', 1, 2, 2, 1, 2019),
(2, 'F8', 1, 6, 2, 1, 2023),

(2, 'Portofino', 1, 7, 2, 1, 2017),
(2, 'Portofino', 1, 7, 2, 1, 2023),

(2, 'FXX K', 1, 2, 2, 1, 2014),
(2, 'FXX K', 1, 2, 2, 1, 2017),

(2, '458', 1, 2, 2, 1, 2009),
(2, '458', 1, 6, 2, 1, 2015),

(2, 'Testarossa', 1, 2, 1, 1, 1984),
(2, 'Testarossa', 1, 2, 1, 1, 1996);

/*
    // =============================================================== //
    //                            PAGANI                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(3, 'Zonda', 1, 2, 1, 1, 1999),
(3, 'Zonda', 1, 6, 2, 1, 2013),

(3, 'Huayra', 1, 2, 2, 1, 2011),
(3, 'Huayra', 1, 6, 2, 1, 2022),

(3, 'Utopia', 1, 2, 1, 1, 2023),
(3, 'Utopia', 1, 2, 2, 1, 2026);

/*
    // =============================================================== //
    //                            PORSCHE                              //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(4, 'Carrera GT', 1, 2, 1, 2, 2004),
(4, 'Carrera GT', 1, 2, 1, 2, 2007),

(4, '918 Spyder', 2, 8, 2, 2, 2015),

(4, '911 GT3 RS', 1, 2, 1, 2, 2006),
(4, '911 GT3 RS', 1, 2, 2, 2, 2026),

(4, 'Boxster', 1, 6, 1, 2, 1996),
(4, 'Boxster', 1, 6, 2, 2, 2026);

/*
    // =============================================================== //
    //                              BMW                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(5, 'M3', 1, 2, 1, 2, 1986),
(5, 'M3', 1, 7, 1, 2, 1991),
(5, 'M3', 1, 2, 1, 2, 1992),
(5, 'M3', 1, 1, 1, 2, 1999),
(5, 'M3', 1, 7, 2, 2, 1999),
(5, 'M3', 1, 2, 1, 2, 2000),
(5, 'M3', 1, 7, 2, 2, 2006),
(5, 'M3', 1, 1, 1, 2, 2007),
(5, 'M3', 1, 2, 2, 2, 2007),
(5, 'M3', 1, 7, 2, 2, 2013),
(5, 'M3', 1, 1, 1, 2, 2014),
(5, 'M3', 1, 1, 2, 2, 2020),
(5, 'M3', 1, 1, 1, 2, 2020),
(5, 'M3', 2, 1, 2, 2, 2026),

(5, 'M4', 1, 2, 1, 2, 2014),
(5, 'M4', 1, 2, 2, 2, 2020),
(5, 'M4', 1, 2, 1, 2, 2020),
(5, 'M4', 2, 2, 2, 2, 2026),

(5, 'M5', 1, 1, 1, 2, 1985),
(5, 'M5', 1, 1, 2, 2, 1988),
(5, 'M5', 1, 1, 1, 2, 1988),
(5, 'M5', 1, 1, 2, 2, 1995),
(5, 'M5', 1, 1, 1, 2, 1998),
(5, 'M5', 1, 1, 2, 2, 2003),
(5, 'M5', 1, 1, 1, 2, 2005),
(5, 'M5', 1, 1, 2, 2, 2010),
(5, 'M5', 1, 1, 1, 2, 2011),
(5, 'M5', 1, 1, 2, 2, 2016),
(5, 'M5', 2, 1, 2, 2, 2017),
(5, 'M5', 2, 1, 2, 2, 2020),
(5, 'M5', 2, 1, 2, 2, 2024),
(5, 'M5', 2, 1, 2, 2, 2026);

/*
    // =============================================================== //
    //                         MERCEDES                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(7, 'AMG ONE', 2, 2, 2, 2, 2022),

(7, 'AMG GT Black Series', 1, 2, 2, 2, 2020),
(7, 'AMG GT Black Series', 1, 2, 2, 2, 2021);

/*
    // =============================================================== //
    //                             AUDI                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(6, 'R8', 2, 2, 1, 2, 2006),
(6, 'R8', 2, 6, 2, 2, 2024),

(6, 'TT', 2, 2, 1, 2, 1998),
(6, 'TT', 2, 6, 2, 2, 2023),

(6, 'RS3', 2, 3, 2, 2, 2011),
(6, 'RS3', 2, 3, 2, 2, 2012),
(6, 'RS3', 2, 3, 2, 2, 2015),
(6, 'RS3', 2, 1, 2, 2, 2020),
(6, 'RS3', 2, 3, 2, 2, 2021),
(6, 'RS3', 2, 1, 2, 2, 2026),

(6, 'RS6', 2, 1, 2, 2, 2002),
(6, 'RS6', 2, 5, 2, 2, 2004),
(6, 'RS6', 2, 1, 2, 2, 2008),
(6, 'RS6', 2, 5, 2, 2, 2010),
(6, 'RS6', 2, 5, 2, 2, 2013),
(6, 'RS6', 2, 5, 2, 2, 2018),
(6, 'RS6', 2, 5, 2, 2, 2019),
(6, 'RS6', 2, 5, 2, 2, 2026),

(6, 'RS7', 2, 2, 2, 2, 2013),
(6, 'RS7', 2, 2, 2, 2, 2018),
(6, 'RS7', 2, 2, 2, 2, 2019),
(6, 'RS7', 2, 2, 2, 2, 2026);

/*
    // =============================================================== //
    //                            NISSAN                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(10, 'GT-R', 2, 2, 2, 5, 2007),
(10, 'GT-R', 2, 2, 2, 5, 2025),

(10, 'Skyline GT-R R34', 2, 2, 1, 5, 1998),
(10, 'Skyline GT-R R34', 2, 2, 2, 5, 2002),

(10, '350Z', 1, 2, 1, 5, 2002),
(10, '350Z', 1, 6, 2, 5, 2009),

(10, '370Z', 1, 2, 1, 5, 2008),
(10, '370Z', 1, 6, 2, 5, 2020),

(10, 'Silvia', 1, 2, 1, 5, 1988),
(10, 'Silvia', 1, 7, 2, 5, 1994),
(10, 'Silvia', 1, 2, 1, 5, 1993),
(10, 'Silvia', 1, 2, 2, 5, 1998),
(10, 'Silvia', 1, 2, 1, 5, 1999),
(10, 'Silvia', 1, 2, 2, 5, 2002);

/*
    // =============================================================== //
    //                           TOYOTA                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(11, 'Supra', 1, 2, 1, 5, 1992),
(11, 'Supra', 1, 8, 2, 5, 2002),
(11, 'Supra', 1, 2, 1, 5, 2019),
(11, 'Supra', 1, 2, 2, 5, 2025),

(11, '86', 1, 2, 1, 5, 2012),
(11, '86', 1, 2, 2, 5, 2026);

/*
    // =============================================================== //
    //                            MAZDA                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(12, 'RX-7', 1, 2, 1, 5, 1978),
(12, 'RX-7', 1, 2, 2, 5, 2002),

(12, 'MX-5', 1, 6, 1, 5, 1989),
(12, 'MX-5', 1, 6, 2, 5, 2026);

/*
    // =============================================================== //
    //                           BUGATTI                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(9, 'EB110', 2, 2, 1, 4, 1991),
(9, 'EB110', 2, 2, 1, 4, 1995),

(9, 'Veyron', 2, 2, 2, 4, 2005),
(9, 'Veyron', 2, 6, 2, 4, 2015),

(9, 'Chiron', 2, 2, 2, 4, 2016),
(9, 'Chiron', 2, 2, 2, 4, 2024),

(9, 'Tourbillon', 2, 2, 2, 4, 2026),

(9, 'Bolide', 2, 2, 2, 4, 2024);

/*
    // =============================================================== //
    //                          KOENIGSEGG                             //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(8,'Jesko', 2, 2, 2, 3, 2020),
(8,'Jesko', 2, 8, 2, 3, 2026),

(8, 'One:1', 1, 2, 2, 3, 2014),
(8, 'One:1', 1, 8, 2, 3, 2015),

(8, 'Agera', 2, 2, 2, 3, 2011),
(8, 'Agera', 2, 8, 2, 3, 2018);

/*
    // =============================================================== //
    //                            MCLAREN                              //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(18, 'F1', 1, 2, 1, 7, 1992),
(18, 'F1', 1, 2, 1, 7, 1998),

(18, 'Senna', 1, 2, 2, 7, 2018),
(18, 'Senna', 1, 2, 2, 7, 2022),

(18, '720S', 1, 2, 2, 7, 2017),
(18, '720S', 1, 2, 2, 7, 2023),

(18, 'P1', 1, 2, 2, 7, 2013),
(18, 'P1', 1, 2, 2, 7, 2015);

/*
    // =============================================================== //
    //                          HYUNDAI                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(19, 'Genesis Coupe', 1, 2, 1, 8, 2008),
(19, 'Genesis Coupe', 1, 2, 2, 8, 2016);

/*
    // =============================================================== //
    //                             HONDA                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(13, 'Civic', 3, 3, 1, 5, 1972),
(13, 'Civic', 3, 1, 2, 5, 2026),
(13, 'Civic', 3, 2, 1, 5, 2000),

(13, 'Accord', 3, 1, 1, 5, 1976),
(13, 'Accord', 3, 5, 2, 5, 2026),
(13, 'Accord', 3, 2, 1, 5, 2017),

(13, 'Prelude', 3, 2, 1, 5, 1978),
(13, 'Prelude', 3, 2, 2, 5, 2001);

/*
    // =============================================================== //
    //                             SUBARU                              //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(14, 'Impreza', 2, 1, 1, 5, 1992),
(14, 'Impreza', 2, 3, 2, 5, 2026),
(14, 'Impreza', 2, 2, 1, 5, 2000),
(14, 'Impreza', 2, 5, 2, 5, 2007),

(14, 'BRZ', 1, 2, 1, 5, 2012),
(14, 'BRZ', 1, 2, 2, 5, 2026);

/*
    // =============================================================== //
    //                          MITSUBISHI                             //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(15, 'Lancer Evolution', 2, 1, 1, 5, 1992),
(15, 'Lancer Evolution', 2, 1, 2, 5, 2016),
(15, 'Lancer Evolution', 2, 5, 2, 5, 2006);

/*
    // =============================================================== //
    //                             DODGE                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(16, 'Challenger', 1, 2, 1, 6, 1970),
(16, 'Challenger', 1, 2, 2, 6, 2023),

(16, 'Charger', 1, 2, 1, 6, 1966),
(16, 'Charger', 1, 1, 2, 6, 2023),

(16, 'Viper', 1, 6, 1, 6, 1992),
(16, 'Viper', 1, 2, 1, 6, 2017);

/*
    // =============================================================== //
    //                              FORD                               //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(17, 'Mustang', 1, 2, 1, 6, 1964),
(17, 'Mustang', 1, 7, 2, 6, 2026),

(17, 'GT', 1, 2, 1, 6, 2004),
(17, 'GT', 1, 2, 2, 6, 2022),

(17, 'GT40', 1, 2, 1, 6, 1964),
(17, 'GT40', 1, 2, 1, 6, 1969);

CREATE VIEW wszystkie_samochody AS
SELECT 
    MIN(samochody.id) AS id,
    marki.marka,
    samochody.model, 
    GROUP_CONCAT(DISTINCT napedy.naped) AS dostepne_napedy,
    GROUP_CONCAT(DISTINCT nadwozia.nadwozie) AS dostepne_nadwozia, 
    GROUP_CONCAT(DISTINCT skrzynie.skrzynia) AS dostepne_skrzynie,
    CONCAT(MIN(samochody.rocznik), ' - ', MAX(samochody.rocznik)) AS lata_produkcji,
    kraje.kraj
FROM samochody 
JOIN marki ON samochody.marka_id = marki.id
JOIN napedy ON samochody.naped_id = napedy.id
JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
JOIN kraje ON samochody.kraj_id = kraje.id
GROUP BY marki.marka, samochody.model
ORDER BY samochody.id;

SELECT * FROM wszystkie_samochody;

CREATE VIEW samochody_marki AS 
SELECT 
    marki.marka,
    COUNT(samochody.id) AS liczba_samochodow
FROM samochody
JOIN marki ON samochody.marka_id = marki.id
GROUP BY marki.marka
ORDER BY marki.marka;

CREATE VIEW samochody_kraje AS
SELECT 
    kraje.kraj,
    COUNT(samochody.id) AS liczba_samochodow
FROM samochody
JOIN kraje ON samochody.kraj_id = kraje.id
GROUP BY kraje.kraj
ORDER BY kraje.kraj;