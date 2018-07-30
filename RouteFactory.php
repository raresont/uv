<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RouteFactory
 *
 * @author raresont
 */
require_once 'HomeRoute.php';

class RouteFactory {
    const FOLDER_DEEP = 2; //incepe cu /Route/ <---2 "/"
    
    public $params;
    
    
    function __construct($request) {
        $this->params = explode("/", $request);
    }

    public function makeRoute(){
        $nrOfParams = count($this->params) ;
        
        //Controller area//
        if($nrOfParams > RouteFactory::FOLDER_DEEP){
            //selectem ce este dupa '?'
            $controller =  substr($this->params[RouteFactory::FOLDER_DEEP + 0] , strpos($this->params[RouteFactory::FOLDER_DEEP + 0],"?") + 1);
           // echo 'the controller name is ' .  $controller ."<br>";
            
            $controllerPath = "./controller";
        
            $classPath = realpath($controllerPath . DIRECTORY_SEPARATOR . $controller . "Controller.php");
          //  echo $classPath . "<br>";
            try{
                if (!file_exists($classPath)) {
                     $controller = "Earth";
                }
            }catch(Exception $e){
                echo file_get_contents("./interceptor/BeginError.html") . $e->__toString() . '</div>';
            }
            
        }
        else {
            $controller = "Earth";
            $classPath = realpath($controllerPath . DIRECTORY_SEPARATOR . $controller . "Controller.php");
        }
        
        //Action area//
        if($nrOfParams > RouteFactory::FOLDER_DEEP + 1){
            $actionInit = $this->params[RouteFactory::FOLDER_DEEP + 1];
            require_once $classPath;
            if(method_exists($controller . "Controller", $actionInit)){
           //     echo 'the Action name is ' .  $actionInit . "<br>";
                $action = $actionInit;
            }else{
                try{
                    $action = "init";
                    echo 'the Action name is ' .  $action . "<br>";
                    throw new DispatchException("Action set to Init.", 404);
                }catch(Exception $e){
                    echo file_get_contents("./interceptor/BeginError.html") . $e->__toString() . '</div>';
                }
            }
        }
        else {
            //require_once $classPath;
            $action = "init";
      //      echo 'the Action name is ' .  $action . "<br>";
        }
        
        //Argument area//
        $arguments = array();
        for($i = RouteFactory::FOLDER_DEEP + 2; $i < count($this->params); $i++){
            array_push($arguments, $this->params[$i]);
        }
      /*  
        if(count($arguments) == 0){
            echo "no arguments were found <br>";
        }
        */
        //in caz ca exista actiune pt home si nu se face redirect
        if($controller == "Home"){
            return new HomeRoute($action , $arguments);
        }
    
        return new Route($controller, $action , $arguments);
        
    }

}
