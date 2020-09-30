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

function preload (){
    this.load.image('bg', 'assets/graphics/menubg.png');
    this.load.image('logo', 'assets/graphics/logo.png');
    this.load.image('particle', 'assets/graphics/particle.png');
}

var logo, versionText;

function create (){
    this.add.image(640, 360, 'bg');
    
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

    emitter.startFollow(logo);

    versionText = this.add.text(0, 0, 'janky alpha', {fontSize:'16px', fill:'#FFF'});   
}

function update (){
    logo.rotation += 0.01;
    versionText.setText('x ' + logo.x + '\ny ' + logo.y + "\nr " + logo.rotation);
}