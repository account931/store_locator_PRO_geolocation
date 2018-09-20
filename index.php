<!DOCTYPE html>
  <html>
    <head>
      <title>Pin Locator</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  
	   
      <meta http-equiv="Content-Type" content="text/html">
      <meta name="description" content="Pin Locator" />
      <meta name="keywords" content="Pin Locator, save your locations, save POIs">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script src="js/storeLocator_core.js"></script><!--  Core Sore locator JS-->  
	  <script src="js/addMarkerFromModal.js"></script><!--  add a marker, runs interaction with modal windows--> 
	  <script src="js/directionApi.js"></script><!--  Api part that draws route on map-->
	  
	  <script src="js/geolocation_files/geolocationLocator.js"></script> <!-- injected geolocation Locator JS file -->
	  
      <link rel="stylesheet" type="text/css" media="all" href="css/myStoreLocator.css">
	  <link rel="stylesheet" type="text/css" media="all" href="css/geolocatiionLocator/geolocationLocator.css"> <!-- geolocation Locator CSS file -->
	  
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- Fa-fa Icon lib-->
	  
	    <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

  </head>
  <body>
  <center>
     <div id="">
   
       <h2 class="myShadow"> 
	     <img style="height:29px;" src="images/store-locator.png"/>
	     Custom Pin locator
	     <img style="height:29px;" src="images/store-locator.png"/><br>
	  </h2>
    </div>
    <br>
 
  
    <div class="wrapper grey">
      <div class="container">
 
    <!-- Controls: show/hide markers, from/to dropdowns--> 
    <div id="controls" class="row no-gutter"> <!-- CLASS no-gutter that fixes spaces between cols-->
	
	    <!--Hide or Show markers-->
	    <div class="col-md-2 col-xs-6  style="">
            <input id="btn_Control" type="button" name="Button2" value="Hide markers" class="btn" />
	    </div>
	    
		<!--Instruct-->
		<div class="col-md-1 col-xs-6  style="">
            <input id="btn_instruct" type="button" name="Button2" value="Instruct" class="btn" data-toggle='modal' data-target='#myModalInstructions' />
	    </div>
		 
		<!-- <select><option>-->
		<div class="col-md-3 col-xs-6 ">
            <span id="destination" ></span>
		</div>
		
		<!-- <select><option>-->
		<div class="col-md-3 col-xs-6 dest2">	
            <span id="destination2" ></span>
		</div>
		
		<div class="col-md-2 col-xs-6">
            <input id="btn_CalcRoute" type="button" name="Button" value="Calc the route" class="btn" >
		</div>
		
		<div class="col-md-1 col-xs-6">
		    <input id="btn_CalcRoute_Clear" type="button" name="Button" value="Clear" class="btn" >
		</div>
		
    </div>
	<br>


    <!--Div holds Matrix distance info-->
    <div id="distanceInfo"></div>


    <!-- this div will hold your map -->
    <div id="map" class="myShadow"></div>


   <!-- this div will hold your store info -->
   <div id="info_div" class="myShadow"></div>


   <!--CONFIRM DELETE?? my pop up -->
   <div id="myTil"></div>
   
   <!-- Radar ICON button, right bottom, fixed position -->
   <div style="width:120px; position:fixed; right:0px; bottom:0px;cursor:pointer;">
       <img src="images/radar.png" id="radar" alt="radar" title="start GPS" style="width:70%;display:none;"/>
   </div>

  </center>

  </div> <!--END class="wrapper grey">-->
  </div> <!--END class="container">-->
  
  
  
  
  
      <!-----------------  Button top right,"iPhone arrow" that makes radar appear, absolute position ------------------------------------>
	   <!-- data-toggle="modal" data-target="#myModalZ" is a Bootstrap trigger ---->
	   <button id="showRadar" data-toggle="modal" data-target="" class="btn" title="click to get your position">
	       &nbsp;<i class="fa fa-location-arrow"></i>&nbsp;
	   </button>    
	   <!-----------------  Button that makes radar appear ------------------------------------>
	   
	   
	   
	   
	   <!-------------------Black screen with runnung info about geolocation process, absolute position ----------->
	   <div id="infoBox"><span class="close-spann">x</span></div><!-- display the status of running, shows info-->
  
  
  
  
  <!-- START Bootstrap Modal with fields to add a new marker(hidden by default) -->
  <!--we add {data-toggle='modal' data-target='#myModal'} to button (in JS) which triggers  to open modal with Bootstrap, no additional JS is needed-->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add a new marker</h4>
      </div>
      <div class="modal-body">
        <p>Provide info for marker <span id="newMarkerCoords"></span></p>
		
		<label for="usr">Marker Name:</label>
        <input type="text" class="form-control" id="formMarkerName" required>
		<label for="usr">Marker Info:</label>
        <input type="text" class="form-control" id="formMarkerInfo">
		<label for="usr">Marker Description:</label>
        <input type="text" class="form-control" id="formMarkerDescription">
		
  
      </div>
      <div class="modal-footer">
	    <button type="button" class="btn btn-default" data-dismiss="modal" id="agreedAddToSQL">Add</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
 <!-- END Modal with fields to add a new marker -->
 
 
 
 
 
 
 
    <!-- START Bootstrap Modal with Instructions(hidden by default) -->
  <!--we add {data-toggle='modal' data-target='#myModal'} to button (in JS) which triggers  to open modal with Bootstrap, no additional JS is needed-->
<div id="myModalInstructions" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title red">How to use API</h4>
      </div>
      <div class="modal-body ">
	      <div class="radius-red"><!-- start block1-->
              <p>Please know, you can use Google Maps API asserts with your markers stored in SQL DataBase at this page</p>
	          <p>You can add your personal markers to SQL DB, delete them, draw the route between two markers and calculate ETA and distance</p>
	  
	          <p>1. To add your personal marker, please click any place at map and select an option to add a marker</p>
	          <p>1. To delete your personal marker, please click the marker and select an option to delete a marker </p>
	          <p>3. To calcuate ETA and distance between two personal markers and draw a route, please select start and stop destination and click "Calc the route" </p>
	          <p>4. To hide a drawn route and distance info, please click "Clear" </p>
	          <br></hr class="red">
	      </div><!-- end block1-->
	   
	      <br>
	      <h4 class="red">Your current markers</h4>
	      <p id="listOfMarkers" class="radius-red"></p><!-- will hold js generated list-->
  
      </div>
      <div class="modal-footer">
	    <button type="button" class="btn btn-default" data-dismiss="modal" id="">OK</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
 <!-- START Bootstrap Modal with Instructions(hidden by default) -->
 
 
 
 <!----------------------- FB API  share---------------------->
 <center><br><br>
  
 <script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v3.0';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Your share button code -->
  <div class="fb-share-button large" 
    data-href="=http://waze.zzz.com.ua/store_locator/" 
    data-layout="button_count">
  </div>
  <!----------------------- END FB API  share---------------------->

 <br>
 
 <!-- my custom FB share-->
 <a href="https://www.facebook.com/sharer/sharer.php?u=http://waze.zzz.com.ua/store_locator" target="_blank" class="fa fa-facebook faFB" title="My share"></a>
 <!--<a href="https://www.facebook.com/sharer/sharer.php?u=http://waze.zzz.com.ua/store_locator" target="_blank"><input type="button" value="MyShare" style="background:blue;padding:5px 20px 5px 20px;color:white;border-radius:20px;"/></a>-->
 
 </center>
 
 
 
 
 
  
  <!-- CORE SCRIPT, runs the Google maps Load-->
  <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
  <!--<script src="https://maps.googleapis.com/maps/api/js?key=PASTE_YOUR_KEY_HERE&callback=initMap" async defer></script>-->
</body>
</html>