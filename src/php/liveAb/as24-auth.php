<?php
// Credentials : Kreativmedia (config.php) ou Infomaniak (env)
if (file_exists(__DIR__ . '/../../config.php')) {
    require __DIR__ . '/../../config.php';
    $GLOBALS['AS24_CLIENT_ID']     = AUTOSCOUT_CLIENT_ID;
    $GLOBALS['AS24_CLIENT_SECRET'] = AUTOSCOUT_CLIENT_SECRET;
    $GLOBALS['AS24_SELLER_ID']     = AUTOSCOUT_SELLER_ID;
} else {
    $GLOBALS['AS24_CLIENT_ID']     = getenv('AUTOSCOUT_CLIENT_ID');
    $GLOBALS['AS24_CLIENT_SECRET'] = getenv('AUTOSCOUT_CLIENT_SECRET');
    $GLOBALS['AS24_SELLER_ID']     = getenv('AUTOSCOUT_SELLER_ID');
}

function getAs24Token() {
    $cacheFile = sys_get_temp_dir() . '/as24_token.json';

    // Token en cache encore valide ? (marge de 60 s)
    if (is_readable($cacheFile)) {
        $c = json_decode(file_get_contents($cacheFile), true);
        if ($c && ($c['expires'] ?? 0) > time() + 60) return $c['token'];
    }

    // Sinon, nouveau token
    $res = file_get_contents('https://api.autoscout24.ch/public/v1/clients/oauth/token', false, stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query([
                'grant_type'    => 'client_credentials',
                'client_id'     => $GLOBALS['AS24_CLIENT_ID'],
                'client_secret' => $GLOBALS['AS24_CLIENT_SECRET'],
                'audience'      => 'https://api.autoscout24.ch',
            ]),
        ],
    ]));
    $json = json_decode($res);

    @file_put_contents($cacheFile, json_encode([
        'token'   => $json->access_token,
        'expires' => time() + ($json->expires_in ?? 86400),
    ]));

    return $json->access_token;
}