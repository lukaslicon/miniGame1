playerVelocity = 2000;


class MiniGame extends Phaser.Scene {
    constructor() {
        super('MiniGame')
    }
    create()
    {
        this.timeLeft = gameOptions.initialTime;
        //  player rectangle
        this.player = this.physics.add.image(960, 590, 'bob').setScale(1.5);
        this.player.body.setCollideWorldBounds(true); 

        //  keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});


        //  boundaries/goals
        this.group1 = this.physics.add.staticGroup({
            key: 'boundary',
            frameQuantity: 50
        });
        this.group2 = this.physics.add.staticGroup({
            key: 'bob',
            frameQuantity: 50
        });
        
        Phaser.Actions.PlaceOnRectangle(
            this.group1.getChildren(), 
            new Phaser.Geom.Rectangle(0, 0, 1920, 1080)
            );
        Phaser.Actions.PlaceOnRectangle(
                this.group2.getChildren(), 
                new Phaser.Geom.Rectangle(0, 0, 1920, 1080)
                );
        
        //  
        this.physics.add.collider(this.player, this.group1);
        this.physics.add.collider(this.player, this.group2);
        
        //  controls
        this.add.text(50, 50, "Movement:").setFontSize(30);
        this.add.text(225, 35, "  W").setFontSize(25);
        this.add.text(225, 65, "A S D").setFontSize(25);

        //  timer
        let timer = this.add.sprite(game.config.width / 2, game.config.height / 6, "timerBar");
        this.timerMask = this.add.sprite(timer.x, timer.y, "timerBar");
        this.timerMask.visible = false;
        timer.mask = new Phaser.Display.Masks.BitmapMask(this, this.timerMask);
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft = this.timeLeft - 30;
                //bar width divided by the number of seconds moves bar
                let stepWidth = this.timerMask.displayWidth / gameOptions.initialTime*30;
                this.timerMask.x -= stepWidth;
                if(this.timeLeft == 0){
                    this.timeLeft = 60;
                    this.cameras.main.fadeOut(1000, 0, 0, 0)
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.scene.start('intro')
                    })
                }
            },
            callbackScope: this,
            loop: true
        });
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

