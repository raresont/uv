<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dispatcher
 *
 * @author raresont
 */
require_once 'interceptor/DispatchException.php';
require_once 'RouteInterface.php';

class Dispatcher {
    public $route;
    
    public function dispatch(RouteInterface &$route) {
        $this->route = $route;
        $controller = $this->getController();
        $action = $route->getAction();// . "Action";;
        $params = $this->route->getArgs();
        
        $controllerPath = "./controller";
        
        $classPath = realpath($controllerPath . DIRECTORY_SEPARATOR . $controller . ".php");
        try{
                require_once $classPath;
                $controllerInit = new $controller();
                $controllerInit->setArgs($params);
                try{
                    if (method_exists($controllerInit, $action)) {
                        $data = $controllerInit->{$action}();

                        return $data;
                    } else {
                        throw new DispatchException("{$route->getController()} - {$route->getAction()} failed.", 404);
                    }
                }catch(Exception $e){
                    echo file_get_contents("./interceptor/BeginError.html") . $action . " Action not found" . '</div>';
                }
        }catch(Exception $e){
            echo file_get_contents("./interceptor/BeginError.html") . $controller ." not found" . '</div>';
        }    
    }        
    
    public function getController(){
        $controller = $this->route->getController() . "Controller";
        
        return $controller;
    }
}
