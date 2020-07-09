<?php

class System
{
    public static function connect_db()
    {
        $mysqli = new mysqli(ADMIN['DB_HOST'], ADMIN['DB_USER'], ADMIN['DB_PASSWORD'], ADMIN['DB_NAME']);
        return $mysqli;
    }

    public static function mysqli_fix_string($string)
    {
        $mysqli = self::connect_db();
        return $mysqli->real_escape_string(strip_tags(htmlspecialchars($string)));
    }

    public static function controller($param, $mysqli)
    {
        
        if (empty($param)) {
            require_once('views/index_view.php');
            return;
        }
        
        $param = explode('/', $param);

        $controller = $param[0];
        
        if ($controller === 'api') {
            $route = $param[1];
           
            if (empty($route)) return http_response_code(404);
            
            $file = ROOT_DIR . "/controllers/" . $route . "_controller.php";
                       
        } else {
            $file = ROOT_DIR . "/views/" . $controller . "_view.php";
        }

        if (!file_exists($file)) {
            require_once('views/index_view.php');
            return;
        }

        require_once($file);
        return;
    }

    public static function check_session($session_id)
    {
        if (!isset($session_id)) return System::invalid_session();
    }

    public static function invalid_session()
    {
        session_destroy();
        sleep(1);
        System::redirect('index');
    }

    public static function redirect($page)
    {
        header("Location: " . WEB_HOST . $page);
        exit();
    }

    public static function report_errors()
    {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    public static function sendJSONresponse($status, $message, $payload)
    {
        return json_encode(array('status' => $status, 'payload' => $payload, 'message' => $message));
    }
}
