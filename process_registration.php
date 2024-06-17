<?php
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

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $birthplace = $_POST['birthplace'];
  $birthdate = $_POST['birthdate'];
  $ktp = addslashes(file_get_contents($_FILES['ktp']['tmp_name']));
  $kk = addslashes(file_get_contents($_FILES['kk']['tmp_name']));
  $akta = addslashes(file_get_contents($_FILES['akta']['tmp_name']));

  $sql = "INSERT INTO pendaftaran (name, email, birthplace, birthdate, ktp, kk, akta) 
          VALUES ('$name', '$email', '$birthplace', '$birthdate', '$ktp', '$kk', '$akta')";

  if ($conn->query($sql) === TRUE) {
    $response = [
      "status" => "success",
      "message" => "New record created successfully",
      "data" => [
        "name" => $name,
        "email" => $email,
        "birthplace" => $birthplace,
        "birthdate" => $birthdate
      ]
    ];
  } else {
    $response = [
      "status" => "error",
      "message" => "Error: " . $sql . "<br>" . $conn->error
    ];
  }
  
  echo json_encode($response);
  $conn->close();
  exit;
}

// Fetch the latest entry for download
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $sql = "SELECT * FROM pendaftaran ORDER BY id DESC LIMIT 1";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $response = $result->fetch_assoc();
  } else {
    $response = [
      "status" => "error",
      "message" => "No data found"
    ];
  }
  
  echo json_encode($response);
  $conn->close();
  exit;
}
?>
