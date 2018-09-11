<?php
    include '../Classes/autoload.php';//uses autoload instead of manual includin each class-> Error if it is included in 2 files=only1 is accepted

	 //connects to SQL DB
     /* $singeltone= */ ConnectDB::getInstance();
	 
	 //CreateTableAndRecords::createTable();  //create a SQL table with PHP (can be used if u need to create a table for the fist time) and don't want to export/import
	 //CreateTableAndRecords::insertSampleRecords('my 22', 50.2727051, 28.661707, 'from 10 pm', 'nice'); // insert a sample record to SQL DB markers
	
	
	
	
	
	
	//Selecting markers
	$markers = new SelectFromMarkers();
	$markers->selectSqlMarkers();
?>