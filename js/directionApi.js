//Api part that draws route on map
//Should be init in js/storeLocator_core.js in {function initMap()} with folowing 3 items:
    //1.directionsService = new google.maps.DirectionsService(); //should be global to be seen in js/directionApi.js
    //2.directionsDisplay = new google.maps.DirectionsRenderer();
	//3.directionsDisplay.setMap(map);
	
	

     // function draws a route, triggered in js/storeLocator_core.js on button click "Calc the route"
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    function runDirectionApi()
	{
		//var start = document.getElementById('start').value;
        //var end = document.getElementById('end').value;
		var start = $("#selectID1").val().replace("(", "").replace(")", ""); // get the value of start, which is coords {(2.65, 5.88)}, and  removes {()} from it
	    var end = $("#selectID2").val().replace("(", "").replace(")", "");
				   
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            } else {
				alert('Direction crashed');
			}
        });
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	