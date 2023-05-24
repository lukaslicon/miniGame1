
playerVelocity = 2500;


class MiniGame extends Phaser.Scene {
    constructor() {
        super('MiniGame')
        this.shadedRectangle = null; // Reference to the currently shaded rectangle

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
        this.group1 = this.physics.add.group({
            key: 'boundary',
            frameQuantity: 50,
            immovable: true
        });
        //inside collision
        this.group2 = this.physics.add.group({
            key: 'bob',
            frameQuantity: 50,
        });
        //bottom
        this.bottomSide = this.physics.add.group({
            key: 'boarder',
            frameQuantity: 16,
            immovable: true

        });
        //top
        this.topSide = this.physics.add.group({
            key: 'boarder',
            frameQuantity: 16,
            immovable: true

        });
        //left
        this.leftSide = this.physics.add.group({
            key: 'side',
            frameQuantity: 9,
            immovable: true

        });
        //right
        this.rightSide = this.physics.add.group({
            key: 'side',
            frameQuantity: 9,
            immovable: true

        });
        //outer rectangle placing
        Phaser.Actions.PlaceOnRectangle(
            this.group1.getChildren(), 
            new Phaser.Geom.Rectangle(0, 0, 1920, 1080)
            );
        //inside collision placing
        Phaser.Actions.PlaceOnRectangle(
            this.group2.getChildren(), 
            new Phaser.Geom.Rectangle(0, 0, 1920, 1080)
            );

        //line placements
        const topLine = new Phaser.Geom.Line(60, 0, 1980, 0);
        const bottomLine = new Phaser.Geom.Line(60, 1080, 1980, 1080);
        const leftLine = new Phaser.Geom.Line(0, 60, 0, 1140);
        const rightLine = new Phaser.Geom.Line(1920, 60, 1920, 1140);
        
        //place lines
        Phaser.Actions.PlaceOnLine(
                this.topSide.getChildren(),
                topLine
            );
        Phaser.Actions.PlaceOnLine(
                this.bottomSide.getChildren(),
                bottomLine
            );   
        Phaser.Actions.PlaceOnLine(
                this.leftSide.getChildren(),
                leftLine
            );  
        Phaser.Actions.PlaceOnLine(
                this.rightSide.getChildren(),
                rightLine
            );           

        //collisions for each group
        this.group1.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });       
        this.group2.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });        
        this.bottomSide.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });       
        this.topSide.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });    
        this.leftSide.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });       
        this.rightSide.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle);
        });           
        
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
                this.timeLeft = this.timeLeft - 1;
                //bar width divided by the number of seconds moves bar
                let stepWidth = this.timerMask.displayWidth / gameOptions.initialTime*1;
                this.timerMask.x -=  stepWidth;
                if(this.timeLeft <= 0){
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
        // Change alpha of a random rectangle in group1 every 5 seconds
        this.time.addEvent({
            delay: 3000,
            callback: function() {

                if (this.shadedRectangle !== null) {
                    this.shadedRectangle.setAlpha(1);
                    this.shadedRectangle.isShaded = false;
                    this.physics.world.enableBody(this.shadedRectangle);
                }
               // Choose a new rectangle to shade
               let shadedRectangles = this.group1.getChildren().filter(rectangle => !rectangle.isShaded);
               if(shadedRectangles.length > 0) {
                   const randomIndex = Phaser.Math.Between(0, shadedRectangles.length - 1);
                   this.shadedRectangle = shadedRectangles[randomIndex];
                   this.shadedRectangle.setAlpha(0.5);
                   this.shadedRectangle.isShaded = true;
                   this.physics.world.disableBody(this.shadedRectangle);
               }
            },
            callbackScope: this,
            loop: true
        });

            // Collision check for shaded rectangle
            this.physics.add.collider(this.player, this.group1, this.checkCollision, null, this);


    }

    checkCollision(player, rectangle) {
        if (rectangle.isShaded) {
            player.setPosition(960, 590); // Move player back to the middle
            // Freeze player for 2 seconds
            this.physics.pause();
            setTimeout(() => {
                this.physics.resume();
            }, 2000);

            // Unshade the rectangle
            rectangle.setAlpha(1);
            rectangle.isShaded = false;
            this.physics.world.enableBody(rectangle);

            this.timeLeft -= 5; // Increase by 5 seconds
            let stepWidth = this.timerMask.displayWidth / gameOptions.initialTime;
            this.timerMask.x -=  stepWidth * 5; // Increase the bar width
        }
    }

    update ()
    {
        if (!this.playerFrozen) {
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

}
