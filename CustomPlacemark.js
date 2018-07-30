/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to create a placemark with a dynamically created image.
 */
var i = 1;
d1 = document.getElementById('inlineFormCustomSelectPref');
name = d1.options[d1.selectedIndex].innerHTML;
comment = document.getElementById('comment').value;
pic = document.getElementById('imgInpText').value;
title = document.getElementById('title').value;
var wwd;var lastLatitude ; var lastLongitude;
var pinLibrary;var placemark;var placemarkAttributes;  var placemarkLayer;var highlightAttributes;var latitude;var longitude;
function saveState() {
    d1 = document.getElementById('inlineFormCustomSelectPref');
    title = document.getElementById('title').value;
    name = d1.options[d1.selectedIndex].innerHTML;
    comment = document.getElementById('comment').value;
    pic = document.getElementById('imgInpText').value;

    i = d1.options[d1.selectedIndex].value;
}
var finalData;
function sendData(){
       $.ajax({
        type: 'POST',
        url: 'index.php?Earth/add',
        data: $('#fm').serialize() + "&latitude=" + lastLatitude + "&longitude=" + lastLongitude,
        success: function (response) {
            console.log(response);
        }
    }); 
}
function getState(o, p) {
var pieces = o.split(/[\s,]+/);
pieces = parseInt(pieces[pieces.length-1]);
//console.log(pieces);
console.log(finalData);
    $.each(finalData, function (q, item) {    
        if(parseInt(finalData[q].Id) == pieces){
            var popupBodyItem = $("#popupBody");
            popupBodyItem.children().remove();
            console.log(finalData[pieces]);
            var popupBodyName = $('<p class="site-name"><h4>' + finalData[q].Name + '</h4></p>');
            var popupBodyDesc = $('<p class="site-description">' + finalData[q].description + '</p><br>');
            var popupBodyImg = $('<img class="site-img" src="' + finalData[q].image + '" width="100%"/><br>');

            popupBodyItem.append(popupBodyName);
            popupBodyItem.append(popupBodyDesc);
            popupBodyItem.append(popupBodyImg);
            
                var popupBodyItem = $("#popupBoxWrapper");
    if(finalData[q].status =="accepted"){
        popupBodyItem.className+='status1';
    }else if(finalData[q].status =="closed"){
         popupBodyItem.className+='status2';
    }else
    {
         popupBodyItem.className+='status3';
    }
   // return;
    }
    });
}


requirejs(['./WorldWindShim',
    './LayerManager'],
        function (WorldWind,
                LayerManager) {
            "use strict";

            // Tell WorldWind to log only warnings and errors.
            WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

            // Create the WorldWindow.
            wwd = new WorldWind.WorldWindow("canvasOne");

            // Create and add layers to the WorldWindow.
            var layers = [
                // Imagery layers.
                {layer: new WorldWind.BMNGLayer(), enabled: true},
                {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
                {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
                // Add atmosphere layer on top of all base layers.
                {layer: new WorldWind.AtmosphereLayer(), enabled: false},
                // WorldWindow UI layers.
                {layer: new WorldWind.CompassLayer(), enabled: true},
                {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
                {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
            ];

            for (var l = 0; l < layers.length; l++) {
                layers[l].layer.enabled = layers[l].enabled;
                wwd.addLayer(layers[l].layer);
            }

            wwd.deepPicking = true;

            // Now set up to handle picking.
            var highlightedItems = [];
/*
            // The common pick-handling function.
            var handlePick = function (o) {
                // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
                // the mouse or tap location.
                var x = o.clientX,
                        y = o.clientY;

                var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

                // De-highlight any previously highlighted placemarks.
                for (var h = 0; h < highlightedItems.length; h++) {
                    highlightedItems[h].highlighted = false;
                }
                highlightedItems = [];

                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.
                var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
                if (pickList.objects.length > 0) {
                    redrawRequired = true;
                }

                // Highlight the items picked by simply setting their highlight flag to true.
                if (pickList.objects.length > 0) {
                    var numShapesPicked = 0;
                    for (var p = 0; p < pickList.objects.length; p++) {

                        pickList.objects[p].userObject.highlighted = true;

                        // Keep track of highlighted items in order to de-highlight them later.
                        highlightedItems.push(pickList.objects[p].userObject);

                        // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                        // If instead the user picked the placemark's image, the "labelPicked" property is false.
                        // Applications might use this information to determine whether the user wants to edit the label
                        // or is merely picking the placemark as a whole.
                        if (pickList.objects[p].labelPicked) {
                            console.log(pickList.objects[p].userObject.label);
                            console.log("Label picked");
                        }

                        // Increment the number of items picked if a shape is picked.
                        if (!pickList.objects[p].isTerrain) {


                        }
                    }

                    if (numShapesPicked > 0) {
                        console.log(numShapesPicked + " shapes picked");
                    }
                }

                // Update the window if we changed anything.
                if (redrawRequired) {
                    wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
                }

                //reset
                //     pickList = [];

            };
*/
            // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
            // wwd.addEventListener("mousemove", handlePick);

            // Listen for taps on mobile devices and highlight the placemarks that the user taps.
            // var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);

            pinLibrary = "./images/buildings/", // location of the image files
                    placemark,
                    placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
                    highlightAttributes,
                    placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
                    latitude = 47.684444,
                    longitude = -121.129722;

            // Set up the common placemark attributes.
            placemarkAttributes.imageScale = 1;
            placemarkAttributes.imageOffset = new WorldWind.Offset(
                    WorldWind.OFFSET_FRACTION, 0.3,
                    WorldWind.OFFSET_FRACTION, 0.0);
            placemarkAttributes.imageColor = WorldWind.Color.WHITE;
            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                    WorldWind.OFFSET_FRACTION, 0.5,
                    WorldWind.OFFSET_FRACTION, 1.0);
            placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
            placemarkAttributes.drawLeaderLine = true;
            placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

            // Add the placemarks layer to the WorldWindow's layer list.
            wwd.addLayer(placemarkLayer);
            //
            var handleClick = function (recognizer) {
                // Obtain the event location.
                var x = recognizer.clientX,
                        y = recognizer.clientY;

lastLatitude  =x ;
lastLongitude = y;
                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.
                var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

                // If only one thing is picked and it is the terrain, tell the WorldWindow to go to the picked location.
                if (pickList.objects.length === 1 && pickList.objects[0].isTerrain) {
                    var position = pickList.objects[0].position;
                    wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));

                    placemark = new WorldWind.Placemark(new WorldWind.Position(position.latitude, position.longitude, 1e2), false, null);
                    placemark.label = title + "\n" //+ i.toString() + "\n"
                            + "Lat " + latitude.toPrecision(4).toString() + "\n"
                            + "Lon " + longitude.toPrecision(5).toString() +"\n" + new Date().getUTCMilliseconds();;
                    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

                    // Create the placemark attributes for this placemark. Note that the attributes differ only by their
                    // image URL.
                    placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    placemarkAttributes.imageSource = pinLibrary + i + ".png";//+ images[i];
                    placemark.attributes = placemarkAttributes;

                    // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
                    // the default highlight attributes so that all properties are identical except the image scale. You could
                    // instead vary the color, image, or other property to control the highlight representation.
                    highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    highlightAttributes.imageScale = 1.2;
                    placemark.highlightAttributes = highlightAttributes;

                    // Add the placemark to the layer.
                    placemarkLayer.addRenderable(placemark);

                }
                for (var q1 = 0; q1 < pickList.objects.length; q1++) {
                    //     var pickedPL = pickList.objects[q].userObject;

                    var pickedPL = pickList.objects[q1].userObject;
                    if (pickedPL instanceof WorldWind.Placemark ) {

                        getState(pickedPL.label, pickList.objects[q1].position);
                       // console.log(pickedPL);
                        $(document).ready(function () {
                            // Make a popup Box after insert popup list items.

                            var modal = document.getElementById('popupBox');// Get the modal
                            var span = document.getElementById('closeIt');// Get the <span> element that closes the modal

                            // When the user double clicks the placemark, open the modal
                            modal.style.display = "block";

                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function () {
                                modal.style.display = "none";
                            };

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                        })
                    }
                }
                pickList = [];

            };

/*

            var sitePopUp = function (sitelabel) {
                // Locate JSON file
                var tokens = sitelabel.split(",");
                //var continentCode = tokens[0];
                //var countryCode = tokens[1];
                var siteid = tokens[2];
                var popupjsonpath = '//aworldbridgelabs.com:9083/popup';
                var sitename, picpath, sitedesc, siteurl;

                $.getJSON(popupjsonpath, function (res) {
                    //Get site information.
                    for (var n = 0; n < res.length; n++) {
                        if (res[n].SiteID === siteid) {
                            sitename = res[n].SiteName;
                            picpath = res[n].PicPath;
                            sitedesc = res[n].SiteDescription;
                            siteurl = res[n].SiteURL;
                            break;
                        }
                    }

                    //Insert site information into indexTest.html.
                    var popupBodyItem = $("#popupBody");
                    popupBodyItem.children().remove();


                    var popupHeaderItem = $("#popupHeader");
                    popupHeaderItem.children().remove();

                    var popupBodyName = $('<p class="site-name"><h4>' + sitename + '</h4></p>');
                    var popupBodyDesc = $('<p class="site-description">' + sitedesc + '</p><br>');
                    var popupBodyImg = $('<img class="site-img" src="' + picpath + '" /><br>');
                    var popupBodyURL = $('<p class="site-URL">Please click <a href="' + siteurl + '" target="_blank"><span id="href"><b>here</b></span></a> for more detailed information</p>');
                    popupBodyItem.append(title + "<br>");
                    popupBodyItem.append(popupBodyName);
                    popupBodyItem.append(popupBodyDesc);
                    popupBodyItem.append(popupBodyImg);
                    popupBodyItem.append(popupBodyURL);

                });
            };


*/

            var handleMouseMove = function (o) {
                // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
                // the mouse or tap location.
                var x = o.clientX,
                        y = o.clientY;

                var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

                // De-highlight any previously highlighted placemarks.
                for (var h = 0; h < highlightedItems.length; h++) {
                    highlightedItems[h].highlighted = false;
                }
                highlightedItems = [];

                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.

                var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

                // Highlight the items picked by simply setting their highlight flag to true.
                if (pickList.objects.length > 0) {
                    for (var p = 0; p < pickList.objects.length; p++) {
                        pickList.objects[p].userObject.highlighted = true;

                        // Keep track of highlighted items in order to de-highlight them later.
                        highlightedItems.push(pickList.objects[p].userObject);

                        // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                        // If instead the user picked the placemark's image, the "labelPicked" property is false.
                        // Applications might use this information to determine whether the user wants to edit the label
                        // or is merely picking the placemark as a whole.
                        if (pickList.objects[p].labelPicked) {
                            console.log("Label picked");
                        }
                    }
                }

                // Update the window if we changed anything.
                if (pickList.objects.length > 0) {
                    redrawRequired = true;
                }

                if (redrawRequired) {
                    wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
                }
            };
            // Listen for mouse clicks.
            var clickRecognizer = new WorldWind.ClickRecognizer(wwd, handleClick);
            //  wwd.addEventListener("click", handleMouseCLK);

            // Listen for taps on mobile devices and then pop up a new dialog box.
            var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleClick);
            // Listen for taps on mobile devices.
//            var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleClick);

            wwd.addEventListener("mousemove", handleMouseMove);

            // Listen for taps on mobile devices and highlight the placemarks that the user taps.
            var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleMouseMove);
            // Create a layer manager for controlling layer visibility.
            var layerManager = new LayerManager(wwd);
        

$(document).ready(function () {
    
    
    $.ajax({
        type: "POST",
        url: "index.php?Earth/get",
        dataType: "json",
        data: "",
        success: function (data) {
            var duce = jQuery.parseJSON(JSON.stringify(data));
          //  console.log(duce);
            finalData= duce;
    //        var art1 = duce.title;
        //    console.log(duce[0].Name);
            
       //     var length = duce.length;
       //     console.log(data);
          //  console.log(duce.length);
  //  var dataNum = 0;
//    for (q in data) {if (data.hasOwnProperty(q)) {dataNum++;}}    
//    var counter = 1;
    $.each(data, function (q, item) {            
                var x = parseFloat(duce[q].latitude),
                        y = parseFloat(duce[q].longitude);

                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.
             //   var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

                // If only one thing is picked and it is the terrain, tell the WorldWindow to go to the picked location.
             //   if (pickList.objects.length === 1 && pickList.objects[0].isTerrain) {
                //    var position = pickList.objects[0].position;
                    wwd.goTo(new WorldWind.Location(x, y));

                    placemark = new WorldWind.Placemark(new WorldWind.Position(x, y, 1e2), false, null);
                    placemark.label = duce[q].Name + "\n" //+ i.toString() + "\n"
                            + "Lat " + x + "\n"
                            + "Lon " + y + "\n " + duce[q].Id;
                    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
                    placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    placemarkAttributes.imageSource = pinLibrary + duce[q].type + ".png";//+ images[i];
                    placemark.attributes = placemarkAttributes;
                    highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    highlightAttributes.imageScale = 1.2;
                    placemark.highlightAttributes = highlightAttributes;

                    // Add the placemark to the layer.
                    placemarkLayer.addRenderable(placemark);

            //    }
              //  for (var w = 0; w < pickList.objects.length; w++) {
             //       var pickedPL = pickList.objects[w].userObject;
              //      if (pickedPL instanceof WorldWind.Placemark) {

                    //    getState(placemark.label, pickList.objects[w].position);
                    /*
    var popupBodyItem = $("#popupBody");
    popupBodyItem.children().remove();

    var popupBodyName = $('<p class="site-name"><h4>' + duce[q].Name + '</h4></p>');
    var popupBodyDesc = $('<p class="site-description">' + duce[q].description + '</p><br>');
    var popupBodyImg = $('<img class="site-img" src="' + duce[q].image + '" width="100%"/><br>');

    popupBodyItem.append(popupBodyName);
    popupBodyItem.append(popupBodyDesc);
    popupBodyItem.append(popupBodyImg);
    var popupBodyItem = $("#popupBoxWrapper");
    if(duce[q].status=="accepted"){
        popupBodyItem.className+='status1';
    }else if(duce[q].status=="denied"){
         popupBodyItem.className+='status2';
    }else
    {
         popupBodyItem.className+='status3';
    }
    */
   /*
                        $(document).ready(function () {
                            // Make a popup Box after insert popup list items.

                            var modal = document.getElementById('popupBox');// Get the modal
                            var span = document.getElementById('closeIt');// Get the <span> element that closes the modal

                            // When the user double clicks the placemark, open the modal
                            modal.style.display = "block";

                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function () {
                                modal.style.display = "none";
                            };

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                        })
               //     }
             //   } */
              //  pickList = [];
            }    ) 
           
        }
    });
    
});



});