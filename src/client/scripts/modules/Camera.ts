import { GameScene } from "../scenes/GameScene";
import { GameObject } from "../game_objects/GameObject";
import { GlobalData } from "./GlobalData";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";

export module Camera {

    let camera : Phaser.Cameras.Scene2D.Camera;
    let x : integer;
    let y : integer;
    let width : number;
    let height : number;
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

        currentZoom = 1;
        minZoom = 1;
        maxZoom = 256;

        subscribeToEvents();
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
            x = ship.getPos().x;
            y = ship.getPos().y;
            camera.centerOn(x, y);
        } 
    }

    function onKeyPressed(event : Events.KEY_PRESSED_EVENT_CONFIG) {
        if(event.data.key == "up") {
            onKeyUpPressed();
        }

        if(event.data.key == "down") {
            onDownKeyPressed();
        }
    }

    function onKeyUpPressed() {
        if(currentZoom < maxZoom) {
            currentZoom = currentZoom * 2;
            camera.zoom = camera.zoom / 2;
        }
    }

    function onDownKeyPressed() {
        if(currentZoom > minZoom) {
            currentZoom = currentZoom / 2;
            camera.zoom = camera.zoom * 2;
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.KEY_PRESSED_EVENT, onKeyPressed);
    }
}