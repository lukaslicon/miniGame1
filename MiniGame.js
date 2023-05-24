playerVelocity = 2000;
class MiniGame extends Phaser.Scene {
    constructor() {
        super('MiniGame')
    }
    create()
    {
        //player rectangle
        this.player = this.physics.add.image(960, 590, 'bob').setScale(1.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
        //wall squares

        this.group = this.physics.add.staticGroup({
            key: 'bob',
            frameQuantity: 50
        });
        Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), new Phaser.Geom.Rectangle(0, 0, 1920, 1080));

        this.player.body.setCollideWorldBounds(true); //player cannot go out of bounds
        //controls
        this.add.text(50, 50, "Movement:").setFontSize(30);
        this.add.text(225, 35, "  W").setFontSize(25);
        this.add.text(225, 65, "A S D").setFontSize(25);



    }
    update ()
    {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-playerVelocity);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(playerVelocity);
        }
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-playerVelocity);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(playerVelocity);
        }
        }
    }