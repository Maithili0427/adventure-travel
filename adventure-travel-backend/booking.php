<?php
header("Content-Type: application/json");
require __DIR__ . '/db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/src/PHPMailer.php';
require __DIR__ . '/src/SMTP.php';
require __DIR__ . '/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") { exit(); }

$activity = trim($_POST['activity'] ?? '');
$name = trim($_POST['name'] ?? '');
$mobile = trim($_POST['mobile'] ?? '');
$userEmail = trim($_POST['user_email'] ?? '');
$location = trim($_POST['location'] ?? '');
$date = trim($_POST['date'] ?? '');

if (!$activity || !$name || !$mobile || !$userEmail || !$location || !$date) {
    echo json_encode(["status"=>"error","message"=>"All fields required"]); exit();
}

// Insert booking
$stmt = $conn->prepare("INSERT INTO bookings (activity,name,mobile,email,location,date) VALUES (?,?,?,?,?,?)");
$stmt->bind_param("ssssss",$activity,$name,$mobile,$userEmail,$location,$date);
$stmt->execute();
$booking_id = $conn->insert_id;
$stmt->close();

// Send email (optional)
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host='smtp.gmail.com';
    $mail->SMTPAuth=true;
    $mail->Username='maithiliparsekar04@gmail.com';
    $mail->Password='topr evyi teyt ovvh';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port=587;

    $mail->setFrom('maithiliparsekar04@gmail.com','Eduventures');
    $mail->addAddress('maithiliparsekar04@gmail.com');
    $mail->addReplyTo($userEmail,$name);
    $mail->isHTML(true);
    $mail->Subject='New Booking Received';
    $mail->Body="<h3>Booking Details</h3>
        <p>Booking ID: {$booking_id}</p>
        <p>Activity: {$activity}</p>
        <p>Name: {$name}</p>
        <p>Mobile: {$mobile}</p>
        <p>Email: {$userEmail}</p>
        <p>Location: {$location}</p>
        <p>Date: {$date}</p>";
    $mail->send();
}catch(Exception $e){}

echo json_encode(["status"=>"success","message"=>"Booking submitted successfully","booking_id"=>$booking_id]);
$conn->close();
?>
