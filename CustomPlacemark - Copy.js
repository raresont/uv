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
var i = 2;
function saveState() {
    d1 = document.getElementById('inlineFormCustomSelectPref');
    i = d1.options[d1.selectedIndex].value;
}
function getState() {   
    name = d1.options[d1.selectedIndex].innerHTML;
comment = document.getElementById('comment').value;
pic = document.getElementById('imgInp').src;
    var popupBodyItem = $("#popupBody");
    popupBodyItem.children().remove();

    var popupBodyName = $('<p class="site-name"><h4>' + name + '</h4></p>');
    var popupBodyDesc = $('<p class="site-description">' + comment + '</p><br>');
    var popupBodyImg = $('<img class="site-img" src="' + pic + '" /><br>');
   // var popupBodyURL = $('<p class="site-URL">Please click <a href="' + siteurl + '" target="_blank"><span id="href"><b>here</b></span></a> for more detailed information</p>');

    popupBodyItem.append(popupBodyName);
    popupBodyItem.append(popupBodyDesc);
    popupBodyItem.append(popupBodyImg);
  //  popupBodyItem.append(popupBodyURL);

$.ajax({  
    type: 'POST',  
    url: 'index.php?Earth/add',//,$('form').attr("action"),   
      data: $('#fm').serialize(),
    success: function(response) {
        console.log(response);
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
            var wwd = new WorldWind.WorldWindow("canvasOne");

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


            // Create the custom image for the placemark with a 2D canvas.
            var canvas = document.createElement("canvas"),
                    ctx2d = canvas.getContext("2d"),
                    size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

            canvas.width = size;
            canvas.height = size;

            var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
            gradient.addColorStop(0, 'rgb(255, 0, 0)');
            gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
            gradient.addColorStop(1, 'rgb(255, 0, 0)');

            ctx2d.fillStyle = gradient;
            ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
            ctx2d.fill();

            // Set placemark attributes.
            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
            placemarkAttributes.imageRotationReference = WorldWind.RELATIVE_TO_GLOBE
            // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
            placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
            // Define the pivot point for the placemark at the center of its image source.
            placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
            placemarkAttributes.imageScale = 1;
            placemarkAttributes.imageColor = WorldWind.Color.WHITE;

            // Set placemark highlight attributes.
            // Note that the normal attributes are specified as the default highlight attributes so that all properties
            // are identical except the image scale. You could instead vary the color, image, or other property
            // to control the highlight representation.
            var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;

            // Create the placemark with the attributes defined above.
            var placemarkPosition = new WorldWind.Position(47.684444, -121.129722, 1e2);
            var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
            // Draw placemark at altitude defined above, relative to the terrain.
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
            // Assign highlight attributes for the placemark.
            placemark.highlightAttributes = highlightAttributes;

            // Create the renderable layer for placemarks.
            var placemarkLayer = new WorldWind.RenderableLayer("Custom Placemark");

            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);

            // Add the placemarks layer to the WorldWindow's layer list.
            wwd.addLayer(placemarkLayer);

            // Now set up to handle highlighting.
            var highlightController = new WorldWind.HighlightController(wwd);

           // var modelLayer = new WorldWind.RenderableLayer("Duck");
          //  wwd.addLayer(modelLayer);
            /*
             // Define a position for locating the model.
             var position = new WorldWind.Position(45, -100, 1000e3);
             // Create a Collada loader and direct it to the desired directory and .dae file.
             var colladaLoader = new WorldWind.ColladaLoader(position);
             new WorldWind.Placemark(
             new WorldWind.Position(latitude, longitude + i * lonDelta, 1e2), true, null);
             colladaLoader.init({dirPath: './collada_models/duck/'});
             colladaLoader.load('duck.dae', function (scene) {
             scene.scale = 5000;
             modelLayer.addRenderable(scene); // Add the Collada model to the renderable layer within a callback.
             });		*/

            //----

            /*
             var handleClick = function (recognizer) {
             // Obtain the event location.
             var x = recognizer.clientX,
             y = recognizer.clientY;
             var position = pickList.objects[0].position;
             // wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));
             
             var colladaLoader = new WorldWind.Placemark(
             new WorldWind.Position(x, y, 1e2), true, null);
             
             //	var position = new WorldWind.Position(position.latitude, position.longitude1e2);
             //  var colladaLoader = new WorldWind.ColladaLoader(position);
             colladaLoader.init({dirPath: './collada_models/duck/'});
             colladaLoader.load('duck.dae', function (scene) {
             scene.scale = 5000;
             modelLayer.addRenderable(scene); // Add the Collada model to the renderable layer within a callback.
             });	
             
             placemark = new WorldWind.Placemark(
             new WorldWind.Position(latitude, longitude + i * lonDelta, 1e2), true, null);
             placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
             placemarkAttributes.imageSource = pinLibrary + images[i];
             highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
             highlightAttributes.imageScale = 1.2;
             placemark.attributes = placemarkAttributes;
             
             // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
             // relative to the upper left corner of the canvas rather than the upper left corner of the page.
             var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
             
             // If only one thing is picked and it is the terrain, tell the WorldWindow to go to the picked location.
             if (pickList.objects.length === 1 && pickList.objects[0].isTerrain) {
             var position = pickList.objects[0].position;
             wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));
             }
             };
             */

            wwd.deepPicking = true;

            // Now set up to handle picking.
            var highlightedItems = [];

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

            // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
            wwd.addEventListener("mousemove", handlePick);

            // Listen for taps on mobile devices and highlight the placemarks that the user taps.
            var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);

            // Define the images we'll use for the placemarks.
            var images = [
                "plain-black.png",
                "plain-blue.png",
                "plain-brown.png",
                "plain-gray.png",
                "plain-green.png",
                "plain-orange.png",
                "plain-purple.png",
                "plain-red.png",
                "plain-teal.png",
                "plain-white.png",
                "plain-yellow.png",
                "castshadow-black.png",
                "castshadow-blue.png",
                "castshadow-brown.png",
                "castshadow-gray.png",
                "castshadow-green.png",
                "castshadow-orange.png",
                "castshadow-purple.png",
                "castshadow-red.png",
                "castshadow-teal.png",
                "castshadow-white.png"
            ];

            var pinLibrary = "./images/pushpins/", // location of the image files
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

                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.
                var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

                // If only one thing is picked and it is the terrain, tell the WorldWindow to go to the picked location.
                if (pickList.objects.length === 1 && pickList.objects[0].isTerrain) {
                    var position = pickList.objects[0].position;
                    wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));

                    placemark = new WorldWind.Placemark(new WorldWind.Position(position.latitude, position.longitude, 1e2), false, null);
                    placemark.label = "Placemark " + i.toString() + "\n"
                            + "Lat " + latitude.toPrecision(4).toString() + "\n"
                            + "Lon " + longitude.toPrecision(5).toString();
                    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

                    // Create the placemark attributes for this placemark. Note that the attributes differ only by their
                    // image URL.
                    placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
                    placemarkAttributes.imageSource = pinLibrary + images[i];
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
            };



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

                    var popupBodyName = $('<p class="site-name"><h4>' + sitename + '</h4></p>');
                    var popupBodyDesc = $('<p class="site-description">' + sitedesc + '</p><br>');
                    var popupBodyImg = $('<img class="site-img" src="' + picpath + '" /><br>');
                    var popupBodyURL = $('<p class="site-URL">Please click <a href="' + siteurl + '" target="_blank"><span id="href"><b>here</b></span></a> for more detailed information</p>');

                    popupBodyItem.append(popupBodyName);
                    popupBodyItem.append(popupBodyDesc);
                    popupBodyItem.append(popupBodyImg);
                    popupBodyItem.append(popupBodyURL);

                });
            };



        var handleMouseCLK = function (o) {

            var x = o.clientX,
                y = o.clientY;

            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            for (var q = 0; q<pickList.objects.length; q++) {
                var pickedPL = pickList.objects[q].userObject;
                
                        var pickedPL = pickList.objects[q].userObject;
                        if (pickedPL instanceof WorldWind.Placemark) {

                            getState(pickedPL.label);

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


            // Listen for mouse clicks.
            var clickRecognizer = new WorldWind.ClickRecognizer(wwd, handleMouseCLK);
      //  wwd.addEventListener("click", handleMouseCLK);

        // Listen for taps on mobile devices and then pop up a new dialog box.
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleMouseCLK);
            // Listen for taps on mobile devices.
//            var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleClick);


            // Create a layer manager for controlling layer visibility.
            var layerManager = new LayerManager(wwd);
        });