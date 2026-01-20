<?php
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/src/PHPMailer.php';
require __DIR__ . '/src/SMTP.php';
require __DIR__ . '/src/Exception.php';
require __DIR__ . '/db.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../index.html");
    exit();
}

// ===== Sanitize Input =====
$activity  = trim($_POST['activity'] ?? '');
$name      = trim($_POST['name'] ?? '');
$mobile    = trim($_POST['mobile'] ?? '');
$userEmail = trim($_POST['user_email'] ?? '');
$location  = trim($_POST['location'] ?? '');
$date      = trim($_POST['date'] ?? '');

// ===== Basic Validation =====
if (
    empty($activity) || empty($name) || empty($mobile) ||
    empty($userEmail) || empty($location) || empty($date)
) {
    die("All fields are required.");
}

try {
    // ===== DB INSERT =====
    $stmt = $conn->prepare(
        "INSERT INTO bookings (activity, name, mobile, email, location, date)
         VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("ssssss", $activity, $name, $mobile, $userEmail, $location, $date);
    $stmt->execute();
    $stmt->close();

    // ===== SEND EMAIL (NON-BLOCKING UX) =====
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
        $mail->addAddress('maithiliparsekar04@gmail.com'); // Admin
        $mail->addReplyTo($userEmail, $name);

        // Optional: send copy to user
        // $mail->addAddress($userEmail);

        $mail->isHTML(true);
        $mail->Subject = 'New Booking Received - Eduventures';
        $mail->Body = "
            <h3>New Booking Details</h3>
            <p><b>Activity:</b> {$activity}</p>
            <p><b>Name:</b> {$name}</p>
            <p><b>Mobile:</b> {$mobile}</p>
            <p><b>Email:</b> {$userEmail}</p>
            <p><b>Location:</b> {$location}</p>
            <p><b>Date:</b> {$date}</p>
        ";

        $mail->send();
    } catch (Exception $e) {
        // Email failed but booking saved – ignore
    }

    echo json_encode([
    "status" => "success",
    "message" => "Booking submitted successfully"
]);
exit();


} catch (Exception $e) {
    echo "Booking failed. Please try again later.";
}

$conn->close();
?>
