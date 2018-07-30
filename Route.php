<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Route
 *
 * @author raresont
 */
require_once('RouteInterface.php');

class Route implements RouteInterface {

    private $args;
    public $controller;
    public $action;

    public function __construct($controller, $action, $args) {
        $this->args = $args;
        $this->controller = $controller;
        $this->action = $action;
        
    }

    public function getController(){
        return $this->controller;
    }
    
    public function getAction(){
        return $this->action;
    }

    public function getArgs() {
        return $this->args;
    }

    public function setArgs($params) {
        $this->args = $params;
    }    
}
