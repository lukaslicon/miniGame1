game1points = 0;
totalpoints = 0;
class Load extends Phaser.Scene {
    constructor(){
        super('Load');
    }
    preload ()
    {
        this.load.path = 'assets/images';
        this.load.image('ball', 'ball.png');
        this.load.image('coin', 'coin.png');
        this.load.image('bob', 'bob.png');
        this.load.image('background1', 'game1background.png');
        this.load.image('summaryScreen', 'summaryscreen.png');
    }
    create()
    {
        this.scene.start('miniGame');
    }

}