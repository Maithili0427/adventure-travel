<?php
header("Content-Type: application/json");
require __DIR__ . '/db.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/src/PHPMailer.php';
require __DIR__ . '/src/SMTP.php';
require __DIR__ . '/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") { exit(); }

$activity   = trim($_POST['activity'] ?? '');
$name       = trim($_POST['name'] ?? '');
$mobile     = trim($_POST['mobile'] ?? '');
$userEmail  = trim($_POST['user_email'] ?? '');
$location   = trim($_POST['location'] ?? '');
$date       = trim($_POST['date'] ?? '');
$persons    = trim($_POST['persons'] ?? '');
$time_slot  = trim($_POST['time_slot'] ?? '');
$message    = trim($_POST['message'] ?? '');

if (
    !$activity || !$name || !$mobile || !$userEmail ||
    !$location || !$date || !$persons || !$time_slot
) {
    echo json_encode([
        "status" => "error",
        "message" => "All required fields must be filled"
    ]);
    exit();
}

// Insert booking
$stmt = $conn->prepare("
    INSERT INTO bookings
    (activity,name,mobile,email,location,date,persons,time_slot,message)
    VALUES (?,?,?,?,?,?,?,?,?)
");

$stmt->bind_param(
    "ssssssiss",
    $activity,
    $name,
    $mobile,
    $userEmail,
    $location,
    $date,
    $persons,
    $time_slot,
    $message
);

$stmt->execute();
$booking_id = $conn->insert_id;
$stmt->close();

// Send email (optional)
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'maithiliparsekar04@gmail.com';
    $mail->Password = 'topr evyi teyt ovvh';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('maithiliparsekar04@gmail.com', 'Eduventures');
    $mail->addAddress('maithiliparsekar04@gmail.com');
    $mail->addReplyTo($userEmail, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New Booking Received';

    $mail->Body = "
        <h3>Booking Details</h3>
        <p><strong>Booking ID:</strong> {$booking_id}</p>
        <p><strong>Activity:</strong> {$activity}</p>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Mobile:</strong> {$mobile}</p>
        <p><strong>Email:</strong> {$userEmail}</p>
        <p><strong>Location:</strong> {$location}</p>
        <p><strong>Date:</strong> {$date}</p>
        <p><strong>Persons:</strong> {$persons}</p>
        <p><strong>Time Slot:</strong> {$time_slot}</p>
        <p><strong>Message:</strong> {$message}</p>
    ";

    $mail->send();
} catch (Exception $e) {
    // Email failure ignored safely
}

echo json_encode([
    "status" => "success",
    "message" => "Booking submitted successfully",
    "booking_id" => $booking_id
]);

$conn->close();
?>
