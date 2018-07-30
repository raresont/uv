
<?php

/*echo resize(100, "test.png" ,"plain-teal.png" );
if(!isset($_SESSION['user_id']) || !isset($_SESSION['logged_in'])){
    //User not logged in. Redirect them back to the login.php page.
    header('Location: login.php');
    exit;
}
 * */
 
require 'HttpRequest.php';
require 'Router.php';
require 'Dispatcher.php';

$rq = new HttpRequest();

$router = new Router();
$router->setRequest($rq);
try{
    $route = $router->getRoute();
}catch(Exception $e){
    echo file_get_contents("./interceptor/BeginError.html") . $e->xdebug_message . '</div>';
}
$disp = new Dispatcher();
$disp ->dispatch($route);

?>
