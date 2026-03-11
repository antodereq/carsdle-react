<?php
// ----------------------------------------------
// carsDle.pl — Zgłoś błąd (API JSON: POST multipart/form-data)
// ----------------------------------------------

header('Content-Type: application/json; charset=utf-8');

$sent = false;
$errors = [];

// Wartości (opcjonalnie do logów / przyszłej wysyłki maila)
$full_name = '';
$email     = '';
$subject   = '';
$message   = '';

// Ustawienia uploadu
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10 MB
$allowed_ext  = ['png','jpg','jpeg','webp','gif','pdf','txt','log','zip','7z','rar'];
$allowed_mime = [
  'image/png','image/jpeg','image/webp','image/gif',
  'application/pdf','text/plain','application/zip',
  'application/x-7z-compressed','application/x-rar-compressed'
];

$uploaded_info = null;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode([
    'ok' => false,
    'errors' => ['Metoda niedozwolona. Użyj POST.'],
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

// Pobranie i wstępne sanityzowanie
$full_name = trim($_POST['full_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$subject   = trim($_POST['subject'] ?? '');
$message   = trim($_POST['message'] ?? '');

// --- Walidacja pól wymaganych ---
if ($full_name === '') $errors[] = "Podaj imię i nazwisko.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Podaj poprawny adres e-mail.";
if ($subject === '') $errors[] = "Podaj temat.";
if ($message === '') $errors[] = "Opisz błąd / sugestię.";

// --- Walidacja pliku (wymagany) ---
if (!isset($_FILES['attachment']) || $_FILES['attachment']['error'] === UPLOAD_ERR_NO_FILE) {
  $errors[] = "Dołącz plik (zrzut ekranu, log itp.).";
} else {
  $file = $_FILES['attachment'];

  if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors[] = "Nie udało się wgrać pliku (kod błędu: {$file['error']}).";
  } else {
    if ($file['size'] > MAX_FILE_SIZE) {
      $errors[] = "Plik jest zbyt duży. Maksymalny rozmiar to 10 MB.";
    }

    // Sprawdzenie rozszerzenia i MIME
    $origName = $file['name'];
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed_ext, true)) {
      $errors[] = "Niedozwolone rozszerzenie pliku (.$ext). Dozwolone: " . implode(', ', $allowed_ext) . ".";
    }

    // MIME z Fileinfo (jeśli dostępne)
    $mime = null;
    if (function_exists('finfo_open')) {
      $finfo = finfo_open(FILEINFO_MIME_TYPE);
      if ($finfo) {
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
      }
    }
    if ($mime && !in_array($mime, $allowed_mime, true)) {
      // Archiwa mogą mieć różne MIME — nie blokujemy twardo,
      // ale jeśli jest ewidentnie PHP/skrypt, blokuj.
      if (preg_match('/php|x\-php|octet-stream/i', (string)$mime)) {
        $errors[] = "Niedozwolony typ pliku.";
      }
    }

    // Zapis pliku (jeśli brak błędów)
    if (!$errors) {
      $uploadsDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';
      if (!is_dir($uploadsDir)) {
        @mkdir($uploadsDir, 0755, true);
      }
      if (!is_writable($uploadsDir)) {
        $errors[] = "Katalog uploads/ nie jest zapisywalny.";
      } else {
        // Bezpieczna nazwa + unikalnik
        $safeBase = preg_replace('/[^a-zA-Z0-9\-\._]/', '_', basename($origName));
        $unique   = date('Ymd_His') . '_' . bin2hex(random_bytes(4));
        $target   = $uploadsDir . DIRECTORY_SEPARATOR . $unique . '_' . $safeBase;

        if (!move_uploaded_file($file['tmp_name'], $target)) {
          $errors[] = "Nie udało się zapisać pliku na serwerze.";
        } else {
          $uploaded_info = [
            'original' => $origName,
            'saved'    => $target
          ];
        }
      }
    }
  }
}

// --- Jeśli brak błędów: tu dodaj swoją wysyłkę maila / zapis do bazy ---
if (!$errors) {
  // TODO: Wyślij e-mail / zapisz do DB.
  $sent = true;
}

if ($sent) {
  echo json_encode([
    'ok' => true,
    'message' => 'Dziękujemy za zgłoszenie! Otrzymaliśmy je poprawnie.',
    'uploaded' => $uploaded_info ? [
      'original' => $uploaded_info['original'],
      'saved' => $uploaded_info['saved'],
    ] : null,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

http_response_code(400);
echo json_encode([
  'ok' => false,
  'errors' => $errors,
], JSON_UNESCAPED_UNICODE);