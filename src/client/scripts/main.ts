/** @type {import("../../../typings/phaser")} */

import { GameScene } from "./scenes/GameScene";

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene:[
        GameScene
    ],
    render: {
        pixelArt:true
    }
});