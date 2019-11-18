/** @type {import("../../../typings/phaser")} */

import { GameScene } from "./scenes/GameScene";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./react/App";

let game = new Phaser.Game({
    type: Phaser.WEBGL,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'app',
      width: '100%',
      height: '100%'
    },
    scene:[
        GameScene
    ],
    render: {
        /*pixelArt:true,*/
        antialias : true,
    }
});

ReactDOM.render(<App />, document.getElementById("app"));