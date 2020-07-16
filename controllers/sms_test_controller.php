<?php
require_once(ROOT_DIR . '/classes/SMS.class.php');
header('Content-Type: application/json');

$phone = "5527691883";
$message = "Test";
$origin = COMPANY_NAME;


$response = SMS::send($phone, $message, $origin);
$status_code = $response->getStatusCode();

// SMS couldn't be sent
if ($status_code != 200) {
    echo json_encode(array("status" => "ERROR", "message" => "Ocurrió un error al intentar enviar el mensaje SMS"));
    return;
}

echo json_encode(array("status" => "OK", "message" => "Message sent!"));
return;
