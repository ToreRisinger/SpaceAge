import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";

export module Camera {

    let centerCameraOnShip : boolean = false;
    let camera : Phaser.Cameras.Scene2D.Camera;
    let x : number;
    let y : number;
    let width : number;
    let height : number;

    export function init() {
        camera = GameScene.getInstance().cameras.cameras[0];
        width = camera.width;
        height = camera.height;
        x = 0;
        y = 0;
    }

    export function update(time : number, delta : number) {
        if(centerCameraOnShip) {
            x = GameObjectHandler.getShipX();
            y = GameObjectHandler.getShipY();
            camera.centerOn(x, y);
        }
    }

    export function getX() {
        return x;
    }

    export function getY() {
        return y;
    }

    export function getWidth() {
        return width;
    }

    export function getHeight() {
        return height;
    }

    export function centerCamera(value : boolean) {
        centerCameraOnShip = value;
    }
}