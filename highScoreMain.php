<!Doctype html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>DB vypisky</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<table class="main_table">
    <tr>
        <th class="table_th">Pos.</th>
        <th class="table_th">Username</th>
        <th class="table_th">Score</th>
    </tr>
    <?php
    $conn = mysqli_connect("localhost", "root", "", "highscore");
    if ($conn -> connect_error) {
        die("Connection failed: ". $conn-> connect_error);
    }

    $sql = "SELECT meno, score FROM top10 ORDER BY score DESC LIMIT 10";
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
</body>
</html>