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
        this.load.image("boarder", "boarder.png");
        this.load.image("side", "sideBoarder.png");
        this.load.spritesheet('boom', 'explosion.png', { frameWidth: 16, frameHeight: 16, endFrame: 9 });

    }
    create()
    {
        this.scene.start('MiniGame');
    }
}

let gameOptions = {
    initialTime: 60
}