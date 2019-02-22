import { CONSTANTS } from "../constants/CONSTANTS";
import { Camera } from "./Camera"
import { InputHandler } from "./InputHandler"
import { GameScene } from "../scenes/GameScene"

export module Background {

    let background : Phaser.GameObjects.Sprite;

    export function init() {

    }

    export function create() {
        background = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1);//.setOrigin(0, 0);
        background.setInteractive();
        background.on('pointerdown', InputHandler.onBackgroundClicked);
    }

    export function update(time : number, delta : number) {
        background.setX(Camera.getX());
        background.setY(Camera.getY());
    }
}