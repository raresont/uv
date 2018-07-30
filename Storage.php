<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Storage
 *
 * @author raresont
 */
class Storage {

    const SERVERNAME = "localhost";
    const USERNAME = "root";
    const PASSWORD = "";

    public $conn;

    function __construct() {
        try {
            $this->conn = new PDO("mysql:host=localhost;dataBase=investition;dbname=investition", Storage::USERNAME, Storage::PASSWORD);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

}
