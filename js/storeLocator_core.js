// Google maps are displayed with { <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script> } in index.html.

window.x;
window.map;
var infowindow; // add because while u were closing previous infowindow, it caused the error, was not visible in  showStoreInfo(storeInfo, marker)
var markers = [];		
var globalCoords;  //coords of current clicked, which we will pass to {'ajax_php/insertSqlMarker_Handler.php'} to add to SQL





   // START SQL VARIANT-gets SQL Markers
   // Start getting Markers {stores} from SQL, this SQL functioanlity is temp disabled, but 100% working, it u'd like to use this SQL Markers version, please decomment this block + deploy SQL table to server(schema is in Classes....) + comment built-in JS object {stores}
   // sends ajax to php which SELECT all markers from Markers DB and echo them in JSON
   // **************************************************************************************
   // **************************************************************************************
   //                                                                                     **
   
	    var stores = [];  // array that will be used instead of commented build-in object
		
		function runSQLRequestToGetMarkers(){
		
		stores.length = 0;
		markers.length = 0; //must have, it deletes prev array, otherwise it adds to markers[] more and more same markers and creates repetable list in <option><select> + in Instructions
		
		// AJAX sends data to PHP handler, which selects markers from SQL DB  ************ 
        $.ajax({
            url: 'ajax_php/getSqlMarkers.php',
            type: 'POST',
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the data
            data: { 
			    //cityLat:lat,	
			},
			async: false,
            success: function(data) {
                // do something;
				//alert(data[0].name);
				//alert(data.length);
				
				for (var i = 0; i < data.length; i++){
					// var element and var locationZ should be declared inside for(), otherwise it will return the same last value
					var element = {}; // an object that will contain {name: storeName, locationZ:{lat:44xx, lng: 55xx}, hours:"10pm", description:'desc'}
		            var locationZ = {}; // stores
					locationZ.lat = parseFloat(data[i].lat); //adds to object {locationZ} key {lat} with value {data[i].lat}, which is from SQL Json answer. Must use {parseFloat()} or the map crashes, it does not accept lat, lon ad numbers
		            locationZ.lng = parseFloat(data[i].lng);
		
		
		            element.name = data[i].name;
		            element.location = locationZ;
					element.hours = data[i].hours;
					element.description = data[i].description;
					element.id = data[i].id;
		            stores.push(element);//adds objects to array
					
				}
				//alert ("Loc St exists" + JSON.stringify(stores, null, 4) );
				
                
            },  //end success
			error: function (error) {
				alert('ajax failed, be sure php script contains ONLY Json, no echoes, like "Connected successfully to  DataBase _zzz"');
            }	
        });
		}                                      
       //  END AJAX sends data to PHP handler, which selects markers from SQL DB  
	   
	   // **                                                                                  **
       // **************************************************************************************
       // **************************************************************************************
       // END  getting object Markers {stores} from SQL,

       runSQLRequestToGetMarkers(); //Run SQL request to get markers // disable it if using built-in JS object







    











   var myMapCenter = {lat:50.257943 , lng: 28.663423};  //center by default, declare this var global & moved it outside initMap() to be able to assign it the new value after delete/insert, when we refresh map and force it to center at the coords of last deleted/inserted place

		
		
  //core function to show GMaps, trigered in //script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **
  
  function initMap() { 
    //alert("init" + JSON.stringify(myMapCenter, null, 4));  
	  
    //start init Direction API(draw a the route)  
    directionsService = new google.maps.DirectionsService(); //should be global to be seen in js/directionApi.js
    directionsDisplay = new google.maps.DirectionsRenderer(/*{ polylineOptions: { strokeColor: 'blue' } }*/); //defines the color of route
	//END  init Direction API(draw a the route) 
	
	//var myMapCenter = {lat:50.257943 , lng: 28.663423};  //center by default, moved it out of initMap() to be able to assign it the new value after delete/insert, when we refresh map and force it to center at the coords of last deleted/inserted place


	// Create a map object and specify the DOM element for display.
	//MEGA FIX when merging store_Locator with geolocation to store_locator_PRO_geolocation, var map must be global to be seen in geolocationLocator.js, declare it here as window.map in 1st line;
	/*var*/ map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 14,
		
	});
	
	//init Direction API	(draw a the route)
	directionsDisplay.setMap(map);  

 
	
	
   // Click on any place at Google maps to get current coords of clicked place  and put a marker there  + opens infowindow with suggestion to add this point to SQL DB, if u confirm a modal window #myModal will pop-up (action for this modal is in (in js/addMarkerFromModa.js) )
   //-------------------------------------------------------------------------------------------
   google.maps.event.addListener(map, 'click', function(event) {
      mapZoom = map.getZoom();
      startLocation = event.latLng; //gets current clicked coords
      globalCoords = startLocation.toString().replace("(", "").replace(")", "");//gets current clicked coords to global var, which we will pass to {'ajax_php/insertSqlMarker_Handler.php'} to add to SQL. Should use {.toString} otherwise it crashes + removes "()"
	  //alert(globalCoords);
	  
	  // show coors in div + button to open modal
	  // we add {data-toggle='modal' data-target='#myModal'} tp button to open modal with Bootstrap, no additional JS is needed
	  var text = "<p class='red'>" + startLocation + "</p><p>Add this point to your markers?</p><input id='btn_add_toMarkres' type='button' name='Button' value='yes' class='btn btn-info' data-toggle='modal' data-target='#myModal'>  <input id='btn_add_cancel' type='button' name='Button' value='No' class='btn btn-danger' >"; 
	  $("#info_div").stop().fadeOut("slow",function(){ $(this).html(text)}).fadeIn(2000);
	  $("#newMarkerCoords").html( '-> '+ startLocation); // html current coords to modal window with fields()to add a new marker to SQL;
	  //alert(startLocation ); //alert current clicke coords
	  
	  //showSmallModalWindow(); // shows small modal pop-up with suggestion to add clicked position to SQL markers
	  
	   //Scroll to #info_div in Mobile only
	   /*
		if(screen.width <= 640){ 
	        scrollResults("#info_div"); //scroll the page down to weather results
		}
		*/
	  
      setTimeout(placeMarker, 400); //adds a new marker to page where u click
   });

   
   //----------
    var previousMarker; //must be global to be able to remove a prev clicked marker
  
   //adds a new marker to page where u click + show infowindow
    function placeMarker() {
		//closes any prev infowindow if any SQL markers was clicked
		if (infowindow) {
            infowindow.close();
		}
			
        if (previousMarker){ //if exists a prev click generated marker, Null it 
            previousMarker.setMap(null);
		}
		
        // set to map a new clicked generated marker		
        if(mapZoom == map.getZoom()){		
            previousMarker = new google.maps.Marker({position: startLocation, map: map, title: 'bbb'});	

           //adds pop-up infowindow
           //My pop up/infowindow onClick------
			 infowindow = new google.maps.InfoWindow({
                 content: "<p>Add this point to markers?</p>" + startLocation + "<br><input id='btn_add_toMarkres' type='button' name='Button' value='yes' class='btn btn-info' data-toggle='modal' data-target='#myModal'> <input id='btn_add_cancel' type='button' name='Button' value='No' class='btn btn-danger' > "
              });
            infowindow.open(map, previousMarker);
			//	END adds pop-up infowindow
         }
     }
	 

	
	// End Click on any place at Google maps to get clicked coords and put a marker there!!!!!!!!!!!!!!!!!!!!!
    //-------------------------------------------------------------------------------------------
	
	
	
	
	


	//var marker;
	
	
	 // function to assign every single marker (received from SQL) with relevant coords position and title from {var stores}
	 // **************************************************************************************
     // **************************************************************************************
     //                                                                                     **
	 
	function markStore(storeInfo){

		// Create a marker and set its position.
		var marker = new google.maps.Marker({  //!!!==DO not remove Var, it cause pop-up wrong appear
			map: map,
			position: storeInfo.location,
			title: storeInfo.name
		});
        markers.push(marker); // add marker to the array with all markers
		
		
		// ERASE, not used
		//mine----------
		/*
		function showCoords(event) {
           window.x = event.clientX;
           window.y = event.clientY;
           var coords = "X coords: " + x + ", Y coords: " + y;
           //document.getElementById("demo").innerHTML = coords;
		   //alert(window.x); //important alert
		   return { //multiple return
             dCodes: x, 
             dCodes2:y
           };   
		}
		*/
		//mine----------
		
		
		
		
		// show SQL store/markers info (infowindow), when marker is clicked
		// ****************************
        // ****************************
        //                           **
		
		marker.addListener('click', function(){		
		
			
			showStoreInfo(storeInfo, marker); //Mega error was here, onClick was displayed the correct pin info, but location was always of the last Object {stores},
			                                  //because  I removed /*var*/ marker in {markStore(storeInfo)} to make it global and visible in {showStoreInfo()}
											  //the right solution is to pass {marker} as argument in showStoreInfo(storeInfo, marker)
			//showCoords(event); //my gets coord clicked	          
		
		});
	    // **                       **
        // ***************************
        // ***************************
		// show store/marker info (infowindow), when marker is clicked
		
		

	
		
		
		
	
	}  // END function markStore(storeInfo)
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	  
	// function to show marker info (infowindow) for SQL Markers in pop-up On marker Click
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function showStoreInfo(storeInfo, marker)
	{
			//creating var that contains name, hours, description, etc, to use in infowindow pop-up + $("#info_div")
			resultedText = '<p>Store name: '       //<img style="width:25px;height:25px;" src="images/marker.png"/>
			    + storeInfo.name
			    + '<br>Hours: ' + storeInfo.hours
			    + '<br>Info: ' + storeInfo.description
				+ '</p>'
				+ '<input type="button" value="delete marker" class="del-marker" id=' + storeInfo.id + '>';  // assign id to "Delete" button
				
			
			//my animation-> sets info to #info_div
			$("#info_div").stop().fadeOut("slow",function(){ $(this).html(resultedText)}).fadeIn(2000);
			
			//closes prev infowindow if any SQL markers was clicked
			if (infowindow) {
                infowindow.close();
			}
			
			//closes infowindow,if it exists for a  click generated infowindow(NOT from SQL), Null it
			if (previousMarker){  
                previousMarker.setMap(null);
		    }
			
			
			//My pop up/infowindow onClick------
			infowindow = new google.maps.InfoWindow({
                 content: resultedText //"Hello World!"
              });
			
            infowindow.open(map, marker);
			
			 // END My pop up onClick-------------
			 
			 
			
           // alert(window.x ); //important alert
			
			//$('#myTil').css('position', 'absolute');
			/*
            $('#myTil').css('top', '-100'); //or wherever you want it
            $('#myTil').css('left', '200'); //or wherever you want it
			$("#myTil").stop().fadeOut("slow",function(){ $(this).html(resultedText)}).fadeIn(2000);
			*/
	}
      // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	
	
	
	
	// INFO DATA, 
	//this array of objects was renamed to {storesPREV} as now it is not used. Now var stores[] is derived from SQL with JS {runSQLRequestToGetMarkers()}.
	/*
	var storesPREV = [
		{
			name: 'ул. Бандеры',
			location: {lat: 50.2627051, lng: 28.661707}, 
			hours: '8AM to 10PM',
			description: 'Great place to go',
		},
		{
			name: 'Львівська майстерня шоколаду',
			location: {lat: 50.258004, lng: 28.659492}, 
			hours: '9AM to 9PM',
			description: 'Затишне місце',
		},
		
		{
			name: 'Магазин Природа',
			location: {lat: 50.258093, lng: 28.663449},  
			hours: 'круглосуточно',
			description: '',
		},
		{
			name: 'McDonald"s',
			location: {lat: 50.265906, lng: 28.683787},  
			hours: 'Київська 77, Житомир, 10000',
			description: 'McDrive',
		},
			{
			name: 'Замковая Гора',
			location: {lat: 50.253627, lng: 50.253627},  
			hours: 'Парк',
			description: 'Кафедральна, 10002',
		},
		{
			name: 'Парк Гагарина',
			location: {lat: 50.247574, lng: 28.665838},  
			hours: 'Атракционы',
			description: 'Старий Бульвар 34',
			
		},
		{
			name: 'Ботанический сад',
			location: {lat: 50.251279, lng: 28.696526},   
			hours: '09:00–18:00',
			description: 'Корольова 39, Житомир',
			
		},
		{
			name: 'Корбутовский гидропарк',
			location: {lat: 50.237733, lng: 28.606245},   
			hours: 'Открыто 24 часа',
			description: 'Пляжна алея, Житомир',
			
		},
		
	];
	*/
    // END  INFO DATA-------
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	// ADDS SQL markers to map
	// runs every Stores array Object through function markStore
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	stores.forEach(function(store){
		markStore(store);
	});
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	


	

		
    $(document).ready(function(){
		
	
	
	
	
	
	
		
		
	   // Hide/show markers
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
        $("#btn_Control").click(function(){
			if ($("#btn_Control").prop("value")=="Hide markers"){
				$("#btn_Control").stop().fadeOut("fast",function(){ $(this).attr('value', 'Show markers')}).fadeIn(500);
				//$("#btn_Control").attr('value', 'Show markers');
				for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                 }
				//marker.setVisible(false);
				
				//Hide your generated marker (if u click any place at map)
				if (previousMarker){ //if exists a prev click generated marker, Null it 
                    previousMarker.setMap(null);
				}
			} else {
				$("#btn_Control").stop().fadeOut("fast",function(){ $(this).attr('value', 'Hide markers')}).fadeIn(500);
				for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                 }
			}
            
       }); //END $("#btn_Control").click
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   // click clears/hide Matrix Api div
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
	    $("#btn_CalcRoute_Clear").click(function(){
			$("#distanceInfo").stop().fadeOut("fast",function(){ $(this).html('') }).fadeIn(2000);
			// removes Direction API(drawn route)
			directionsDisplay.setDirections({routes: []});
	    }); 
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  // END  click clears Matrix Api div 
	   
	   
	   
	   
	   
	   
	   
	    //generates start/end destinations <option><select> for usage in Matrix dropdown list
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
	   function generateSelect(selectText, i, spanID){ //("start/end text", 1 or to to add to id="selectID", span to html() )
	       var destination = "<select id='selectID" + i + "'>";
	       destination += "<option value='' selected='selected'>" + selectText + "</option>";
		   myList = ""; //list for instruction modal
	       for ( i = 0; i < markers.length; i++ ){
		       //alert(markers[i].position);
		       destination = destination + "<option value='" + markers[i].position + "'>" + markers[i].title + "</option>"; 
			   
			   //markers list for Instruction modal window
			   myList = myList + "<p>" + (i + 1) + "." + markers[i].title + "</p>";
	        } 
	   
	        destination = destination + "</select>";
	        $("#" + spanID).html(destination);
	        //$("#destination2").html(destination);
	        //end generates option_select
			
			$("#listOfMarkers").html(myList); //html marker list to instruction modal
	   }
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************

	
	
	   //Invoke function to generate start/end destinations <option><select> for usage in Matrix
	   generateSelect('Start point', 1, 'destination' ); // generates start point dropdown
	   generateSelect('End point', 2, 'destination2' );  // generates end point dropdown
	   
	   
	   
	   
	   //Gets  Matrix API distance
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
	   $("#btn_CalcRoute").click(function(){
	       if ($("#selectID1").val() == '' || $("#selectID2").val() == '' ){ // if user selected both start/stop //value of dropdowns are coords
			  alert('Select start and stop location');
		   } else {
			   if ( $("#selectID1").val() == $("#selectID2").val()){ // if start/stop are not the same
			       alert("Start and stop points are the same. change one of them");
			   } else { //if all is OK 
			       //else form the request to AJAX Google Maps Distance Maxrix API
			       //we use here Proxy {https://cors-anywhere.herokuapp.com}, as direct addressing GM Matrix API causes {No 'Access-Control-Allow-Origin'} ERROR
				   //var URL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=50.258004,28.659492&destinations=50.247574,28.665838";
				   var coords1 = $("#selectID1").val().replace("(", "").replace(")", ""); // get the value of start, which is coords {(2.65, 5.88)}, and  removes {()} from it
				   var coords2 = $("#selectID2").val().replace("(", "").replace(")", "");
				   var URL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + coords1 + "&destinations=" + coords2;
                   //alert (URL);
				   //Start AJAX
				   $.ajax({
                       url: URL,
					  
                       type: 'POST',
			           dataType: 'json', // without this it returned string(that can be alerted), now it returns object //using "jsop" failed
			           //passing data
                       data: { },
                       success: function(data) {
                           // do something;
					       var finalText = "Distance between <span class='red'>" + $("#selectID1 option:selected").html() + "</span> and <span class='red'>" + $("#selectID2 option:selected").html() + " </span> is <span class='red'> " +  Math.round( data.rows[0].elements[0].distance.value / 1000) + " km.</span> <br>ETA by car is <span class='red'>" +  Math.round( data.rows[0].elements[0].duration.value / 60) + " minutes</span>.<br><br>"
					       $("#distanceInfo").stop().fadeOut("fast",function(){ $(this).html(finalText) }).fadeIn(2000);
                           //alert(data.rows[0].elements[0].distance.value);
                       },  //end success
			           error: function (error) {
						   alert("Ajax failed");
				       //$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO CITY FOUND</h4>")}).fadeIn(2000);
                       }	
                   });   //  END AJAXed  part 
				   
				   runDirectionApi(); //run Direction Api part that draws route on map, located in js/DirectionApi
				   
	           } //end else 2
                                               
     
			   }
			  
		   //}
		       
		   
	   }); // end $("#btn_CalcRoute").click
	   
	   // **                                                                                  **
       // **************************************************************************************
       // **************************************************************************************
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
   });
	//   END ready 
	
	
	
	
	
	
	
	
	


} // END  function initMap




















	
	
	
	
	































// Scroll the page to results  #resultFinal, NOT USED??
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     **
	  function scrollResults(divName) 
	  {
		 
           $('html, body').animate({ 
               scrollTop: $(divName).offset().top
			  //scrollTop: $('.footer').offset().top
              //scrollTop: $('.your-class').offset().top
          }, 'slow'); 
		  // END Scroll the page to results
	  }
	
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	
	
	
	
	  function scroll_toTop() 
	  {
	      $("html, body").animate({ scrollTop: 0 }, "slow");	
	  }
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	   
	   
	   
	   
	   
	   //Delete a marker from SQL DB
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   $(document).on("click", '.del-marker', function() {  // this  click  is  used  to   react  to  newly generated;
	   
	   var idX = this.id; //id of marker  clicked
	
	       // we have the id of object as we assign this id to "Delete" button ID, now we get the name by finding object in {stores} which contains that id
	       var key = $.grep(stores, function(obj){return obj.id == idX})[0]; //finds the index of object in array {stores} by key's value-> it return ONE  whole found object {name:, location:}
		   //alert(JSON.stringify(key, null, 4));
           //alert(key.location.lat);		   
	       if ( confirm("Sure to delete  " +  /* $(this).attr("id")*/ key.name  + "  ?" )) {
	   
		       
		       //alert(idX);
		       //traceCheckBoxSelection(this.id);
		   
		       // AJAX sends data to PHP handler, to delete a marker from SQL DB
               $.ajax({
                   url: 'ajax_php/deleteSqlMarker_Handler.php', // handler which runs {Classes/DeleteMarker.php}
                   type: 'POST',
			       dataType: 'text', // without this it returned string(that can be alerted), now it returns object
			       //passing the data
                   data: { 
			           markerID: idX,	 //marker id
					   markername: key.name //pass the marker name, we need it just to echo it name in DeleteSingleMarker.php
				   },
			       async: false,
                   success: function(data) {
                       // do something;
				       alert(data);
					   runSQLRequestToGetMarkers(); // gets refreshed SQL Markers
					   myMapCenter = {lat:key.location.lat , lng: key.location.lng};  //get the coord of deleted marker to center map back here after deletion and refresh
					  //alert("ajax" + JSON.stringify(myMapCenter, null, 4)); 
					   initMap(); //reloads the map
					   
					   //window.location.reload(); //reloads the page to get fresh markers
                   },  //end success
			       error: function (error) {
				       alert('Failed to delete a marker');
                   }	
               });                                 
               // END AJAX sends data to PHP handler, to delete a marker from SQL DB 
		   
		   }
		   
	   }); //end $(".del-marker").click
	   	
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  // END Delete a marker from SQL DB
	   
	   
	   
	   
	   
	   

	
	   