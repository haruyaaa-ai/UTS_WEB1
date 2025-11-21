<?php
header('Content-Type: application/json');
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $mysqli->query("SELECT * FROM reservasi ORDER BY date DESC");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);

} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("INSERT INTO reservasi (name, date, tickets, status) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $input['name'], $input['date'], $input['tickets'], $input['status']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

} elseif ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("UPDATE reservasi SET name=?, date=?, tickets=?, status=? WHERE id=?");
    $stmt->bind_param("ssisi", $input['name'], $input['date'], $input['tickets'], $input['status'], $input['id']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

} elseif ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $mysqli->prepare("DELETE FROM reservasi WHERE id=?");
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
