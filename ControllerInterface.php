<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControllerInterface
 *
 * @author raresont
 */
interface ControllerInterface {
    public function setArgs($params);
    public function init();
    public function action();
    
}
