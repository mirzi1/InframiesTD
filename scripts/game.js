var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'main-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
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

//var animFrame = 0;

var VERSION = "v0.1"
var LIVES = 100;
var MONEY = 100;
var ENEMY_SPEED = 1/10000;

function preload(){
    this.load.image('bg', 'assets/graphics/bg.png');
    this.load.image('bg1', 'assets/graphics/bg1.png');
    this.load.image('logo', 'assets/graphics/logo.png');
    this.load.image('particle', 'assets/graphics/particle.png');
    this.load.spritesheet('a2', 'assets/graphics/attackers/a2.png' ,{frameHeight: 100, frameWidth: 100});




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
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }
});

function create(){
    background_main = this.add.image(640, 360, 'bg');        //background bude vzdy naspodku
    background = this.add.image(715, 415, 'bg1');        //background bude vzdy naspodku
    versionText = this.add.text(0, 0, 'inframiesTD ' + VERSION, {fontSize:'16px', fill:'#FFF'});
    infoText = this.add.text(20, 20, 'HP: ' + LIVES + '\nCASH: ' + MONEY, {fontSize:'30px', fill:'#0FF'});
    graphics = this.add.graphics();                     //cesty

    //generovanie animacii (dlhy chunk kodu)
    this.anims.create({
        key: "a2_normal",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("a2",{start:0, end:9}),
        repeat: -1
    });

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

    enemies = this.add.group({classType: Enemy, runChildUpdate: true});
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
    // if its time for the next enemy
    if (time > this.nextEnemy){        
        var enemy = enemies.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            
            // place the enemy at the start of the path
            enemy.startOnPath();
            
            this.nextEnemy = time + 2000;
        }   
    }
    /*
    //oppa yandev style
    if(time%5==0){
    animFrame++;
    if(animFrame>=10)animFrame=0;  
    }
    */

}
    
