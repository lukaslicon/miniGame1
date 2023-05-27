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
        this.load.image('sideBoundary', 'sideBoundary.png');
        this.load.image("timerBar", "timerBar.png");
        this.load.image("timerBarBackground", "backgroundbar.png");
        this.load.image("redtimerBar", "redbackgroundbar.png");
        this.load.image("boarder", "boarder.png");
        this.load.image("side", "sideBoarder.png");
        this.load.image("background", "map.png");
        this.load.image("reset", "reset.png");

    }
    create()
    {
        this.scene.start('MiniGame');
    }
}

let gameOptions = {
    initialTime: 60
}