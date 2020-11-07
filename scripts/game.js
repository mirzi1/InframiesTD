let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'main-game',
    physics: {
        default: 'arcade'
    },
    antialias: false,
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

let WAVE = 1;
let HEALTH = 100;
let MONEY = 100;
let SELECTED_TOWER = 1;

const ENEMY_SPEED = 1/10000;
const BULLET_DAMAGE = 30;

const bigfont = { font: "bold 22px font1", fill: "#3CCEFF", boundsAlignH: "center", boundsAlignV: "middle" };
const smallfont = { font: "12px font1", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
const smallfont_black = { font: "12px font1", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
const textfont = { font: "bold 10px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

const HUD_ICON_SCALE = 0.5;

const TOWER_PRICES = [100,200,300,400,500,600,700,1000];
const TOWER_SPEED = [700,1400,2000,1000,1000,1000,1000,1000];
const TOWER_RANGE = [400,400,200,200,200,200,200,200]
const TOWER_UPGRADE_DESCRIPTION = ['Double damage, see hidden enemies', '3 electrical bolts on hit', 'faster reload, bigger explosions', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL']

const TOWER_DAMAGE = [100,200,500,400,500,600,700,1000,
                      150,250,350,450,550,650,750,1000,
                      30, 15];
const PROJECTILE_SPEED = [500,600,450,400,500,600,700,1000,
                          500,600,300,400,500,600,700,1000,
                          200, 300];
const PROJECTILE_LIFESPAN = [500,500,1500,500,500,500,500,500,
                             500,500,500,500,500,500,500,500,
                             700, 200];

const ENEMY_HEALTH = [100,200,300,400,500,600,700,1000];
const ENEMY_REWARD = [100,200,300,400,500,600,700,1000];

let level1 =       [[ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, -1],
                    [ -1, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1, 0, 0, 0,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                    [ -1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                    [ -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

function preload(){
    //nacitanie spritov
    //ui
    this.load.image('ui_top', 'assets/graphics/ui/UI_top.png');
    this.load.image('ui_left', 'assets/graphics/ui/UI_left.png');
    this.load.image('button', 'assets/graphics/ui/button.png');
    this.load.image('selector', 'assets/graphics/ui/selector.png');
    this.load.spritesheet('button_small', 'assets/graphics/ui/button_small.png' ,{frameHeight: 35, frameWidth: 35});
    this.load.spritesheet('button_icons', 'assets/graphics/ui/button_icons.png' ,{frameHeight: 24, frameWidth: 16});
    this.load.spritesheet('freespace', 'assets/graphics/ui/freespace.png' ,{frameHeight: 100, frameWidth: 100});

    //pozadia
    this.load.image('bg1', 'assets/graphics/levels/bg1.png');

    //attackers
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 96, frameWidth: 55});
    this.load.spritesheet('a2_hurt', 'assets/graphics/attackers/a2_hurt.png' ,{frameHeight: 96, frameWidth: 54});
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
    this.load.spritesheet('p17_destroy', 'assets/graphics/projectiles/p17_destroy.png' ,{frameHeight: 40, frameWidth: 40});

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
            HEALTH--;
            updateInfoText();
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
            switch(sprite){
                case 'p3': this.play('p3_destroy');this.setScale(4);break;
                default: this.play(sprite+'_destroy');break;
            }
            this.once('animationcomplete', ()=>{
                this.destroy();
            });
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
            //TODO: riadny spsob vyberu kliknutim
            this.setInteractive().on('pointerdown', e => {
                if(SELECTED_TOWER == 0){
                    this.i = Math.floor(this.y / 100);this.j = Math.floor(this.x / 100);
                    level1[this.i][this.j] = 0;
                    //changeSelectedTower(this.TowerType);
                    this.destroy();
                }
            });
        },
    place: function(i, j) {
        //polozenie - pozicia a typ
        if(SELECTED_TOWER != 0){
            this.y = i * 100 + 100/2;
            this.x = j * 100 + 100/2;
            level1[i][j] = this.TowerType;
        }
    },
    fire: function() {
        let enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            //vytvorime bullet
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle, this.TowerType);
            //otacanie podla druhu Towery
            switch(this.TowerType){
                case 1: case 3: this.angle = (((angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG )-90); break;
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
            this.destroy();
        }
    }

});

function create(){
    //zaklad
    background = this.add.image(715, 415, 'bg1');           //background bude vzdy naspodku
    graphics = this.add.graphics();                         //cesty
    this.add.image(50,380, 'ui_left');      //ui pozadie
    this.add.image(640,20, 'ui_top');      //ui pozadie
    waveText = this.add.text(100, 9, '1', bigfont);
    hpText = this.add.text(200, 9, '', bigfont);
    moneyText = this.add.text(300, 9, '', bigfont);

    updateInfoText();


    //tower info
    //this.add.image(200,50, 'button');
    selectedImg = this.add.image(453,18,'t1', SELECTED_TOWER-1);
    selectedImg.setScale(HUD_ICON_SCALE);
    selectedInfo = this.add.text(478,5,getTowerInfo(SELECTED_TOWER-1),textfont);
    updateTowerInfo();

    //upgrade, sell
    this.add.image(31,683, 'button_small', 1).setInteractive().on('pointerdown', e => upgradeTool());
    this.add.image(66,683, 'button_small', 2).setInteractive().on('pointerdown', e => sellTool());
    this.add.image(31,683, 'button_icons', 0);
    this.add.image(66,683, 'button_icons', 1);

    //tlacidla nalavo
    for(let i=0; i<8; i++){
        this.add.image(48,75*i+100, 'button').setInteractive().on('pointerdown', e => changeSelectedTower(i+1));
        this.add.image(48,75*i+100, 't'+(i+1)).setScale(HUD_ICON_SCALE);
        //this.add.text(20,73*i+16, i+1, smallfont);
        this.add.text(19,75*i+117, TOWER_PRICES[i]+'$', smallfont_black).setStroke('#FFE000', 2);
    }

    //selektor
    selector = this.add.image(0,0,'selector');
    moveSelector(SELECTED_TOWER-1);

    //kurzor
    this.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');

    //generovanie animacii
    generateAnims();

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

    Towers = this.add.group({ classType: Tower, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    AnimatedObjects = this.add.group({ classType: AnimatedObject, runChildUpdate: true });

    this.physics.add.overlap(enemies, bullets, damageEnemy);
    this.nextEnemy = 0;

    this.input.on('pointerdown', placeTower);

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
    //tlac 1-8 pre Towery
    //for(let i=1; i<8; i++){
        //one day
    //}
    if(key1.isDown){changeSelectedTower(1)}
    if(key2.isDown){changeSelectedTower(2)}
    if(key3.isDown){changeSelectedTower(3)}
    if(key4.isDown){changeSelectedTower(4)}
    if(key5.isDown){changeSelectedTower(5)}
    if(key6.isDown){changeSelectedTower(6)}
    if(key7.isDown){changeSelectedTower(7)}
    if(key8.isDown){changeSelectedTower(8)}

    // spawn utocnika podla arrayu kazdych n milisekund
    if (time > this.nextEnemy){        
        let enemy = enemies.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            
            // ulozenie utocnika na zaciatok
            enemy.startOnPath();
            
            this.nextEnemy = time + 500;
        }   
    }

}

function placeTower(pointer) {
    if(pointer.x>100 && SELECTED_TOWER != 0) {
        let i = Math.floor(pointer.y / 100);
        let j = Math.floor(pointer.x / 100);
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
        let bounceangle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y);
        switch (bullet.type){
            case 2: addBullet(bullet.x, bullet.y, bounceangle, 17);
                    addBullet(bullet.x, bullet.y, bounceangle+0.5, 17);
                    addBullet(bullet.x, bullet.y, bounceangle-0.5, 17);break;
            case 3: let random = Math.random()*2;
                    for(let i = 1; i<7; i++) addBullet(bullet.x, bullet.y, random+i*1, 18);break;
        }


        bullet.destroy();

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(TOWER_DAMAGE[bullet.type - 1]);
    }
}

function changeSelectedTower(id){
    SELECTED_TOWER=id;
    moveSelector(SELECTED_TOWER-1);
    updateTowerInfo();
}

function moveSelector(position){
    selector.scale = 1;
    selector.x = 48;
    selector.y = 75*position+100;
}

function blinkAvailableSpaces(){
    for(let i = 0; i<level1.length; i++){
        for(let j = 0; j<level1[i].length; j++){
            if(level1[i][j]==0){createAnimated(50+100*j,50+100*i,'freespace', false);}
        }
    }
}

function sellTool(){
    SELECTED_TOWER = 0;
    selectedImg.setTexture('button_icons', 1).setScale(1);
    selectedInfo.setText('Sell');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_delete.cur), pointer');

    selector.scale = 0.5;
    selector.x = 66;
    selector.y = 683;
}

function upgradeTool(){
    SELECTED_TOWER = -2;
    selectedImg.setTexture('button_icons', 0).setScale(1);
    selectedInfo.setText('Upgrade (WIP)');
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor_upgrade.cur), pointer');

    selector.scale = 0.5;
    selector.x = 31;
    selector.y = 683;
}

function updateTowerInfo(){
    selectedImg.setTexture('t'+(SELECTED_TOWER)).setScale(0.3);
    selectedInfo.setText(getTowerInfo(SELECTED_TOWER-1));
    game.input.setDefaultCursor('url(assets/graphics/ui/cursor.cur), pointer');
}

function getTowerInfo(type){
    return   'Damage: '+TOWER_DAMAGE[type]+', Delay: '+TOWER_SPEED[type]+ ', Range: '+TOWER_RANGE[type]+ ', Projectile speed: '+PROJECTILE_SPEED[type]+ ', Projectile lifespan: '+PROJECTILE_LIFESPAN[type]
            +'\nUpgrade: '+TOWER_UPGRADE_DESCRIPTION[type]+' - '+TOWER_PRICES[type]*4+'$';
}

function updateInfoText(){
    hpText.setText(HEALTH);
    moneyText.setText(MONEY);
}

function generateAnims(){
    //attackers
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
    game.anims.create({key: "freespace_destroy", frameRate: 10, frames: game.anims.generateFrameNumbers("freespace",{start:0, end:1}), repeat: 3});
}