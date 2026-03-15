<?php
include("database.php");

header('Content-Type: application/json; charset=utf-8');

class Samochod {
    public function __construct(
        public $id,
        public $marka,
        public $model,
        public $napedy,
        public $nadwozia,
        public $skrzynie,
        public $roczniki,
        public $kraj
    ) {}
}

if (!isset($_POST['input'])) {
    echo json_encode([]);
    exit;
}

$input = trim($_POST['input']);

if ($input === '') {
    echo json_encode([]);
    exit;
}

// Ujednolicenie spacji
$input = preg_replace('/\s+/', ' ', $input);

// Rozbij na słowa, np. "GT3 RS" => ["GT3", "RS"]
$frazy = explode(' ', $input);

// Budowanie warunków LIKE tylko dla pola model
$whereParts = [];
$params = [];
$types = '';

foreach ($frazy as $fraza) {
    $fraza = trim($fraza);
    if ($fraza === '') continue;

    $whereParts[] = "samochody.model LIKE ?";
    $params[] = "%" . $fraza . "%";
    $types .= 's';
}

if (empty($whereParts)) {
    echo json_encode([]);
    exit;
}

$whereSql = implode(' AND ', $whereParts);

$query = "
    SELECT 
        MIN(samochody.id) AS id,
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
    WHERE $whereSql
    GROUP BY marki.marka, samochody.model, kraje.kraj
    ORDER BY samochody.model ASC
    LIMIT 20
";

$stmt = mysqli_prepare($connection, $query);

if (!$stmt) {
    echo json_encode([]);
    exit;
}

mysqli_stmt_bind_param($stmt, $types, ...$params);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$samochody = [];

while ($row = mysqli_fetch_assoc($result)) {
    $samochody[] = new Samochod(
        $row['id'],
        $row['marka'],
        $row['model'],
        $row['napedy'],
        $row['nadwozia'],
        $row['skrzynie'],
        $row['roczniki'],
        $row['kraj']
    );
}

echo json_encode($samochody, JSON_UNESCAPED_UNICODE);
?>
