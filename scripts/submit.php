<?php
  header('Content-Type: application/json');
  $user = 'username';
  $pass = 'password';
  try {
    if(!empty($_POST)) {      
      $dbh = new PDO('mysql:host=localhost;dbname=dbname', $user, $pass);
      
      $n4 = null;
      if(is_array($_POST['n4'])) {
        $n4 = formatColumnData($_POST['n4']);
      }
      $n3 = null;
      if(is_array($_POST['n3'])) {
        $n3 = formatColumnData($_POST['n3']);
      }
      $n2 = null;
      if(is_array($_POST['n2'])) {
        $n2 = formatColumnData($_POST['n2']);
      }
      $n1 = null;
      if(is_array($_POST['n1'])) {
        $n1 = formatColumnData($_POST['n1']);
      }
      $z = null;
      if(is_array($_POST['z'])) {
        $z = formatColumnData($_POST['z']);
      }
      $p1 = null;
      if(is_array($_POST['p1'])) {
        $p1 = formatColumnData($_POST['p1']);
      }
      $p2 = null;
      if(is_array($_POST['p2'])) {
        $p2 = formatColumnData($_POST['p2']);
      }
      $p3 = null;
      if(is_array($_POST['p3'])) {
        $p3 = formatColumnData($_POST['p3']);
      }
      $p4 = null;
      if(is_array($_POST['p4'])) {
        $p4 = formatColumnData($_POST['p4']);
      }
      
      $explanations = 'Agree with:' . "\n";
      if(is_array($_POST['agree'])) {
        foreach($_POST['agree'] as $argument) {
          $explanations .= $argument . "\n\n";
        }
      }
      $explanations .= 'Disagree with:' . "\n";
      if(is_array($_POST['disagree'])) {
        foreach($_POST['disagree'] as $argument) {
          $explanations .= $argument . "\n\n";
        }
      }
      
      $birth_year = (int) substr($_POST['year'], 0, 4);
      $gender = substr($_POST['gender'], 0, 1);
      $political_affiliation = $_POST['politics'];
      $religious_belief = $_POST['religion'];
      $ethnicity = $_POST['ethnicity'];
      $location = $_POST['location'];
      $comments = $_POST['comments'];
            
      $stmt = $dbh->prepare("INSERT INTO surveys (n4, n3, n2, n1, z, p1, p2, p3, p4, explanations, birth_year, gender, political_affiliation, religious_belief, ethnicity, location, comments) VALUES (:n4, :n3, :n2, :n1, :z, :p1, :p2, :p3, :p4, :explanations, :birth_year, :gender, :political_affiliation, :religious_belief, :ethnicity, :location, :comments)");
      $stmt->bindParam(':n4', $n4);
      $stmt->bindParam(':n3', $n3);
      $stmt->bindParam(':n2', $n2);
      $stmt->bindParam(':n1', $n1);
      $stmt->bindParam(':z', $z);
      $stmt->bindParam(':p1', $p1);
      $stmt->bindParam(':p2', $p2);
      $stmt->bindParam(':p3', $p3);
      $stmt->bindParam(':p4', $p4);
      $stmt->bindParam(':explanations', $explanations);
      $stmt->bindParam(':birth_year', $birth_year);
      $stmt->bindParam(':gender', $gender);
      $stmt->bindParam(':political_affiliation', $political_affiliation);
      $stmt->bindParam(':religious_belief', $religious_belief);
      $stmt->bindParam(':ethnicity', $ethnicity);
      $stmt->bindParam(':location', $location);
      $stmt->bindParam(':comments', $comments);
      $stmt->execute();
      
      $return = array('status' => 'success');
      
      echo json_encode($return);
    }
  } catch (PDOException $e) {
    print "Database Error: " . $e->getMessage();
    die();
  }
  
  function formatColumnData($cells) {
    $formatted = '';
    foreach($cells as $cell) {
      $begin = strpos($cell, '(');
      $end = strpos($cell, ')');
      if($begin !== false && $end !== false) {
        $formatted .= substr($cell, $begin + 1, $end - $begin - 1) . ',';
      }
    }
    $formatted = substr($formatted, 0, -1);
    return $formatted;
  }
?>