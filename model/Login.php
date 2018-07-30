<?php

/**
 * Description of Login
 *
 * @author Rares Andrei
 */
require './Storage.php';
class Login extends Storage {
    function __construct() {
         parent::__construct();
    }
    
    public function getAllUserNames() {
        $stmt = $this->conn->prepare("SELECT username FROM account ");
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }

        $result_array = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

        return $result_array;
    }
    
    public function insertAccount($username, $pw, $email = "default@test") {

        $stmt = $this->conn->prepare("INSERT INTO account (username, password ,email, type) VALUES (? , ? , ? , 1) ");
        $stmt->bindParam(1, $username);
        $stmt->bindParam(2, $pw);
        $stmt->bindParam(3, $email);
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
    }
    public function getAccount($username) {

        $stmt = $this->conn->prepare("SELECT id,username, password ,type FROM account WHERE username = ? ");
        $stmt->bindParam(1, $username);
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
        $result_array = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result_array;
    }  
}
