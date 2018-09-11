<?php

 Class DeleteSingleMarker
 {
	 
	 
  // deletes a selected marker from SQL DB, triggered in js/storelocator_core.js.js by ($(document).on("click", '.del-marker', function())
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
   
    public static function removeMarker()
    { 
	    global $conn;
	
	    //echo "Check</br>";
	    //echo $_POST['markerID']; 
		$idM = $_POST['markerID'];
		echo $_POST['markername']; //echo marker name to alert  back in ajax if succesfull
		
        try {
            // sql to delete a record
            $sql = "DELETE FROM markers WHERE id=$idM";

            // use exec() because no results are returned
            $conn->exec($sql);
            echo " marker deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }		
	    
	
        $conn = null;

	}
   
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
  // END  // deletes a selected marker from SQL DB,

  
 


}
?>