//ayy welcome to my first thing in javascript
//this toilet looking source code is what powers InframiesTD, a tower defence game that uses phaser framework
//made by mirzi, of course
//full credits are displayed when you start the game in a browser
let config = {
    type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        parent: 'main-game',
        width: 1280,
        height: 720,
    },
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let graphics;
let waveText;
let hpText;
let moneyText;
let nextWaveButton;
let restartButton;
let musicButton;
let soundButton;
let fullscreenButton;
let background;
let path;
let selector;
let selectedImg;
let selectedInfo;
let waveInfo;
let scoreText;
let uitop;
let uileft;
let blinkSpaces = false;
let tw;
let add;
let start;
let finish;
let globalTime;
let fsrect;
let creditsText;
let fsText;
let nukeIcon;
let nukeReady = true;
let camera;
let gameInProgress = false;
let canGoToNextLevel = true;
let music;
let fsmusic;
let music_enabled = true;
let sound_enabled = true;

let difficulty_str = "MEDIUM";

let emitter_upgrade;
let emitter_enemies;
//let emitter_victory;
let emitter_thermal;
let emitter_thermal2;
let emitter_end;

let cross = [];
let priceText = [];


let SCORE = 0;
let LEVEL = -2;
let WAVE = 0;
let HEALTH;
let MONEY;
let STARTHEALTH = 50;
const STARTMONEY = 400;
let WAVE_REWARD = 600;
let SELECTED_TOWER = 1;

let WAVE_SPEEDS = [150, 125, 100];
let WAVE_SPEED = 150;
let MIN_WAVE_SPEED = 20;
let NUKE_TIMER = 10000;

const bigfont = { font: " 16px font1", fill: "#3CCEFF", boundsAlignH: "center", boundsAlignV: "middle" };
const bigfont_white = { font: "16px font1", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
const bigfont_white_right = { font: "16px font1", fill: "#fff", align:"right", boundsAlignH: "center", boundsAlignV: "middle" };
const selectedfont = { font: "12px font2", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont_big_left = { font: "18px font2", fill: "#fff", align:"left",boundsAlignH: "center", boundsAlignV: "middle" };
const textfont_big = { font: "18px font2,sans-serif", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont_big_right = { font: "18px font2", fill: "#fff", align:"right", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont_bigger = { font: "50px font1", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont_superbig = { font: "100px font1", fill: "#fff", align:"center", boundsAlignH: "center", boundsAlignV: "middle" };

const HUD_ICON_SCALE = 0.5;

const ENEMY_HEALTH = [50,300,700,1,300,700,50000,100000];
let ENEMY_SPEED = [1/8000,1/10000,1/15000,1/4000,1/10000,1/15000,1/22000,1/26000];
const ENEMY_REWARD = [8,18,28,1,22,32,2000,10000];
let LEVEL_SPEED_MODIFIER = [0.7, 0.8, 0.9];

let waveInProgress = false;
let nextEnemy = 0;
let waveIndex = 0;

const CREDITS = ['InframiesTD v1.2.3\n\n Credits: \n mirzi - Game programming\nELdii - Database and backend programming\nROGERsvk - Graphic design, UI design\n' +
                '\nMusic used:\nTimesplitters 2 - Astrolander\nUnreal Tournament - Foregone Destruction\nNeed for Speed III - Hydrus 606\nNeed For Speed III - Romulus 3 (Mellow Sonic 2nd Remix)\nTimesplitters Future Perfect - Spaceport\nTimesplitters 2 - Ice Station\nRe-Volt - Credits\nTimesplitters 2 - Mission Success\nTimesplitters 2 - Mission Failed\n' +
                '\nSound effects are mostly mashups from freesound.org.\nSource code is available at github.com/mirzi1/InframiesTD\nShoutouts to the Phaser devs. This game wouldn\'t be a reality without their game framework.\n\n']

const TOWER_PRICES = [400,550,600,750,650,750,2500,3500];

let UPGRADE_MULTIPLIER = 1;

let TOWER_SPEED = [700,1700,2000,3000,1000,1100,100,1000,
                    500,1300,1500,2500,700,900,70,1000];
let TOWER_RANGE = [350,250,300,2000,300,500,500,2000,
                    350,250,400,2000,350,600,550,2000];
const TOWER_DESCRIPTION = ['Laser - Basic and all around good tower.',
                            'Electric - Slows enemies on hit.',
                            'Rocket - Slow but lethal, explosions deal area of effect damage.',
                            'Rail - Big damage, slow firing rate, no range limit.',
                            'Shotgunner - Low damage, multiple projectiles',
                            'Thermal - Deals damage to shielded enemies and pierces through them.',
                            'Rapid - Expensive, but has amazing firerate.',
                            'Nuke - Vaporizes everything except bosses, 30 second cooldown'];
const TOWER_UPGRADE_DESCRIPTION = [ '+firerate, damage shielded enemies',
                                    '+firerate, enemies become even slower',
                                    '+firerate, +range, +damage, damage shielded enemies',
                                    '+firerate, piercing projectiles',
                                    '+firerate, +range, +damage, firerate roughly doubles',
                                    '+firerate, +range',
                                    '+firerate, +range, +damage',
                                    ''];

const TOWER_DAMAGE = [50,0,100,500,10,40,35,1000,
                      70,0,100,500,15,70,55,1000,
                      15, 30];
let PROJECTILE_SPEED = [1000,500,500,4000,1000,800,700,1000,
                          1000,600,600,5000,1200,1000,700,1000,
                          0, 0];
let PROJECTILE_LIFESPAN = [280,500,1500,1000,300,500,600,500,
                             280,500,1500,1000,300,500,600,500,
                             500, 500];
let TOWER_FREEZETIME = 800;

const GRID_W = 50;
const GRID_H = 50;

let level1 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let level2 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0, 0,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let level3 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1],
                    [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let times = [];
let prevtime = 0;

let prevwavetime = 0;
let timestring = "";

const MAXWAVES = [30, 40, 50];

const WAVE_DESCRIPTION = [
        'Welcome to InframiesTD! Select a tower from the menu on the left and click on any valid spots to place it.\n Press "next wave" when you are ready.',
        'Earn money for better towers and upgrades by killing enemies. Tougher enemies = bigger rewards!',
        '',
        '',
        'Armored attackers incoming!',
        '',
        '',
        'Quick units are attacking next wave, shotgunners are one of their many weaknesses.',
        '',
/*10*/  'Time to up the ante!',
        '',
        '',
        '',
        'A huge swarm of quick enemies is coming!',
        'Shielded enemies can only take damage from Thermal or upgraded Laser and Rocket towers.',
        'Shielded enemies are very dangerous, make sure you have a few towers that are capable of taking them down.\nOtherwise you may have a few problems in later waves.',
        '',
        'A bunch of shielded enemies are on the way.',
        'And they don\'t stop comming... And they don\'t stop comming... And they don\'t stop comming...\n And they don\'t stop comming... And they don\'t stop comming... And they don\'t stop comming...',
/*20*/  '',
        '',
        'Have a freebie.',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
/*30*/  'This is the last wave for level 1. Prepare for a boss battle!',
        'Good job!',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
/*40*/  'Last wave for Level 2, this is going to be a hard one.',
        'That wasn\'t so hard was it?',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'You see a massive shining figure in the distance...',
/*50*/  'End of the line. The robot leader has no mercy!',
        'gg'
];

/*
enemies:
1 - default
2 - strong
3 - armored
4 - quick
5 - strong shielded
6 - armored shielded
7 - boss 1
8 - final boss
 */
const waves = [ [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
                [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,2,0,2],
                [1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,2,0,2],
                [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,2,0,1,0,2,0,1],
                [3,0,0,0,0,1,1,3,1,1],
                [3,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,3,0,0,0,3],
                [3,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,3,3],
                [4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
/*10*/          [1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2],
                [2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,0,0,2],
                [3,0,3,0,3,0,3,0,3,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [5,6],
                [3,3,0,0,0,0,1,2,3,4,0,0,0,0,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,0,0,0,0,3,3,3,0,0,0,0,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,0,0,0,0,1,2,3,4,0,0,0,0,1,2,3,4,0,0,0,0,3,3,3,3],
                [3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,0,0,0,0,3,4,3,4,3,4],
                [5,5,5,5,5,5,5,5,5,0,0,5,0,0,5,0,0,5,0,0,5,0,0,5,0,0,5,0,0,5,0,0,6,0,0,6,0,0,6,0,0,6,0,0,6,0,0,6,0,0,6,0,0,6],
                [2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],
/*20*/          [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [3,6,3,6,0,0,0,0,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,3,6,3,6],
                [5,6,5,6,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6],
                [6,6,6,6,0,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0,2,5,3,4,6,0,0,0],
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
/*30*/          [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
                [4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,3,6,3,6,3,6,3,6],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
                [6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
/*40*/          [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,6,6,6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,6,6,6,6,6],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,],
                [5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
                [1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,7,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
                [2,0,5,5,6,0,1,3,6,4,6,0,3,4,4,2,6,2,3,6,1,5,0,1,0,5,0,3,1,1,0,6,1,5,1,1,3,6,0,3,5,0,4,5,0,4,4,1,1,4,5,0,6,1,6,6,5,4,5,5,5,5,0,3,4,0,2,6,5,5,4,4,2,3,3,1,5,2,3,4,3,3,4,4,5,2,5,0,1,5,4,1,2,5,4,2,4,5,0,0,2,0,5,5,6,0,1,3,6,4,6,0,3,4,4,2,6,2,3,6,1,5,0,1,0,5,0,3,1,1,0,6,1,5,1,1,3,6,0,3,5,0,4,5,0,4,4,1,1,4,5,0,6,1,6,6,5,4,5,5,5,5,0,3,4,0,2,6,5,5,4,4,2,3,3,1,5,2,3,4,3,3,4,4,5,2,5,0,1,5,4,1,2,5,4,2,4,5,0,0],
                [2,2,3,2,6,6,2,3,2,5,4,2,6,4,3,4,3,2,5,4,4,3,6,6,5,5,2,2,2,5,5,3,4,6,3,5,2,5,5,6,6,3,4,2,2,6,6,5,2,6,3,2,2,2,3,2,6,3,5,6,3,4,2,6,3,2,6,3,6,2,5,5,4,6,3,6,3,5,2,4,5,4,5,5,5,2,6,2,6,2,5,5,6,5,3,2,6,6,3,5,2,2,3,2,6,6,2,3,2,5,4,2,6,4,3,4,3,2,5,4,4,3,6,6,5,5,2,2,2,5,5,3,4,6,3,5,2,5,5,6,6,3,4,2,2,6,6,5,2,6,3,2,2,2,3,2,6,3,5,6,3,4,2,6,3,2,6,3,6,2,5,5,4,6,3,6,3,5,2,4,5,4,5,5,5,2,6,2,6,2,5,5,6,5,3,2,6,6,3,5],
                [6,6,5,5,5,5,6,0,0,6,6,6,6,6,5,6,6,0,0,0,5,5,5,6,5,6,5,0,6,0,0,5,5,0,5,5,6,5,5,6,5,6,6,5,0,0,6,5,6,5,0,0,5,0,6,6,5,6,5,5,5,6,0,6,6,0,5,5,0,6,5,6,5,6,0,6,5,0,5,6,0,5,0,6,6,5,0,0,5,6,5,0,5,6,0,0,6,6,0,6,6,6,5,5,5,5,6,0,0,6,6,6,6,6,5,6,6,0,0,0,5,5,5,6,5,6,5,0,6,0,0,5,5,0,5,5,6,5,5,6,5,6,6,5,0,0,6,5,6,5,0,0,5,0,6,6,5,6,5,5,5,6,0,6,6,0,5,5,0,6,5,6,5,6,0,6,5,0,5,6,0,5,0,6,6,5,0,0,5,6,5,0,5,6,0,0,6,6,0,6],
                [0,5,0,5,0,0,5,0,0,5,0,5,0,0,0,5,5,5,0,0,5,0,5,0,0,0,5,5,5,0,0,5,5,5,5,0,5,0,5,5,0,0,5,5,0,5,5,5,0,0,5,5,5,5,0,0,0,0,0,5,5,0,5,5,5,5,5,0,5,5,0,5,0,5,5,0,5,0,0,5,5,0,0,0,0,5,5,0,5,0,5,5,5,0,0,0,5,0,5,5,0,5,0,0,0,0,5,5,0,5,5,0,5,5,0,5,0,5,0,5,5,0,5,5,5,0,5,0,0,0,5,0,5,0,0,0,0,5,5,0,5,5,5,0,0,0,5,0,5,5,0,5,0,0,5,0,0,0,0,0,5,5,5,0,5,5,0,0,5,5,0,5,0,0,0,5,0,0,0,5,0,5,5,5,0,5,0,0,5,0,0,5,5,0,5,5,5,5,5,5],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
                [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
/*50*/          [1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,7,4,2,5,3,6,1,4,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,8,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,1,4,2,5,3,6,5,6,5,6,5,6]
];

function preload(){
    background = this.add.image(640, 360).setDepth(3);           //background bude vzdy naspodku
    background.alpha = 0;
    fsText = this.add.text(1280,700, '', textfont_superbig).setOrigin(1);
    creditsText = this.add.text(640,360,CREDITS,textfont_big).setStroke('#000000', 5).setOrigin(0.5);
    temptext = this.add.text(10,660, '', textfont_big_left);
    temploadrect_bg = this.add.rectangle(640, 716, 1280, 10, 0x333333).setOrigin(0.5);
    temploadrect = this.add.rectangle(0, 716, 0, 10, 0xffffff).setOrigin(0.5);

    this.load.on('fileprogress', function(file){
        temptext.setText("Loading asset: "+file.key+"\n"+file.src);
    });

    this.load.on('progress', function(value){
        fsText.setText(Math.floor(value*100)+"%");
        temploadrect.width = (Math.floor((value*100)))*12.8;

        if(value === 1){
            background.alpha = 1;
            fsText.setText('').setOrigin(0.5);
            fsText.x = 640;
            fsText.y = 360;
            temptext.setText('\nPlease wait...');
            temploadrect.destroy();
            temploadrect_bg.destroy();
        }
    });

    this.load.on('complete', function(){
        temptext.destroy();
        creditsText.setText(CREDITS+'Click to continue...');
        //playSound('blip');
    });

    //nacitanie spritov
    //ui
    this.load.image('ui_top', 'assets/graphics/ui/UI_top.png');
    this.load.image('ui_left', 'assets/graphics/ui/UI_left.png');
    this.load.image('button', 'assets/graphics/ui/button.png');
    this.load.image('selector', 'assets/graphics/ui/selector.png');
    this.load.image('cross', 'assets/graphics/ui/disabled.png');
    this.load.image('itdMenu', 'assets/graphics/ui/menu.jpg');
    this.load.image('hs_submit', 'assets/graphics/ui/hs_submit.png');
    this.load.spritesheet('menu_buttons', 'assets/graphics/ui/menu_buttons.png',{frameHeight: 60, frameWidth: 280});
    this.load.spritesheet('star', 'assets/graphics/ui/star.png',{frameHeight: 4, frameWidth: 4});
    this.load.spritesheet('button_nextwave', 'assets/graphics/ui/button_nextwave.png',{frameHeight: 40, frameWidth: 156});
    this.load.spritesheet('topbuttons', 'assets/graphics/ui/topbuttons.png',{frameHeight: 40, frameWidth: 41});
    this.load.spritesheet('start_finish', 'assets/graphics/ui/start_finish.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('button_small', 'assets/graphics/ui/button_small.png' ,{frameHeight: 35, frameWidth: 35});
    this.load.spritesheet('button_icons', 'assets/graphics/ui/button_icons.png' ,{frameHeight: 25, frameWidth: 19});
    this.load.spritesheet('freespace', 'assets/graphics/ui/freespace.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('hs_updown', 'assets/graphics/ui/hs_updown.png' ,{frameHeight: 50, frameWidth: 80});

    //pozadia
    this.load.image('bg1', 'assets/graphics/levels/bg1.png');
    this.load.image('bg2', 'assets/graphics/levels/bg2.jpeg');
    this.load.image('bg3', 'assets/graphics/levels/bg3.jpeg');

    //attackers
    this.load.spritesheet('a1', 'assets/graphics/attackers/a1.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a1_hurt', 'assets/graphics/attackers/a1_hurt.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a1_destroy', 'assets/graphics/attackers/a1_death.png' ,{frameHeight:50, frameWidth: 50});
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a2_hurt', 'assets/graphics/attackers/a2_hurt.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a2_destroy', 'assets/graphics/attackers/a2_death.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a3', 'assets/graphics/attackers/a3.png' ,{frameHeight: 96, frameWidth: 55});
    this.load.spritesheet('a3_hurt', 'assets/graphics/attackers/a3_hurt.png' ,{frameHeight: 96, frameWidth: 54});
    this.load.spritesheet('a3_destroy', 'assets/graphics/attackers/a3_death.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('a4', 'assets/graphics/attackers/a4.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('a4_hurt', 'assets/graphics/attackers/a4_hurt.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('a4_destroy', 'assets/graphics/attackers/a4_death.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('a5', 'assets/graphics/attackers/a5.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a5_hurt', 'assets/graphics/attackers/a5_hurt.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a5_destroy', 'assets/graphics/attackers/a5_death.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a6', 'assets/graphics/attackers/a6.png' ,{frameHeight: 96, frameWidth: 55});
    this.load.spritesheet('a6_hurt', 'assets/graphics/attackers/a6_hurt.png' ,{frameHeight: 96, frameWidth: 54});
    this.load.spritesheet('a6_destroy', 'assets/graphics/attackers/a6_death.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('a7', 'assets/graphics/attackers/a7.png' ,{frameHeight: 200, frameWidth: 100});
    this.load.spritesheet('a7_hurt', 'assets/graphics/attackers/a7_hurt.png' ,{frameHeight: 200, frameWidth: 100});
    this.load.spritesheet('a7_destroy', 'assets/graphics/attackers/a7_death.png' ,{frameHeight: 200, frameWidth: 100});
    this.load.spritesheet('a8', 'assets/graphics/attackers/a8.png' ,{frameHeight: 300, frameWidth: 200});
    this.load.spritesheet('a8_hurt', 'assets/graphics/attackers/a8_hurt.png' ,{frameHeight: 300, frameWidth: 200});
    this.load.spritesheet('a8_destroy1', 'assets/graphics/attackers/a8_death_1.png' ,{frameHeight: 300, frameWidth: 200});
    this.load.spritesheet('a8_destroy2', 'assets/graphics/attackers/a8_death_2.png' ,{frameHeight: 300, frameWidth: 200});
    this.load.spritesheet('a8_destroy3', 'assets/graphics/attackers/a8_death_3.png' ,{frameHeight: 300, frameWidth: 200});

    //towers
    this.load.spritesheet('t1', 'assets/graphics/towers/t1.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t2', 'assets/graphics/towers/t2.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t3', 'assets/graphics/towers/t3.png' ,{frameHeight: 120, frameWidth: 80});
    this.load.spritesheet('t4', 'assets/graphics/towers/t4.png' ,{frameHeight: 250, frameWidth: 150});
    this.load.spritesheet('t5', 'assets/graphics/towers/t5.png' ,{frameHeight: 120, frameWidth: 80});
    this.load.spritesheet('t6', 'assets/graphics/towers/t6.png' ,{frameHeight: 200, frameWidth: 120});
    this.load.spritesheet('t6_idle', 'assets/graphics/towers/t6_idle.png' ,{frameHeight: 200, frameWidth: 120});
    this.load.spritesheet('t7', 'assets/graphics/towers/t7.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t7_idle', 'assets/graphics/towers/t7_idle.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.image('t8', 'assets/graphics/towers/t8.png' ,{frameHeight: 100, frameWidth: 100});


    //projectiles
    this.load.spritesheet('p1', 'assets/graphics/projectiles/p1.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p1_destroy', 'assets/graphics/projectiles/p1_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p2', 'assets/graphics/projectiles/p2.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p2_destroy', 'assets/graphics/projectiles/p2_destroy.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p3', 'assets/graphics/projectiles/p3.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p3_destroy', 'assets/graphics/projectiles/p3_destroy.png' ,{frameHeight: 80, frameWidth: 80});
    this.load.spritesheet('p4', 'assets/graphics/projectiles/p4.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p4_destroy', 'assets/graphics/projectiles/p4_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p5', 'assets/graphics/projectiles/p5.png' ,{frameHeight: 8, frameWidth: 8});
    this.load.spritesheet('p5_destroy', 'assets/graphics/projectiles/p7_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p6', 'assets/graphics/projectiles/p4.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p6_destroy', 'assets/graphics/projectiles/p4_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p7', 'assets/graphics/projectiles/p7.png' ,{frameHeight: 4, frameWidth: 4});
    this.load.spritesheet('p7_destroy', 'assets/graphics/projectiles/p7_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p8_destroy', 'assets/graphics/projectiles/p8_destroy.png' ,{frameHeight: 200, frameWidth: 300});

    this.load.spritesheet('p9', 'assets/graphics/projectiles/p9.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p9_destroy', 'assets/graphics/projectiles/p9_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p10', 'assets/graphics/projectiles/p10.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p10_destroy', 'assets/graphics/projectiles/p10_destroy.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p11', 'assets/graphics/projectiles/p11.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p11_destroy', 'assets/graphics/projectiles/p11_destroy.png' ,{frameHeight: 150, frameWidth: 150});
    this.load.spritesheet('p12', 'assets/graphics/projectiles/p12.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p12_destroy', 'assets/graphics/projectiles/p12_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p13', 'assets/graphics/projectiles/p13.png' ,{frameHeight: 8, frameWidth: 8});
    this.load.spritesheet('p13_destroy', 'assets/graphics/projectiles/p15_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p14', 'assets/graphics/projectiles/p12.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p14_destroy', 'assets/graphics/projectiles/p12_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p15', 'assets/graphics/projectiles/p15.png' ,{frameHeight: 4, frameWidth: 4});
    this.load.spritesheet('p15_destroy', 'assets/graphics/projectiles/p15_destroy.png' ,{frameHeight: 20, frameWidth: 20});

    //sounds
    this.load.audio('blip', ['assets/sounds/blip.ogg','assets/sounds/blip.mp3']);
    this.load.audio('transition', ['assets/sounds/transition.ogg','assets/sounds/transition.mp3']);
    this.load.audio('denied', ['assets/sounds/denied.ogg','assets/sounds/denied.mp3']);
    this.load.audio('upgrade', ['assets/sounds/upgrade.ogg','assets/sounds/upgrade.mp3']);
    this.load.audio('sell', ['assets/sounds/sell.ogg','assets/sounds/sell.mp3']);

    this.load.audio('fire_1', ['assets/sounds/fire_laser.ogg','assets/sounds/fire_laser.mp3']);
    this.load.audio('fire_2', ['assets/sounds/fire_electric.ogg','assets/sounds/fire_electric.mp3']);
    this.load.audio('fire_3', ['assets/sounds/fire_rocket.ogg','assets/sounds/fire_rocket.mp3']);
    this.load.audio('charge_4', ['assets/sounds/charge_rail.ogg','assets/sounds/charge_rail.mp3']);
    this.load.audio('fire_4', ['assets/sounds/fire_rail.ogg','assets/sounds/fire_rail.mp3']);
    this.load.audio('fire_5', ['assets/sounds/fire_multi.ogg','assets/sounds/fire_multi.mp3']);
    this.load.audio('charge_6', ['assets/sounds/charge_thermal.ogg','assets/sounds/charge_thermal.mp3']);
    this.load.audio('fire_6', ['assets/sounds/fire_thermal.ogg','assets/sounds/fire_thermal.mp3']);
    this.load.audio('fire_7', ['assets/sounds/fire_rapid.ogg','assets/sounds/fire_rapid.mp3']);
    this.load.audio('fire_8', ['assets/sounds/fire_nuke.ogg','assets/sounds/fire_nuke.mp3']);
    this.load.audio('death_7', ['assets/sounds/a7_death.ogg','assets/sounds/a7_death.mp3']);
    this.load.audio('death_8', ['assets/sounds/a8_death.ogg','assets/sounds/a8_death.mp3']);

    //music
    this.load.audio('intro', [
        'assets/music/Timesplitters 2 - Astrolander.ogg', 'assets/music/Timesplitters 2 - Astrolander.mp3'
    ]);
    this.load.audio('highscore', [
        'assets/music/Re-Volt - Credits.ogg','assets/music/Re-Volt - Credits.mp3'
    ]);
    this.load.audio('victory', [
        'assets/music/Timesplitters 2 - Mission Success.ogg', 'assets/music/Timesplitters 2 - Mission Success.mp3'
    ]);
    this.load.audio('defeat', [
        'assets/music/Timesplitters 2 - Mission Failed.ogg', 'assets/music/Timesplitters 2 - Mission Failed.mp3'
    ]);
    this.load.audio('bgm1', [
        'assets/music/Unreal Tournament - Foregone Destruction.ogg','assets/music/Unreal Tournament - Foregone Destruction.mp3'
    ]);
    this.load.audio('bgm2', [
        'assets/music/Need for Speed III - Hydrus 606.ogg','assets/music/Need for Speed III - Hydrus 606.mp3'
    ]);
    this.load.audio('bgm3', [
        'assets/music/Need For Speed III - Romulus 3 (Mellow Sonic 2nd Remix).ogg','assets/music/Need For Speed III - Romulus 3 (Mellow Sonic 2nd Remix).mp3'
    ]);
    this.load.audio('bgm4', [
        'assets/music/Timesplitters Future Perfect - Spaceport.ogg','assets/music/Timesplitters Future Perfect - Spaceport.mp3'
    ]);
    this.load.audio('bgm5', [
        'assets/music/Timesplitters 2 - Ice Station.ogg','assets/music/Timesplitters 2 - Ice Station.mp3'
    ]);
}

let Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Enemy(game){
        this.id = nextEnemy;

        this.shield = this.id === 5 || this.id === 6;
        //console.log("spawning "+nextEnemy);
        Phaser.GameObjects.Sprite.call(this,game,0,0,'a'+this.id);
        this.play('a'+this.id+'_normal');
        this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
        this.hp = ENEMY_HEALTH[this.id-1];
        this.prevx = 0;
        this.speed = ENEMY_SPEED[this.id-1];
        this.alpha = 0;
        this.slowed = false;
        this.unfreeze = 0;
        this.hurt = false;
        this.setDepth(1);
        tw.add({
            targets: this,
            duration: 200,
            alpha: 1,
            ease: 'Sine.easeOut',
            repeat: 0
        });
        if(this.id >= 7){
            //boss health bar
            this.hptext = add.text(this.x, this.y, Math.floor(this.hp), textfont_big).setOrigin(0.5).setStroke('#000000', 5).setDepth(5);
        }
    },
    update:
    function(time, delta){

        this.follower.t += this.speed * delta * LEVEL_SPEED_MODIFIER[LEVEL-1];
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        //prevratenie podla smeru
        if(this.x < this.prevx){
            this.setFlip(false);
        }else{
            this.setFlip(true);
        }

        if(this.id >= 7){
            this.hptext.x = this.x;
            this.hptext.y = this.y;
        }

        if(this.slowed){
            if(globalTime > this.unfreeze) {
                this.speed = ENEMY_SPEED[this.id-1];
                this.tint = 0xffffff;
                this.slowed = false;
            }
        }

        this.prevx = this.x;

        // akcie po dokonceni cesty
        if (this.follower.t >= 1)
        {
            if(this.id>=7){
                this.hptext.destroy();
                HEALTH-=999;
            }
            HEALTH--;
            updateHpText();
            this.setActive(false);
            this.destroy();
        }
    },
    startOnPath:
    function(){
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage:
    function(damage) {
        this.hp -= damage;

        if(this.hurt === false){
            this.play('a'+this.id+'_hurt');
            this.hurt = true;
            this.once('animationcomplete', ()=>{
                this.play('a'+this.id+'_normal');
                this.hurt = false;
            });
        }

        if(this.id>=7){
            this.hptext.setText(Math.floor(this.hp));
        }

        if(this.hp <= 0) {
            MONEY+=ENEMY_REWARD[this.id-1];
            SCORE+=Math.floor(ENEMY_REWARD[this.id-1]*(1-this.follower.t));
            updateMoneyText();
            createAnimated(this.x,this.y,'a'+this.id, this.flipX);
            this.setActive(false);
            if(this.id>=7){
                this.hptext.destroy();
            }
            playSound('a'+this.id);
            this.destroy();
        }
    },
    slow:
    function(type) {
        if (type === 0) {
            this.speed = ENEMY_SPEED[this.id - 1] / 2;
            this.unfreeze = globalTime + TOWER_FREEZETIME;
            this.tint = 0xff55ff;
        } else {
            if(this.id >= 7)
            {
                this.speed = ENEMY_SPEED[this.id - 1] / 2;
            }
            else{
                this.speed = ENEMY_SPEED[this.id - 1] / 4;
            }
            this.unfreeze = globalTime + TOWER_FREEZETIME;
            this.tint = 0xff5555;
        }
        this.slowed = true;
    }
});

let AnimatedObject = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function AnimatedObject(game){
            Phaser.GameObjects.Sprite.call(this,game,0,0);
            this.setDepth(1);
        },
    doYourThing:
        function(x,y,sprite,direction){
            this.x = x;
            this.y = y;
            if(direction){this.setFlip(true)}
            switch(sprite){
                case 3: case 11: case 17: case 18: this.setActive(false);this.destroy();break;
                case 'freespace': this.play('freespace_destroy');this.once('animationcomplete', ()=>{this.setActive(false);this.destroy(); blinkSpaces = true;});break;
                case 'p8': this.play('p8_destroy');this.scale = 3.5;this.setDepth(4);this.once('animationcomplete', ()=>{this.setActive(false);this.destroy();});break;
                case 'a8':
                    this.play('a8_destroy1');
                    this.once('animationcomplete', ()=>{
                        this.play('a8_destroy2');
                        this.once('animationcomplete', ()=>{
                            this.play('a8_destroy3');
                            this.once('animationcomplete', ()=>{
                                this.setActive(false);this.destroy();
                            });
                        });
                    });break;
                default: this.play(sprite+'_destroy');this.once('animationcomplete', ()=>{this.setActive(false);this.destroy();});break;
            }
        }
});

let Tower = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Tower (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 't'+SELECTED_TOWER);
            this.nextTic = 0;
            this.TowerType = SELECTED_TOWER;
            if(this.TowerType !== 8){
                this.setInteractive().on('pointerdown', () => {
                if(SELECTED_TOWER === 0 && this.active === true){
                    this.i = Math.floor(this.y / GRID_H);this.j = Math.floor(this.x / GRID_W);
                    if(this.TowerType%8 !== 4 && this.TowerType%8 !== 6){
                        this.setActive(false);
                        if(this.TowerType <8){MONEY+=TOWER_PRICES[this.TowerType-1]/UPGRADE_MULTIPLIER;}
                        else{MONEY+=TOWER_PRICES[(this.TowerType%8)-1];}

                        playSound('sell');

                        updateMoneyText();
                        tw.add({
                            targets: this,
                            duration: 200,
                            alpha: 0,
                            scale: 2,
                            repeat: 0,
                            ease: 'Sine.easeOut',
                            onComplete: ()=>{switch(LEVEL){
                                case 1: level1[this.i][this.j] = 0;break;
                                case 2: level2[this.i][this.j] = 0;break;
                                case 3: level3[this.i][this.j] = 0;break;
                            }
                            this.destroy();},
                        });
                    }
                    else{
                        if(this.TowerType <8){MONEY+=TOWER_PRICES[this.TowerType-1]/2;}
                        else{MONEY+=TOWER_PRICES[(this.TowerType%8)-1];}

                        playSound('sell');

                        updateMoneyText();
                        tw.add({
                            targets: this,
                            duration: 200,
                            alpha: 0,
                            scale: 1,
                            repeat: 0,
                            ease: 'Sine.easeOut',
                            onComplete: ()=>{switch(LEVEL){
                                case 1: level1[this.i][this.j] = 0;break;
                                case 2: level2[this.i][this.j] = 0;break;
                                case 3: level3[this.i][this.j] = 0;break;
                            }
                                this.setActive(false);this.destroy();},
                        });
                    }
                }
                if(SELECTED_TOWER === -2 && this.TowerType<8 && this.active === true){
                    //if there is enough money for an upgrade
                    if(MONEY>=TOWER_PRICES[this.TowerType-1]*UPGRADE_MULTIPLIER){
                        MONEY-=TOWER_PRICES[(this.TowerType%8)-1]*UPGRADE_MULTIPLIER;
                        this.i = Math.floor(this.y / GRID_H);this.j = Math.floor(this.x / GRID_W);
                        playSound('upgrade');
                        updateMoneyText();
                        this.TowerType+=8;
                        //console.log("Upgraded to: "+this.TowerType);
                        switch(LEVEL){
                            case 1: level1[this.i][this.j] = this.TowerType;break;
                            case 2: level2[this.i][this.j] = this.TowerType;break;
                            case 3: level3[this.i][this.j] = this.TowerType;break;
                        }
                        emitter_upgrade.emitParticleAt(this.x, this.y);
                        this.setTint(0xff0000);
                        this.nextTic = globalTime + TOWER_SPEED[this.TowerType - 1];
                    }
                    else{playDeniedSound()}
                }
            });
            }
        },
    place: function(i, j) {
        //polozenie - pozicia a typ
        if(SELECTED_TOWER !== 0 && SELECTED_TOWER !== -2 && this.TowerType !== 8){
            this.y = i * GRID_H + GRID_H/2;
            this.x = j * GRID_W + GRID_W/2;
            switch(LEVEL){
                case 1: level1[i][j] = this.TowerType;break;
                case 2: level2[i][j] = this.TowerType;break;
                case 3: level3[i][j] = this.TowerType;break;
            }
            this.alpha = 0;
            if(this.TowerType%8 === 7){
                this.play('t7_idle');
            }
            if(this.TowerType%8 === 4){
                this.setTexture('t4', 22);
                this.scale = 1;
                tw.add({
                    targets: this,
                    duration: 700,
                    alpha: 1,
                    scale: 0.5,
                    ease: 'Bounce.easeOut',
                    repeat: 0
                });
            }else if(this.TowerType%8 === 6){
                this.play('t6_idle');
                this.scale = 1.5;
                tw.add({
                    targets: this,
                    duration: 700,
                    alpha: 1,
                    scale: 0.6,
                    ease: 'Bounce.easeOut',
                    repeat: 0
                });
            }
            else{
                this.scale = 2;
                tw.add({
                    targets: this,
                    duration: 700,
                    alpha: 1,
                    scale: 0.8,
                    ease: 'Bounce.easeOut',
                    repeat: 0
                });
            }
        }

        //duki nuki
        if(this.TowerType === 8 && nukeReady === true){
            if(nukeReady){
                this.x = i; this.y = j;
                nukeReady = false;
                playSound('f8');
                createAnimated(690, 380, 'p8', 0);

                fsrect.fillColor = '0x000000';
                nukeIcon.alpha = 0.4;
                tw.add({targets: fsrect,
                    duration: 500,
                    alpha: 0.5,
                    repeat: 0,
                    onComplete: ()=>{
                        camera.shake(2000, 0.02);
                        let enemyUnits = enemies.getChildren();
                        //phaser pls
                        for(let j = 0; j<10; j++){
                            for(let i = 0; i < enemyUnits.length; i++) {
                                if(enemyUnits[i].id <=6){enemyUnits[i].receiveDamage(5000);}
                            }
                        }
                        fsrect.fillColor = '0xFFFFFF';
                        fsrect.alpha = 1;
                        tw.add({
                            targets: fsrect,
                            duration: 1500,
                            alpha: 0,
                            repeat: 0
                        });
                    }
                });

                tw.add({
                    targets: nukeIcon,
                    duration: NUKE_TIMER,
                    angle: 7200,
                    alpha: 0.7,
                    ease: 'Sine.easeIn',
                    scale: HUD_ICON_SCALE*0.8,
                    repeat: 0,
                    onComplete: ()=>{nukeReady = true; nukeIcon.angle = 0;playSound('blip');
                        tw.add({
                            targets: nukeIcon,
                            duration: 1000,
                            alpha: 1,
                            scale: HUD_ICON_SCALE,
                            repeat: 0,
                            ease: 'Back.easeOut',
                        });},
                });
                this.destroy();
            }
            else{playDeniedSound()}
        }
    },
    fire: function() {
        let enemy = getEnemy(this.x, this.y, TOWER_RANGE[this.TowerType-1]);
        if(enemy) {
            //vytvorime bullet
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            //iba t4
            if(this.TowerType%8 === 4 || this.TowerType%8 === 6){
                //charging turrets animation
                this.play('t'+this.TowerType%8+'_charge');
                playSound('c'+this.TowerType%8);
                this.angle = ((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG );
                this.once('animationcomplete', ()=> {
                    enemy = getEnemy(this.x, this.y, TOWER_RANGE[this.TowerType-1]);
                    if(enemy){
                        angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                        this.angle = ((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG );
                    }
                    this.play('t'+this.TowerType%8+'_fire');
                    playSound('f'+this.TowerType%8);
                    addBullet(this.x, this.y, angle, this.TowerType)
                    if(this.TowerType%8 === 6){
                        //return to idle anim
                        this.once('animationcomplete', ()=>{
                            this.play('t'+this.TowerType%8+'_idle');
                        });
                    }
                });
            }
            else{addBullet(this.x, this.y, angle, this.TowerType);this.play('t'+this.TowerType%8+'_fire');playSound('f'+this.TowerType%8);}
            //t5 multishot
            if(this.TowerType%8 === 5){
                addBullet(this.x, this.y, angle-0.1, this.TowerType);
                addBullet(this.x, this.y, angle-0.2, this.TowerType);
                addBullet(this.x, this.y, angle-0.3, this.TowerType);
                addBullet(this.x, this.y, angle+0.1, this.TowerType);
                addBullet(this.x, this.y, angle+0.2, this.TowerType);
                addBullet(this.x, this.y, angle+0.3, this.TowerType);
            }
            //otacanie podla druhu Towery
            switch(this.TowerType){
                case 1: case 3: case 5: case 6: case 7: case 9: case 11: case 13: case 15: this.angle = ((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG );break;
            }
            if(this.TowerType%8 === 7){
                this.once('animationcomplete', ()=>{
                    this.play('t'+this.TowerType%8+'_idle');
                });
            }

        }
    },
    update: function (time, delta)
    {
        if(globalTime > this.nextTic) {
            this.fire();
            this.nextTic = globalTime + TOWER_SPEED[this.TowerType - 1];
        }
    }
});

let Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'p1');

            this.damage = 0;
            this.lifespan = 0;
            this.speed = 0;
            this.setDepth(1);
        },

    fire: function (x, y, angle,type)
    {
        this.type = type;
        this.damage = TOWER_DAMAGE[this.type-1];
        this.speed = Phaser.Math.GetSpeed(PROJECTILE_SPEED[this.type-1], 1);

        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);
        this.play('p'+this.type);

        switch(this.type){
            case 17: case 18: this.scale = 1;break;
            default: this.scale = 2;break;
        }

        switch(this.type%8){
            case 3: case 4: case 6: case 7: this.setRotation(angle);break;
        }

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = PROJECTILE_LIFESPAN[this.type-1];
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            createAnimated(this.x,this.y,'p'+this.type, false);
            this.setActive(false);
            this.destroy();
        }
    }

});

function create(){
    //zaklad
    generateAnims();
    fsText.alpha = 0;
    background.alpha = 0;

    let difficulty = 1;

    let difficultybutton = this.add.image(420,580, 'menu_buttons', 2).setDepth(3).setInteractive().on('pointerdown', () => {
        difficulty++;
        if(difficulty === 3) difficulty = 0;
        switch(difficulty){
            case 0: difficultybutton.setTexture("menu_buttons", 1);difficulty_str = "EASY";break;
            case 1: difficultybutton.setTexture("menu_buttons", 2);difficulty_str = "MEDIUM";break;
            case 2: difficultybutton.setTexture("menu_buttons", 3);difficulty_str = "HARD";break;
        }
    });
    difficultybutton.alpha = 0;

    let startbutton = this.add.image(300,500, 'menu_buttons').setDepth(3).setInteractive().on('pointerdown', () => {
        if(LEVEL===-1){
            createGame.call(this);
        }
        switch(difficulty){
            case 0:
                WAVE_SPEEDS = [150,120,100];
                LEVEL_SPEED_MODIFIER = [0.6, 0.7, 0.8];
                //STARTHEALTH = 50;
                UPGRADE_MULTIPLIER = 1;
                MIN_WAVE_SPEED = 30;
                break;
            case 1:
                WAVE_SPEEDS = [150,120,100];
                LEVEL_SPEED_MODIFIER = [0.6, 0.7, 0.8];
                //STARTHEALTH = 30;
                UPGRADE_MULTIPLIER = 1.5;
                MIN_WAVE_SPEED = 20;
                break;
            case 2:
                //quicko mode
                ENEMY_SPEED = [1/4000,1/5000,1/7500,1/2000,1/5000,1/7500,1/11000,1/13000];

                TOWER_SPEED = [350,850,1000,1500,500,550,50,500,
                               250,650,750,1250,350,450,35,500];

                PROJECTILE_SPEED = [2000,1000,1000,8000,2000,1600,1400,2000,
                                    2000,1200,1200,10000,2400,2000,1400,2000,
                                    0, 0];

                PROJECTILE_LIFESPAN = [140,250,750,500,150,250,300,250,
                                        140,250,7500,500,150,250,300,250,
                                        250, 250];

                TOWER_FREEZETIME = 400;

                NUKE_TIMER = 5000;

                WAVE_SPEEDS = [75,60,50];
                LEVEL_SPEED_MODIFIER = [1.2, 1.4, 1.6];
                MIN_WAVE_SPEED = 10;

                //STARTHEALTH = 30;
                UPGRADE_MULTIPLIER = 1.5;
                break;
        }
        nextLevel();
        globalTime = 0;
        startbutton.destroy();
        difficultybutton.destroy();
    });
    startbutton.alpha = 0;

    //don't mind me
    fsrect = this.add.rectangle(640, 360, 1280, 720, 0x000000).setDepth(3).setInteractive().on('pointerdown', () => {
        if(fsrect.active === true){
            nextLevel();
            fsrect.alpha = 0;
            tw.add({
                targets: [startbutton, difficultybutton],
                alpha: 1,
                duration: 500,
                x: 360,
                ease: 'Sine.easeOut',
                repeat: 0
            });
        }
    });
    fsrect.alpha = 0.01;

    music = this.sound.add('intro', {volume: 0.3, loop: true});             //bgm
    fsmusic = this.sound.add('blip', {volume: 0.1, loop: false});

    tw = this.tweens;       //tween manager
    add = this.add;         //add hack

    this.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer'); //kurzor

    camera = this.cameras.main.setBounds(0, 0, 1280, 720);   //camera pre shake effect

    Towers = this.add.group({ classType: Tower, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    AnimatedObjects = this.add.group({ classType: AnimatedObject, runChildUpdate: true });

    this.physics.add.overlap(enemies, bullets, damageEnemy);

    this.nextEnemy = 0;

    this.input.on('pointerdown', placeTower);

    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)    .on('down', function() {toggleFullscreen()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)    .on('down', function() {toggleSound()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)    .on('down', function() {toggleMusic()}, this);
}

function update(time, delta){
    // spawn utocnika podla arrayu kazdych n milisekund
    if(waveInProgress){
        if (globalTime > this.nextEnemy){
            if(waveIndex<waves[WAVE-1].length){
                nextEnemy=waves[WAVE-1][waveIndex];
                if(nextEnemy !== 0){
                    let enemy = enemies.get();
                    if (enemy){
                        enemy.setActive(true);
                        enemy.setVisible(true);

                        // ulozenie utocnika na zaciatok
                        enemy.startOnPath();
                    }
                }
                waveIndex++;
            }else if(enemies.countActive() === 0){
                /*console.log('end of wave '+WAVE+' reached');*/MONEY+=WAVE_REWARD;updateMoneyText();waveInProgress=false;nextWaveButton.visible = true;graphics.alpha = 0.8;start.alpha = 1;finish.alpha =1;
                if(WAVE === MAXWAVES[LEVEL-1] || WAVE === waves.length){showVictoryScreen();nextWaveButton.setTexture("button_nextwave", 1);}
                updateScoreText();
                updateWaveInfo();
            }
            this.nextEnemy = globalTime + WAVE_SPEED;
        }
    }
    globalTime += delta;
}

function placeTower(pointer) {
    if(pointer.x>100 && pointer.y>40 && SELECTED_TOWER !== 0 && SELECTED_TOWER !== -2 && SELECTED_TOWER !== 8) {
            let i = Math.floor(pointer.y / GRID_H);
            let j = Math.floor(pointer.x / GRID_W);
            if (canPlaceTower(i, j)) {
                //if there is enough money for purchase
                if(MONEY-TOWER_PRICES[SELECTED_TOWER-1]>=0) {
                    MONEY -= TOWER_PRICES[SELECTED_TOWER - 1];
                    updateMoneyText();
                    let Tower = Towers.get();
                    if (Tower) {
                        Tower.setActive(true);
                        Tower.setVisible(true);
                        Tower.place(i, j);
                    }
                }
                else{playDeniedSound()}
            } else {
                blinkAvailableSpaces();
            }
        }
    if(pointer.x>100 && pointer.y>40 && SELECTED_TOWER === 8 && waveInProgress && nukeReady) {
            if(MONEY-TOWER_PRICES[SELECTED_TOWER-1]>=0) {
                MONEY -= TOWER_PRICES[SELECTED_TOWER - 1];
                updateMoneyText();
                let Tower = Towers.get();
                if (Tower) {
                    Tower.setActive(true);
                    Tower.setVisible(true);
                    Tower.place(640, 360);
                }
            }
            else{playDeniedSound()}
        }
}

function canPlaceTower(i, j) {
    switch(LEVEL){
        case 1: return level1[i][j] === 0;break;
        case 2: return level2[i][j] === 0;break;
        case 3: return level3[i][j] === 0;break;
    }

}

function getEnemy(x, y, distance) {
    let enemyUnits = enemies.getChildren();
    for(let i = 0; i < enemyUnits.length; i++) {
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
}

function addBullet(x, y, angle, type) {
    let bullet = bullets.get();
    if (bullet) {
        bullet.fire(x, y, angle, type);
    }
}

function createAnimated(x, y, sprite, direction){
    let animatedobject = AnimatedObjects.get();
    if(animatedobject){
        animatedobject.doYourThing(x,y,sprite,direction);
    }
}

function damageEnemy(enemy, bullet) {
    if (enemy.active === true && bullet.active === true) {
        //let bounceangle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y);

        if(enemy.shield === false){
            switch (bullet.type){
                case 2: enemy.slow(0); if(emitter_electric.emitters.first.alive.length < 10){emitter_electric.emitParticleAt(bullet.x, bullet.y);}break;
                case 10: enemy.slow(1); if(emitter_electric2.emitters.first.alive.length < 10){emitter_electric2.emitParticleAt(bullet.x, bullet.y);}break;
                case 3: addBullet(bullet.x, bullet.y, 0, 17);break;
                case 11: addBullet(bullet.x, bullet.y, 0, 18);break;
                case 6: if(emitter_thermal.emitters.first.alive.length < 10){emitter_thermal.emitParticleAt(bullet.x, bullet.y);}break;
                case 14: if(emitter_thermal2.emitters.first.alive.length < 10){emitter_thermal2.emitParticleAt(bullet.x, bullet.y);}break;
                case 17: case 18: break;
                default: createAnimated(bullet.x,bullet.y,'p'+bullet.type, false);break;
            }
            enemy.receiveDamage(bullet.damage);
            switch(bullet.type){
                case 2: case 10: case 17: case 18: break;
                case 6: case 14: case 12: bullet.damage /= 1.5;break;
                default:bullet.setActive(false);bullet.destroy();break;
            }
        }
        else{
            if(bullet.type === 2 || bullet.type === 10 || bullet.type === 6 || bullet.type === 9 || bullet.type === 14 || bullet.type === 11){
                enemy.receiveDamage(bullet.damage);
                switch(bullet.type){
                    case 1: case 9: case 11: bullet.setActive(false);bullet.destroy();createAnimated(bullet.x,bullet.y,'p'+bullet.type, false);break;
                    case 2: enemy.slow(0); if(emitter_electric.emitters.first.alive.length < 10){emitter_electric.emitParticleAt(bullet.x, bullet.y);}break;
                    case 10: enemy.slow(1); if(emitter_electric2.emitters.first.alive.length < 10){emitter_electric2.emitParticleAt(bullet.x, bullet.y);}break;
                    case 6: if(emitter_thermal.emitters.first.alive.length < 10){emitter_thermal.emitParticleAt(bullet.x, bullet.y);}bullet.damage /= 1.5;break;
                    case 14: if(emitter_thermal2.emitters.first.alive.length < 10){emitter_thermal2.emitParticleAt(bullet.x, bullet.y)}bullet.damage /= 1.5;break;
                    default: createAnimated(bullet.x,bullet.y,'p'+bullet.type, false);break;
                }
            }
        }
    }
}

function changeSelectedTower(id){
    SELECTED_TOWER=id;
    moveSelector(SELECTED_TOWER-1);
    updateTowerInfo();
    if(priceText[0].text != TOWER_PRICES[0]+'$'){
        for(let i = 0; i < priceText.length; i++){
            priceText[i].setText(TOWER_PRICES[i]+'$');
            priceText[i].setColor('#FFFFFF');
        }
    }
}

function moveSelector(position){
    tw.add({
        targets: selector,
        duration: 200,
        scale: 1,
        x: 53,
        y: 75*position+100,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function blinkAvailableSpaces(){
    if(blinkSpaces){
        blinkSpaces=false;
        playDeniedSound();
        switch(LEVEL){
            case 1:
                for(let i = 0; i<level1.length; i++){
                    for(let j = 0; j<level1[i].length; j++){
                        if(level1[i][j]===0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
            case 2:
                for(let i = 0; i<level2.length; i++){
                    for(let j = 0; j<level2[i].length; j++){
                        if(level2[i][j]===0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
            case 3:
                for(let i = 0; i<level3.length; i++){
                    for(let j = 0; j<level3[i].length; j++){
                        if(level3[i][j]===0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
        }

    }
}

function sellTool(){
    SELECTED_TOWER = 0;
    selectedImg.setTexture('button_icons', 1).setScale(1);
    selectedInfo.setText('Sell (For half the price)');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_delete.cur), pointer');

    for(let i = 0; i < priceText.length-1; i++){
        priceText[i].setText(TOWER_PRICES[i]/2+'$');
        priceText[i].setColor('#FFAAAA');
    }

    tw.add({
        targets: selector,
        duration: 200,
        scale: 0.5,
        x: 72,
        y: 683,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function upgradeTool(){
    SELECTED_TOWER = -2;
    selectedImg.setTexture('button_icons', 0).setScale(1);
    selectedInfo.setText('Upgrade ('+UPGRADE_MULTIPLIER+'x the cost of the tower)');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_upgrade.cur), pointer');

    for(let i = 0; i < priceText.length-1; i++){
        priceText[i].setText(TOWER_PRICES[i]*UPGRADE_MULTIPLIER+'$');
        priceText[i].setColor('#AAFFAA');
    }

    tw.add({
        targets: selector,
        duration: 200,
        scale: 0.5,
        x: 36,
        y: 683,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function updateTowerInfo(){
    selectedImg.setTexture('t'+(SELECTED_TOWER)).setScale(0.25);
    if(SELECTED_TOWER === 4){selectedImg.setScale(0.1)}
    if(SELECTED_TOWER === 6){selectedImg.setScale(0.17)}
    selectedInfo.setText(getTowerInfo(SELECTED_TOWER-1));
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');
}

function getTowerInfo(type){

    if(type === 7){return TOWER_DESCRIPTION[type];}
    return TOWER_DESCRIPTION[type]+'\nUpgrade: '+TOWER_UPGRADE_DESCRIPTION[type]/*+' - '+TOWER_PRICES[type]*2+'$'*/;

    //old info
    /*
    if(type == 7){return TOWER_DESCRIPTION[type]}
    if(type == 3){return TOWER_DESCRIPTION[type]+'\ndmg: '+TOWER_DAMAGE[type]+', fir: '+TOWER_SPEED[type]+ ', ran: '+TOWER_RANGE[type]+ ', spd: '+PROJECTILE_SPEED[type]+ ', pls: '+PROJECTILE_LIFESPAN[type]
        +', Upgrade: '+TOWER_UPGRADE_DESCRIPTION[type]+' - '+TOWER_PRICES[type]*2+'$';}
    return   TOWER_DESCRIPTION[type]+', dmg: '+TOWER_DAMAGE[type]+', fir: '+TOWER_SPEED[type]+ ', ran: '+TOWER_RANGE[type]+ ', spd: '+PROJECTILE_SPEED[type]+ ', pls: '+PROJECTILE_LIFESPAN[type]
            +'\nUpgrade: '+TOWER_UPGRADE_DESCRIPTION[type]+' - '+TOWER_PRICES[type]*2+'$';

    */
}

function updateWaveText(){
    tw.add({
        targets: waveText,
        duration: 200,
        scaleX: 0,
        ease: 'Sine.easeIn',
        onComplete: ()=> {
            waveText.setText(WAVE);
            tw.add({
                targets: waveText,
                duration: 200,
                scaleX: 1,
                ease: 'Sine.easeOut',
                repeat: 0
            });
        },
        repeat: 0
    });
}

function updateHpText(){
    hpText.scale = 1.5;
    hpText.y = 9;
    if(HEALTH <= 0){
        HEALTH = 0;
        showDefeatScreen();
    }
    hpText.setText(HEALTH);

    tw.add({
        targets: hpText,
        duration: 100,
        scale: 1,
        y: 13,
        repeat: 0
    });
}

function updateMoneyText(){
    updateScoreText();
    moneyText.setText(MONEY);
    //moneyText.y = 6;

    for(let i = 0; i<8; i++){
        cross[i].visible = MONEY < TOWER_PRICES[i]
    }

    /*
    tw.add({
        targets: moneyText,
        duration: 100,
        y: 13,
        repeat: 0
    });
    */
}

function updateScoreText(){
    scoreText.setText(difficulty_str+"\nScore: "+SCORE+timestring);
}

function updateTimeString(){
    timestring = "\nW: " + (new Date(globalTime-prevwavetime).toISOString().slice(11, -1)) + "\nT: " + (new Date(globalTime).toISOString().slice(11, -1));
}

function nextWave(){
    if(WAVE !== MAXWAVES[LEVEL-1] && WAVE<waves.length){
        WAVE++;
        //console.log('starting wave '+ WAVE);
        waveInProgress=true;
        waveIndex = 0;
        if(WAVE_SPEED>MIN_WAVE_SPEED)WAVE_SPEED-=5;
        hideWaveInfo();
        updateWaveText();
        nextWaveButton.visible = false;
        graphics.alpha = 0.3;
        start.alpha = 0;
        finish.alpha = 0;
        if(WAVE===waves.length || WAVE===MAXWAVES[LEVEL-1]){
            if(LEVEL!=3)playMusic(4);
            else playMusic(5);
        }
        updateTimeString();
        prevwavetime = globalTime;
        updateScoreText();
    }else{
        times.push(globalTime-prevtime);
        prevtime = globalTime;
        nextLevel();/*console.log('no more waves in array!')*/
    }
}

function jumpToWave(wave){
    WAVE = wave-1;
    nextWave();
}

function nextLevel(){
    //this function is just a bunch of italian pasta
    //touching pretty much anything here breaks the game
    //i am flabbergasted that this abomination actually works
    LEVEL++;
    gameInProgress = false;
    if(LEVEL > 0 && LEVEL<=3){
        WAVE = 0;
        MONEY = 0;
        graphics.alpha = 0;
        start.alpha = 0;
        finish.alpha = 0;
        hideWaveInfo();
        playSound('transition');
        //fsrect anim
        undimScreen();
        hideFsMessage();
        updateWaveText();
        try{
            graphics.clear();
            path.destroy();
        }catch (e) {/*i'm lazy*/}
        //background anim
        tw.add({
            targets: fsrect,
            duration: 500,
            alpha: 1,
            ease: 'Sine.easeIn',
            onComplete: ()=> {
                tw.add({
                    targets: fsrect,
                    duration: 500,
                    alpha: 0,
                    ease: 'Sine.easeOut',
                });
                background.setDepth(-1);
                //change ui color
                switch(LEVEL){
                    case 1: setUIColor(0x3cceff, 0xffe002, '#3cceff');break;
                    case 2: setUIColor(0xff0054, 0xffe002, '#ff0054');break;
                    case 3: setUIColor(0x00ff00, 0xff0000, '#00ff00');break;
                }
                blinkSpaces = true;
                MONEY = STARTMONEY;
                HEALTH = STARTHEALTH;
                updateMoneyText();
                updateHpText();
            }
        });

        tw.add({
            targets: background,
            duration: 500,
            scale: 2,
            ease: 'Sine.easeIn',
            onComplete: ()=> {
                background.setTexture('bg'+LEVEL);
                background.x = 695;
                background.y = 380;
                background.scaleX = 0.8;
                background.scaleY = 0.8;
                tw.add({
                    targets: background,
                    duration: 500,
                    scale: 1,
                    ease: 'Sine.easeOut',
                    onComplete: ()=> {graphics.alpha = 0.8;start.alpha = 1;finish.alpha = 1;gameInProgress = true;updateWaveInfo();},
                    repeat: 0
                });
            },
            repeat: 0
        });

        //delete towers
        if(LEVEL>=1){
            let towers_placed = Towers.getChildren();
            while(towers_placed.length>0){
                //console.log("phaser pls");
                for(let i = 0; i < towers_placed.length; i++) {
                    towers_placed[i].destroy();
                }
            }
        }
    }
    switch(LEVEL){
        case -1:
            background.setTexture('itdMenu');
            background.scale = 1.2;
            fsrect.setActive(false);

            tw.add({
                targets: background,
                duration: 500,
                scale: 1,
                alpha: 1,
                ease: 'Sine.easeOut',
                onComplete: ()=> {creditsText.alpha = 1;},
                repeat: 0
            });
            tw.add({
                targets: creditsText,
                duration: 500,
                scale: 0.8,
                alpha: 0,
                ease: 'Sine.easeOut',
                onComplete: ()=> {},
                repeat: 0
            });
            music.play();
            break;
        case 0:
            tw.add({
                targets: fsrect,
                duration: 200,
                alpha: 0,
                ease: 'Sine.easeOut',
                onComplete: ()=> {fsrect.alpha = 0;creditsText.destroy();},
                repeat: 0
            });
            nextLevel();
            break;
        case 1:
            graphics.lineStyle(3, 0x999999).alpha = 0;
            WAVE_SPEED = WAVE_SPEEDS[LEVEL-1];
            path = new Phaser.Curves.Path(250, 40);
            path.lineTo(250, 100);
            path.lineTo(510, 150);
            path.lineTo(250, 200);
            path.lineTo(510, 250);
            path.lineTo(250, 300);
            path.lineTo(510, 350);
            path.lineTo(250, 400);
            path.lineTo(510, 450);
            path.lineTo(1000, 450);
            path.lineTo(1000, 40);
            start.x = 250;
            start.y = 40;
            finish.x = 1000;
            finish.y = 40;
            path.draw(graphics);
            break;
        case 2:
            graphics.lineStyle(3, 0x000000).alpha = 0;
            WAVE_SPEED = WAVE_SPEEDS[LEVEL-1];
            path = new Phaser.Curves.Path(300, 40);
            path.lineTo(285, 567);
            path.lineTo(494, 589);
            path.lineTo(576, 158);
            path.lineTo(1090, 146);
            path.lineTo(1063, 309);
            path.lineTo(868, 380);
            path.lineTo(850, 597);
            path.lineTo(1280, 579);
            start.x = 300;
            start.y = 40;
            finish.x = 1280;
            finish.y = 579;
            path.draw(graphics);
            break;
        case 3:
            graphics.lineStyle(3, 0xffff00).alpha = 0;
            WAVE_SPEED = WAVE_SPEEDS[LEVEL-1];
            path = new Phaser.Curves.Path(300, 40);
            path.lineTo(300, 570);
            path.lineTo(1130, 570);
            path.lineTo(1130, 370);
            path.lineTo(810, 370);
            path.lineTo(810, 200);
            path.lineTo(615, 200);
            path.lineTo(524, 290);
            start.x = 300;
            start.y = 40;
            finish.x = 524;
            finish.y = 290;
            path.draw(graphics);
            break;
    }

    playMusic(LEVEL);
}

function jumpToLevel(level){
    if(level>0 && level<=3){LEVEL = level-1;nextLevel();restartLevel();}
    else{console.error('nope');}
}

function restartLevel(){
    //clear towers
    switch(LEVEL){
        case 1:
            for(let i = 0; i<level1.length; i++){
                for(let j = 0; j<level1[i].length; j++){
                    if(level1[i][j]!==-1){level1[i][j]=0;}
                }
            }break;
        case 2:
            for(let i = 0; i<level2.length; i++){
                for(let j = 0; j<level2[i].length; j++){
                    if(level2[i][j]!==-1){level2[i][j]=0;}
                }
            }break;
        case 3:
            for(let i = 0; i<level3.length; i++){
                for(let j = 0; j<level3[i].length; j++){
                    if(level3[i][j]!==-1){level3[i][j]=0;}
                }
            }break;
    }
    SCORE = 0;
    LEVEL--;
    nextLevel();
}

function motherlode(){
    MONEY = 999999;
    HEALTH = 999;
    updateMoneyText();
    updateHpText();
}

function generateAnims(){
    //attackers
    game.anims.create({key: "a1_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a1",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "a1_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a1_hurt",{start:1, end:10}), repeat: 0});
    game.anims.create({key: "a1_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a1_destroy",{start:4, end:10}), repeat: 0});
    game.anims.create({key: "a2_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a2",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "a2_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a2_hurt",{start:1, end:10}), repeat: 0});
    game.anims.create({key: "a2_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a2_destroy",{start:4, end:10}), repeat: 0});
    game.anims.create({key: "a3_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a3",{start:0, end:9}), repeat: -1});
    game.anims.create({key: "a3_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a3_hurt",{start:0, end:9}), repeat: 0});
    game.anims.create({key: "a3_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a3_destroy",{start:3, end:10}), repeat: 0});
    game.anims.create({key: "a4_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a4",{start:0, end:9}), repeat: -1});
    game.anims.create({key: "a4_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a4_hurt",{start:0, end:9}), repeat: 0});
    game.anims.create({key: "a4_destroy", frameRate: 34, frames: game.anims.generateFrameNumbers("a4_destroy",{start:0, end:13}), repeat: 0});
    game.anims.create({key: "a5_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a5",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "a5_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a5_hurt",{start:1, end:10}), repeat: 0});
    game.anims.create({key: "a5_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a5_destroy",{start:4, end:10}), repeat: 0});
    game.anims.create({key: "a6_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a6",{start:0, end:9}), repeat: -1});
    game.anims.create({key: "a6_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a6_hurt",{start:0, end:9}), repeat: 0});
    game.anims.create({key: "a6_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a6_destroy",{start:3, end:10}), repeat: 0});
    game.anims.create({key: "a7_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a7",{start:0, end:19}), repeat: -1});
    game.anims.create({key: "a7_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a7_hurt",{start:0, end:19}), repeat: 0});
    game.anims.create({key: "a7_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a7_destroy",{start:0, end:23}), repeat: 0});
    game.anims.create({key: "a8_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a8",{start:0, end:15}), repeat: -1});
    game.anims.create({key: "a8_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a8_hurt",{start:0, end:15}), repeat: 0});
    game.anims.create({key: "a8_destroy1", frameRate: 15, frames: game.anims.generateFrameNumbers("a8_destroy1",{start:0, end:15}), repeat: 0});
    game.anims.create({key: "a8_destroy2", frameRate: 15, frames: game.anims.generateFrameNumbers("a8_destroy2",{start:0, end:15}), repeat: 0});
    game.anims.create({key: "a8_destroy3", frameRate: 15, frames: game.anims.generateFrameNumbers("a8_destroy3",{start:0, end:10}), repeat: 0});

    //towers
    game.anims.create({key: "t1_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t1",{start:8, end:0}), repeat: 0});
    game.anims.create({key: "t2_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t2",{start:9, end:0}), repeat: 0});
    game.anims.create({key: "t3_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t3",{start:0, end:10}), repeat: 0});
    game.anims.create({key: "t4_charge", frameRate: 15, frames: game.anims.generateFrameNumbers("t4",{start:0, end:13}), repeat: 0});
    game.anims.create({key: "t4_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t4",{start:14, end:22}), repeat: 0});
    game.anims.create({key: "t5_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t5",{start:0, end:5}), repeat: 0});
    game.anims.create({key: "t6_idle", frameRate: 15, frames: game.anims.generateFrameNumbers("t6_idle",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "t6_charge", frameRate: 40, frames: game.anims.generateFrameNumbers("t6",{start:0, end:11}), repeat: 0});
    game.anims.create({key: "t6_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t6",{start:12, end:18}), repeat: 0});
    game.anims.create({key: "t7_idle", frameRate: 7, frames: game.anims.generateFrameNumbers("t7_idle",{start:0, end:1}), repeat: -1});
    game.anims.create({key: "t7_fire", frameRate: 24, frames: game.anims.generateFrameNumbers("t7",{start:0, end:2}), repeat: 0});
    //projectiles
    game.anims.create({key: "p1", frameRate: 15, frames: game.anims.generateFrameNumbers("p1",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "p1_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p1_destroy",{start:0, end:4}), repeat: 0});
    game.anims.create({key: "p2", frameRate: 15, frames: game.anims.generateFrameNumbers("p2",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p2_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p2_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p3", frameRate: 15, frames: game.anims.generateFrameNumbers("p3",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "p3_destroy", frameRate: 10, frames: game.anims.generateFrameNumbers("p3_destroy",{start:3, end:6}), repeat: 0});
    game.anims.create({key: "p4", frameRate: 30, frames: game.anims.generateFrameNumbers("p4",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p4_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p4_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p5", frameRate: 15, frames: game.anims.generateFrameNumbers("p5",{start:0, end:1}), repeat: -1});
    game.anims.create({key: "p5_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p5_destroy",{start:0, end:1}), repeat: 0});
    game.anims.create({key: "p6", frameRate: 30, frames: game.anims.generateFrameNumbers("p6",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p6_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p6_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p7", frameRate: 15, frames: game.anims.generateFrameNumbers("p7",{start:0, end:1}), repeat: -1});
    game.anims.create({key: "p7_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p7_destroy",{start:0, end:1}), repeat: 0});
    game.anims.create({key: "p8_destroy", frameRate: 10, frames: game.anims.generateFrameNumbers("p8_destroy",{start:0, end:24}), repeat: 0});

    game.anims.create({key: "p9", frameRate: 30, frames: game.anims.generateFrameNumbers("p9",{start:0, end:5}), repeat: -1});
    game.anims.create({key: "p9_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p1_destroy",{start:1, end:4}), repeat: 0});
    game.anims.create({key: "p10", frameRate: 15, frames: game.anims.generateFrameNumbers("p10",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p10_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p10_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p11", frameRate: 15, frames: game.anims.generateFrameNumbers("p11",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "p11_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p11_destroy",{start:0, end:6}), repeat: 0});
    game.anims.create({key: "p12", frameRate: 60, frames: game.anims.generateFrameNumbers("p12",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p12_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p12_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p13", frameRate: 15, frames: game.anims.generateFrameNumbers("p13",{start:0, end:1}), repeat: -1});
    game.anims.create({key: "p13_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p13_destroy",{start:0, end:1}), repeat: 0});
    game.anims.create({key: "p14", frameRate: 60, frames: game.anims.generateFrameNumbers("p14",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p14_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p14_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p15", frameRate: 15, frames: game.anims.generateFrameNumbers("p15",{start:0, end:1}), repeat: -1});
    game.anims.create({key: "p15_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p15_destroy",{start:0, end:1}), repeat: 0});

    game.anims.create({key: "p17", frameRate: 8, frames: game.anims.generateFrameNumbers("p3_destroy",{start:3, end:6}), repeat: -1});
    game.anims.create({key: "p17_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p3_destroy",{start:6, end:6}), repeat: 0});
    game.anims.create({key: "p18", frameRate: 8, frames: game.anims.generateFrameNumbers("p11_destroy",{start:0, end:6}), repeat: 0});
    game.anims.create({key: "p18_destroy", frameRate: 30, frames: game.anims.generateFrameNumbers("p11_destroy",{start:6, end:6}), repeat: 0});
    //ui
    game.anims.create({key: "freespace_destroy", frameRate: 2, frames: game.anims.generateFrameNumbers("freespace",{start:0, end:1}), repeat: 0});
}

function updateWaveInfo(){
    waveInfo.setText(WAVE_DESCRIPTION[WAVE]);
    waveInfo.x = 590;
    waveInfo.alpha = 0;
    tw.add({
        targets: waveInfo,
        duration: 300,
        x: 690,
        alpha: 1,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function hideWaveInfo(){
    waveInfo.x = 690;
    tw.add({
        targets: waveInfo,
        duration: 300,
        x: 790,
        alpha : 0,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function playMusic(mus_id){
    if(mus_id>=1){
        tw.add({
            targets: fsmusic,
            duration: 1000,
            volume: 0,
            onComplete: ()=>{
                fsmusic.stop();
            },
            repeat: 0
        });
        tw.add({
            targets: music,
            duration: 1000,
            volume: 0,
            onComplete: ()=>{
                music.stop();
                switch(mus_id){
                    case 1: music = game.sound.add('bgm1', {volume: 0.35, loop: true}); if(music_enabled){music.play();}break;
                }
                switch(mus_id){
                    case 2: music = game.sound.add('bgm2', {volume: 0.35, loop: true}); if(music_enabled){music.play();}break;
                }
                switch(mus_id){
                    case 3: music = game.sound.add('bgm3', {volume: 0.2, loop: true}); if(music_enabled){music.play();}break;
                }
                switch(mus_id){
                    case 4: music = game.sound.add('bgm4', {volume: 0.35, loop: true}); if(music_enabled){music.play();}break;
                }
                switch(mus_id){
                    case 5: music = game.sound.add('bgm5', {volume: 0.35, loop: true}); if(music_enabled){music.play();}break;
                }
            },
            repeat: 0
        });
    }

}

function playSound(id){
    if(sound_enabled && document.hasFocus()){
        switch(id){
            case 'f1': game.sound.add('fire_1', {volume: 0.2}).play();break;
            case 'f2': game.sound.add('fire_2', {volume: 0.2}).play();break;
            case 'f3': game.sound.add('fire_3', {volume: 0.2}).play();break;
            case 'f4': game.sound.add('fire_4', {volume: 0.2}).play();break;
            case 'c4': game.sound.add('charge_4', {volume: 0.4}).play();break;
            case 'f5': game.sound.add('fire_5', {volume: 0.15}).play();break;
            case 'c6': game.sound.add('charge_6', {volume: 0.2}).play();break;
            case 'f6': game.sound.add('fire_6', {volume: 0.1}).play();break;
            case 'f7': game.sound.add('fire_7', {volume: 0.05}).play();break;
            case 'f8': game.sound.add('fire_8', {volume: 0.4}).play();break;
            case 'a7': game.sound.add('death_7', {volume: 0.5}).play();break;
            case 'a8': game.sound.add('death_8', {volume: 0.7}).play();break;
            case 'denied': game.sound.add('denied', {volume: 0.5}).play();break;
            case 'transition': game.sound.add('transition', {volume: 0.5}).play();break;
            case 'blip': game.sound.add('blip', {volume: 0.3, loop: false}).play();break;
            case 'upgrade': game.sound.add('upgrade', {volume: 0.3, loop: false}).play();break;
            case 'sell': game.sound.add('sell', {volume: 0.3}).play();break;
        }
    }
}

function playDeniedSound(){
    if(gameInProgress){
        playSound('denied');
    }
}

function toggleMusic(){
    if (music.isPlaying){
        music.stop();
        music_enabled = false;
        if(musicButton!=null)musicButton.setTexture('topbuttons', 1);
    }else{
        music.play();
        music_enabled = true;
        if(musicButton!=null)musicButton.setTexture('topbuttons', 0);
    }
}

function toggleSound(){
    sound_enabled = !sound_enabled;
    if(sound_enabled){
        if(soundButton!=null)soundButton.setTexture('topbuttons', 4);
    }else{
        if(soundButton!=null)soundButton.setTexture('topbuttons', 5);
    }
}

function toggleFullscreen() {
    if (!game.scale.isFullscreen){
        game.scale.startFullscreen();
        if(fullscreenButton!=null)fullscreenButton.setTexture('topbuttons', 3);
    }else{
        game.scale.stopFullscreen();
        if(fullscreenButton!=null)fullscreenButton.setTexture('topbuttons', 2);
    }
}

function showVictoryScreen(){
    blinkSpaces = false;
    canGoToNextLevel = false;
    nextWaveButton.alpha = 0;
    nextWaveButton.setDepth(4);
    nextWaveButton.x = 640;
    nextWaveButton.y = 560;
    MONEY = 0;

    killAllEnemies();

    tw.add({
        targets: music,
        duration: 2000,
        volume: 0,
        onComplete: ()=> {
            if(LEVEL < 3){
                music.stop();
                if(music_enabled) {
                    fsmusic = game.sound.add('victory', {volume: 0.3});
                    fsmusic.play();
                }
                dimScreen(0.5, 300);
                //emitter_victory.emitParticleAt(640, 360);

                fsText.setText('LEVEL\nCOMPLETE').setDepth(4);
                fsText.scale = 2;
                fsText.alpha = 0;
                tw.add({
                    targets: fsText,
                    duration: 300,
                    alpha: 1,
                    scale: 1,
                    ease: 'Back.easeOut',
                    onComplete: ()=> {
                        tw.add({
                            targets: nextWaveButton,
                            duration: 300,
                            alpha: 1,
                            scale: 2,
                            ease: 'Back.easeOut',
                            onComplete: ()=>{
                                canGoToNextLevel = true;
                            }
                        });},
                    repeat: 0
                });
            }else{
                showEndScreen();
            }
        },
        repeat: 0
    });
}

function showDefeatScreen(){
    waveIndex = 999;
    WAVE = 1;
    blinkSpaces = false;
    MONEY = 0;

    emitter_enemies.emitParticleAt(640, 360, 100);

    restartButton.alpha = 0;
    restartButton.scale = 1.5;
    restartButton.setDepth(4);
    restartButton.x = 640;
    restartButton.y = 560;

    dimScreen(0.8, 500);
    tw.add({
        targets: music,
        duration: 1000,
        volume: 0,
        onComplete: ()=> {
            music.stop();
        },
        repeat: 0
    });

    fsText.setText('DEFEAT').setDepth(4);
    fsText.scale = 0.8;
    fsText.alpha = 0;
    fsText.y = 660;
    tw.add({
        targets: fsText,
        duration: 1000,
        alpha: 1,
        y: 360,
        scale: 1,
        ease: 'Sine.easeOut',
        onComplete: ()=>{
            tw.add({
                targets: restartButton,
                duration: 600,
                alpha: 1,
                scale: 2,
                y: 560,
                ease: 'Sine.easeOut',
            });
        },
        repeat: 0
    });

    killAllEnemies();

    if(music_enabled){
        fsmusic = game.sound.add('defeat', {volume: 0.3});
        fsmusic.play();
    }
}

function showEndScreen(){
    gameInProgress = false;
    let finalTime = globalTime;

    //console.log(globalTime-prevtime);
    times.push(globalTime-prevtime);
    prevtime = globalTime;

    music.stop();
    if(music_enabled) {
        fsmusic = game.sound.add('highscore', {volume: 0.5, loop: true});
        fsmusic.play();
    }

    dimScreen(1, 2000);

    emitter_end.x = 640;
    emitter_end.y = 360;

    emitter_end.createEmitter({
        frame: 0,
        angle: { min: 0, max: 360 },
        speed: { min: 50, max: 400 },
        lifespan: { min: 3000, max: 8000 },
        alpha: { start: 0, end: 1 },
        scale: { start: 0.2, end: 1 },
        on: true
    });

    let hsTitle = add.text(640, -100, 'VICTORY', textfont_superbig).setOrigin(0.5).setDepth(5).setScale(0.5).setColor('#deae36');
    let hsText1 = add.text(640, 180, 'Your defenses have proven to be impenetrable by the enemy forces.\nWith their Leader in ashes, the robot army has surrendered.\n\nCongratulations!', textfont_big).setOrigin(0.5).setDepth(5).setScale(0.8);
    let playerScoreText;
    let playerNameText = [];
    let nameCharacters = [0,0,0];
    let nameButtons = [];
    const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let submitButton;
    hsText1.alpha = 0;
    tw.add({
        targets: hsTitle,
        duration: 2000,
        y: 100,
        scale: 1,
        ease: 'Sine.easeOut',
        onComplete: ()=>{
            tw.add({
                targets: hsText1,
                duration: 1000,
                y: 230,
                alpha: 1,
                scale: 1,
                ease: 'Sine.easeOut',
                onComplete: ()=>{
                    let playerTimeString = difficulty_str+"\nT: " + (new Date(finalTime).toISOString().slice(11, -1));

                    for(let i = 0; i<times.length; i++){
                        playerTimeString += "\n"+ (i+1) +": "+ (new Date(times[i]).toISOString().slice(11, -1));
                    }

                    playerScoreText = add.text(640, 320, SCORE, textfont_bigger).setOrigin(0.5).setDepth(5);
                    add.text(1270,710,playerTimeString, textfont_big_right).setStroke('#000000', 5).setDepth(5).setOrigin(1);
                    for(let i = 0; i<3; i++){
                        playerNameText[i] = add.text(540+i*100, 500, "A", textfont_superbig).setOrigin(0.5).setDepth(5);
                    }
                    updatePlayerNameText();
                    for(let i = 0; i<3; i++){
                        nameButtons[i] = add.image(534+i*100, 420, 'hs_updown').setDepth(5).setInteractive().on('pointerdown', () => {decLetter(i); updatePlayerNameText();} );
                    }
                    for(let i = 3; i<6; i++){
                        nameButtons[i] = add.image(534+(i-3)*100, 580, 'hs_updown',1).setDepth(5).setInteractive().on('pointerdown', () => {incLetter(i-3); updatePlayerNameText();} );
                    }
                    submitButton = add.image(634, 650, 'hs_submit').setDepth(5).setInteractive().on('pointerdown', () => {submitScore();});
                },
                repeat: 0
            });
        },
        repeat: 0
    });

    function updatePlayerNameText(){
        for(let i = 0; i<3; i++){
            playerNameText[i].setText(characters[nameCharacters[i]]);
        }
    }
    function incLetter(letter){
        if(nameCharacters[letter]<characters.length-1)nameCharacters[letter]++;
        else nameCharacters[letter] = 0;
    }
    function decLetter(letter){
        if(nameCharacters[letter]>0)nameCharacters[letter]--;
        else nameCharacters[letter] = characters.length-1;
    }
    function submitScore(){
        //playerScoreText.destroy();

        for(let i=0; i<3; i++){
            playerNameText[i].destroy();
        }
        for(let i=0; i<6; i++){
            nameButtons[i].destroy();
        }
        submitButton.destroy();

        add.text(640, 580, 'Thanks for submitting your high score!\n\n\n\n\n\n\n\n\n\n(This feature doesn\'t work in the GitHub version)', textfont_big).setOrigin(0.5).setDepth(5);

        let PLAYERNAME = "";
        for(let i = 0; i<3; i++){
            PLAYERNAME += (characters[nameCharacters[i]]);
        }
        //console.log(PLAYERNAME+", "+SCORE);
        document.getElementById("hsForm").innerHTML = "<form name='highScoreForm' method='POST' action='submit.inc.php' target='_blank'><input type='hidden' name='playerScore' value='"+SCORE+"'><input type='hidden' name='playerName' value='"+PLAYERNAME+"'></form>";
        document.forms["highScoreForm"].submit();
    }
}

function killAllEnemies(){
    let enemyUnits = enemies.getChildren();
    while(enemyUnits.length>0) {
        for (let i = 0; i < enemyUnits.length; i++) {
            enemyUnits[i].setActive(false);
            enemyUnits[i].destroy();
        }
    }
}

function dimScreen(alpha, time){
    fsrect.fillColor = '0x000000';
    tw.add({
        targets: fsrect,
        duration: time,
        alpha: alpha,
        repeat: 0
    });
}

function undimScreen(){
    tw.add({
        targets: fsrect,
        duration: 500,
        alpha: 0,
        repeat: 0
    });
}

function hideFsMessage(){
    fsText.setDepth(3);
    nextWaveButton.setDepth(2);
    tw.add({
        targets: fsText,
        duration: 600,
        scale: 6,
        alpha: 0,
        onComplete: ()=> {blinkSpaces = true;restartButton.y = -100;restartButton.setScale(0);nextWaveButton.x = 1079; nextWaveButton.y = 20;nextWaveButton.setScale(1);},
        ease: 'Sine.easeIn',
    });
    restartButton.y = -100;
    restartButton.setScale(0);
    nextWaveButton.x = 1079; nextWaveButton.y = 20; nextWaveButton.setTexture("button_nextwave", 0).setScale(1);
}

function showBossHealth(){
    waveInfo.x = 590;
    waveInfo.scale = 1.5;
    waveInfo.alpha = 0;
    tw.add({
        targets: waveInfo,
        duration: 300,
        x: 690,
        scale: 1,
        alpha: 1,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function setUIColor(color1, color2, textcolor){
    uileft.setTint(color1);
    uitop.setTint(color1);
    soundButton.setTint(color1);
    musicButton.setTint(color1);
    fullscreenButton.setTint(color1);
    nextWaveButton.setTint(color1);
    restartButton.setTint(color1);
    waveText.setColor(textcolor);
    hpText.setColor(textcolor);
    moneyText.setColor(textcolor);
    selector.setTint(color2);
}

function createGame(){
    graphics = this.add.graphics();                         //cesty
    uileft = this.add.image(55,380, 'ui_left').setDepth(2);
    uitop = this.add.image(640,20, 'ui_top').setDepth(2);
    start = this.add.image(250,105, 'start_finish', 0);
    finish = this.add.image(1000,110, 'start_finish', 1);
    waveText = this.add.text(87, 13, '', bigfont).setDepth(2);
    hpText = this.add.text(191, 13, '', bigfont).setDepth(2);
    moneyText = this.add.text(295, 13, '', bigfont).setDepth(2);
    graphics.lineStyle(3, 0xaaaaaa).alpha = 0;

    emitter_upgrade = this.add.particles('button_icons').setDepth(1);
    emitter_enemies = this.add.particles(['a3']).setDepth(3);
    //emitter_victory = this.add.particles('star').setDepth(3);
    emitter_end = this.add.particles('star').setDepth(3);

    emitter_thermal = this.add.particles('p4_destroy').setDepth(1);
    emitter_thermal2 = this.add.particles('p12_destroy').setDepth(1);

    emitter_electric = this.add.particles('p2_destroy').setDepth(1);
    emitter_electric2 = this.add.particles('p10_destroy').setDepth(1);

    emitter_thermal.createEmitter({
        frame: [0,1,2,3],
        randomFrame: true,
        angle: { min: 0, max: 360 },
        speed: { min: 20, max: 200 },
        lifespan: { min: 100, max: 500 },
        alpha: { start: 1, end: 0 },
        scale: { start: 1, end: 3 },
        on: false
    });

    emitter_thermal2.createEmitter({
        frame: [0,1,2,3],
        randomFrame: true,
        angle: { min: 0, max: 360 },
        speed: { min: 20, max: 200 },
        lifespan: { min: 100, max: 500 },
        alpha: { start: 1, end: 0 },
        scale: { start: 1, end: 3 },
        on: false
    });

    emitter_electric.createEmitter({
        frame: [0,1,2,3],
        randomFrame: true,
        angle: { min: 0, max: 360 },
        speed: { min: 20, max: 200 },
        lifespan: { min: 100, max: 500 },
        alpha: { start: 1, end: 0 },
        scale: { start: 1, end: 2 },
        on: false
    });

    emitter_electric2.createEmitter({
        frame: [0,1,2,3],
        randomFrame: true,
        angle: { min: 0, max: 360 },
        speed: { min: 20, max: 200 },
        lifespan: { min: 100, max: 500 },
        alpha: { start: 1, end: 0 },
        scale: { start: 1, end: 2 },
        on: false
    });

    emitter_enemies.createEmitter({
        frame: 0,
        angle: { min: 0, max: 360 },
        speed: { min: 100, max: 400 },
        lifespan: { min: 3000, max: 10000 },
        alpha: { start: 1, end: 0 },
        scale: { min: 0.5, max: 3 },
        on: false
    });

    /*
    emitter_victory.createEmitter({
        frame: 0,
        quantity: 32,
        angle: { min: 0, max: 360, steps: 32 },
        speed: 300,
        lifespan: 3000,
        alpha: { start: 0, end: 1 },
        scale: { start: 1, end: 6 },
        on: false
    });
    */

    emitter_upgrade.createEmitter({
        frame: 0,
        angle: {min: 0, max: 360},
        speed: {min: 10, max: 100},
        lifespan: {min: 1000, max: 2000},
        quantity: 20,
        alpha: { start: 1, end: 0 },
        scale: { start: 4, end: 0.5 },
        gravityY: -200,
        on: false
    });

    //top buttons
    nextWaveButton = this.add.image(1079,20, 'button_nextwave', 0).setDepth(2).setScale(0).setInteractive().on('pointerdown', () => nextWave());
    restartButton = this.add.image(1099,-100, 'button_nextwave', 2).setDepth(4).setScale(0).setInteractive().on('pointerdown', () => restartLevel());
    fullscreenButton = this.add.image(1259,20, 'topbuttons', 2).setDepth(2).setInteractive().on('pointerdown', () => toggleFullscreen());
    musicButton = this.add.image(1218,20, 'topbuttons', 0).setDepth(2).setInteractive().on('pointerdown', () => toggleMusic());
    soundButton = this.add.image(1177,20, 'topbuttons', 4).setDepth(2).setInteractive().on('pointerdown', () => toggleSound());

    //i need some sleep
    if (music_enabled){
        musicButton.setTexture('topbuttons', 0);
    }else{
        musicButton.setTexture('topbuttons', 1);
    }

    if(sound_enabled){
        soundButton.setTexture('topbuttons', 4);
    }else{
        soundButton.setTexture('topbuttons', 5);
    }

    if (!game.scale.isFullscreen){
        fullscreenButton.setTexture('topbuttons', 2);
    }else{
        fullscreenButton.setTexture('topbuttons', 3);
    }


    //tower info
    selectedImg = this.add.image(453,18,'t1', SELECTED_TOWER-1).setDepth(2);
    selectedImg.setScale(HUD_ICON_SCALE);
    selectedInfo = this.add.text(736,19,getTowerInfo(SELECTED_TOWER-1),selectedfont).setDepth(2).setOrigin(0.5);
    updateTowerInfo();

    waveInfo = this.add.text(690,70,'',textfont_big).setStroke('#000000', 5).setDepth(2).setOrigin(0.5);
    scoreText = this.add.text(1270,710,'',textfont_big_right).setStroke('#000000', 5).setDepth(2).setOrigin(1);
    timestring = "\nW: " + (new Date(0).toISOString().slice(11, -1)) + "\nT: " + (new Date(0).toISOString().slice(11, -1));
    scoreText.setText(difficulty_str+"\nScore: "+SCORE+timestring);

    //upgrade, sell
    this.add.image(36,683, 'button_small', 1).setDepth(2).setInteractive().on('pointerdown', () => upgradeTool());
    this.add.image(72,683, 'button_small', 2).setDepth(2).setInteractive().on('pointerdown', () => sellTool());
    this.add.image(27,671, 'button_icons', 0).setDepth(2).setOrigin(0);
    this.add.image(63,671, 'button_icons', 1).setDepth(2).setOrigin(0);

    for(let i=0; i<8; i++){
        this.add.image(53,75*i+100, 'button').setDepth(2).setInteractive().on('pointerdown', () => changeSelectedTower(i+1));
    }

    for(let i=0; i<7; i++){
        if(i===3){
            this.add.image(53,75*i+98, 't'+(i+1)).setDepth(2).setScale(HUD_ICON_SCALE*0.5);
        }else if(i===5) {
            this.add.image(53, 75 * i + 98, 't6_idle').setDepth(2).setScale(HUD_ICON_SCALE*0.7);
        }else if(i===6){
            this.add.image(53,75*i+98, 't7_idle').setDepth(2).setScale(HUD_ICON_SCALE);
        }else{
            this.add.image(53,75*i+98, 't'+(i+1)).setDepth(2).setScale(HUD_ICON_SCALE);
        }
    }

    nukeIcon = this.add.image(53,75*7+98, 't8').setDepth(2).setScale(HUD_ICON_SCALE);

    //selektor
    selector = this.add.image(0,0,'selector').setDepth(2);
    selector.x = 53;
    selector.y = 75*(SELECTED_TOWER-1)+100;

    for(let i = 0; i<8; i++){
        cross[i] = this.add.image(53,75*i+100,'cross').setDepth(2);
    }

    //cenovky
    for(let i=0; i<8; i++){
        priceText[i] = this.add.text(54,75*i+127, TOWER_PRICES[i]+'$', bigfont_white).setDepth(2).setStroke('#000000', 2).setOrigin(0.5);
    }

    setUIColor(0x000000, 0x000000, '#000000');

    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        if(deltaY>0){
            if(SELECTED_TOWER < 8 && SELECTED_TOWER >= 1)changeSelectedTower(SELECTED_TOWER+1);
            else if(SELECTED_TOWER == 8)upgradeTool();
            else if(SELECTED_TOWER == -2)sellTool();
        }else{
            if(SELECTED_TOWER <= 8 && SELECTED_TOWER > 1) changeSelectedTower(SELECTED_TOWER-1);
            else if(SELECTED_TOWER == -2)changeSelectedTower(8);
            else if(SELECTED_TOWER == 0)upgradeTool();
        }
    });

    //keyboard
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)  .on('down', function() {changeSelectedTower(1)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)  .on('down', function() {changeSelectedTower(2)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).on('down', function() {changeSelectedTower(3)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR) .on('down', function() {changeSelectedTower(4)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE) .on('down', function() {changeSelectedTower(5)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)  .on('down', function() {changeSelectedTower(6)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN).on('down', function() {changeSelectedTower(7)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT).on('down', function() {changeSelectedTower(8)}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE) .on('down', function() {upgradeTool()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO) .on('down', function() {sellTool()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)    .on('down', function() {upgradeTool()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)    .on('down', function() {sellTool()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)    .on('down', function() {if(!waveInProgress && canGoToNextLevel && HEALTH > 0)nextWave()}, this);
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on('down', function() {if(!waveInProgress && canGoToNextLevel && HEALTH > 0)nextWave()}, this);
}