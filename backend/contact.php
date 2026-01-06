<?php
require "db.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/Exception.php";
require "PHPMailer/PHPMailer.php";
require "PHPMailer/SMTP.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $fullname = htmlspecialchars($_POST["fullname"]);
  $email    = htmlspecialchars($_POST["email"]);
  $subject  = htmlspecialchars($_POST["subject"]);
  $message  = htmlspecialchars($_POST["message"]);

  // ======================
  // SAVE TO DATABASE
  // ======================
  $stmt = $conn->prepare(
    "INSERT INTO contacts (fullname, email, subject, message)
     VALUES (?, ?, ?, ?)"
  );
  $stmt->bind_param("ssss", $fullname, $email, $subject, $message);
  $stmt->execute();

  // ======================
  // SEND EMAIL
  // ======================
  $mail = new PHPMailer(true);

  try {
    // SMTP SETTINGS (GMAIL)
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->Username   = "johnmarc145@gmail.com";   // YOUR EMAIL
    $mail->Password   = "ljti dmbn uxfq sztx";            // APP PASSWORD
    $mail->SMTPSecure = "tls";
    $mail->Port       = 587;

    // EMAIL HEADERS
    $mail->setFrom("johnmarc145@gmail.com", "Syner G Outsourcing");
    $mail->addAddress("johnmarc145@gmail.com"); // RECEIVER
    $mail->addReplyTo($email, $fullname);

    // EMAIL CONTENT
    $mail->isHTML(true);
    $mail->Subject = "New Contact Message: $subject";
    $mail->Body = "
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> $fullname</p>
      <p><strong>Email:</strong> $email</p>
      <p><strong>Subject:</strong> $subject</p>
      <p><strong>Message:</strong><br>$message</p>
    ";

    $mail->send();

    // ======================
    // AUTO-REPLY TO USER
    // ======================
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host       = "smtp.gmail.com";
    $reply->SMTPAuth   = true;
    $reply->Username   = "johnmarc145@gmail.com";
    $reply->Password   = "ljti dmbn uxfq sztx";
    $reply->SMTPSecure = "tls";
    $reply->Port       = 587;

    $reply->setFrom("johnmarc145@gmail.com", "Syner G Outsourcing");
    $reply->addAddress($email, $fullname);

    $reply->isHTML(true);
    $reply->Subject = "We received your message";
    $reply->Body = "
      <p>Hello <strong>$fullname</strong>,</p>
      <p>Thank you for contacting Syner G Outsourcing Inc.</p>
      <p>We have received your message and will get back to you shortly.</p>
      <br>
      <p>Best regards,<br>Syner G Outsourcing Team</p>
    ";

    $reply->send();

    echo "<script>alert('Message sent successfully!'); window.history.back();</script>";

  } catch (Exception $e) {
    echo "<script>alert('Email failed: {$mail->ErrorInfo}'); window.history.back();</script>";
  }

  $stmt->close();
  $conn->close();
}
?>
