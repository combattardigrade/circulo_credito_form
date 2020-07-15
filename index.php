<?php

session_start();
require_once('vendor/autoload.php');
require_once('config.php');
require_once('System.class.php');
System::report_errors();

$mysqli = System::connect_db();

System::controller(@System::mysqli_fix_string($_GET['param']), $mysqli);