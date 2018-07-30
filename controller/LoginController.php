<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LoginController
 *
 * @author Rares Andrei
 */
require './lib/password.php';
require './model/Login.php';
session_start();

class LoginController {

    public $login;

    function __construct() {
        $this->login = new Login();
    }

    public function action() {
        
    }

    public function init() {
        if (isset($_POST['login'])) {
            $username = !empty($_POST['username']) ? trim($_POST['username']) : null;
            $pass = !empty($_POST['password']) ? trim($_POST['password']) : null;

            $acc = $this->login->getAccount($username);
            if ($acc == false) {
                echo file_get_contents("./interceptor/BeginError.html") . " Username or password is wrong " . '</div>';
            } else {
                $validPassword = password_verify($pass, $acc[0]['password']);

                if ($validPassword) {

                    $_SESSION['id'] = $acc[0]['id'];
                     $_SESSION['name'] = $acc[0]['username'];
                    $_SESSION['logged_in'] = time();
                    $_SESSION['type'] =  $acc[0]['type'];

                    header("Location: index.php");
                    //   exit;
                }
            }

            //  header("Location: index.php");
        }
    }

    public function setArgs($params) {
        
    }

}
