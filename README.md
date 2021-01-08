# InframiesTD
This is a space themed tower defence game that uses Phaser 3 as the framework.

[Try it out here](https://mirzi1.github.io/InframiesTD/)

![Screenshot](https://i.imgur.com/tcFc2JA.gif)
![Screenshot2](https://i.imgur.com/CKeVi9M.jpg)
![Screenshot3](https://i.imgur.com/5GT4OZ6.png)
![Screenshot4](https://i.imgur.com/jaBla4b.png)

The game features:
* 3 levels
* 8 towers with upgrades
* 8 types of enemies
* High score database

# I am planning to rewrite some parts of the code for better performance, less bugs, and also add a few needed features. Version 1.0 will still be available in a separate repo.
TODO:
* Rewrite how the levels are handled - load images, maps and waves into arrays from a text file - possibility of custom maps?
* Extend enemy and tower classes instead of the current spaghetti mess that's tanking performance
* Make upgrades a separate thing - upgrade tokens drop every 50 enemy kills or so
* Make armored enemies not targetable by non-piercing turrets
* Add 3 difficulty options
* Add option to speed up time / automatically jump to next wave
* Make the game more customizable - change enemy and tower stats in a menu for a custom campaign
* Add and change sound effects
* Add an easter egg or two
* Add more enemy types
* Make towers display their range when placed / hovering with mouse
* Add a mobile friendly user interface
* Replay system?

# How to play offline
The high score database only works if you have a database server running. This can be done locally with xampp.

* Install [XAMPP](https://www.apachefriends.org/index.html) (or one of the many alternatives)
* Clone the entire repository into C:\xampp\htdocs or \opt\lampp\htdocs
* Start Apache and MySQL server
* Open up a web browser
* Go to localhost/InframiesTD/index.php
* Take in the smell of spaghetti code

# Credits
**Developers:**
* [mirzi](https://github.com/mirzi1) - Game programming
* [Eldii](https://github.com/UKF-MarekKosznovszki) - Database and backend programming
* [ROGERsvk](https://github.com/ukf-jozefkosut) - Graphic design, UI design


**Music:**
* Timesplitters 2 - Astrolander
* Unreal Tournament - Foregone Destruction
* Need for Speed III - Hydrus 606
* Need For Speed III - Romulus 3 (Mellow Sonic 2nd Remix)
* Timesplitters Future Perfect - Spaceport
* Timesplitters 2 - Ice Station
* Re-Volt - Credits
* Timesplitters 2 - Mission Success
* Timesplitters 2 - Mission Failed


**Sound effects:**
* [freesound.org](https://freesound.org/)


**Game engine:**
* [Phaser 3](http://phaser.io/)
