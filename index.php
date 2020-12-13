<!DOCTYPE html>
<html lang="sk-SK">
<head>
	<link rel="shortcut icon" href="favicon.ico"/>
    <title>InframiesTD</title>
    <meta charset="utf-8">

    <script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>
    <script src="scripts/game.js"></script>

    <style>
        body{
            font-family: Arial,sans-serif;
            background-color: #140A46;
            margin:0;
            text-align:center;
            color: #FFF;
        }
        #main-game{
            margin:auto;
        }
        @font-face {
            font-family: font1;
            src: url('assets/fonts/hachicro.ttf');
        }
        @font-face {
            font-family: font2;
            src: url('assets/fonts/Orbitron.ttf');
        }
    </style>
</head>
<body>
    <!-- game -->
    <div id="main-game">
    </div>

    <!-- php only -->
    <div id="hsForm">
    </div>

    <button>
    <a href="http://localhost/inframiesTD/highScoreMain.php" target="_blank">High Score!</a>
    </button>
</body>
</html>