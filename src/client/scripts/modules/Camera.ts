import { GameScene } from "../scenes/GameScene";
import { GameObject } from "../game_objects/GameObject";
import { GlobalData } from "./GlobalData";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";

export module Camera {

    let CAMERA_MIN_ZOOM : number = 1;
    let CAMERA_MAX_ZOOM : number = 35;

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

        currentZoom = CAMERA_MIN_ZOOM;
        minZoom = CAMERA_MIN_ZOOM;
        maxZoom = Math.pow(2, CAMERA_MAX_ZOOM);
    }

    export function update(time : number, delta : number) {
        if(InputHandler.getKeyState(InputHandler.KEY.UP) == InputHandler.KEY_STATE.DOWN) {
            zoom(1 + (2 / (1000 / delta)));
        } else if(InputHandler.getKeyState(InputHandler.KEY.DOWN) == InputHandler.KEY_STATE.DOWN) {
            zoom(1 - 2 / (1000 / delta));
        }

        centerOnPlayer();
        GlobalData.cameraX = x;
        GlobalData.cameraY = y;

        GlobalData.cameraZoom = currentZoom;
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

    function zoom(zoom : number) {
       currentZoom = currentZoom * zoom;
       camera.zoom = camera.zoom / zoom;
       let zoomed = true;
       if(currentZoom < minZoom) {
           if(currentZoom == minZoom) {
               zoomed = false;
           }
           currentZoom = minZoom;
           camera.zoom = minZoom;
       } else if(currentZoom > maxZoom) {
            if(currentZoom == maxZoom) {
                zoomed = false;
            }
           currentZoom = maxZoom;
           camera.zoom = 1/maxZoom;
       }

       if(zoomed) {
        let event : Events.ZOOM_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.ZOOM_CHANGED_EVENT,
            data : {
                zoom : currentZoom
            }
        }
        EventHandler.pushEvent(event);
        updateZoom();
       }
    }

    function updateZoom() {
        GlobalData.cameraZoom = currentZoom;
        GlobalData.cameraWidth = width * currentZoom;
        GlobalData.cameraHeight = height * currentZoom;  
    }
}