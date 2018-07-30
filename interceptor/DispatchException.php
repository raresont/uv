<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RouteException
 *
 * @author raresont
 */

class DispatchException extends Exception{
    public $message ;
    public $code ;
    
    function __construct($message, $code) {
        $this->message = $message;
        $this->code = $code;
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}
