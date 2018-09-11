<?php
//Just for test, this class creates a sql table with given rows(can be used if u need to create a table for the fist time) and insert a sample record
 Class CreateTableAndRecords
 {
	 
	 
  //create a SQL table with PHP (can be used if u need to create a table for the fist time) and don't want to export/import
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
    
	 public static function createTable()
     { 
	 	 global $conn; //must be specified that we use global $conn (from ConnectDB->connectDB()) otherwise $conn is not seen

	 
	     // sql to create table 
         $sql = "CREATE TABLE `markers` (
         `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
         `name` VARCHAR( 60 ) NOT NULL ,
         `address` VARCHAR( 80 ) NOT NULL ,
         `lat` FLOAT( 10, 6 ) NOT NULL ,
         `lng` FLOAT( 10, 6 ) NOT NULL,
         `hours` VARCHAR( 80 ) NOT NULL ,
         `description` VARCHAR( 80 ) NOT NULL 
         ) ENGINE = MYISAM" ;


        try{
            if ($conn->query($sql) === TRUE) {
                echo "Table MyGuests created successfully"; // just for testing, must be commented  otherwise ajax request will be screwed
           } else {
                echo "Error creating table: " . $conn->error;
           }
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        } 
	 }
	
	
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
  //



  
  
  
   //insert rows to SQL table with PHP
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
    
	 public static function insertSampleRecords($firstname, $latt, $lonn, $my_hours, $my_descr )
     { 
	 global $conn; //must be specified that we use global $conn (from ConnectDB->connectDB()) otherwise $conn is not seen
	     //INSERT records
         try {
   
             // prepare sql and bind parameters
             $stmt = $conn->prepare("INSERT INTO markers (name, lat, lng, hours, description) 
             VALUES (:firstname, :lat, :lon, :myHours, :myDescription)");
             $stmt->bindParam(':firstname', $firstname);
             $stmt->bindParam(':lat', $latt);
             $stmt->bindParam(':lon', $lonn);
	         $stmt->bindParam(':myHours', $my_hours);
	         $stmt->bindParam(':myDescription', $my_descr);

            // insert a values to row
			/*
            $firstname = "my place";
            $latt = 50.2627051;
            $lonn = 28.661707;
	        $my_hours = "from 10 pm";
	        $my_descr = "nice palce to go";
			*/
            $stmt->execute();

           // insert another row
	
           echo "New records created successfully";
       } catch(PDOException $e) {
           echo "Error: " . $e->getMessage();
       } 
       // END INSERT records	
	 }
	
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
  //

}
?>