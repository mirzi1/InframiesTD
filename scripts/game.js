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

var game = new Phaser.Game(config);
var graphics;
var versionText;
var infoText;
var background_main;
var background;
var path;

var VERSION = "v0.1"
var LIVES = 100;
var MONEY = 100;
var ENEMY_SPEED = 1/10000;
var BULLET_DAMAGE = 30;

var level1 =       [[ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0],
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
    this.load.image('particle', 'assets/graphics/particle.png');

    //attackers
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 100, frameWidth: 100});

    //towers
    this.load.spritesheet('t1', 'assets/graphics/towers/t1.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t2', 'assets/graphics/towers/t2.png' ,{frameHeight: 100, frameWidth: 100});
    this.load.spritesheet('t3', 'assets/graphics/towers/t3.png' ,{frameHeight: 80, frameWidth: 120});

}

var Enemy = new Phaser.Class({
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

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.destroy();
        }
    }
});

var Turret = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Turret (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 't1');
            this.nextTic = 0;
        },
    place: function(i, j) {
        this.y = i * 100 + 100/2;
        this.x = j * 100 + 100/2;
        level1[i][j] = 1;
    },
    fire: function() {
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            this.play('t1_fire');
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

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'particle');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

    fire: function (x, y, angle)
    {
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        //  we don't need to rotate the bullets as they are round
        //    this.setRotation(angle);

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
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

function create(){
    background_main = this.add.image(640, 360, 'bg');       //background bude vzdy naspodku
    background = this.add.image(715, 415, 'bg1');           //background bude vzdy naspodku
    versionText = this.add.text(0, 0, 'inframiesTD ' + VERSION, {fontSize:'16px', fill:'#FFF'});                //misc text
    infoText = this.add.text(20, 20, 'HP: ' + LIVES + '\nCASH: ' + MONEY, {fontSize:'30px', fill:'#0FF'});      // -||-
    graphics = this.add.graphics();                         //cesty

    //generovanie animacii
    //attackers
    this.anims.create({key: "a2_normal", frameRate: 15, frames: this.anims.generateFrameNumbers("a2",{start:0, end:9}), repeat: -1});
    //towers
    this.anims.create({key: "t1_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t1",{start:8, end:0}), repeat: 0});
    this.anims.create({key: "t2_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t2",{start:0, end:9}), repeat: 0});
    this.anims.create({key: "t3_fire", frameRate: 15, frames: this.anims.generateFrameNumbers("t3",{start:0, end:10}), repeat: 0});

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

    this.physics.add.overlap(enemies, bullets, damageEnemy);
    this.input.on('pointerdown', placeTurret);
    this.nextEnemy = 0;

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
    // spawn utocnika podla arrayu kazdych n milisekund
    if (time > this.nextEnemy){        
        var enemy = enemies.get();
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
    var i = Math.floor(pointer.y/100);
    var j = Math.floor(pointer.x/100);
    if(canPlaceTurret(i, j)) {
        var turret = turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }
    }
}

function canPlaceTurret(i, j) {
    return level1[i][j] === 0;
}

function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
}

function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

function damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}