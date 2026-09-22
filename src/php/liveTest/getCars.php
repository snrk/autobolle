<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://gabrielbuser.ch');

require __DIR__ . '/as24-auth.php';
$token    = getAs24Token();
$sellerId = $GLOBALS['AS24_SELLER_ID'];

$listingsRes = file_get_contents("https://api.autoscout24.ch/public/v1/sellers/{$sellerId}/listings?page=0&size=100", false, stream_context_create([
    'http' => ['method' => 'GET', 'header' => "Authorization: Bearer {$token}"],
]));

$data = json_decode($listingsRes, true);
$data['content'] = array_values(array_filter(
    $data['content'],
    fn($car) => $car['status'] === 'activated'
));

echo json_encode($data);