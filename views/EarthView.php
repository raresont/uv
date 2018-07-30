<?php
/*
 * Ont Rares ,2018
 */
header('Access-Control-Allow-Origin: *');
//session_start();
if (!$_SESSION) {
    echo file_get_contents("./interceptor/Succes.html") . "You are logged as a quest" . '</div>';
    $_SESSION['id'] = rand(100, 1000);
} else {
    if (isset($_SESSTION['name'])) {
        echo file_get_contents("./interceptor/Succes.html") . "Hi " . $_SESSTION['name'] . " , you are logged in" . '</div>';
    }
}

include('./header/header.html');
?>
<script data-main="CustomPlacemark" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.min.js"></script>
<div class="container">
  <!--  <div class="jumbotron hidden-xs">
        <h1 style="text-align:center">WorldWind Custom Placemark</h1>
    </div> -->
    <nav class="navbar navbar-inverse sidebar" role="navigation">
        <div class="container-fluid">

            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><h4>Projection</h4>
                        <div class="dropdown" id="projectionDropdown">
                        </div>
                    </li>
                    <li ><h4>Layers</h4>
                        <div class="list-group" id="layerList">
                        </div></li>
                    <li><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add a suggestion</button></li>
                    <li><button type="button"  class="btn btn-info btn-lg"  onClick="sendData();" >Send the proposal</button></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog" >
        <div class="modal-dialog modal-lg" >
            <div class="modal-content" style="z-index:8001;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <form id="fm" class="form" method="POST" action="./index.php?Earth/add">
                        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Type</label>
                        <select class="form-control" id="inlineFormCustomSelectPref" name='type'>
                            <option value="1">Critical </option>
                            <option value="2">Medical </option>
                            <option value="3">Building </option>
                            <option value="4">Playground </option>
                            <option value="5">Forest </option>
                            <option value="6">Critical forest </option>
                            <option value="7">Road </option>
                            <option value="8">Ornamental </option>
                            <option value="9">Bio </option>
                        </select>
                        <div class="form-group">
                            <label for="title">Title:</label>
                            <input type='text' class="form-control" id="title" name='title'></input>
                        </div>
                        <div class="form-group">
                            <label for="comment">Description:</label>
                            <textarea class="form-control" rows="5" id="comment" name='comment'></textarea>
                        </div>
                        <div class="form-group">
                            <label for="imgInp"> Link an image/draw or any scheme that you think that will help</label>
                            <input type='text' class="form-control" id="imgInpText" name='imgIntText'></input>
                         <!--   <input type='file' id="imgInp" /> -->
                            <img id="blah" src="" width="100%" />
                        </div>
                        <h1>After you click the save button please place the suggestion on the map</h1>
                        <button type="button" class="saveBtn" onclick="saveState()" name="addSuggestion" class="btn btn-primary my-1">Save </button>
                        <br><br><br></form>
                </div>
<!--
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>-->
            </div>
        </div>
    </div>
    <!-- </div> -->



    <div class="main">


        <div class="col-sm-9" id="globe">
            <canvas id="canvasOne" width="1000" height="1000"
                    style="width: 100%; height: auto; background-color: black;">
                Your browser does not support HTML5 Canvas.
            </canvas>

            <div class="popup-group" id="popupBox">
                <div class="popupBoxWrapper">
                    <div class="popupBoxContent">
                        <!-- Popup Box Header-->
                        <div class="popup-Header">
                            <span class="close" id="closeIt">&times;</span>
                        </div>
                        <!-- Popup Box Body-->
                        <div class="popup-Body" id="popupBody">
                        </div>
                        <!-- Popup Box Footer-->
                        <div class="popup-Footer">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<link rel="stylesheet" href="./assets/css/style.scss">
<script>
    function htmlbodyHeightUpdate() {
        var height3 = $(window).height()
        var height1 = $('.nav').height() + 50
        height2 = $('.main').height()
        if (height2 > height3) {
            $('html').height(Math.max(height1, height3, height2) + 10);
            $('body').height(Math.max(height1, height3, height2) + 10);
        } else
        {
            $('html').height(Math.max(height1, height3, height2));
            $('body').height(Math.max(height1, height3, height2));
        }

    }
    $(document).ready(function () {
        htmlbodyHeightUpdate()
        $(window).resize(function () {
            htmlbodyHeightUpdate()
        });
        $(window).scroll(function () {
            height2 = $('.main').height()
            htmlbodyHeightUpdate()
        });
    });


    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });
</script>