?php
// config.php
$DB_HOST = 'localhost';
$DB_USER = 'root';       // ganti sesuai username MySQL
$DB_PASS = '';           // ganti sesuai password MySQL
$DB_NAME = 'tessonilo';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Cek koneksi
if ($mysqli->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $mysqli->connect_error]));
}
$mysqli->set_charset("utf8mb4");
?>
