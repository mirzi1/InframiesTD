<!Doctype html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>HALL OF FAME</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<h1 class='title'>HALL OF FAME</h1>
<table class="main_table">
    <tr>
        <th class="table_th">POS</th>
        <th class="table_th">NAME</th>
        <th class="table_th">SCORE</th>
    </tr>
    <?php
    $conn = mysqli_connect("localhost", "root", "", "highscore");
    if ($conn -> connect_error) {
        die("Connection failed: ". $conn-> connect_error);
    }

    $sql = "SELECT meno, score FROM hs ORDER BY score DESC LIMIT 50";
    $result = $conn -> query($sql);

    if ($result -> num_rows > 0) {
        $i = 1;
        while ($row = $result -> fetch_assoc()) {
            echo "<tr><td>". $i."</td><td>" . $row['meno'] . "</td><td>" . $row['score'] . "</td></tr>";
            $i++;
        }
        echo "</table>";
    } else {
        echo "0 results";
    }

    $conn -> close();
    ?>
</table>

<p class='center'>THANKS FOR PLAYING INFRAMIESTD!</p>
</body>
</html>