<?php
    include '../Classes/autoload.php';//uses autoload instead of manual includin each class-> Error if it is included in 2 files=only1 is accepted

	 //connects to SQL DB
     /* $singeltone= */   ConnectDB::getInstance();
	 
	
	
	//Insert a new marker , triggered from ajax request in js/addMarkerFromModa.js
	InsertNewMarker::addMarker();
	
	
	
?>