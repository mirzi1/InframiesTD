let config = {
    type: Phaser.AUTO,
    scale:{
        /*mode: Phaser.Scale.FIT,*/
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
let background;
let path;
let selector;
let selectedImg;
let selectedInfo;
let uitop;
let uileft
let blinkSpaces = true;
let tw;

let LEVEL = 0;
let WAVE = 0;
let HEALTH = 100;
let MONEY = 100;
const STARTHEALTH = 100;
const STARTMONEY = 100;
let SELECTED_TOWER = 1;

const WAVE_SPEED = 500;

const bigfont = { font: "bold 22px font1", fill: "#3CCEFF", boundsAlignH: "center", boundsAlignV: "middle" };
const smallfont = { font: "12px font1", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
const smallfont_black = { font: "12px font1", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont = { font: "bold 10px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

const HUD_ICON_SCALE = 0.5;

const ENEMY_HEALTH = [50,200,300,400,500,600,700,1000];
const ENEMY_SPEED = [1/8000,1/10000,1/10000,1/10000,1/10000,1/10000,1/10000,1/10000];
const ENEMY_REWARD = [10,20,30,40,50,100,200,1000];
const LEVEL_SPEED_MODIFIER = [0.7, 1, 1];

let waveInProgress = false;
let nextEnemy = 0;
let waveIndex = 0;

const TOWER_PRICES = [150,400,300,400,500,600,700,1000];
const TOWER_SPEED = [700,1300,2000,1300,2200,1000,100,1000];
const TOWER_RANGE = [350,300,250,2000,300,550,500,2000];
const TOWER_DESCRIPTION = ['Laser - Basic turret',
                            'Electric - Slows enemies on hit',
                            'Canon - Slow but lethal, instantly destroy barriers',
                            'Sniper - Sees the entire map and hidden enemies',
                            'Multishot - Fires 5 projectiles at once',
                            'Thermal - Sees hidden enemies',
                            'Rapid - Massive firing rate',
                            'Nuke - Vaporizes everything except bosses'];
const TOWER_UPGRADE_DESCRIPTION = ['+range, +firerate, see hidden enemies',
                                    '+firerate, Stun enemies on hit',
                                    '+firerate, bigger explosions',
                                    '+firerate, instantly destroy barriers',
                                    '+range, +damage, 7 projectiles at once',
                                    '+firerate, projectile divides into 3 on hit',
                                    '+damage, see hidden enemies',
                                    'none'];

//TODO: tower balancing
const TOWER_DAMAGE = [50,10,300,500,30,100,50,1000,
                      150,250,350,450,550,650,750,1000,
                      30, 15];
const PROJECTILE_SPEED = [500,600,450,4000,300,600,700,1000,
                          500,600,300,400,500,600,700,1000,
                          200, 300];
const PROJECTILE_LIFESPAN = [500,500,1500,1000,1200,500,500,500,
                             500,500,500,500,500,500,500,500,
                             700, 200];

const GRID_W = 50;
const GRID_H = 50;

let level1 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let level2 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0, 0,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1, 0, 0,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

let level3 =       [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1],
                    [-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1],
                    [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

//TODO: waves
const waves = [ [1,0,1,0,1,0,2],
                [1,1,0,0,1,1,1,0,0,1,1,1,1,2]
              ];

function preload(){
    //nacitanie spritov
    //ui
    this.load.image('ui_top', 'assets/graphics/ui/UI_top.png');
    this.load.image('ui_left', 'assets/graphics/ui/UI_left.png');
    this.load.image('button', 'assets/graphics/ui/button.png');
    this.load.image('button_nextwave', 'assets/graphics/ui/button_nextwave.png');
    this.load.image('button_nextLevel', 'assets/graphics/ui/button_nextlevel.png');
    this.load.image('selector', 'assets/graphics/ui/selector.png');
    this.load.spritesheet('button_small', 'assets/graphics/ui/button_small.png' ,{frameHeight: 35, frameWidth: 35});
    this.load.spritesheet('button_icons', 'assets/graphics/ui/button_icons.png' ,{frameHeight: 24, frameWidth: 16});
    this.load.spritesheet('freespace', 'assets/graphics/ui/freespace.png' ,{frameHeight: 50, frameWidth: 50});

    //pozadia
    this.load.image('bg1', 'assets/graphics/levels/bg1.jpeg');
    this.load.image('bg2', 'assets/graphics/levels/bg2.jpeg');
    this.load.image('bg3', 'assets/graphics/levels/bg3.jpeg');

    //attackers
    this.load.spritesheet('a1', 'assets/graphics/attackers/a1.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a1_hurt', 'assets/graphics/attackers/a1_hurt.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('a1_destroy', 'assets/graphics/attackers/a1_death.png' ,{frameHeight:50, frameWidth: 50});
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 96, frameWidth: 55});
    this.load.spritesheet('a2_hurt', 'assets/graphics/attackers/a2_hurt.png' ,{frameHeight: 96, frameWidth: 54});
    this.load.spritesheet('a2_destroy', 'assets/graphics/attackers/a2_death.png' ,{frameHeight: 100, frameWidth: 100});

    //towers
    this.load.spritesheet('t1', 'assets/graphics/towers/t1.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t2', 'assets/graphics/towers/t2.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t3', 'assets/graphics/towers/t3.png' ,{frameHeight: 120, frameWidth: 80});

    //projectiles
    this.load.spritesheet('p1', 'assets/graphics/projectiles/p1.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p1_destroy', 'assets/graphics/projectiles/p1_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p2', 'assets/graphics/projectiles/p2.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p2_destroy', 'assets/graphics/projectiles/p2_destroy.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p3', 'assets/graphics/projectiles/p3.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p3_destroy', 'assets/graphics/projectiles/p3_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p17_destroy', 'assets/graphics/projectiles/p17_destroy.png' ,{frameHeight: 40, frameWidth: 40});

}

let Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Enemy(game){
        this.id = nextEnemy;
        //console.log("spawning "+nextEnemy);
        Phaser.GameObjects.Sprite.call(this,game,0,0,'a'+this.id);
        this.play('a'+this.id+'_normal');
        this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
        this.hp = 0;
        this.prevx = 0;
        this.prevy = 0;
        this.speed = ENEMY_SPEED[this.id-1];
        this.alpha = 0;
        this.scale = 0;
        tw.add({
            targets: this,
            duration: 200,
            alpha: 1,
            scale: 1,
            ease: 'Sine.easeOut',
            repeat: 0
        });
    },
    update:
    function(time, delta){

        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += this.speed * delta * LEVEL_SPEED_MODIFIER[LEVEL-1];
        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        //prevratenie podla smeru
        if(this.x < this.prevx){
            this.setFlip(false);
        }else{
            this.setFlip(true);
        }

        this.prevx = this.x;
        this.prevy = this.y;

        // akcie po dokonceni cesty
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.destroy();
            HEALTH--;
            updateHpText();
        }
    },
    startOnPath:
    function(){
        this.hp = ENEMY_HEALTH[this.id-1];
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage:
    function(damage) {
        this.hp -= damage;

        this.play('a'+this.id+'_hurt');
        this.once('animationcomplete', ()=>{
            this.play('a'+this.id+'_normal');
        });

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            MONEY+=ENEMY_REWARD[this.id-1];
            updateMoneyText();
            createAnimated(this.x,this.y,'a'+this.id, this.flipX);
            this.setActive(false);
            this.destroy();
        }
    },
    slow:
    function(){
        if(this.speed == ENEMY_SPEED[this.id-1]){
            this.speed /=2;
            this.tint = 0x00ffff;
            this.blendMode = 'ADD';
        }
        tw.add({
            targets: this,
            duration: 2000,
            scale: 1,
            ease: 'Sine.easeOut',
            onComplete: e=>{this.speed = ENEMY_SPEED[this.id-1];this.tint = 0xffffff;this.blendMode = 'NORMAL';},
            repeat: 0
        });
        //TODO: pridaj timer
    }
});

let AnimatedObject = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function AnimatedObject(game){
            Phaser.GameObjects.Sprite.call(this,game,0,0);
        },
    doYourThing:
        function(x,y,sprite,direction){
            this.x = x;
            this.y = y;
            if(direction){this.setFlip(true)}
            switch(sprite){
                case 'p3': this.play('p3_destroy');this.setScale(4);this.once('animationcomplete', ()=>{this.setActive(false);this.destroy()});break;
                case 'freespace': this.play('freespace_destroy');this.once('animationcomplete', ()=>{this.setActive(false);this.destroy(); blinkSpaces = true;});break;
                default: this.play(sprite+'_destroy');this.once('animationcomplete', ()=>{this.setActive(false);this.destroy()});break;
            }
        }
});

let Tower = new Phaser.Class({
    /*Tower IDs:
    1. laser
    2. electric
    3. canon
     */
    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Tower (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 't'+SELECTED_TOWER);
            this.nextTic = 0;
            this.TowerType = SELECTED_TOWER;
            this.setInteractive().on('pointerdown', e => {
                if(SELECTED_TOWER == 0){
                    this.i = Math.floor(this.y / GRID_H);this.j = Math.floor(this.x / GRID_W);

                    tw.add({
                        targets: this,
                        duration: 200,
                        alpha: 0,
                        scale: 2,
                        repeat: 0,
                        ease: 'Sine.easeOut',
                        onComplete: e=>{switch(LEVEL){
                            case 1: level1[this.i][this.j] = 0;
                            case 2: level2[this.i][this.j] = 0;
                            case 3: level3[this.i][this.j] = 0;
                        }
                        this.setActive(false);this.destroy();},
                        repeat: 0
                    });
                }
            });
        },
    place: function(i, j) {
        //polozenie - pozicia a typ
        if(SELECTED_TOWER != 0){
            this.y = i * GRID_H + GRID_H/2;
            this.x = j * GRID_W + GRID_W/2;
            switch(LEVEL){
                case 1: level1[i][j] = this.TowerType;break
                case 2: level2[i][j] = this.TowerType;break
                case 3: level3[i][j] = this.TowerType;break
            }
            this.scaleX = 2;
            this.scaleY = 2;
            this.alpha = 0;
            tw.add({
                targets: this,
                duration: 200,
                alpha: 1,
                scaleX: 1,
                scaleY: 1,
                ease: 'Sine.easeOut',
                repeat: 0
            });
        }
    },
    fire: function() {
        let enemy = getEnemy(this.x, this.y, TOWER_RANGE[this.TowerType-1]);
        if(enemy) {
            //vytvorime bullet
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, this.TowerType);
            if(this.TowerType == 5){
                addBullet(this.x, this.y, angle-0.1, this.TowerType);
                addBullet(this.x, this.y, angle-0.2, this.TowerType);
                addBullet(this.x, this.y, angle+0.1, this.TowerType);
                addBullet(this.x, this.y, angle+0.2, this.TowerType);
            }
            //otacanie podla druhu Towery
            switch(this.TowerType){
                case 1: case 3: this.angle = ((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG ); break;
            }
            //animacia vystrelu
            this.play('t'+this.TowerType+'_fire');
        }
    },
    update: function (time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + TOWER_SPEED[this.TowerType - 1];
        }
    }
});

let Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'p1');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = 0;
        },

    fire: function (x, y, angle,type)
    {
        this.type = type;
        this.speed = Phaser.Math.GetSpeed(PROJECTILE_SPEED[type-1], 1);

        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);
        this.play('p'+type);

        //  we don't need to rotate the bullets as they are round
        this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = PROJECTILE_LIFESPAN[type-1];
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
    background = this.add.image(695, 380);           //background bude vzdy naspodku
    graphics = this.add.graphics();                         //cesty
    uileft = this.add.image(55,380, 'ui_left');
    uitop = this.add.image(640,20, 'ui_top');
    waveText = this.add.text(100, 9, '', bigfont);
    hpText = this.add.text(200, 9, '', bigfont);
    moneyText = this.add.text(300, 9, '', bigfont);
    graphics.lineStyle(3, 0xaaaaaa).alpha = 0;

    tw = this.tweens;       //tween manager

    //nextwave
    nextWaveButton = this.add.image(1140,20, 'button_nextwave').setInteractive().on('pointerdown', e => nextWave());

    nextLevel();
    updateHpText();
    updateMoneyText();

    //tower info
    //this.add.image(200,50, 'button');
    selectedImg = this.add.image(453,18,'t1', SELECTED_TOWER-1);
    selectedImg.setScale(HUD_ICON_SCALE);
    selectedInfo = this.add.text(478,5,getTowerInfo(SELECTED_TOWER-1),textfont);
    updateTowerInfo();

    //upgrade, sell
    this.add.image(36,683, 'button_small', 1).setInteractive().on('pointerdown', e => upgradeTool());
    this.add.image(72,683, 'button_small', 2).setInteractive().on('pointerdown', e => sellTool());
    this.add.image(36,683, 'button_icons', 0);
    this.add.image(72,683, 'button_icons', 1);


    //tlacidla nalavo
    for(let i=0; i<8; i++){
        this.add.image(53,75*i+100, 'button').setInteractive().on('pointerdown', e => changeSelectedTower(i+1));
        this.add.image(53,75*i+100, 't'+(i+1)).setScale(HUD_ICON_SCALE);
        //this.add.text(20,73*i+16, i+1, smallfont);
        this.add.text(24,75*i+117, TOWER_PRICES[i]+'$', smallfont_black).setStroke('#FFE000', 2);
    }

    //selektor
    selector = this.add.image(0,0,'selector');
    selector.x = 53;
    selector.y = 75*(SELECTED_TOWER-1)+100;

    //kurzor
    this.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');

    //generovanie animacii
    generateAnims();

    //keyboard
    let key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)  .on('down', function() {changeSelectedTower(1)}, this);
    let key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)  .on('down', function() {changeSelectedTower(2)}, this);
    let key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).on('down', function() {changeSelectedTower(3)}, this);
    let key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR) .on('down', function() {changeSelectedTower(4)}, this);
    let key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE) .on('down', function() {changeSelectedTower(5)}, this);
    let key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)  .on('down', function() {changeSelectedTower(6)}, this);
    let key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN).on('down', function() {changeSelectedTower(7)}, this);
    let key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT).on('down', function() {changeSelectedTower(8)}, this);
    let keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)    .on('down', function() {this.scale.startFullscreen();}, this);

    Towers = this.add.group({ classType: Tower, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    AnimatedObjects = this.add.group({ classType: AnimatedObject, runChildUpdate: true });

    this.physics.add.overlap(enemies, bullets, damageEnemy);

    this.nextEnemy = 0;

    this.input.on('pointerdown', placeTower);
}

function update(time, delta){
    // spawn utocnika podla arrayu kazdych n milisekund
    if(waveInProgress){
        if (time > this.nextEnemy){
            if(waveIndex<waves[WAVE-1].length){
                nextEnemy=waves[WAVE-1][waveIndex];
                if(nextEnemy != 0){
                    let enemy = enemies.get();
                    if (enemy){
                        enemy.setActive(true);
                        enemy.setVisible(true);

                        // ulozenie utocnika na zaciatok
                        enemy.startOnPath();
                    }
                }
                waveIndex++;
            }else if(enemies.countActive() == 0){
                console.log('end of wave '+WAVE+' reached');waveInProgress=false;nextWaveButton.visible = true;graphics.alpha = 0.8;
                if(WAVE<waves.length){/*hmmmmm*/}
                else{nextWaveButton.setTexture("button_nextLevel");}
            }
            this.nextEnemy = time + WAVE_SPEED;
        }
    }
}

function placeTower(pointer) {
    if(pointer.x>100 && pointer.y>40 && SELECTED_TOWER != 0) {
        let i = Math.floor(pointer.y / GRID_H);
        let j = Math.floor(pointer.x / GRID_W);
        if (canPlaceTower(i, j)) {
            let Tower = Towers.get();
            if (Tower) {
                Tower.setActive(true);
                Tower.setVisible(true);
                Tower.place(i, j);
            }
        } else {
            blinkAvailableSpaces();
        }
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
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        createAnimated(bullet.x,bullet.y,'p'+bullet.type, false);
        let bounceangle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y);
        switch (bullet.type){
            case 2: enemy.slow();break;
            case 3: let random = Math.random()*2;
                    for(let i = 1; i<7; i++) addBullet(bullet.x, bullet.y, random+i*1, 18);break;
        }

        bullet.setActive(false);
        bullet.destroy();

        enemy.receiveDamage(TOWER_DAMAGE[bullet.type - 1]);
    }
}

function changeSelectedTower(id){
    SELECTED_TOWER=id;
    moveSelector(SELECTED_TOWER-1);
    updateTowerInfo();
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
        switch(LEVEL){
            case 1:
                for(let i = 0; i<level1.length; i++){
                    for(let j = 0; j<level1[i].length; j++){
                        if(level1[i][j]==0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
            case 2:
                for(let i = 0; i<level2.length; i++){
                    for(let j = 0; j<level2[i].length; j++){
                        if(level2[i][j]==0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
            case 3:
                for(let i = 0; i<level3.length; i++){
                    for(let j = 0; j<level3[i].length; j++){
                        if(level3[i][j]==0){createAnimated(25+GRID_H*j,25+GRID_W*i,'freespace', false);}
                    }
                }break;
        }

    }
}

function sellTool(){
    SELECTED_TOWER = 0;
    selectedImg.setTexture('button_icons', 1).setScale(1);
    selectedInfo.setText('Sell');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_delete.cur), pointer');

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
    selectedInfo.setText('Upgrade (WIP)');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_upgrade.cur), pointer');

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
    selectedImg.setTexture('t'+(SELECTED_TOWER)).setScale(0.3);
    selectedInfo.setText(getTowerInfo(SELECTED_TOWER-1));
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');
}

function getTowerInfo(type){
    return   TOWER_DESCRIPTION[type]+', dmg: '+TOWER_DAMAGE[type]+', fir: '+TOWER_SPEED[type]+ ', ran: '+TOWER_RANGE[type]+ ', spd: '+PROJECTILE_SPEED[type]+ ', pls: '+PROJECTILE_LIFESPAN[type]
            +'\nUpgrade: '+TOWER_UPGRADE_DESCRIPTION[type]+' - '+TOWER_PRICES[type]*4+'$';
}

function updateHpText(){
    hpText.setText(HEALTH);
    hpText.y = 4;
    tw.add({
        targets: hpText,
        duration: 100,
        y: 9,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function updateMoneyText(){
    moneyText.setText(MONEY);
    moneyText.y = 4;
    tw.add({
        targets: moneyText,
        duration: 100,
        y: 9,
        ease: 'Sine.easeOut',
        repeat: 0
    });
}

function nextWave(){
    if(WAVE<waves.length){
        WAVE++;
        console.log('starting wave '+ WAVE);
        waveInProgress=true;
        waveIndex = 0;

        tw.add({
            targets: waveText,
            duration: 200,
            scaleX: 0,
            ease: 'Sine.easeIn',
            onComplete: e=> {
                waveText.setText(WAVE);
                tw.add({
                    targets: waveText,
                    duration: 200,
                    scaleX: 1,
                    ease: 'Sine.easeOut',
                    repeat: 0
            });},
            repeat: 0
        });
        nextWaveButton.visible = false;
        graphics.alpha = 0.3;
    }else{nextLevel();console.log('no more waves in array!')}
}

function nextLevel(){
    if(LEVEL<3){
        LEVEL++;
        WAVE = 0;
        MONEY = STARTMONEY;
        HEALTH = STARTHEALTH;
        graphics.alpha = 0;
        //background anim
        tw.add({
            targets: background,
            duration: 500,
            alpha: 0,
            scaleX: 2,
            scaleY: 2,
            ease: 'Sine.easeIn',
            onComplete: e=> {
                background.setTexture('bg'+LEVEL);
                background.scaleX = 0.8;
                background.scaleY = 0.8;
                tw.add({
                    targets: background,
                    duration: 500,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Sine.easeOut',
                    onComplete: e=> graphics.alpha = 0.8,
                    repeat: 0
                });
                },
            repeat: 0
        });
        //update values
        tw.add({
            targets: waveText,
            duration: 200,
            scaleX: 0,
            ease: 'Sine.easeIn',
            onComplete: e=> {
                waveText.setText(WAVE);
                tw.add({
                    targets: waveText,
                    duration: 200,
                    scaleX: 1,
                    ease: 'Sine.easeOut',
                    repeat: 0
                });},
            repeat: 0
        });
        updateMoneyText();
        updateHpText();
        //delete towers
        if(LEVEL>1){
            let towers_placed = Towers.getChildren();
            while(towers_placed.length>0){
                console.log("phaser pls");
                for(let i = 0; i < towers_placed.length; i++) {
                    towers_placed[i].destroy();
                }
            }
        }
        nextWaveButton.setTexture("button_nextwave");
        switch(LEVEL){
            case 1: uileft.setTint(0x3cceff);uitop.setTint(0x3cceff);nextWaveButton.setTint(0x3cceff);
                    path = new Phaser.Curves.Path(250, 100);
                    path.lineTo(510, 150);
                    path.lineTo(250, 200);
                    path.lineTo(510, 250);
                    path.lineTo(250, 300);
                    path.lineTo(510, 350);
                    path.lineTo(250, 400);
                    path.lineTo(510, 450);
                    path.lineTo(1000, 450);
                    path.lineTo(1000, 110);
                    break;
            case 2: uileft.setTint(0xff0054);uitop.setTint(0xff0054);waveText.setColor("#ff0054");hpText.setColor("#ff0054");moneyText.setColor("#ff0054");nextWaveButton.setTint(0xff0054);
                    graphics.clear();
                    path.destroy();
                    graphics.lineStyle(3, 0x000000).alpha = 0;
                    path = new Phaser.Curves.Path(300, 100);
                    path.lineTo(285, 567);
                    path.lineTo(494, 589);
                    path.lineTo(576, 158);
                    path.lineTo(1090, 146);
                    path.lineTo(1063, 309);
                    path.lineTo(868, 380);
                    path.lineTo(850, 597);
                    path.lineTo(1224, 579);
                    break;
            case 3: uileft.setTint(0x00ff00);uitop.setTint(0x00ff00);waveText.setColor("#00ff00");hpText.setColor("#00ff00");moneyText.setColor("#00ff00");nextWaveButton.setTint(0x00ff00);
                    graphics.clear();
                    path.destroy();
                    graphics.lineStyle(3, 0xffff00).alpha = 0;
                    path = new Phaser.Curves.Path(300, 100);
                    path.lineTo(300, 570);
                    path.lineTo(1130, 570);
                    path.lineTo(1130, 370);
                    path.lineTo(810, 370);
                    path.lineTo(810, 200);
                    path.lineTo(615, 200);
                    path.lineTo(524, 290);
                    break;
        }

        path.draw(graphics);
    }
}

function generateAnims(){
    //attackers
    game.anims.create({key: "a1_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a1",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "a1_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a1_hurt",{start:1, end:10}), repeat: 0});
    game.anims.create({key: "a1_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a1_destroy",{start:4, end:10}), repeat: 0});
    game.anims.create({key: "a2_normal", frameRate: 15, frames: game.anims.generateFrameNumbers("a2",{start:0, end:9}), repeat: -1});
    game.anims.create({key: "a2_hurt", frameRate: 15, frames: game.anims.generateFrameNumbers("a2_hurt",{start:0, end:9}), repeat: 0});
    game.anims.create({key: "a2_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("a2_destroy",{start:3, end:10}), repeat: 0});
    //towers
    game.anims.create({key: "t1_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t1",{start:8, end:0}), repeat: 0});
    game.anims.create({key: "t2_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t2",{start:9, end:0}), repeat: 0});
    game.anims.create({key: "t3_fire", frameRate: 15, frames: game.anims.generateFrameNumbers("t3",{start:0, end:10}), repeat: 0});
    //projectiles
    game.anims.create({key: "p1", frameRate: 15, frames: game.anims.generateFrameNumbers("p1",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "p1_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p1_destroy",{start:0, end:4}), repeat: 0});
    game.anims.create({key: "p2", frameRate: 15, frames: game.anims.generateFrameNumbers("p2",{start:0, end:4}), repeat: -1});
    game.anims.create({key: "p2_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p2_destroy",{start:0, end:3}), repeat: 0});
    game.anims.create({key: "p3", frameRate: 15, frames: game.anims.generateFrameNumbers("p3",{start:0, end:6}), repeat: -1});
    game.anims.create({key: "p3_destroy", frameRate: 10, frames: game.anims.generateFrameNumbers("p3_destroy",{start:3, end:6}), repeat: 0});

    game.anims.create({key: "p17", frameRate: 15, frames: game.anims.generateFrameNumbers("p17_destroy",{start:1, end:4}), repeat: -1});         //blue electric
    game.anims.create({key: "p17_destroy", frameRate: 15, frames: game.anims.generateFrameNumbers("p17_destroy",{start:2, end:3}), repeat: 0});
    game.anims.create({key: "p18", frameRate: 1, frames: game.anims.generateFrameNumbers("p3_destroy",{start:4, end:5}), repeat: -1});  //explosion
    game.anims.create({key: "p18_destroy", frameRate: 45, frames: game.anims.generateFrameNumbers("p3_destroy",{start:3, end:6}), repeat: 0});  //explosion
    //ui
    game.anims.create({key: "freespace_destroy", frameRate: 10, frames: game.anims.generateFrameNumbers("freespace",{start:0, end:3}), repeat: 0});
}