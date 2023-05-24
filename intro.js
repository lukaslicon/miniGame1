class intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.add.image(960,540 , 'summaryScreen');
        this.add.text(700,450, "Mini Game 1").setFontSize(80);
        this.add.text(725,850, "Click anywhere to begin.").setFontSize(30).setFill('#f0000f');
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('MiniGame'));
        });
    }
}