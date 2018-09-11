<?php
 Class InsertNewMarker
 {
	 
	 
  // adds a new marker to SQL DB, triggered in js/addMarkerFromModa.js
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
   
    public static function addMarker()
    { 
	    global $conn;
	
	    //echo "Check</br>";
	    echo $_POST['markerName'] . " -> ";  
	    //echo "<br>";
	    echo $_POST['markerCoords'] . " -> ";    
	    //echo $_POST['markerInfo'] . " -> ";  
	    //echo $_POST['markerDescription'] . " -> ";  
		
		// parse $_POST['markerCoords'], which contains lat, lng to $lat and $lng;
		$cords = explode(",", $_POST['markerCoords']); //split coords in array[alt, lng]
		//echo "split " .$cords[0];
		$l = $cords[0] * 1.0;
		$l2 = $cords[1] * 1.0;

	    try {
            // prepare sql and bind parameters
            $stmt = $conn->prepare("INSERT INTO markers (name, lat, lng, hours,  description ) VALUES (:nameX, :latX, :lngX, :hoursX,  :descriptionX )");
            $stmt->bindParam(':nameX', $_POST['markerName']  );
            $stmt->bindParam(':latX', $l );
            $stmt->bindParam(':lngX',  $l2 );
			$stmt->bindParam(':hoursX', $_POST['markerInfo'] );
	        $stmt->bindParam(':descriptionX', $_POST['markerDescription'] );
			//$stmt->bindParam(':addressX', 'some');

			
            // insert a row			
            $stmt->execute();
            echo "New marker created successfully";
        } 
	    catch(PDOException $e) {
            echo "Error!!!: " . $e->getMessage();
        }
	
        $conn = null;

	}
   
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
 

  
 


}
?>