//Store_locator_PRO_geolocation -> 
//THIS IS "PRO" version, which now combines store_locator + geolocation.

=========================== Merging issues ======================
# In geoLocationLocator.js use {window.map} to get it from storeLocator_core.js, because in geoLocationLocator.js we no longer create our personal {var map} nor use {map.init()}
# In store_Locator.js declare variable {infowindow, map;} as global => var infowindow, window.map; 
# In geoLocationLocator.js /function recenterMap(myLat, myLon, SslStatus) -> function in case of success, recenter map to found coords, sets InfoWindow "Location Found" with suggestion to add your location to SQL
======================= END Merging issues ======================


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