/** @type {import("../../../typings/phaser")} */

import { GameScene } from "./scenes/GameScene";

let game = new Phaser.Game({

    type: Phaser.WEBGL,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game_root_container',
      width: '100%',
      height: '100%'
    },
    scene:[
        GameScene
    ],
    render: {
        pixelArt:true,
    }
});