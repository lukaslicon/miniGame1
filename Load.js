game1points = 0;
totalpoints = 0;
class Load extends Phaser.Scene {
    constructor(){
        super('Load');
    }
    preload ()
    {
        this.load.path = 'assets/';
        this.load.image('coin', 'images/coin.png');
        this.load.image('bob', 'images/bob.png');
        this.load.image('background1', 'images/game1background.png');
        this.load.image('summaryScreen', 'images/summaryscreen.png');
    }
    create()
    {
        this.scene.start('miniGame');
    }

}