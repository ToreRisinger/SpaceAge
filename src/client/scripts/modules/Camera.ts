import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";
import { GameObject } from "../game_objects/GameObject";

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
        camera.centerOn(x, y);
    }

    export function update(time : number, delta : number) {
        if(centerCameraOnShip) {
            let ship : GameObject | undefined =  GameObjectHandler.getShip();
            if(ship != undefined){
                x = ship.getPos().x;
                y = ship.getPos().y;
                camera.centerOn(x, y);
            }
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