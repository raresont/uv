<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HomeRoute
 *
 * @author raresont
 */
require_once('RouteInterface.php');
session_start();
class HomeRoute implements RouteInterface {
    public $controller = "Earth";
    public $args;
    public $action;
    
    function __construct( $action, $args) {
        $this->args = $args;
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
