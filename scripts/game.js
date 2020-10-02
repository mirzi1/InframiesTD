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
var background;
var path;

var ENEMY_SPEED = 1/10000;

function preload(){
    //nacitanie contentu, lepsi bude spritesheet + json
    this.load.image('bg', 'assets/graphics/menubg.png');
    this.load.image('logo', 'assets/graphics/logo.png');
    this.load.image('particle', 'assets/graphics/particle.png');
}

var Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function Enemy(scene){
        Phaser.GameObjects.Image.call(this,scene,0,0,'particle');
        this.follower = {t: 0, vec: new Phaser.Math.Vector2()};
        this.hp = 0;
    },
    update: function(time, delta){
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ENEMY_SPEED * delta;
            
        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if we have reached the end of the path, remove the enemy
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    },
    startOnPath: function (){
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }
});

function create(){
    background = this.add.image(640, 360, 'bg');        //background bude vzdy naspodku
    versionText = this.add.text(0, 0, 'inframiesTD', {fontSize:'16px', fill:'#FFF'}); 
    graphics = this.add.graphics();                     //cesty

    //path 1
    path = this.add.path(0, 500);
    path.lineTo(500, 500);
    path.lineTo(300, 300);
    path.lineTo(500, 100);
    path.lineTo(1280, 100);

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
    if (time > this.nextEnemy)
    {        
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
}

function generateLevel(level){
    switch(level){
        case 1: //path = this.add.path(96,-32);
        //path.lineTo(480,164);
        versionText.setText('cc');break;
    }
    
}