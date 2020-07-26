import { GameScene } from "../scenes/GameScene";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/util/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { RadarDetectable } from "../game_objects/RadarDetectable";

export module Camera {

    enum ECameraMode {
        CENTERED,
        FREE
    }

    let CAMERA_MIN_ZOOM: number = 1;
    let CAMERA_MAX_ZOOM: number = 35;
    let CAMERA_SCROLL_SPEED: number = 5;
    let CAMERA_ZOOM_SPEED: number = 3;

    let CAMERA_CENTER_SPEED: number = 0.3;
    let centerComplete: boolean;
    let centerTimer: number = 0;

    let cameraMode: ECameraMode = ECameraMode.CENTERED;

    let camera: Phaser.Cameras.Scene2D.Camera;

    let mapX: integer;
    let mapY: integer;

    let width: number;
    let height: number;
    let currentZoom: number;
    let maxZoom: number;
    let minZoom: number;
    let initialized: boolean = false;
    let centeredCamera: boolean;

    let objectToCenterOn : RadarDetectable | undefined;

    export function init() {
        centerOn(GlobalDataService.getInstance().getPlayerShip());
        camera = GameScene.getInstance().cameras.cameras[0];
        width = camera.width;
        height = camera.height;
        mapX = 0;
        mapY = 0;
        centerComplete = true;

        camera.centerOn(mapX, mapY);

        currentZoom = CAMERA_MIN_ZOOM;
        minZoom = CAMERA_MIN_ZOOM;
        maxZoom = Math.pow(2, CAMERA_MAX_ZOOM);
        initialized = true;
    }

    export function update(time : number, delta : number) {
        if(InputHandler.getKeyState(InputHandler.EKey.Z) == InputHandler.EKeyState.DOWN) {
            zoom(1 + (CAMERA_ZOOM_SPEED / (1000 / delta)));
        } else if(InputHandler.getKeyState(InputHandler.EKey.X) == InputHandler.EKeyState.DOWN) {
            zoom(1 - (CAMERA_ZOOM_SPEED / (1000 / delta)));
        }

        if(InputHandler.getKeyState(InputHandler.EKey.DOWN) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            objectToCenterOn = undefined;
            mapY += CAMERA_SCROLL_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.UP) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            objectToCenterOn = undefined;
            mapY -= CAMERA_SCROLL_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.LEFT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            objectToCenterOn = undefined;
            mapX -= CAMERA_SCROLL_SPEED * currentZoom;
        }

        if(InputHandler.getKeyState(InputHandler.EKey.RIGHT) == InputHandler.EKeyState.DOWN) {
            cameraMode = ECameraMode.FREE;
            objectToCenterOn = undefined;
            mapX += CAMERA_SCROLL_SPEED * currentZoom;
        }

        if(cameraMode == ECameraMode.CENTERED && objectToCenterOn == undefined || (objectToCenterOn != undefined && !objectToCenterOn.isVisible())) {
            objectToCenterOn = undefined;
            cameraMode = ECameraMode.FREE;
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
            return new Phaser.Math.Vector2(-mapX -camera.width/2, -mapY -camera.height/2);
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

    export function setMaxZoom() {
        currentZoom = maxZoom;
        camera.zoom = 1/maxZoom;
        sendZoomedEvent();
    }

    export function setMinZoom() {
        currentZoom = minZoom;
        camera.zoom = 1/minZoom;
        sendZoomedEvent();
    }

    export function centerOn(object: RadarDetectable) {
        if(cameraMode != ECameraMode.CENTERED || objectToCenterOn != object) {
            centerComplete = false;
            centerTimer = 10;
        }

        objectToCenterOn = object;
        cameraMode = ECameraMode.CENTERED;
    }

    export function getCenteredObject(): RadarDetectable | undefined {
        return objectToCenterOn;
    }

    function setCameraPos() {
        if(cameraMode == ECameraMode.CENTERED && objectToCenterOn != undefined) {
            if(centerComplete) {
                mapX = objectToCenterOn.getPos().x - camera.width / 2;
                mapY = objectToCenterOn.getPos().y - camera.height / 2;
            } else {
                let cameraVec = new Phaser.Math.Vector2(mapX, mapY);
                let objectVec = new Phaser.Math.Vector2(objectToCenterOn.getPos().x - camera.width / 2, objectToCenterOn.getPos().y - camera.height / 2);
                let cameraSpeed = objectVec.subtract(cameraVec).scale(CAMERA_CENTER_SPEED);
                let newCameraVec = cameraVec.add(cameraSpeed);
    
                mapX = newCameraVec.x;
                mapY = newCameraVec.y;

                centerTimer--;
                if(centerTimer == 0) {
                    centerComplete = true;
                }
            }
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
            sendZoomedEvent();
        }
    }

    function sendZoomedEvent() {
        let event : Events.ZOOM_CHANGED_EVENT_CONFIG = {
            eventId : Events.EEventType.ZOOM_CHANGED_EVENT,
            data : {
                zoom : currentZoom
            }
        }
        EventHandler.pushEvent(event);
        updateZoom();
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