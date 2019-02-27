import { CONSTANTS } from "../constants/CONSTANTS";
import { Camera } from "./Camera"
import { InputHandler } from "./InputHandler"
import { GameScene } from "../scenes/GameScene"
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";

export module Background {

    let background : Phaser.GameObjects.Sprite;

    export function init() {

    }

    export function create() {
        background = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1);
        background.setInteractive();
        background.on('pointerdown', InputHandler.onBackgroundClicked);
        background.setDepth(DRAW_LAYERS.BACKGROUND_LAYER);
        
    }

    export function update(time : number, delta : number) {
        background.setX(Camera.getX());
        background.setY(Camera.getY());
    }
}