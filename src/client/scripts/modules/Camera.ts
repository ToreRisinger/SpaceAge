import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";

export module Camera {

    let camera : Phaser.Cameras.Scene2D.Camera;
    let x : number;
    let y : number;

    export function init() {
        camera = GameScene.getInstance().cameras.cameras[0];
        x = 0;
        y = 0;
    }

    export function update(time : number, delta : number) {
        x = GameObjectHandler.getThisPlayer().getShip().getX();
        y = GameObjectHandler.getThisPlayer().getShip().getY();
        camera.centerOn(x, y);
    }

    export function getX() {
        return x;
    }

    export function getY() {
        return y;
    }
}