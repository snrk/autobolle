<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://gabrielbuser.ch');

require __DIR__ . '/as24-auth.php';

$listingId = preg_replace('/[^0-9]/', '', $_GET['listingId'] ?? '');
if ($listingId === '') { http_response_code(400); echo json_encode(['error' => 'listingId requis']); exit; }

$in = json_decode(file_get_contents('php://input'), true) ?: [];
$payload = json_encode([
    'firstName' => $in['firstName'] ?? '',
    'lastName'  => $in['lastName']  ?? '',
    'email'     => $in['email']     ?? '',
    'phone'     => $in['phone']     ?? '',
    'message'   => $in['message']   ?? '',
    'language'  => 'fr',
]);

$token = getAs24Token();

$res = file_get_contents("https://api.autoscout24.ch/public/v1/listings/{$listingId}/message-leads", false, stream_context_create([
    'http' => [
        'method'        => 'POST',
        'header'        => "Authorization: Bearer {$token}\r\nX-AS24-Source: hci\r\nContent-Type: application/json",
        'content'       => $payload,
        'ignore_errors' => true, // lire le body même en 4xx (validation/fraude)
    ],
]));

// Code HTTP depuis la réponse
$code = 0;
if (isset($http_response_header[0]) && preg_match('#\s(\d{3})\s#', $http_response_header[0], $m)) $code = (int) $m[1];

http_response_code($code ?: 502);
echo $code === 201 ? json_encode(['ok' => true]) : $res;