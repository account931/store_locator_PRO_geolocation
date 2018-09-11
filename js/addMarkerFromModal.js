//runs interaction with modal windows
// Google maps are displayed with { <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script> } in index.html.

       
    $(document).ready(function(){
			
	  
	
	
	
	   // If u click "Add" in  modal widnow with fields "Add a new marker"-> send ajax request to add a marker to SQL DB
	   // Send Ajajx to a add a new marker
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
        $(document).on("click", '#agreedAddToSQL', function() {  // this  click  is  used  to   react  to  newly generated;
			
			//be sure name is not missed
			if ($('#formMarkerName').val()==""){
				alert("Please, fill in the name");
				return false;
			}
			
			// AJAX sends data to PHP handler, which insert a new marker to SQL DB
            $.ajax({
                url: 'ajax_php/insertSqlMarker_Handler.php', // handler which runs {Classes/InsertNewMarker.php}
                type: 'POST',
			    dataType: 'text', // without this it returned string(that can be alerted), now it returns object
			    //passing the data
                data: { 
			        markerName: $('#formMarkerName').val(),	 //marker name
					markerCoords: globalCoords, //coordinates in format {lat, lng}, get them from global {globalCoords} defined in storeLocator_core.js in {google.maps.event.addListener(map, 'click', function(event) {}
			        markerInfo: $('#formMarkerInfo').val(), //marker info
					markerDescription: $('#formMarkerDescription').val(),
				},
			    async: false,
                success: function(data) {
                    // do something;
				    alert(data); //alerts echoes from  ajax_php/insertSqlMarker_Handler.php
					 //window.location.reload(); //reloads the page to get fresh markers
					 runSQLRequestToGetMarkers(); // gets refreshed SQL Markers
					 myMapCenter = {lat: parseFloat(globalCoords.split(',')[0]) , lng: parseFloat(globalCoords.split(',')[1])};  //get the coord of inserted marker to center map back here after insert and refresh, as {globalCoords} received as string {lat, lng}, we split it to array, parseFloat() here is a must as it crashes
					 //alert("ajax insert" + JSON.stringify(myMapCenter, null, 4)); 
					 initMap(); //reloads the map
				            
                },  //end success
			    error: function (error) {
				    alert('Failed adding a marker');
                }	
            });
		                                     
           // END AJAX sends data to PHP handler, which insert a new marker to SQL DB 
            
       }); //END $("#btn_Control").click
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
	  
	  
	  
	  
	  
	  
	  
	  
		
		
	   // If u click "No" in "Add this point to your markers?" in #info_div-> hide #info_div + hide clicked infoWindow
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
        $(document).on("click", '#btn_add_cancel', function() {  // this  click  is  used  to   react  to  newly generated;
			$("#info_div").fadeOut(900);
			scroll_toTop(); 
			//hide infowindow, if any
			if (infowindow) {
                infowindow.close();
			}
			
            
       }); //END $("#btn_Control").click
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	   
	   
	
      
	 
	



	
   });
	//   END ready 

