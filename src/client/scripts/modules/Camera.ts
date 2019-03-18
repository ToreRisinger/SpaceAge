import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";
import { GameObject } from "../game_objects/GameObject";

export module Camera {

    let centerCameraOnShip : boolean = false;
    let camera : Phaser.Cameras.Scene2D.Camera;
    let x : integer;
    let y : integer;
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
        centerOnPlayer();
    }

    function centerOnPlayer() {
        if(centerCameraOnShip) {
            let ship : GameObject | undefined =  GameObjectHandler.getShip();
            if(ship != undefined){
                x = Math.floor(ship.getPos().x);
                y = Math.floor(ship.getPos().y);
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

    export function setSize(w : number, h : number) {
        camera.width = w;
        width = camera.width;
        camera.height = h;
        height = camera.height;
        centerOnPlayer();
    }

    export function getHeight() {
        return height;
    }

    export function centerCamera(value : boolean) {
        centerCameraOnShip = value;
    }
}