import { GameScene } from "../scenes/GameScene";
import { GameObject } from "../game_objects/GameObject";
import { GlobalData } from "./GlobalData";

export module Camera {

    let camera : Phaser.Cameras.Scene2D.Camera;
    let x : integer;
    let y : integer;
    let width : number;
    let height : number;
    let upKey : Phaser.Input.Keyboard.Key;
    let downKey : Phaser.Input.Keyboard.Key;
    let currentZoom : number;
    let maxZoom : number;
    let minZoom : number;

    export function init() {
        camera = GameScene.getInstance().cameras.cameras[0];
        width = camera.width;
        height = camera.height;
        x = 0;
        y = 0;

        camera.centerOn(x, y);
        upKey = GameScene.getInstance().input.keyboard.addKey('up');
        downKey = GameScene.getInstance().input.keyboard.addKey('down');

        currentZoom = 1;
        minZoom = 1;
        maxZoom = 32;

        upKey.on('down', onUpKeyPressed);
        downKey.on('down', onDownKeyPressed);
    }

    export function update(time : number, delta : number) {
        centerOnPlayer();

        GlobalData.cameraZoom = currentZoom;
        GlobalData.cameraX = x;
        GlobalData.cameraY = y;
        GlobalData.cameraWidth = width * currentZoom;
        GlobalData.cameraHeight = height * currentZoom;  
    }

    export function setSize(w : number, h : number) {
        camera.width = w;
        width = camera.width;
        camera.height = h;
        height = camera.height;
        centerOnPlayer();
    }

    function centerOnPlayer() {
        let ship : GameObject | undefined =  GlobalData.playerShip;
        if(ship != undefined){
            x = Math.floor(ship.getPos().x);
            y = Math.floor(ship.getPos().y);
            camera.centerOn(x, y);
        } 
    }

    function onUpKeyPressed(event : any) {
        if(currentZoom < maxZoom) {
            currentZoom = currentZoom * 2;
            camera.zoom = camera.zoom / 2;
        }
    }

    function onDownKeyPressed(event : any) {
        if(currentZoom > minZoom) {
            currentZoom = currentZoom / 2;
            camera.zoom = camera.zoom * 2;
        }
    }
}