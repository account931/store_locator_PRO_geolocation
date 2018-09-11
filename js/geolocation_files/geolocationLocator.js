//geolocationLocator part 
$(document).ready(function(){
	

	
	
	//Show / hide  radar icon when click top right
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	$("#showRadar").click(function() {  
        $("#radar").toggle(1000);
	});
	
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Click on Locator button icon-> animates radar + makes Core injected geolocation
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	//global ineration var
	var iteration;  // equivalent  of i iterator if for() loop
	var number_of_iteration = 18;  //number of loop for iteration
	
	$("#radar").click(function() {  
        //animation, i sets the number of blinkings	
	    for(var iteration = 0; iteration < number_of_iteration; iteration++){
			
			 //$("#radar").css("-webkit-transform", "scale(1.9");   
			 $("#radar").stop().fadeOut("slow",function(){ /*$("#radar").css("background", "red")*/ /*$(this).html('')*/  }).fadeIn(1000);
		}
	    //animation	
	
	    //remove radar after for iteration
	    $("#radar").fadeOut(1000);
	
	
	
	//initMap();
	tryGeolocation();  //CORE GEOLOCATION that triggers all injected from geolocation
	
	
	
	});
	
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//================================================ INJECTED ====================================================
	
	
	 //Variant 2, with fix to avoid obligatory SSL (like in Chrome)
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     **
	  var latX;
	  var lonX;
	  
	 // var map, infoWindow; => no need, these vars are taken from store_Locator.js
	 
	  //if tryAPIGeolocation success
	  var apiGeolocationSuccess = function(position) {
          //alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude); //IMPORTANT ALERT
		  displayStatus("#infoBox", "API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude, "null");
      };
      
	  //runs if Rejected by Chrome as no SSL
      var tryAPIGeolocation = function() {
          jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
          apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
		  recenterMap(success.location.lat, success.location.lng , 'SSL Fail');//mine, recenter the map if coords are found, 
		                                                                       //SslStatus arg appears if Chrome rejects because of No SSL and fired in {tryAPIGeolocation}
		  //alert("Chrome SSL reject");
          })
          .fail(function(err) {
              //alert("API Geolocation error! \n\n"+err);
			  displayStatus("#infoBox", "API Geolocation error! \n\n"+err, "red");
          });
      };

	  
	  
	  
	  //if tryGeolocation() success
      var browserGeolocationSuccess = function(position) {
		  latX =  position.coords.latitude; //mine
		  lonX =  position.coords.longitude;
          alert("Core Performance successful!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude); //IMPORTANT ALERT
		  displayStatus("#infoBox", "Core Performance successful!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude, "null");
		  recenterMap(latX,lonX, null);//mine, recenter the map if coords are found!!!!!!!
      };

	  
	  
	  
	  //if tryGeolocation() fails
      var browserGeolocationFail = function(error) {
		  alert('GPS or Location permission is OFF. Turn it on.');  // will fire if GPS is off at cell, if no permission or if Chrome
		  displayStatus("#infoBox", " GPS or Location permission is OFF. Turn it on.", "red");
		  
		  
          switch (error.code) {
              case error.TIMEOUT:
                  alert("Browser GeoLoc error !\n\nTimeout.");
                  break;
              case error.PERMISSION_DENIED:
                  if(error.message.indexOf("Only secure origins are allowed") == 0) {
                      tryAPIGeolocation();
					  //alert('!SSL permission denied'); //IMPORTANT ALERT
					  displayStatus("#infoBox", "!SSL permission denied", "null");
					  //infoWindow.setContent("Only secure origins are allowed");
					  //infoWindow.open(map);
                      
                  }
                  break;
              case error.POSITION_UNAVAILABLE:
                   alert("Browser geolocation error !\n\nPosition unavailable.");
                   break;
			  //mine-------------------------
			  case error.UNKNOWN_ERROR:
                  alert("An unknown error occurred.");
                  break;
           }
        };

      var tryGeolocation = function() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  browserGeolocationSuccess,
                  browserGeolocationFail,
                  {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true}); //maximumAge: 50000 (50 sec of location cache)
         }		 
		 
      };

      //tryGeolocation();  //CORE
	  
	  
	  // **                                                                                  **
      // **************************************************************************************
      // ************************************************************************************** 
	  //END Variant 2, fix to avoid obligatory  SSL-----------------------------------------
	  
	   
	   
	   
	   //addon from 1st variant
	   // function which loads Google maps with specified  coords, using src="https://maps.googleapis.com/maps/api/js?callback=initMap">
	    /*var*/ //map, infoWindow; // made infoWindow global to be seen in function {receneter()}
	  // *******************************************************************
      // *******************************************************************
      //                                                                  ** 
	  /*
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;
      }
	  
	  */
	  // END initMap()-----------------------------------------------

   
   
   
   
   
    
    //alert("window.map "+ window.map);
   
      //mine function in case of success, recenter map to found coords, sets InfoWindow "Location Found" with suggestion to add your location to SQL
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	  
	  function recenterMap(myLat, myLon, SslStatus){  //SslStatus arg appears if Chrome rejects because of No SSL and fires {tryAPIGeolocation}, otherwise call with null
		  //alert(myLat);
		  
		  //closes the radar icon blinking icon by decreasing iterations
		   number_of_iteration = number_of_iteration - (number_of_iteration - 1);  //i.e 18 - (18-1) = 1
		    //alert("iteration-> " + iteration);
		  //$("#radar").fadeOut(1000);
		  
		    var pos = { //adding coords to object
              lat: myLat,
              lng: myLon
            };
			
			window.map.setCenter(pos);  //MEGA ERROR FIX while merging-> use window.map to get it from storeLocator_core.js
			
			//close any prev infoWindow if is present
			if (infowindow) {
                 infowindow.close();
		    }
			
			//var with lat/lng, which we will pass to {'ajax_php/insertSqlMarker_Handler.php'} to add to SQL.
			globalCoords = myLat + ", " + myLon ;//gets current coords to global var, which we will pass to {'ajax_php/insertSqlMarker_Handler.php'} to add to SQL. Should use {.toString} otherwise it crashes + removes "()"

			$("#newMarkerCoords").html( '-> '+ globalCoords); // html current coords to modal window with fields()to add a new marker to SQL;
			
			infowindow = new google.maps.InfoWindow; // Mega fix   !!!!!!!!!!!!!!
		    infowindow.setPosition(pos);
			var textForMyInfoWind = "<p>Add your locationt to markers?</p>" + myLat + ", " + myLon + "<br><input id='btn_add_toMarkres' type='button' name='Button' value='yes' class='btn btn-info' data-toggle='modal' data-target='#myModal'> <input id='btn_add_cancel' type='button' name='Button' value='No' class='btn btn-danger' > ";
            infowindow.setContent('Location found.<br>' + textForMyInfoWind);
            infowindow.open(window.map); //MEGA ERROR FIX while merging->  use window.map to get it from storeLocator_core.js
            
			
			//run my record ajax
			//if lan if found, i.e match digitals, run this function to get address
			if (!isNaN(myLat) ){ //if number
				//alert('coord found ' + myLat); //IMPORTANT ALERT
				displayStatus("#infoBox", "coord found " + myLat, "null");
				if (SslStatus){
					b = SslStatus;
					//alert( b + ' Reject detected');
					ajaxGetAddressbyCoords(myLat, myLon, SslStatus); //SslStatus arg appears if Chrome rejects because of No SSL and fires {tryAPIGeolocation}
				} else {
			        ajaxGetAddressbyCoords(myLat, myLon, null); // arguements should be as in recenterMap(myLat, myLon) arg, null as we set no SslStatus(no reject by Google)
				}
				//alert ("Address Main " + window.addressX);
			} else { 
				 addressX = 'address tracking failed due to API KEY';
			}
			
			//sends ajax request to ajax_php_script/record_data.php to record ip, date, lat, lon using RecordTxt::RecordAnyInput(array( "lat: " .$_POST['cityLat'], "lon: ".$_POST['cityLon'], $gmapLink  ),  '../recordText/geolocation.txt');
			myAjaxRequest(myLat, myLon); // arguements should be as recenterMap(myLat, myLon) arg
			//END run my record ajax
	  
	  }
	  //END mine function in case of success, recenter map to found coords
	  
	 
	 
	 
	 
	
	 
	 
	  //sends ajax request to ajax_php_script/record_data.php to record ip, date, lat, lon using RecordTxt::RecordAnyInput(array( "lat: " .$_POST['cityLat'], "lon: ".$_POST['cityLon'], $gmapLink  ),  '../recordText/geolocation.txt');
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	  
	  function myAjaxRequest(x, y) 
	  {	 
	     //alert('addr' + addressX);
	     //alert("myAjaxRequest " + x );
        // send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/geolocationLocator_php_ajax/record_data.php',
            type: 'POST',
			dataType: 'text', //changed 'json' to 'text', otherwise it fires  error: function(jqXHR,error, errorThrown)
			                  //in prev project, added {dataType:'JSON'}-> without this it returned string(that can be alerted), now it returns object
			async: false, //new fix
			
			//passing the city
            data: { 
			    cityLat:x,
				cityLon:y,
				address: "<span style='color:red;'>" + window.addressX + "</span>",
				//cityLon:window.lon,
				
			},
            success: function(data) {
				//alert("good in myAjaxRequest(x, y)");
                // do something;
                //$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html(data) }).fadeIn(2000);
			    //alert(data.city.name);
				//getAjaxAnswer(data);
            },  //end success
			
			error: function(jqXHR,error, errorThrown) {   //error: function (error)
                if(jqXHR.status&&jqXHR.status==400){
                    alert("status 400 error" + jqXHR.responseText); 
                }else{
                   alert("Fail in myAjaxRequest(x, y)");
                }
            }
	  
			
        });
	  }
                                               
       //  END AJAXed  part 
	  //mine------------------------------------------------------------------
	  //myAjaxRequest();
	  
	  
	  
	  
	  
	  
	  
	  // gets an address by lat, lon
	  //----------------------------------------------------------
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	 
	  function ajaxGetAddressbyCoords(myLat1, myLon1, ssl_status){  //ssl_status arg appears if Chrome rejects because of No SSL and fires {tryAPIGeolocation}
		  var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + myLat1 + ',' + myLon1;
		  $.ajax({
            url: geocodeURL,
            type: 'POST',
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the data
            data: { 
			
			},
			async: false, // the core Error was here, it was sync and did not wait for value to return
            success: function(data) {
				//alert("ajaxGetAddressbyCoords status is " + data.status);  //IMPORTANT ALERT
				displayStatus("#infoBox", "ajaxGetAddressbyCoords status is " + data.status, "null");
				if (data.status=="OK"){
				    //alert(JSON.stringify(data, null, 4));
                    //alert (data.results[1].formatted_address);
					if (ssl_status){ //if 3rd arg is not null //means that browser(Chrome) requested SSL and because of it we pulled the approximate. not excact address						addressX = "<b><< " +ssl_status + " >> </b> : " + data.results[1].formatted_address;
					} else {
				        addressX = data.results[1].formatted_address; //get the JSON address
					}
					//alert('success ' + addressX); //IMPORTANT ALERT
					displayStatus("#infoBox", "address success " + addressX, "null");
					
					//Print found address to modal BS window field( Marker Info) in form to add found location to Markers SQL
					$("#formMarkerInfo").val(addressX);
					
				} else {
					addressX = "API Query Limit, n/a(ajaxGetAddressbyCoords)"; 
					//alert('not defined in ajaxGetAddressbyCoords -> API Query Limit'); //IMPORTANT ALERT
					displayStatus("#infoBox", " address not defined in ajaxGetAddressbyCoords -> API Query Limit", "red");
				}
				
				
				
            },  //end success
			error: function (error) {
				alert('ajaxError in ajaxGetAddressbyCoords');
            }	
			
        });
		//alert("return " + window.addressX);
		 return window.addressX; 
	  }
	  // end ajaxGetAddressbyCoords()----------------------------------------
	  
	  

	   //END adds from 1st variant---------------------------------------------------
	   
	   
	   
	   
	  var counterb = 1; //counter to encrease delays //used in displayStatus(myDiv, message, cssClass), declare it outside function to keep it static and save value of prev ++
	  
	  
	  //functions thats shows info of running(on black screen), instead of alerts, uses var counterb, arg(div, message, css class to add)
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	  function displayStatus(myDiv, message, cssClass)
	  {
		 
		  counterb++; //counter to encrease delays
		  var data =  $(myDiv).html(); //gets prev messages //TEMP NOT USED
		  var final = data + "<p class='" + cssClass + "'>" + message + "</p>";    //adds a new to prev  //TEMP NOT USED
		  //$(myDiv).hide().html(final).fadeIn(2000);  //disable for makes lines appear one by one with .append
		  
		  //$(myDiv).stop().fadeOut("slow",function(){ $(this).html(final)}).fadeIn(2000);
		  
		  $(myDiv).hide().fadeIn(2000); //makes div visible
		  
		  setTimeout(function(){     //each line appears with delay
		      $(myDiv).append("<p class='" + cssClass + "'>" + message + "</p>")   		  
		  }, counterb * 2000); //counterb * 1000 encreases the time for next line to appear
		  
		  
	  }
	  //END functions thats shows info of running, instead of alerts
	  
	  
	  
	  
	  
	  //close infoBox
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	 // $(document).ready(function(){
	  $(document).on("click", '.close-spann', function() {  //newly generated, was not working beacuse of this
		   $("#infoBox").hide(900);
	 });
	// });
	 //close infoBox
	
	
	//================================================ END INJECTED ====================================================
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
// end ready