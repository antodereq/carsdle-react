DROP IF EXISTS carsDle;
CREATE DATABASE carsDle;
USE carsDle;


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
    //                      LAMBORGHINI                                //
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

(1, 'Temerario', 2, 2, 2, 1, 2024), -- Lamborghini Temerario: AWD, Coupe, Automatyczna, Wlochy, nowy hybrydowy nastepca Huracana
(1, 'Temerario', 2, 2, 2, 1, 2026), -- Lamborghini Temerario: AWD, Coupe, Automatyczna, Wlochy, rekord koncowy do zakresu

(1, 'Sian', 2, 2, 2, 1, 2019), -- Lamborghini Sian: AWD, Coupe, Automatyczna, Wlochy, limitowany few-off start 2019
(1, 'Sian', 2, 6, 2, 1, 2021), -- Lamborghini Sian: AWD, Roadster, Automatyczna, Wlochy, Roadster rozszerza nadwozie

(1, 'Veneno', 2, 2, 2, 1, 2013), -- Lamborghini Veneno: AWD, Coupe, Automatyczna, Wlochy, start 2013
(1, 'Veneno', 2, 6, 2, 1, 2015), -- Lamborghini Veneno: AWD, Roadster, Automatyczna, Wlochy, wersja Roadster

(1, 'Centenario', 2, 2, 2, 1, 2016), -- Lamborghini Centenario: AWD, Coupe, Automatyczna, Wlochy, start 2016
(1, 'Centenario', 2, 6, 2, 1, 2017); -- Lamborghini Centenario: AWD, Roadster, Automatyczna, Wlochy, Roadster konczy rodzine

/*
    // =============================================================== //
    //                      Ferrari                                    //
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

(2, 'Daytona SP3', 1, 8, 2, 1, 2021), -- Ferrari Daytona SP3: RWD, Targa, Automatyczna, Wlochy, start 2021; limitowany model Icona z V12
(2, 'Daytona SP3', 1, 8, 2, 1, 2026), -- Ferrari Daytona SP3: RWD, Targa, Automatyczna, Wlochy, domkniecie zakresu pod Twoja agregacje

(2, 'F80', 2, 2, 2, 1, 2024), -- Ferrari F80: AWD (hybrydowy hypercar), Coupe, Automatyczna, Wlochy, start 2024
(2, 'F80', 2, 2, 2, 1, 2026), -- Ferrari F80: AWD, Coupe, Automatyczna, Wlochy, rekord koncowy do zakresu lat

(2, 'Roma/Spider', 1, 2, 2, 1, 2019), -- Ferrari Roma/Roma Spider: RWD, Coupe, Automatyczna, Wlochy, Roma debut 2019
(2, 'Roma/Spider', 1, 6, 2, 1, 2026), -- Ferrari Roma/Roma Spider: RWD, Roadster, Automatyczna, Wlochy, agregacja z Roma Spider

(2, '296 GTB/GTS', 1, 2, 2, 1, 2021), -- Ferrari 296 GTB/GTS: RWD, Coupe, Automatyczna, Wlochy, rodzina 296 startuje od GTB
(2, '296 GTB/GTS', 1, 6, 2, 1, 2026), -- Ferrari 296 GTB/GTS: RWD, Roadster, Automatyczna, Wlochy, GTS dodaje wersje otwarta

(2, '12Cilindri/Spider', 1, 2, 2, 1, 2024), -- Ferrari 12Cilindri/Spider: RWD, Coupe, Automatyczna, Wlochy, start 2024
(2, '12Cilindri/Spider', 1, 6, 2, 1, 2026), -- Ferrari 12Cilindri/Spider: RWD, Roadster, Automatyczna, Wlochy, Spider rozszerza nadwozie

(2, 'Purosangue', 2, 4, 2, 1, 2022), -- Ferrari Purosangue: AWD, Suv, Automatyczna, Wlochy, start 2022
(2, 'Purosangue', 2, 4, 2, 1, 2026), -- Ferrari Purosangue: AWD, Suv, Automatyczna, Wlochy, rekord koncowy

(2, 'F12 Berlinetta', 1, 2, 2, 1, 2012), -- Ferrari F12 Berlinetta: RWD, Coupe, Automatyczna, Wlochy, start 2012
(2, 'F12 Berlinetta', 1, 2, 2, 1, 2017), -- Ferrari F12 Berlinetta: RWD, Coupe, Automatyczna, Wlochy, koniec rodziny F12berlinetta

(2, '308 GTB', 1, 2, 1, 1, 1975), -- Ferrari 308 GTB: RWD, Coupe, Manualna, Wlochy, start 1975
(2, '308 GTB', 1, 2, 1, 1, 1985), -- Ferrari 308 GTB: RWD, Coupe, Manualna, Wlochy, domkniecie zakresu dla rodziny 308 GTB

(2, '488', 1, 2, 2, 1, 2015), -- Ferrari 488: RWD, Coupe, Automatyczna, Wlochy, baza od 488 GTB
(2, '488', 1, 6, 2, 1, 2020), -- Ferrari 488: RWD, Roadster, Automatyczna, Wlochy, agregacja GTB/Spider/Pista

(2, 'F8', 1, 2, 2, 1, 2019), -- Ferrari F8: RWD, Coupe, Automatyczna, Wlochy, F8 Tributo start 2019
(2, 'F8', 1, 6, 2, 1, 2023), -- Ferrari F8: RWD, Roadster, Automatyczna, Wlochy, rodzina F8 zakonczyla dostawy w 2023

(2, 'Portofino', 1, 7, 2, 1, 2017), -- Ferrari Portofino: RWD, Cabrio, Automatyczna, Wlochy, start 2017
(2, 'Portofino', 1, 7, 2, 1, 2023), -- Ferrari Portofino: RWD, Cabrio, Automatyczna, Wlochy, koncowka cyklu zycia rodziny

(2, 'FXX K', 1, 2, 2, 1, 2014), -- Ferrari FXX K: RWD, Coupe, Automatyczna, Wlochy, torowy hypercar oparty o LaFerrari
(2, 'FXX K', 1, 2, 2, 1, 2017), -- Ferrari FXX K: RWD, Coupe, Automatyczna, Wlochy, zakres do wersji Evo

(2, '458', 1, 2, 2, 1, 2009), -- Ferrari 458: RWD, Coupe, Automatyczna, Wlochy, Italia start 2009
(2, '458', 1, 6, 2, 1, 2015), -- Ferrari 458: RWD, Roadster, Automatyczna, Wlochy, agregacja Italia/Spider/Speciale

(2, 'Testarossa', 1, 2, 1, 1, 1984), -- Ferrari Testarossa: RWD, Coupe, Manualna, Wlochy, start 1984
(2, 'Testarossa', 1, 2, 1, 1, 1996); -- Ferrari Testarossa: RWD, Coupe, Manualna, Wlochy, rodzina Testarossa/512 TR/F512 M do 1996

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
    //                          PORSCHE                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(4, 'Carrera GT', 1, 2, 1, 2, 2004),
(4, 'Carrera GT', 1, 2, 1, 2, 2007),

(4, '918 Spyder', 2, 8, 2, 2, 2015),

(4, '911 GT3 RS', 1, 2, 1, 2, 2006),
(4, '911 GT3 RS', 1, 2, 2, 2, 2026),

(4, 'Boxster', 1, 6, 1, 2, 1996), -- Porsche Boxster: RWD, Roadster, Manualna, Niemcy, start pierwszej generacji 986
(4, 'Boxster', 1, 6, 2, 2, 2026); -- Porsche Boxster: RWD, Roadster, Automatyczna, Niemcy, agregacja do obecnych 718 Boxster

/*
    // =============================================================== //
    //                              BMW                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(5, 'M3 E30', 1, 2, 1, 2, 1986),
(5, 'M3 E30', 1, 7, 1, 2, 1991),
(5, 'M3 E36', 1, 2, 1, 2, 1992),
(5, 'M3 E36', 1, 1, 1, 2, 1999),
(5, 'M3 E36', 1, 7, 2, 2, 1999),
(5, 'M3 E46', 1, 2, 1, 2, 2000),
(5, 'M3 E46', 1, 7, 2, 2, 2006),
(5, 'M3 E90/E92/E93', 1, 1, 1, 2, 2007),
(5, 'M3 E90/E92/E93', 1, 2, 2, 2, 2007),
(5, 'M3 E90/E92/E93', 1, 7, 2, 2, 2013),
(5, 'M3 F80', 1, 1, 1, 2, 2014),
(5, 'M3 F80', 1, 1, 2, 2, 2020),
(5, 'M3 G80', 1, 1, 1, 2, 2020),
(5, 'M3 G80', 2, 1, 2, 2, 2026),

(5, 'M4 F82', 1, 2, 1, 2, 2014),
(5, 'M4 F82', 1, 2, 2, 2, 2020),
(5, 'M4 G82', 1, 2, 1, 2, 2020),
(5, 'M4 G82', 2, 2, 2, 2, 2026),

(5, 'M5 E28', 1, 1, 1, 2, 1985),
(5, 'M5 E28', 1, 1, 2, 2, 1988),
(5, 'M5 E34', 1, 1, 1, 2, 1988),
(5, 'M5 E34', 1, 1, 2, 2, 1995),
(5, 'M5 E39', 1, 1, 1, 2, 1998),
(5, 'M5 E39', 1, 1, 2, 2, 2003),
(5, 'M5 E60', 1, 1, 1, 2, 2005),
(5, 'M5 E60', 1, 1, 2, 2, 2010),
(5, 'M5 F10', 1, 1, 1, 2, 2011),
(5, 'M5 F10', 1, 1, 2, 2, 2016),
(5, 'M5 F90', 2, 1, 2, 2, 2017),
(5, 'M5 F90', 2, 1, 2, 2, 2020),
(5, 'M5 G90', 2, 1, 2, 2, 2024),
(5, 'M5 G90', 2, 1, 2, 2, 2026);

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

(6, 'TT', 2, 2, 1, 2, 1998), -- Audi TT: AWD, Coupe, Manualna, Niemcy, start rodziny TT
(6, 'TT', 2, 6, 2, 2, 2023), -- Audi TT: AWD, Roadster, Automatyczna, Niemcy, agregacja 3 generacji coupe/roadster

(6, 'RS3 8P', 2, 3, 2, 2, 2011), -- Audi RS3 8P: AWD, Hatchback, Automatyczna, Niemcy, pierwsze RS3
(6, 'RS3 8P', 2, 3, 2, 2, 2012), -- Audi RS3 8P: AWD, Hatchback, Automatyczna, Niemcy, koniec generacji

(6, 'RS3 8V', 2, 3, 2, 2, 2015), -- Audi RS3 8V: AWD, Hatchback, Automatyczna, Niemcy, druga generacja jako Sportback
(6, 'RS3 8V', 2, 1, 2, 2, 2020), -- Audi RS3 8V: AWD, Sedan, Automatyczna, Niemcy, 8V rozszerza sie tez o sedan

(6, 'RS3 8Y', 2, 3, 2, 2, 2021), -- Audi RS3 8Y: AWD, Hatchback, Automatyczna, Niemcy, obecna generacja
(6, 'RS3 8Y', 2, 1, 2, 2, 2026), -- Audi RS3 8Y: AWD, Sedan, Automatyczna, Niemcy, obecna generacja jako sedan/hatchback

(6, 'RS6 C5', 2, 1, 2, 2, 2002), -- Audi RS6 C5: AWD, Sedan, Automatyczna, Niemcy, start modelu RS6
(6, 'RS6 C5', 2, 5, 2, 2, 2004), -- Audi RS6 C5: AWD, Kombi, Automatyczna, Niemcy, C5 mial sedan i Avant

(6, 'RS6 C6', 2, 1, 2, 2, 2008), -- Audi RS6 C6: AWD, Sedan, Automatyczna, Niemcy, druga generacja
(6, 'RS6 C6', 2, 5, 2, 2, 2010), -- Audi RS6 C6: AWD, Kombi, Automatyczna, Niemcy, sedan + Avant

(6, 'RS6 C7', 2, 5, 2, 2, 2013), -- Audi RS6 C7: AWD, Kombi, Automatyczna, Niemcy, od tej generacji glownie Avant
(6, 'RS6 C7', 2, 5, 2, 2, 2018), -- Audi RS6 C7: AWD, Kombi, Automatyczna, Niemcy, koniec C7

(6, 'RS6 C8', 2, 5, 2, 2, 2019), -- Audi RS6 C8: AWD, Kombi, Automatyczna, Niemcy, obecna generacja Avant
(6, 'RS6 C8', 2, 5, 2, 2, 2026), -- Audi RS6 C8: AWD, Kombi, Automatyczna, Niemcy, rekord koncowy

(6, 'RS7 C7', 2, 2, 2, 2, 2013), -- Audi RS7 C7: AWD, Coupe, Automatyczna, Niemcy, liftback klasyfikowany przez Ciebie jako coupe
(6, 'RS7 C7', 2, 2, 2, 2, 2018), -- Audi RS7 C7: AWD, Coupe, Automatyczna, Niemcy, koniec C7

(6, 'RS7 C8', 2, 2, 2, 2, 2019), -- Audi RS7 C8: AWD, Coupe, Automatyczna, Niemcy, obecna generacja
(6, 'RS7 C8', 2, 2, 2, 2, 2026); -- Audi RS7 C8: AWD, Coupe, Automatyczna, Niemcy, rekord koncowy

/*
    // =============================================================== //
    //                           NISSAN                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(10, 'GT-R', 2, 2, 2, 5, 2007),
(10, 'GT-R', 2, 2, 2, 5, 2025),

(10, 'Skyline GT-R R34', 2, 2, 1, 5, 1998),
(10, 'Skyline GT-R R34', 2, 2, 2, 5, 2002),

(10, '350Z', 1, 2, 1, 5, 2002), -- Nissan 350Z: RWD, Coupe, Manualna, Japonia, start 2002
(10, '350Z', 1, 6, 2, 5, 2009), -- Nissan 350Z: RWD, Roadster, Automatyczna, Japonia, agregacja coupe/roadster

(10, '370Z', 1, 2, 1, 5, 2008), -- Nissan 370Z: RWD, Coupe, Manualna, Japonia, start 2008
(10, '370Z', 1, 6, 2, 5, 2020), -- Nissan 370Z: RWD, Roadster, Automatyczna, Japonia, szeroki rekord dla rodziny 370Z

(10, 'Silvia S13', 1, 2, 1, 5, 1988), -- Nissan Silvia S13: RWD, Coupe, Manualna, Japonia, osobna generacja/chassis
(10, 'Silvia S13', 1, 7, 2, 5, 1994), -- Nissan Silvia S13: RWD, Cabrio, Automatyczna, Japonia, domkniecie zakresu i nadwozi

(10, 'Silvia S14', 1, 2, 1, 5, 1993), -- Nissan Silvia S14: RWD, Coupe, Manualna, Japonia, osobna generacja/chassis
(10, 'Silvia S14', 1, 2, 2, 5, 1998), -- Nissan Silvia S14: RWD, Coupe, Automatyczna, Japonia, zakres do konca generacji

(10, 'Silvia S15', 1, 2, 1, 5, 1999), -- Nissan Silvia S15: RWD, Coupe, Manualna, Japonia, osobna generacja/chassis
(10, 'Silvia S15', 1, 2, 2, 5, 2002); -- Nissan Silvia S15: RWD, Coupe, Automatyczna, Japonia, ostatnia generacja Silvii

/*
    // =============================================================== //
    //                           TOYOTA                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(11, 'Supra MK4', 1, 2, 1, 5, 1992),
(11, 'Supra MK4', 1, 8, 2, 5, 2002),

(11, 'Supra MK5', 1, 2, 1, 5, 2019),
(11, 'Supra MK5', 1, 2, 2, 5, 2025),

(11, '86', 1, 2, 1, 5, 2012), -- Toyota 86: RWD, Coupe, Manualna, Japonia, start rodziny 86/GT86
(11, '86', 1, 2, 2, 5, 2026); -- Toyota 86: RWD, Coupe, Automatyczna, Japonia, agregacja do GR86

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
    //                          BUGATTI                                //
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
    //                       KOENIGSEGG                                //
    // =============================================================== //
*/
INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(8,'Jesko', 2, 2, 2, 3, 2020),
(8,'Jesko', 2, 8, 2, 3, 2026),

(8, 'One:1', 2, 2, 2, 3, 2014),
(8, 'One:1', 2, 8, 2, 3, 2016),

(8, 'Agera', 2, 2, 2, 3, 2011),
(8, 'Agera', 2, 8, 2, 3, 2018);

/*
    // =============================================================== //
    //                           MCLAREN                               //
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
(19, 'Genesis Coupe', 1, 2, 1, 8, 2008), -- Hyundai Genesis Coupe: RWD, Coupe, Manualna, Korea Pld, start produkcji 2008
(19, 'Genesis Coupe', 1, 2, 2, 8, 2016); -- Hyundai Genesis Coupe: RWD, Coupe, Automatyczna, Korea Pld, koniec produkcji 2016

INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(13, 'Civic', 3, 3, 1, 5, 1972), -- Honda Civic: FWD, Hatchback, Manualna, Japonia, bardzo szeroki rekord calej rodziny
(13, 'Civic', 3, 1, 2, 5, 2026), -- Honda Civic: FWD, Sedan, Automatyczna, Japonia, domkniecie zakresu i glownych nadwozi
(13, 'Civic', 3, 2, 1, 5, 2000), -- Honda Civic: FWD, Coupe, Manualna, Japonia, dodanie coupe do agregacji

(13, 'Accord', 3, 1, 1, 5, 1976), -- Honda Accord: FWD, Sedan, Manualna, Japonia, start rodziny
(13, 'Accord', 3, 5, 2, 5, 2026), -- Honda Accord: FWD, Kombi, Automatyczna, Japonia, szeroka agregacja nadwozi
(13, 'Accord', 3, 2, 1, 5, 2017), -- Honda Accord: FWD, Coupe, Manualna, Japonia, dodanie coupe do historii modelu

(13, 'Prelude', 3, 2, 1, 5, 1978), -- Honda Prelude: FWD, Coupe, Manualna, Japonia, start modelu
(13, 'Prelude', 3, 2, 2, 5, 2001); -- Honda Prelude: FWD, Coupe, Automatyczna, Japonia, koniec klasycznej Prelude


INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(14, 'Impreza', 2, 1, 1, 5, 1992), -- Subaru Impreza: AWD, Sedan, Manualna, Japonia, szeroki rekord calej rodziny
(14, 'Impreza', 2, 3, 2, 5, 2026), -- Subaru Impreza: AWD, Hatchback, Automatyczna, Japonia, domkniecie aktualnych wersji
(14, 'Impreza', 2, 2, 1, 5, 2000), -- Subaru Impreza: AWD, Coupe, Manualna, Japonia, dodanie 2-drzwiowych odmian historycznych
(14, 'Impreza', 2, 5, 2, 5, 2007), -- Subaru Impreza: AWD, Kombi, Automatyczna, Japonia, dodanie kombi/wagon

(14, 'BRZ', 1, 2, 1, 5, 2012), -- Subaru BRZ: RWD, Coupe, Manualna, Japonia, start modelu
(14, 'BRZ', 1, 2, 2, 5, 2026); -- Subaru BRZ: RWD, Coupe, Automatyczna, Japonia, obecna rodzina BRZ

INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(15, 'Lancer Evolution', 2, 1, 1, 5, 1992), -- Mitsubishi Lancer Evolution: AWD, Sedan, Manualna, Japonia, start Evo I
(15, 'Lancer Evolution', 2, 1, 2, 5, 2016), -- Mitsubishi Lancer Evolution: AWD, Sedan, Automatyczna, Japonia, koniec Evo X i dodanie automatu
(15, 'Lancer Evolution', 2, 5, 2, 5, 2006); -- Mitsubishi Lancer Evolution: AWD, Kombi, Automatyczna, Japonia, wagon dodaje kombi do agregacji


INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(16, 'Challenger', 1, 2, 1, 6, 1970), -- Dodge Challenger: RWD, Coupe, Manualna, Ameryka, klasyczny muscle car od 1970
(16, 'Challenger', 1, 2, 2, 6, 2023), -- Dodge Challenger: RWD, Coupe, Automatyczna, Ameryka, domkniecie nowozytnej ery LX/LA

(16, 'Charger', 1, 2, 1, 6, 1966), -- Dodge Charger: RWD, Coupe, Manualna, Ameryka, historyczny start modelu
(16, 'Charger', 1, 1, 2, 6, 2023), -- Dodge Charger: RWD, Sedan, Automatyczna, Ameryka, szeroka agregacja historycznych i nowoczesnych odmian

(16, 'Viper', 1, 6, 1, 6, 1992), -- Dodge Viper: RWD, Roadster, Manualna, Ameryka, start RT/10
(16, 'Viper', 1, 2, 1, 6, 2017); -- Dodge Viper: RWD, Coupe, Manualna, Ameryka, koniec produkcji 2017


INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(17, 'Mustang', 1, 2, 1, 6, 1964), -- Ford Mustang: RWD, Coupe, Manualna, Ameryka, start pony cara
(17, 'Mustang', 1, 7, 2, 6, 2026), -- Ford Mustang: RWD, Cabrio, Automatyczna, Ameryka, agregacja fastback/convertible do obecnej generacji

(17, 'GT', 1, 2, 1, 6, 2004), -- Ford GT: RWD, Coupe, Manualna, Ameryka, pierwsza nowoczesna generacja 2004
(17, 'GT', 1, 2, 2, 6, 2022), -- Ford GT: RWD, Coupe, Automatyczna, Ameryka, druga generacja od 2017 i domkniecie zakresu

(17, 'GT40', 1, 2, 1, 6, 1964), -- Ford GT40: RWD, Coupe, Manualna, Ameryka, historyczny model Le Mans
(17, 'GT40', 1, 2, 1, 6, 1969); -- Ford GT40: RWD, Coupe, Manualna, Ameryka, zakres klasycznego GT40



CREATE VIEW wszystkie_samochody AS
SELECT MIN(samochody.id) AS id,
    marki.marka, samochody.model, 
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