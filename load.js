class load extends Phaser.Scene {
    constructor(){
        super('load');
    }
    preload ()
    {
        this.load.path = 'assets/images/';
        this.load.image('summaryScreen', 'summaryscreen.png');
        this.load.image('bob', 'bob.png');
        this.load.image('background1', 'game1background.png');
    }
    create()
    {
        this.scene.start('MiniGame');
    }
}