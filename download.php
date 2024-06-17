<?php
require 'vendor/autoload.php';
require('fpdf/fpdf.php');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registrasi";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$type = $_GET['type'];
$sql = "SELECT * FROM pendaftaran ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $data = $result->fetch_assoc();

  if ($type == 'pdf') {
    // Generate PDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(40, 10, 'Data Pendaftaran');
    $pdf->Ln();
    $pdf->SetFont('Arial', '', 12);
    foreach ($data as $key => $value) {
      $pdf->Cell(40, 10, ucfirst($key) . ': ' . $value);
      $pdf->Ln();
    }
    $pdf->Output('D', 'pendaftaran.pdf');
  } elseif ($type == 'doc') {
    // Generate Word
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    $section = $phpWord->addSection();
    $section->addTitle('Data Pendaftaran', 1);
    foreach ($data as $key => $value) {
      $section->addText(ucfirst($key) . ': ' . $value);
    }
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment;filename="pendaftaran.docx"');
    header('Cache-Control: max-age=0');
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
    $objWriter->save('php://output');
  }
} else {
  echo "No data found.";
}
$conn->close();
?>
