<?php
 Class ConnectDB
 {
	 
	 
    //singletone constructor
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    protected static $_instance;  // class instance
  
    public static function getInstance()// get  a class instance
    { 
         if (self::$_instance === null){ // if  class instance  does  not  exist
             self::$_instance = new self;  // create  new  class instance
         } 
		 
         return self::$_instance; // returen  class instance
     }
	 
    //constructor
    private  function __construct(){ 
        $this->connectDB(); //call  this  Class   function which  creates connection  to  DB 
    }
	
    //prohibit  object cloning by  "private "
     private function __clone() {}
 
    //prohibit  object cloning by  "private "       
    private function __wakeup() {}
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
    //end  singletone constructor



  
  
  
    // connection, called in constructor, singletone
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function connectDB()
    { 
   
        global $conn; //must be specified that we use global $conn () otherwise not seen
        $servername = "127.0.0.1";
        $username = "root";
        $password = ""; //for local storage password must be void, otherwise causes Error "sqlstatehy000-1045-access-denied-for-user-usernamelocalhost"
		
        try {
            $conn = new PDO("mysql:host=$servername;dbname=store_locator", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "</br>Connected successfully to  DataBase _zzz";   //turn off not to screw JSon and cause no Error
            $_POST['connection_flag']='connection_flag_OK';
	    $conn->exec("set names utf8"); //setting UT8 is a must, without it in some browser cyrillyc is corrupted
			return true;
        } catch(PDOException $e) {
             echo "</br>Connection failed: " . $e->getMessage();
			 return false;
        }
    } //END function 
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************

	
	
	
	
	
	
//sample -NOT USED NOW!!!!!!!!!!!!!!!!!!!!!!!!
// **************************************************************************************
// **************************************************************************************
//                                                                                     **  
  public function save_to_DB()
  { 
    global $conn;
    if ($_POST['connection_flag']=='connection_flag_OK')
    {
    
      try {
          echo"</br> Starting  saving  to  DataBase";
                     
          //START INSERTING VALUES
          $sth=$conn->prepare("INSERT INTO mod_feedback (fio,email,phone,descr,dt,ip) VALUES (:fio, :email, :phone, :descr,:dt,:ip) ");
          $sth->bindValue(':fio',$_POST['namePH']);   
          $sth->bindValue(':email',$_POST['emailPH']   );
          $sth->bindValue(':phone',$_POST['phonePH']   );
          $sth->bindValue(':descr',$_POST['descriptionPH']);
          $sth->bindValue(':dt',date("Y-m-d")." ".date("h:i:s") );
          $sth->bindValue(':ip',$_SERVER['SERVER_ADDR']);
          $sth->execute();
          echo"</br> Saved";
          $_POST['DBsave_flag']='DBsaved_flag_OK';
          }
      catch(PDOException $e)
          {
           echo "</br>Saving failed: " . $e->getMessage();
          }
     } else
     {
      echo"</br> Failed  saving  to  DB";   
     }
     //end if($_POST['connection_flag']=='connection_flag_OK')
  } //END function 
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
//
}
?>
