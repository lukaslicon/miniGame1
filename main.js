
let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            debugShowVelocity: false
    }
},
scene: [load, intro, MiniGame],
title: "Physics Based Games",
};

let game = new Phaser.Game(config);

let gameOptions = {
    initialTime: 60
}