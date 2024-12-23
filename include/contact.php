<?php
if($_POST)
{
    $to_Email       = "aycarhay@gmail.com"; //Replace with recipient email address
    $subject        = 'CONSULTA WEB'.$_POST["userName"]; //Subject line for emails
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    
        //exit script outputting json data
        $output = json_encode(
        array(
            'type'=>'error', 
            'text' => 'Request must come from Ajax'
        ));
        
        die($output);
    } 

    //check $_POST vars are set, exit if any missing
    if(!isset($_POST["userName"]) || !isset($_POST["userEmail"]) || !isset($_POST["userPhone"]) || !isset($_POST["userMessage"]))
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Input fields are empty!'));
        die($output);
    }

    //Sanitize input data using PHP filter_var().
    $user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
    $user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
    $user_Phone       = filter_var($_POST["userPhone"], FILTER_SANITIZE_STRING);
    $user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_Name)<4) // If length is less than 4 it will throw an HTTP error.
    {
        $output = json_encode(array('type'=>'error', 'text' => 'El Nombe es muy corto o esta incompleto!'));
        die($output);
    }
    if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) //email validation
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Por favor ingrasa un mail valido!'));
        die($output);
    }
    if(!is_numeric($user_Phone)) //check entered data is numbers
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Solo se admiten numeros en el telefono!'));
        die($output);
    }
    if(strlen($user_Message)<5) //check emtpy message
    {
        $output = json_encode(array('type'=>'error', 'text' => 'El mensaje es muy corto. Contanos algo mas!'));
        die($output);
    }
    
    //proceed with PHP email.

    /*
    Incase your host only allows emails from local domain, 
    you should un-comment the first line below, and remove the second header line. 
    Of-course you need to enter your own email address here, which exists in your cp.
    */
    //$headers = 'From: your-name@YOUR-DOMAIN.COM' . "\r\n" .
    $headers = 'From: '.$user_Email.'' . "\r\n" . //remove this line if line above this is un-commented
    'Reply-To: '.$user_Email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
        // send mail
    $sentMail = @mail($to_Email, $subject, $user_Message .'  -'.$user_Name, $headers);
    
    if(!$sentMail)
    {
        $output = json_encode(array('type'=>'error', 'text' => 'el mensaje no se ha podido enviar.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Ah!! '.$user_Name .' tu mensaje nos a sido enviado!'));
        die($output);
    }
}
?>		