class Load extends Phaser.Scene {
    constructor(){
        super('Load');
    }
    preload ()
    {
        this.load.path = 'assets/';
    }
    create()
    {
        this.scene.start('miniGame');
    }

}