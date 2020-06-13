import { GameScene } from "../scenes/GameScene";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { Ship } from "../game_objects/Ship";

export module Camera {

    enum ECameraMode {
        CENTERED,
        FREE
    }

    let CAMERA_MIN_ZOOM: number = 1;
    let CAMERA_MAX_ZOOM: number = 35;
    let CAMERA_SPEED: number = 5;

    let cameraMode: ECameraMode = ECameraMode.CENTERED;

    let camera: Phaser.Cameras.Scene2D.Camera;

    let mapX: integer;
    let mapY: integer;
    let cameraX : integer;
    let cameraY : integer;

    let width: number;
    let height: number;
    let currentZoom: number;
    let maxZoom: number;
    let minZoom: number;
    let initialized: boolean = false;
    let centeredCamera: boolean;

    export function init() {
        camera = GameScene.getInstance().cameras.cameras[0];
        width = camera.width;
        height = camera.height;
        mapX = 0;
        mapY = 0;

        camera.centerOn(mapX, mapY);

        currentZoom = CAMERA_MIN_ZOOM;
        minZoom = CAMERA_MIN_ZOOM;
        maxZoom = Math.pow(2, CAMERA_MAX_ZOOM);
        initialized = true;
    }

    export function update(time : number, delta : number) {
        if(InputHandler.getKeyState(InputHandler.EKey.Z) == InputHandler.EKeyState.DOWN) {
            zoom(1 + (2 / (1000 / delta)));
        } else if(InputHandler.getKeyState(InputHandler.EKey.X) == InputHandler.EKeyState.DOWN) {
            zoom(1 - 2 / (1000 / delta));
        }

        if(InputHandler.getKeyState(InputHandler.EKey.SPACE) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.CENTERED;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.DOWN) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            mapY += CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.UP) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            mapY -= CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.LEFT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            mapX -= CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.RIGHT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            mapX += CAMERA_SPEED * currentZoom;
        }
        
        setCameraPos();

        let globalDataService = GlobalDataService.getInstance();
        globalDataService.setCameraX(mapX);
        globalDataService.setCameraY(mapY);

        globalDataService.setCameraZoom(currentZoom);
        globalDataService.setCameraWidth(width * currentZoom);
        globalDataService.setCameraHeight(height * currentZoom);
    }

    export function getMapPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(mapX + width / 2, mapY + height / 2);
    }

    export function getCameraOffset() : Phaser.Math.Vector2 {
        if(centeredCamera) {
            return new Phaser.Math.Vector2(-mapX, -mapY);
        } else {
            return new Phaser.Math.Vector2(0, 0);
        }
    }

    export function setSize(w : number, h : number) {
        if(initialized) {
            camera.width = w;
            width = camera.width;
            camera.height = h;
            height = camera.height;
            setCameraPos();
        }
    }

    function setCameraPos() {
        if(cameraMode == ECameraMode.CENTERED) {
            let ship : Ship = GlobalDataService.getInstance().getPlayerShip();
            mapX = ship.getPos().x - camera.width / 2;
            mapY = ship.getPos().y - camera.height / 2;
        }

        if(mapX < 10000000 && mapX > -10000000 && mapY < 10000000 && mapY > -10000000) {
            camera.scrollX = mapX;
            camera.scrollY = mapY;
            centeredCamera = false;
        } else { //Camera is far away
            centeredCamera = true;
            camera.scrollX = 0;
            camera.scrollY = 0;
            camera.centerOn(0, 0);
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
        let globalDataService = GlobalDataService.getInstance();
        globalDataService.setCameraZoom(currentZoom);
        globalDataService.setCameraWidth(width * currentZoom);
        globalDataService.setCameraHeight(height * currentZoom);  
    }

    export function getZoom() {
        return currentZoom;
    }

    export function getDisplayPos() : Phaser.Math.Vector2 {
        if(centeredCamera) {
            return new Phaser.Math.Vector2(0, 0);
        } else {
            return getMapPos();
        }
    }
}