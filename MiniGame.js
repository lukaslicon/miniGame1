
playerVelocity = 2500;
let housing = 0;

class MiniGame extends Phaser.Scene {
    constructor() {
        super('MiniGame')
        this.shadedRectangle = null; // Reference to the currently shaded rectangle

    }
    create()
    {
        this.add.image(960,540 , 'background');
        this.score = 0;
        this.timeLeft = gameOptions.initialTime;

//boundaries/goals
        //top
        this.groupTop = this.physics.add.group({
            key: 'boundary',
            frameQuantity: 6,
            immovable: true
        });
        //bot
        this.groupBot = this.physics.add.group({
            key: 'boundary',
            frameQuantity: 6,
            immovable: true
        });
        //left
        this.groupLeft = this.physics.add.group({
            key: 'sideBoundary',
            frameQuantity: 3,
            immovable: true
        });
        //right
        this.groupRight = this.physics.add.group({
            key: 'sideBoundary',
            frameQuantity: 3,
            immovable: true
        });

//boarders
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

        //line placements
        const topLine = new Phaser.Geom.Line(60, 0, 1980, 0);
        const bottomLine = new Phaser.Geom.Line(60, 1080, 1980, 1080);
        const leftLine = new Phaser.Geom.Line(0, 60, 0, 1140);
        const rightLine = new Phaser.Geom.Line(1920, 60, 1920, 1140);
        //house placements
        const topSquare = new Phaser.Geom.Line(60, 0, 1980, 0);
        const botSquare = new Phaser.Geom.Line(60, 1080, 1980, 1080);
        const leftSquare = new Phaser.Geom.Line(0, 60, 0, 1140);
        const rightSquare = new Phaser.Geom.Line(1920, 60, 1920, 1140);



        //place houses
        Phaser.Actions.PlaceOnLine(this.groupTop.getChildren(),topSquare);
        Phaser.Actions.PlaceOnLine(this.groupBot.getChildren(),botSquare);
        Phaser.Actions.PlaceOnLine(this.groupLeft.getChildren(),leftSquare);
        Phaser.Actions.PlaceOnLine(this.groupRight.getChildren(),rightSquare);
        //place lines
        Phaser.Actions.PlaceOnLine(this.topSide.getChildren(),topLine);
        Phaser.Actions.PlaceOnLine(this.bottomSide.getChildren(),bottomLine);   
        Phaser.Actions.PlaceOnLine(this.leftSide.getChildren(),leftLine);  
        Phaser.Actions.PlaceOnLine(this.rightSide.getChildren(),rightLine);           

        //  player rectangle
        this.player = this.physics.add.image(960, 590, 'bob').setScale(1.5).setVelocity(400, 200).setBounce(.6, .6);
        this.player.body.setCollideWorldBounds(true); 

        //invert on click effect
        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Geom.Rectangle.Contains(this.player.getBounds(), pointer.x, pointer.y)) {
                const velocityX = Phaser.Math.Between(-playerVelocity, playerVelocity); // Random X velocity
                const velocityY = Phaser.Math.Between(-playerVelocity, playerVelocity); // Random Y velocity
                this.player.setVelocity(velocityX, velocityY);
            }
        });
//collisions for each group
        //TOP COLLISIONS
        this.groupTop.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle, (player, rectangle) => {
                rectangle.destroy();  // Destroy the rectangle the player collided with
                this.score++;  // Increment the score

                if (this.score >= 20) {
                    // Fade in and start the intro scene
                    this.scene.start('intro', {}, { alpha: 0, duration: 1000 });
                }

            }, null, this);
        });             

        //BOTTOM COLLISIONS
        this.groupBot.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle, (player, rectangle) => {
                rectangle.destroy();  // Destroy the rectangle the player collided with
                this.score++;  // Increment the score

                if (this.score >= 20) {
                    // Fade in and start the intro scene
                    this.scene.start('intro', {}, { alpha: 0, duration: 1000 });
                }

            }, null, this);
        });             

        //LEFT COLLISIONS
        this.groupLeft.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle, (player, rectangle) => {
                rectangle.destroy();  // Destroy the rectangle the player collided with
                this.score++;  // Increment the score

                if (this.score >= 20) {
                    // Fade in and start the intro scene
                    this.scene.start('intro', {}, { alpha: 0, duration: 1000 });
                }

            }, null, this);
        });             
        
        //RIGHT COLLISIONS
        this.groupRight.getChildren().forEach(rectangle => {
            this.physics.add.collider(this.player, rectangle, (player, rectangle) => {
                rectangle.destroy();  // Destroy the rectangle the player collided with
                this.score++;  // Increment the score

                if (this.score >= 20) {
                    // Fade in and start the intro scene
                    this.scene.start('intro', {}, { alpha: 0, duration: 1000 });
                }

            }, null, this);
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
        
        // timer bar
        let timer = this.add.sprite(game.config.width / 2, game.config.height / 8, "timerBar");
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
    }
}
    