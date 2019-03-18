/** @type {import("../../../typings/phaser")} */

import { GameScene } from "./scenes/GameScene";

let game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game',
      width: '100%',
      height: '100%'
    },
    //width: 800,
    //height: 600,
    scene:[
        GameScene
    ],
    render: {
        pixelArt:true
    },
    //parent: 'game'
});