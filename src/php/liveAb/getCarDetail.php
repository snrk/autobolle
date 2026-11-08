<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://gabrielbuser.ch');

require __DIR__ . '/as24-auth.php';

$id = preg_replace('/[^0-9]/', '', $_GET['id'] ?? '');
if ($id === '') { http_response_code(400); echo json_encode(['error' => 'id requis']); exit; }

$token = getAs24Token();
$ctx = stream_context_create([
    'http' => [
        'method'        => 'GET',
        'header'        => "Authorization: Bearer {$token}",
        'ignore_errors' => true,
    ],
]);

// 1. détail localisé FR
$detailRaw = file_get_contents("https://api.autoscout24.ch/public/v1/listings/{$id}?language=fr", false, $ctx);
$detail = json_decode($detailRaw, true);

// 2. équipements localisés FR
$equipRaw = file_get_contents("https://api.autoscout24.ch/public/v1/listings/{$id}/equipment?language=fr", false, $ctx);
$equipment = json_decode($equipRaw, true);

echo json_encode([
    'detail'    => $detail,
    'equipment' => $equipment,
]);