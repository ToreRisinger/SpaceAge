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
    let x: integer;
    let y: integer;
    let width: number;
    let height: number;
    let currentZoom: number;
    let maxZoom: number;
    let minZoom: number;
    let initialized: boolean = false;

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
            y += CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.UP) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            y -= CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.LEFT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            x -= CAMERA_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.RIGHT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            x += CAMERA_SPEED * currentZoom;
        }
        
        centerCamera();

        let globalDataService = GlobalDataService.getInstance();
        globalDataService.setCameraX(x);
        globalDataService.setCameraY(y);

        globalDataService.setCameraZoom(currentZoom);
        globalDataService.setCameraWidth(width * currentZoom);
        globalDataService.setCameraHeight(height * currentZoom);  
    }

    export function setSize(w : number, h : number) {
        if(initialized) {
            camera.width = w;
            width = camera.width;
            camera.height = h;
            height = camera.height;
            centerCamera();
        }
    }

    function centerCamera() {
        if(cameraMode == ECameraMode.FREE) {
            camera.centerOn(x, y);
        } else {
            let ship : Ship = GlobalDataService.getInstance().getPlayerShip();
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
        let globalDataService = GlobalDataService.getInstance();
        globalDataService.setCameraZoom(currentZoom);
        globalDataService.setCameraWidth(width * currentZoom);
        globalDataService.setCameraHeight(height * currentZoom);  
    }
}