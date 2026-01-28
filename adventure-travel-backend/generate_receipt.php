<?php
require('fpdf.php');

if (!isset($_GET['booking_id'])) die("Invalid Request");

$booking_id = $_GET['booking_id'];
require 'db.php';

// Fetch booking
$stmt = $conn->prepare("SELECT * FROM bookings WHERE id = ?");
$stmt->bind_param("i", $booking_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) die("Booking not found");
$data = $result->fetch_assoc();

// Safe values (avoid empty fields)
$persons   = !empty($data['persons']) ? $data['persons'] : '-';
$timeSlot  = !empty($data['time_slot']) ? $data['time_slot'] : '-';
$message   = !empty($data['message']) ? $data['message'] : '-';

// Date formatting
$activityDate = date("d M Y", strtotime($data['date']));

// ===== PDF START =====
$pdf = new FPDF('P','mm','A4');
$pdf->AddPage();

// ===== PREMIUM BACKGROUND =====
$pdf->SetFillColor(245,245,250);
$pdf->Rect(0,0,210,297,'F');

// ===== HEADER BOX =====
$pdf->SetFillColor(77,104,222);
$pdf->Rect(0,0,210,40,'F');

// Logo
$logoPath = '../assets/logo.png';
if(file_exists($logoPath)) $pdf->Image($logoPath,10,5,30);

// Title
$pdf->SetFont('Arial','B',20);
$pdf->SetTextColor(255,255,255);
$pdf->Cell(0,40,'EDUVENTURES - Booking Receipt',0,1,'C');
$pdf->Ln(5);

// ===== DETAILS TABLE =====
$pdf->SetFont('Arial','B',12);
$pdf->SetTextColor(50,50,50);
$pdf->SetFillColor(230,230,250);
$pdf->SetDrawColor(77,104,222);

$fields = [
    'Booking ID'        => $data['id'],
    'Activity'          => $data['activity'],
    'Name'              => $data['name'],
    'Mobile'            => $data['mobile'],
    'Email'             => $data['email'],
    'Location'          => $data['location'],
    'No. of Persons'    => $persons,
    'Time Slot'         => $timeSlot,
    'Activity Date'     => $activityDate
];

foreach($fields as $label => $value){
    $pdf->Cell(60,10,$label,1,0,'L',true);
    $pdf->Cell(0,10,$value,1,1);
}

// ===== MESSAGE BOX =====
$pdf->Ln(4);
$pdf->SetFont('Arial','B',12);
$pdf->SetFillColor(230,230,250);
$pdf->Cell(0,10,'Special Request / Message',1,1,'L',true);

$pdf->SetFont('Arial','',11);
$pdf->MultiCell(0,10,$message,1);

// ===== STATUS BOX =====
$pdf->Ln(6);
$pdf->SetFont('Arial','B',14);
$pdf->SetTextColor(34,197,94);
$pdf->SetFillColor(200,255,200);
$pdf->Cell(0,12,'STATUS: BOOKING CONFIRMED',1,1,'C',true);

// ===== THANK YOU =====
$pdf->Ln(8);
$pdf->SetFont('Arial','I',12);
$pdf->SetTextColor(50,50,50);
$pdf->Cell(0,10,'Thank you for choosing Eduventures!',0,1,'C');

// ===== STAMP =====
$stampPath = '../assets/stamp.png';
if(file_exists($stampPath)) $pdf->Image($stampPath,150,220,40);

// ===== FOOTER BLUE BAND =====
$pdf->SetFillColor(77,104,222);
$pdf->Rect(0,270,210,27,'F');

// ===== OUTPUT =====
$pdf->Output("D","Eduventures_Receipt_".$data['id'].".pdf");
exit();
