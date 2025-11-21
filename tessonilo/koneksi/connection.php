<?php
$database_hostname = "localhost";
$database_username = "root";
$database_password = "";
$database_name = "tessonilo";
$databse_port = "3306";

try {
    $database_connection = new PDO(
        "mysql:host=$database_hostname;port=$databse_port;dbname=$database_name",
        $database_username,
        $database_password
    );
    // echo "Koneksi berhasil";
} catch (PDOException $e) {
    echo "Koneksi gagal: " . $e->getMessage();
}
?>