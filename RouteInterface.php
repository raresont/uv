<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author raresont
 */
interface RouteInterface {
    
    public function getController();
    public function getAction();
    public function getArgs() ;
    public function setArgs($params) ;   
}
