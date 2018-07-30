<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RegisterController
 *
 * @author Rares Andrei
 */
require_once "./ControllerInterface.php";
require_once "model/Login.php";
require_once "lib/password.php";

class RegisterController implements ControllerInterface {

    public $login;

    function __construct() {
        $this->login = new Login();
    }

    public function action() {
        
    }

    public function init() {
        if (isset($_POST['register'])) {
            $username = !empty($_POST['username']) ? trim($_POST['username']) : null;
            $pass = !empty($_POST['password']) ? trim($_POST['password']) : null;
            $email = !empty($_POST['email']) ? trim($_POST['email']) : null;
        
        if ($this->login->getAllUserNames() > 0) {
            echo file_get_contents("./interceptor/BeginError.html") . " Username already exists " . '</div>';
        }

        $passwordHash = password_hash($pass, PASSWORD_BCRYPT, array("cost" => 12));

        $this->login->insertAccount($username, $passwordHash, $email);
        
        
        header("Location: index.php");
        }else {
            require_once 'views/register.php';
        }
    }

    public function setArgs($params) {
        
    }

}
