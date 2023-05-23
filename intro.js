class intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.add.image(960,540 , 'summaryScreen');
        this.add.text(150,150, "Welcome to my Physics Based Games!").setFontSize(80);
        let rect1 = new Phaser.Geom.Rectangle(125, 140, 1675, 5);
        let rect2 = new Phaser.Geom.Rectangle(125, 230, 1675, 5);
        let graphics1 = this.add.graphics({ fillStyle: { color: 0xf0000f } });
        graphics1.fillRectShape(rect1);
        graphics1.fillRectShape(rect2);
        this.add.text(150, 400, "            You are tasked to complete 3 physics based games...\n\nEach games has a different style of gameplay and different physics implemented.").setFontSize(35);
        this.add.text(250, 650, "Game 1: Do not get hit by the ball! Collect as many points as you can by moving around the screen.").setFontSize(25).setFill('#00ffff');
        this.add.text(725,850, "Click anywhere to begin.").setFontSize(30).setFill('#f0000f');
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('MiniGame'));
        });
    }
}