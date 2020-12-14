<?php

include_once 'dbh.inc.php';

$meno = $_POST['playerName'];
$score = $_POST['playerScore'];

$sql = "INSERT INTO hs(meno, score) VALUES('$meno','$score');";
$result = mysqli_query($conn, $sql);

header("Location: highScoreMain.php");