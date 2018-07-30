<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Router
 *
 * @author raresont
 */
require_once('RequestInterface.php');
require_once('Route.php');
require_once('RouteFactory.php');
require_once('RouteInterface.php');

class Router {
    const FOLDER_DEEP = 2; //incepe cu /Route/ <---2 "/"
    
    public $request;

    public function setRequest(RequestInterface $request){
        $this->request = $request->getRequestPath();
    }
    
    public function getRoute(){

        $route = (new RouteFactory($this->request))->makeRoute();
        if($route == null){
            throw new DispatchException("Route failed.", 404);
        }

        return $route;
    }
    
}
