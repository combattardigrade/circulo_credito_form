<?php
require_once(ROOT_DIR . '/classes/SMS.class.php');
header('Content-Type: application/json');
$_POST = json_decode(file_get_contents('php://input'), true);

$firstName = System::mysqli_fix_string(@$_POST['firstName']);
$secondName = System::mysqli_fix_string(@$_POST['secondName']);
$lastName = System::mysqli_fix_string(@$_POST['lastName']);
$secondLastName = System::mysqli_fix_string(@$_POST['secondLastName']);
$email = System::mysqli_fix_string(@$_POST['email']);
$phone = System::mysqli_fix_string(@$_POST['phone']);
$gender = System::mysqli_fix_string(@$_POST['gender']);
$dateOfBirth = System::mysqli_fix_string(@$_POST['dateOfBirth']);
$entidadNacimiento = System::mysqli_fix_string(@$_POST['entidadNacimiento']);

$curp = System::mysqli_fix_string(@$_POST['curp']);
$rfc = System::mysqli_fix_string(@$_POST['rfc']);

$calle = System::mysqli_fix_string(@$_POST['calle']);
$numeroExt = System::mysqli_fix_string(@$_POST['numeroExt']);
$colonia = System::mysqli_fix_string(@$_POST['colonia']);
$municipio = System::mysqli_fix_string(@$_POST['municipio']);
$entidadFederativa = System::mysqli_fix_string(@$_POST['entidadFederativa']);
$postalCode = System::mysqli_fix_string(@$_POST['postalCode']);

$creditAmount = System::mysqli_fix_string(@$_POST['creditAmount']);
$creditType = System::mysqli_fix_string(@$_POST['creditType']);
$propertyValue = System::mysqli_fix_string(@$_POST['propertyValue']);
$ownsProperty = System::mysqli_fix_string(@$_POST['ownsProperty']);

$sourceOfResources = System::mysqli_fix_string(@$_POST['sourceOfResources']);
$unverifiableIncome = System::mysqli_fix_string(@$_POST['unverifiableIncome']);
$verifiableIncome = System::mysqli_fix_string(@$_POST['verifiableIncome']);
$jobDescription = System::mysqli_fix_string(@$_POST['jobDescription']);

// Generate NIP
$digits = 4;
$nip = rand(pow(10, $digits - 1), pow(10, $digits) - 1);

if (empty($firstName) || empty($lastName) || empty($secondLastName)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa tu nombre completo"));
    return;
}

if (empty($email)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa un email válido"));
    return;
}

if (empty($phone)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa un número de teléfono válido"));
    return;
}

if (empty($gender)) {
    echo json_encode(array("status" => "ERROR", "message" => "Selecciona tu sexo"));
    return;
}

if (empty($dateOfBirth)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa tu fecha de nacimiento"));
    return;
}

if (empty($entidadNacimiento)) {
    echo json_encode(array("status" => "ERROR", "message" => "Selecciona tu estado de nacimiento"));
    return;
}

if (empty($curp)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa tu CURP"));
    return;
}

if (empty($rfc)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa tu RFC"));
    return;
}

if (empty($calle) || empty($numeroExt) || empty($colonia) || empty($municipio) || empty($entidadFederativa) || empty($postalCode)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa los datos completos de tu domicilio"));
    return;
}

if (empty($creditAmount) || empty($creditType)) {
    echo json_encode(array("status" => "ERROR", "message" => "Ingresa todos los datos requeridos de la solicitud de crédito"));
    return;
}

if (empty($sourceOfResources) || empty($unverifiableIncome) || empty($verifiableIncome) || empty($jobDescription)) {
    echo json_encode(array("status" => "ERROR", "message" => "Completa tu información laboral"));
    return;
}

$query = "CREATE TABLE IF NOT EXISTS credit_requests (
        id int(11) NOT NULL AUTO_INCREMENT,
        firstName varchar(255) DEFAULT NULL,
        secondName varchar(255) DEFAULT NULL,
        lastName varchar(255) DEFAULT NULL,
        secondLastName varchar(255) DEFAULT NULL,
        email varchar(255) DEFAULT NULL,
        phone varchar(255) DEFAULT NULL,
        gender varchar(255) DEFAULT NULL,
        dateOfBirth varchar(255) DEFAULT NULL,
        entidadNacimiento varchar(255) DEFAULT NULL,
        curp varchar(255) DEFAULT NULL,
        rfc varchar(255) DEFAULT NULL,
        calle varchar(255) DEFAULT NULL,
        numeroExt varchar(255) DEFAULT NULL,
        colonia varchar(255) DEFAULT NULL,
        municipio varchar(255) DEFAULT NULL,
        entidadFederativa varchar(255) DEFAULT NULL,
        postalCode varchar(255) DEFAULT NULL,
        creditAmount varchar(255) DEFAULT NULL,
        creditType varchar(255) DEFAULT NULL,
        propertyValue varchar(255) DEFAULT NULL,
        ownsProperty varchar(255) DEFAULT NULL,
        sourceOfResources varchar(255) DEFAULT NULL,
        verifiableIncome varchar(255) DEFAULT NULL,
        unverifiableIncome varchar(255) DEFAULT NULL,
        jobDescription varchar(255) DEFAULT NULL,
        nip varchar(255) DEFAULT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        primary key (id)
    )";

// Create Table
if (!$mysqli->query($query)) {
    echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    return;
}

$query = "INSERT INTO credit_requests (firstName, secondName, lastName, secondLastName, email, phone, gender, dateOfBirth, entidadNacimiento, curp, rfc, calle, numeroExt,colonia, municipio, entidadFederativa, postalCode, creditAmount, creditType, propertyValue, ownsProperty, sourceOfResources,verifiableIncome, unverifiableIncome, jobDescription, nip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

if (!($stmt = $mysqli->prepare($query))) {
    echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    return;
}

if (!$stmt->bind_param(
    "ssssssssssssssssssssssssss",
    $firstName,
    $secondName,
    $lastName,
    $secondLastName,
    $email,
    $phone,
    $gender,
    $dateOfBirth,
    $entidadNacimiento,
    $curp,
    $rfc,
    $calle,
    $numeroExt,
    $colonia,
    $municipio,
    $entidadFederativa,
    $postalCode,
    $creditAmount,
    $creditType,
    $ownsProperty,
    $propertyValue,
    $sourceOfResources,
    $verifiableIncome,
    $unverifiableIncome,
    $jobDescription,
    $nip
)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
    return;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    return;
}

// Credit Request ID
$credit_request_id = mysqli_insert_id($mysqli);

// Send SMS
$message = "Por favor, ingresa el siguiente NIP en tu proceso de solicitud de credito con " . COMPANY_NAME . ": " . $nip;
$origin = "SwayLending";

// DEBUGGING
// $response = SMS::send($phone, $message, $origin);
// $status_code = $response->getStatusCode();

// // SMS couldn't be sent
// if($status_code != 200) {
//     echo json_encode(array("status" => "ERROR", "message" => "Ocurrió un error al intentar enviar el mensaje SMS"));
//     return;
// }

// OK response
echo json_encode(array("status" => "OK", "payload" => array("credit_request_id" => $credit_request_id, "nip" => $nip),  "message" => "Solicitud de crédito creada correctamente"));
return;
