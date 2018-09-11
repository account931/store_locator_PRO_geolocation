<?php
    include '../Classes/autoload.php';//uses autoload instead of manual includin each class-> Error if it is included in 2 files=only1 is accepted

	 //connects to SQL DB
     /* $singeltone= */   ConnectDB::getInstance();
	 
	
	
	//Delete a selected  marker 
	DeleteSingleMarker::removeMarker();
	
	
	
?>