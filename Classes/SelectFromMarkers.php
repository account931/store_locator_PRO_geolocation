<?php
 Class SelectFromMarkers
 {
	 
	 
  // selects all markers stored in SQL DB markers and JSON echo it
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
   
    public function selectSqlMarkers()
    { 
	global $conn;
	try {
    
        $stmt = $conn->prepare("SELECT id, name, lat, lng, hours, description FROM markers"); 
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
		$rows = $stmt->fetchAll();

		/*
		foreach($rows as $v){
			echo $v->name;
		}
		*/
		
		$myJSONString = json_encode($rows);
		echo $myJSONString;
    
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;

	}
   
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
 

  
    // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
   
    public function echoJsonMarkers()
    { 
	}
   
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
 


}
?>