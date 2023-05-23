let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: 0x000000,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            debugShowVelocity: false
    }
},
scene: [Load, miniGame],
title: "mini game",
};