<?php

/**
 * Description of Earth
 *
 * @author Rares Andrei
 */
require_once 'Storage.php';

class Earth extends Storage {
    function __construct($name = " ", $price = 0 , $ingredients = null) {
        parent::__construct();
    }
    
    private function generateNewId() {
        $id = uniqid();
        $stmt = $this->conn->prepare("SELECT Id FROM investition WHERE Id = ?");
        $stmt->bindParam(1, $id);
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
        $result_array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($result_array) == 0) {
            return $id;
        }

        return $this->generateNewId();
    }
    
    public function insertInvestition($type, $subject, $latitude , $longitude, $comment, $image = null ,$status = null , $id = null ) {
    //    if($id == null){
    //        $id = $this->generateNewId();
     //   }
         if($status == null){
            $status = 'pending';
        }       
        $stmt = $this->conn->prepare("INSERT INTO investition (type, Name, latitude , longitude, description , image ,status) VALUES (? , ?, ? , ? , ? , ?, ?) ");
        $stmt->bindParam(1, $type);
        $stmt->bindParam(2, $subject);
        $stmt->bindParam(3, $latitude);
        $stmt->bindParam(4, $longitude);
        $stmt->bindParam(5, $comment);
        $stmt->bindParam(6, $image);
        $stmt->bindParam(7, $status);
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }

    }   
    
    public function getEverything() {
        $stmt = $this->conn->prepare("SELECT  * FROM investition");
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
        $f = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $f;
    }    
    
    public function getInvestitionById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM investition WHERE Id = ?");
        $stmt->bindParam(1, $id);
        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }

        $f = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $f;
    }  
    
    public function acceptById($id) {
        $acceptStatus = "accepted";
        $stmt = $this->conn->prepare("UPDATE investition SET status = ? where Id = ?");
        $stmt->bindParam(1, $acceptStatus);
        $stmt->bindParam(2, $id);

        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
    }
    
    public function closeById($id) {
        $acceptStatus = "closed";
        $stmt = $this->conn->prepare("UPDATE investition SET status = ? where Id = ?");
        $stmt->bindParam(1, $acceptStatus);
        $stmt->bindParam(2, $id);

        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
    }    
}
