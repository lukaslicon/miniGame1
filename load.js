class load extends Phaser.Scene {
    constructor(){
        super('load');
    }
    preload ()
    {
        this.load.path = 'assets/images/';
        this.load.image('summaryScreen', 'summaryscreen.png');
        this.load.image('bob', 'bob.png');
        this.load.image('boundary', 'boundary.png');
        this.load.image("timerBar", "timerBar.png");

    }
    create()
    {
        this.scene.start('MiniGame');
    }
}