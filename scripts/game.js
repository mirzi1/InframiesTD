var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'main-game',
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
let versionText;
let infoText;
let background_main;
let background;
let path;
let selector;
let selectedImg;
let selectedInfo;

let key1;
let key2;
let key3;
let key4;
let key5;
let key6;
let key7;
let key8;

let LIVES = 100;
let MONEY = 100;
let SELECTED_TOWER = 1;

const VERSION = "v0.1"
const ENEMY_SPEED = 1/10000;
const BULLET_DAMAGE = 30;

const bigfont = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
const smallfont = { font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
const cursor_default = 'url(assets/graphics/ui/cursor.cur)'

const HUD_ICON_SCALE = 0.5;

const TOWER_PRICES = [100,200,300,400,500,600,700,1000];
const TOWER_DAMAGE = [100,200,300,400,500,600,700,1000];

const ENEMY_HEALTH = [100,200,300,400,500,600,700,1000];
const ENEMY_REWARD = [100,200,300,400,500,600,700,1000];

const level1 =       [[ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, -1],
                    [ -1, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1, 0, 0, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                    [ -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

function preload(){
    //nacitanie spritov
    //misc
    this.load.image('bg', 'assets/graphics/bg.png');
    this.load.image('bg1', 'assets/graphics/bg1.png');
    this.load.image('logo', 'assets/graphics/logo.png');

    //ui
    this.load.image('button', 'assets/graphics/ui/button.png');
    this.load.image('selector', 'assets/graphics/ui/selector.png');
    this.load.spritesheet('towericons', 'assets/graphics/ui/towericons.png' ,{frameHeight: 50, frameWidth: 50});
    this.load.spritesheet('freespace', 'assets/graphics/ui/freespace.png' ,{frameHeight: 100, frameWidth: 100});

    //attackers
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 97, frameWidth: 55});
    this.load.spritesheet('a2_hurt', 'assets/graphics/attackers/a2_hurt.png' ,{frameHeight: 97, frameWidth: 54});
    this.load.spritesheet('a2_destroy', 'assets/graphics/attackers/a2_death.png' ,{frameHeight: 100, frameWidth: 100});

    //towers
    this.load.spritesheet('t1', 'assets/graphics/towers/t1.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t2', 'assets/graphics/towers/t2.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t3', 'assets/graphics/towers/t3.png' ,{frameHeight: 80, frameWidth: 120});

    //projectiles
    this.load.spritesheet('p1', 'assets/graphics/projectiles/p1.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p1_destroy', 'assets/graphics/projectiles/p1_destroy.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p2', 'assets/graphics/projectiles/p2.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p2_destroy', 'assets/graphics/projectiles/p2_destroy.png' ,{frameHeight: 40, frameWidth: 40});
    this.load.spritesheet('p3', 'assets/graphics/projectiles/p3.png' ,{frameHeight: 20, frameWidth: 20});
    this.load.spritesheet('p3_destroy', 'assets/graphics/projectiles/p3_destroy.png' ,{frameHeight: 20, frameWidth: 20});

}

let Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Enemy(game){
        Phaser.GameObjects.Sprite.call(this,game,0,0,'a2');
        this.play('a2_normal');
        this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
        this.hp = 0;
        this.prevx = 0;
        this.prevy = 0;
    },
    update:
    function(time, delta){

        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ENEMY_SPEED * delta;
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

        //trash
        //this.setFrame(animFrame);

        // akcie po dokonceni cesty
        if (this.follower.t >= 1)
        {
            this.destroy();
            LIVES--;
            infoText.setText('HP: ' + LIVES + '\nCASH: ' + MONEY);
        }
    },
    startOnPath:
    function(){
        this.hp = 100;
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage:
    function(damage) {
        this.hp -= damage;

        this.play('a2_hurt');
        this.once('animationcomplete', ()=>{
            this.play('a2_normal');
        });

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            createAnimated(this.x,this.y,'a2', this.flipX);
            this.destroy();
        }
    }
});

let AnimatedObject = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function AnimatedObject(game){
            Phaser.GameObjects.Sprite.call(this,game,0,0,'a2');
        },
    doYourThing:
        function(x,y,sprite,direction){
            this.x = x;
            this.y = y;
            if(direction){this.setFlip(true)}
            this.play(sprite+'_destroy');
            this.once('animationcomplete', ()=>{
                this.destroy();
            });
        }
});

let Turret = new Phaser.Class({
    /*turret IDs:
    1. laser
    2. electric
    3. canon
     */
    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Turret (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 't'+SELECTED_TOWER);
            this.nextTic = 0;
            this.turretType = SELECTED_TOWER;
        },
    place: function(i, j) {
        this.y = i * 100 + 100/2;
        this.x = j * 100 + 100/2;
        level1[i][j] = this.turretType;
    },
    fire: function() {
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, this.turretType);
            switch(this.turretType){
                case 1: case 3: this.angle = (((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG )-90); break;
            }
            this.play('t'+this.turretType+'_fire');
        }
    },
    update: function (time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
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

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

    fire: function (x, y, angle,type)
    {
        this.type = type;

        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);
        this.play('p'+type);

        //  we don't need to rotate the bullets as they are round
        this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            createAnimated(this.x,this.y,'p'+this.type, false);
            this.destroy();
        }
    }

});

function create(){
    background_main = this.add.image(640, 360, 'bg');       //background bude vzdy naspodku
    background = this.add.image(715, 415, 'bg1');           //background bude vzdy naspodku
    versionText = this.add.text(0, 0, 'inframiesTD ' + VERSION, smallfont);                //misc text
    infoText = this.add.text(800, 20, 'HP: ' + LIVES + '\nCASH: ' + MONEY, bigfont);      // -||-
    graphics = this.add.graphics();                         //cesty

    this.add.image(200,50, 'button');
    selectedImg = this.add.image(200,50,'t1', SELECTED_TOWER-1);
    selectedImg.setScale(HUD_ICON_SCALE);
    selectedInfo = this.add.text(250,20,getTurretInfo(SELECTED_TOWER-1),smallfont);

    updateTurretInfo();

    //tlacidla nalavo
    for(let i=0; i<8; i++){
        this.add.image(50,83*i+90, 'button').setInteractive().on('pointerdown', e => changeSelectedTurret(i+1));
        this.add.image(50,83*i+90, 't'+(i+1)).setScale(HUD_ICON_SCALE);
        this.add.text(20,83*i+56, i+1, smallfont);
        this.add.text(20,83*i+106, TOWER_PRICES[i]+'$', smallfont);
    }

    selector = this.add.image(0,0,'selector');
    moveSelector(SELECTED_TOWER-1);

    this.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');

    //generovanie animacii
    //attackers
    this.anims.create({key: "a2_normal", frameRate: 15, frames: this.anims.generateFrameNumbers("a2",{start:0, end:9}), repeat: -1});
    this.anims.create({key: "a2_hurt", frameRate: 15, frames: this.anims.generateFrameNumbers("a2_hurt",{start:0, end:9}), repeat: 0});
    this.anims.create({key: "a2_destroy", frameRate: 15, frames: this.anims.generateFrameNumbers("a2_destroy",{start:3, end:10}), repeat: 0});
    //towers
    this.anims.create({key: "t1_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t1",{start:8, end:0}), repeat: 0});
    this.anims.create({key: "t2_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t2",{start:9, end:0}), repeat: 0});
    this.anims.create({key: "t3_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t3",{start:0, end:10}), repeat: 0});
    //projectiles
    this.anims.create({key: "p1", frameRate: 15, frames: this.anims.generateFrameNumbers("p1",{start:0, end:6}), repeat: -1});
    this.anims.create({key: "p1_destroy", frameRate: 15, frames: this.anims.generateFrameNumbers("p1_destroy",{start:0, end:4}), repeat: 0});
    this.anims.create({key: "p2", frameRate: 15, frames: this.anims.generateFrameNumbers("p2",{start:0, end:4}), repeat: -1});
    this.anims.create({key: "p2_destroy", frameRate: 15, frames: this.anims.generateFrameNumbers("p2_destroy",{start:0, end:3}), repeat: 0});
    this.anims.create({key: "p3", frameRate: 15, frames: this.anims.generateFrameNumbers("p3",{start:0, end:6}), repeat: -1});
    this.anims.create({key: "p3_destroy", frameRate: 15, frames: this.anims.generateFrameNumbers("p3_destroy",{start:0, end:6}), repeat: 0});
    //ui
    this.anims.create({key: "freespace_destroy", frameRate: 10, frames: this.anims.generateFrameNumbers("freespace",{start:0, end:1}), repeat: 3});

    //tlacitka
    key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
    key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);

    //path 1
    path = this.add.path(320, 110);
    path.lineTo(320, 200);
    path.lineTo(520, 200);
    path.lineTo(520, 300);
    path.lineTo(330, 500);
    path.lineTo(1000, 500);
    path.lineTo(1000, 110);

    graphics.lineStyle(3, 0xaaaaaa);
    path.draw(graphics);

    turrets = this.add.group({ classType: Turret, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    AnimatedObjects = this.add.group({ classType: AnimatedObject, runChildUpdate: true });

    this.physics.add.overlap(enemies, bullets, damageEnemy);
    this.nextEnemy = 0;

    this.input.on('pointerdown', placeTurret);

    /*
    var particles = this.add.particles('particle');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);*/
}

function update(time, delta){
    //keyboard
    //tlac 1-8 pre turrety
    //for(let i=1; i<8; i++){
        //one day
    //}
    if(key1.isDown){changeSelectedTurret(1)}
    if(key2.isDown){changeSelectedTurret(2)}
    if(key3.isDown){changeSelectedTurret(3)}
    if(key4.isDown){changeSelectedTurret(4)}
    if(key5.isDown){changeSelectedTurret(5)}
    if(key6.isDown){changeSelectedTurret(6)}
    if(key7.isDown){changeSelectedTurret(7)}
    if(key8.isDown){changeSelectedTurret(8)}

    //tocime ukazovatelom
    selector.angle++;

    // spawn utocnika podla arrayu kazdych n milisekund
    if (time > this.nextEnemy){        
        let enemy = enemies.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            
            // ulozenie utocnika na zaciatok
            enemy.startOnPath();
            
            this.nextEnemy = time + 2000;
        }   
    }

}

function placeTurret(pointer) {
    if(pointer.x>100) {
        let i = Math.floor(pointer.y / 100);
        let j = Math.floor(pointer.x / 100);
        if (canPlaceTurret(i, j)) {
            let turret = turrets.get();
            if (turret) {
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j);
            }
        } else {
            blinkAvailableSpaces();
        }
    }
}

function canPlaceTurret(i, j) {
    return level1[i][j] === 0;
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
        bullet.destroy();

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

function changeSelectedTurret(id){
    SELECTED_TOWER=id;
    moveSelector(SELECTED_TOWER-1);
    updateTurretInfo();
}

function moveSelector(position){
    selector.x = 50;
    selector.y = 83*position+90;
}

function blinkAvailableSpaces(){
    for(let i = 0; i<level1.length; i++){
        for(let j = 0; j<level1[i].length; j++){
            if(level1[i][j]==0){createAnimated(50+100*j,50+100*i,'freespace', false);}
        }
    }
}

function updateTurretInfo(){
    selectedImg.setTexture('t'+(SELECTED_TOWER));
    selectedInfo.setText(getTurretInfo(SELECTED_TOWER-1));
}

function getTurretInfo(type){
    return   'Damage: '+TOWER_DAMAGE[type]
            +'\nUpgrade price: '+TOWER_PRICES[type]*4+'$';
}