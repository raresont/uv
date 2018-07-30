<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControllerOperation
 *
 * @author raresont
 */
class ControllerOperation {
    public function includeWithVariables($filePath, $variables = array(), $print = true)
    {
       $output = NULL;
       if(file_exists($filePath)){
           // Extract the variables to a local namespace
           extract($variables);

           // Start output buffering
           ob_start();

           // Include the template file
           include $filePath;

           // End buffering and return its contents
           $output = ob_get_clean();
       }
       if ($print) {
           print $output;
       }
  //     return $output;

   }  
}
