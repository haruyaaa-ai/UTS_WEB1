<?php
header('Content-Type: application/json');
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Ambil semua data info
    $result = $mysqli->query("SELECT * FROM info ORDER BY date DESC");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);

} elseif ($method === 'POST') {
    // Tambah info baru
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("INSERT INTO info (title, category, date, content) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $input['title'], $input['category'], $input['date'], $input['content']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

} elseif ($method === 'PUT') {
    // Update info
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("UPDATE info SET title=?, category=?, date=?, content=? WHERE id=?");
    $stmt->bind_param("ssssi", $input['title'], $input['category'], $input['date'], $input['content'], $input['id']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

} elseif ($method === 'DELETE') {
    // Hapus info
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("DELETE FROM info WHERE id=?");
    $stmt->bind_param("i", $input['id']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }
} else {
    echo json_encode(['error' => 'Method not allowed']);
}
?>
