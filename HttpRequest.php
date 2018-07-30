<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HttpRequest
 *
 * @author raresont
 */
require_once("RequestInterface.php");

class HttpRequest implements RequestInterface {
    function __construct() {
        
    }
    
    public function getRequestPath(){
        
      return $_SERVER['REQUEST_URI'];
    }
}
