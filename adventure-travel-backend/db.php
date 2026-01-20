<?php
$host = "127.0.0.1";   // BEST for Windows + XAMPP
$user = "root";
$pass = "";
$db   = "eduventures";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
