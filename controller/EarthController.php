<?php

/**
 * Description of EarthController
 *
 * @author Rares Andrei
 */
///session_start();
require_once 'model/Earth.php';
require_once 'controller/ControllerOperation.php';
ini_set('memory_limit', '-1'); // enabled the full memory available.

class EarthController extends ControllerOperation {

    public $earth;

    function __construct() {
        $this->earth = new Earth();
    }

    public function action() {
        
    }

    public function accept() {
        if ($_SESSION['type'] > 5) {
            $table = $this->earth->getEverything();
            parent::includeWithVariables('./views/PriorityView.php', array('table' => $table));
        } else {
            $_SESSION['type'] = 'Error';
            $_SESSION['message'] = "You are not an admin ,try to login with user:admin , pw : admin ";
            header("Location : index.php");
            
        }
    }

    public function change() {
        if (isset($_POST['accept'])) {
            $id = isset($_POST['id']) && is_numeric($_POST['id']) ? $_POST['id'] : null;
            //$table = $this->earth->getInvestitionById($id);
            $this->earth->acceptById($id);  
            header("Location : index.php");
        }elseif (isset($_POST['close'])) {
            $id = isset($_POST['id']) && is_numeric($_POST['id']) ? $_POST['id'] : null;
            //$table = $this->earth->getInvestitionById($id);
            $this->earth->closeById($id);  
        } else {
            header("Location: index.php");
        }
    }    
    
    public function get() {

        echo json_encode($this->earth->getEverything(), JSON_FORCE_OBJECT);
    }

    public function add() {
        $comment = isset($_POST['comment']) && is_string($_POST['comment']) ? $_POST['comment'] : null;
        $title = isset($_POST['title']) && is_string($_POST['title']) ? $_POST['title'] : null;
        $imgIntText = isset($_POST['imgIntText']) && is_string($_POST['imgIntText']) ? $_POST['imgIntText'] : null;
        $type = isset($_POST['type']) && is_string($_POST['type']) ? $_POST['type'] : null;

        $latitude = isset($_POST['latitude']) && is_numeric($_POST['latitude']) ? $_POST['latitude'] : null;
        $longitude = isset($_POST['longitude']) && is_numeric($_POST['longitude']) ? $_POST['longitude'] : null;
        //     print_r($_POST);
        $this->earth->insertInvestition($type, $title, $latitude, $longitude, $comment, $imgIntText);
    }

    public function init() {
        //  echo $_SESSION['id'];
        include("./views/EarthView.php");
    }

    public function setArgs($params) {
        
    }

}
