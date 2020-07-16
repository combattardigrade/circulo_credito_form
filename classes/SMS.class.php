<?php


class SMS
{
    public static function send($phone, $message, $origin)
    {
        $client = new GuzzleHttp\Client();

        $api_key = SMS_API_KEY;
        $api_secret = SMS_API_SECRET;
        $ts = time();
        $nonce = substr(md5(uniqid(rand(), true)), 0, 5);
        $request_method = 'POST';
        $request_uri = "/v2/sms";
        $request_host = "api.smsglobal.com";
        $request_port = 443;
        $auth = $ts . "\n" . $nonce . "\n" . $request_method . "\n" . $request_uri . "\n" . $request_host . "\n" . $request_port . "\n\n";
        $authHash = base64_encode(hash_hmac('sha256', $auth, $api_secret, true));
        $mac = 'MAC id="' . $api_key . '",ts="' . $ts . '",nonce="' . $nonce . '",mac="' . $authHash . '"';

        $response = $client->post('https://api.smsglobal.com/v2/sms', [
            'verify' => false,
            'headers' => [
                'Authorization' => $mac
            ],
            'form_params' => [
                'destination' => $phone,
                'message' => $message,
                'origin' => $origin,
            ]
        ]);

        return $response;
    }
}
