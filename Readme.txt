//Store_locator_PRO_geolocation -> 
//THIS IS "PRO" version, which now combines store_locator + geolocation = display, add, delete markers pin + find your current location + save current location



=========================== Known Errors Issues ======================================================
#Gets  Matrix API(distance between 2 points) and Direction API(drawing the route) may work 50/50 because of no API KEY(to be inserted in index.html)
======================= END Known Errors Issues ======================================================






=========================== Merging store_locator + geolocator proccess details ======================
# In geoLocationLocator.js use {window.map} to get it from storeLocator_core.js, because in geoLocationLocator.js we no longer create our personal {var map} nor use {map.init()}
# In store_Locator.js declare variable {infowindow, map;} as global => var infowindow, window.map; 
# In geoLocationLocator.js /function recenterMap(myLat, myLon, SslStatus) -> function in case of success, recenter map to found coords, sets InfoWindow "Location Found" with suggestion to add your location to SQL
======================= END store_locator + geolocator proccess detailss======================


//UPGATE(7.7.2018): THIS STORE LOCATOR IS NOW 100% SWITCHED TO SQ DB AND USES NO BUILT_IN JS OBJECT!!!!!(as we implemented adding a new marker and this requirs SQL DB)

Store Locator
# Google maps are displayed with { <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script> } in index.html.
# Data for markers is stored in array of JS objects {var stores}. We create relevant amount of markers with {function markStore(storeInfo)} and add them to array {markers} to be able to hide/show.
# Pop-up for a marker clicked is done by {marker.addListener('click', function()}
# For Matrix API (distance) we use Proxy https://cors-anywhere.herokuapp.com + Matrix Api URL, as direct addressing Matrix API causes {No 'Access-Control-Allow-Origin'} ERROR





// SQL Database version
# Currently this Store Locator uses built JS object stores(with names, coors) to draw markers. But this application has an ability to retrieve markers from SQL DB (this feature is temp commented due to complexity of deplotying one more DB table to zzz hosting).
# In order to use SQL DB Markers instead of JS build object stores, do the following:
- comment built-in JS object markers;
- create dynamic JS object markers from SQL DB by running AJAX to ajax_php/getSqlMarkers.php (i.e uncomment function {runSQLRequestToGetMarkers();} )

 How works SQL Markers variant:
# function {runSQLRequestToGetMarkers()} send s ajax rejuest to {/ajax_php/getSqlMarkers.php} script. This script runs:
   1. Initiate singletone DB connection{ConnectDB::getInstance();}
   2. If uncommented, creates a table with necessary fields {CreateTableAndRecords::createTable();}
   3. If uncommented, INSERT a sample row to SQL DB markers {CreateTableAndRecords::insertSampleRecords('my 22', 50.2727051, 28.661707, 'from 10 pm', 'nice');}
   4. Select all markers from DB, and Json echo them {SelectFromMarkers->selectSqlMarkers}
   5. Function {runSQLRequestToGetMarkers()} gets the Json and creates JS Object stores{} (instead of built-in object stores) in Success section of $ajax.
     To do so, we run for() loop with json.length, creates {var element = {};}, an object that will contain {name: storeName, locationZ:{lat:44xx, lng: 55xx}, hours:"10pm", description:'desc'} and push values to this object.
     we create an additional object {var locationZ = {};}, as  coords should be stored in separate object inside {object element}

# If ajax fails, be sure php script contains ONLY Json, no echoes, like "Connected successfully to  DataBase _zzz, it causes crashes( Comment echoes in Classes/CreateTableAndRecords)














=============================================== GEOLOCATION ReadMe part ================================================================

GeoLocation
It includes 2 version {index.php, index_prev.php}, admin/index.php is  a restricted view of recorded txt.
1.index.php - it is a new version, that works without SSL certificate, code was taken from StackOverflow + mixed with my version2 (getting  address by coordinates, record text)
2.index_prev.php includes prev version, which worked on SSL only, code was taken from official google map documentation



//-----------------------------------------------------------------------------

How  works Variant 1,(index.php, a new version, that works without SSL certificate, code was taken from StackOverflow + mixed with my version2 (getting  address by coordinates, record text) ):
1.1 Consists of 2 parts, the 1st taken from StackOverflow, it runs function {tryGeolocation()}, if it success - run function {browserGeolocationSuccess()}, which contains function recenterMap(latX,lonX);
recenterMap(latX,lonX) puts found coords to Object pos, pass it to {infoWindow.setPosition(pos)} to change GM coordinates to found,
 then runs {ajaxGetAddressbyCoords(myLat, myLon) to get ajaxed address by coordinates} and then runs {myAjaxRequest(myLat, myLon) to ajax record lat, lon, address to txt}
1.2. OnLoad , by default {function initMap()} loads GM with default coordinates, using src="https://maps.googleapis.com/maps/api/js?callback=initMap">
1.3 If {tryGeolocation()} fails it runs {browserGeolocationFail()}, that finds the error and if it is {error.message.indexOf("Only secure origins are allowed")},
 runs {tryAPIGeolocation()}, which use different methods to get coords, if {tryAPIGeolocation()} success it runs {recenterMap(latX,lonX,'ssl_string')} as well.

1.4 function {recenterMap(latX,lonX, ssl)-> ajaxGetAddressbyCoords(myLat1, myLon1, ssl_status)}, excepts 3 arg, {ssl_status} is used to detect if it was called in {tryAPIGeolocation}, i.e when was rejected by Chrome due to no SSL.
In this case, address is not accurate, and this string is added to address, to show that result is approximate.
If request is not rejected due to no SSL, {tryGeolocation()-> browserGeolocationSuccess()-> recenterMap(latX,lonX, null)-> ajaxGetAddressbyCoords(myLat, myLon, null) + myAjaxRequest(x, y)
 
 
 
 
 
 
 
 

//-----------------------------------------------------------------------------------------------------------------------------------

How  works Variant 2,(index_prev.php, that Includes prev version, which worked on SSL only, code was taken from official google map documentation):

1.1 geolocation/index.php is a landing page to trace user.
   It draws a Gmap with user position using GM API.In general user coordinates can be obtained without GM API with JS Navigator object only:
   if (navigator.geolocation) {			
          navigator.geolocation.getCurrentPosition(function(position) {	
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
1.2 If lat, lon are detected(if there value is numbers), the script runs ajax function {ajaxGetAddressbyCoords()}, which gets the address by coords. It requires GM Api, and thus script has no Api it may fire "Run of free quata".
    Critical important to use async:false in ajax in  {ajaxGetAddressbyCoords()}, otherwise it won't manage to return found address, while the rest of script is running.
1.3 After it, the script fires {myAjaxRequest()}, it sends with ajax data with lat, lon, address to {geolocation/ajax_php_script/record_data.php'}.
    {geolocation/ajax_php_script/record_data.php'} includes {RecordTxt::RecordAnyInput} method, which takes 2 arguments, the 2 nd arg is a text file to record.
    First arg accept an array with unimited elements to record. Apart from this	{RecordTxt::RecordAnyInput} by default always records date, ip, soft.
	In this case, array contain 4 elements[lat, lon, GMaps Url, address]. GMaps Url(a link to Google Maps with marker) is constructed in $gmapLink which contains <a href> + $address(url itself)


2.1 geolocation/admin/index.php is a landing page for admin to view records. Records sored in text file in recordText/geolocation.txt file. Use simple password access, embedded in code.
2.2  Contains two section: 1st just read txt.file by php, the 2nd the same txt file, but updated every x seconds with ajax{ geolocation/admin/ajaxscript.js}