<?php
header('Content-Type: application/json; charset=utf-8');

$connection = mysqli_connect("localhost", "root", "", "carsdle");
if (!$connection) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit;
}

mysqli_set_charset($connection, "utf8mb4");

/**
 * Pobieramy unikalne auta:
 * jeden rekord na marka + model
 */
$uniqueCarsQuery = "
    SELECT MIN(s.id) AS id
    FROM samochody s
    JOIN marki m ON s.marka_id = m.id
    GROUP BY m.marka, s.model
    ORDER BY m.marka, s.model
";

$resultUniqueCars = mysqli_query($connection, $uniqueCarsQuery);

if (!$resultUniqueCars) {
    http_response_code(500);
    echo json_encode(["error" => "Błąd query uniqueCarsQuery: " . mysqli_error($connection)]);
    exit;
}

$availableIds = [];
while ($row = mysqli_fetch_assoc($resultUniqueCars)) {
    $availableIds[] = (int)$row["id"];
}

if (empty($availableIds)) {
    http_response_code(500);
    echo json_encode(["error" => "Brak dostępnych aut do losowania"]);
    exit;
}

/**
 * Reset dzienny wg czasu w Polsce
 */
date_default_timezone_set('Europe/Warsaw');

/**
 * Obliczamy numer dnia od daty bazowej.
 * Każdego dnia wybieramy kolejne auto z listy.
 */
$baseDate = new DateTime('2025-01-01 00:00:00');
$today = new DateTime('today');

$daysDiff = (int)$baseDate->diff($today)->format('%a');

/**
 * Indeks auta dnia
 */
$index = $daysDiff % count($availableIds);
$dailyCarId = $availableIds[$index];

/**
 * Pobieramy pełne dane auta na podstawie wybranego ID
 */
$dailyCarQuery = "
    SELECT 
        marki.marka, 
        samochody.model, 
        GROUP_CONCAT(DISTINCT napedy.naped ORDER BY napedy.naped SEPARATOR ', ') AS napedy,
        GROUP_CONCAT(DISTINCT nadwozia.nadwozie ORDER BY nadwozia.nadwozie SEPARATOR ', ') AS nadwozia,
        GROUP_CONCAT(DISTINCT skrzynie.skrzynia ORDER BY skrzynie.skrzynia SEPARATOR ', ') AS skrzynie,
        CONCAT(MIN(samochody.rocznik), ' - ', MAX(samochody.rocznik)) AS roczniki,
        kraje.kraj
    FROM samochody
    JOIN marki ON samochody.marka_id = marki.id
    JOIN napedy ON samochody.naped_id = napedy.id
    JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
    JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
    JOIN kraje ON samochody.kraj_id = kraje.id
    WHERE samochody.id IN (
        SELECT id
        FROM samochody
        WHERE marka_id = (SELECT marka_id FROM samochody WHERE id = {$dailyCarId})
          AND model = (SELECT model FROM samochody WHERE id = {$dailyCarId})
    )
    GROUP BY marki.marka, samochody.model, kraje.kraj
    LIMIT 1
";

$resultDailyCar = mysqli_query($connection, $dailyCarQuery);

if (!$resultDailyCar) {
    http_response_code(500);
    echo json_encode(["error" => "Błąd query dailyCarQuery: " . mysqli_error($connection)]);
    exit;
}

$rowDailyCar = mysqli_fetch_assoc($resultDailyCar);

if (!$rowDailyCar) {
    http_response_code(500);
    echo json_encode(["error" => "Nie udało się pobrać auta dnia"]);
    exit;
}

/**
 * Opcjonalnie zwracamy też datę dnia i index diagnostycznie
 */
echo json_encode([
    "marka" => $rowDailyCar["marka"],
    "model" => $rowDailyCar["model"],
    "napedy" => $rowDailyCar["napedy"],
    "nadwozia" => $rowDailyCar["nadwozia"],
    "skrzynie" => $rowDailyCar["skrzynie"],
    "roczniki" => $rowDailyCar["roczniki"],
    "kraj" => $rowDailyCar["kraj"],
    "dailyKey" => $today->format('Y-m-d'),
    "dailyIndex" => $index,
], JSON_UNESCAPED_UNICODE);

mysqli_close($connection);
?>