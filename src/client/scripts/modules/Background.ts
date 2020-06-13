import { CONSTANTS } from "../constants/CONSTANTS";
import { GameScene } from "../scenes/GameScene"
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { InputHandler } from "./InputHandler";
import { GlobalDataService } from "./GlobalDataService";
import { Camera } from "./Camera";

export module Background {

    let spaceBackground : Phaser.GameObjects.Sprite;
    let BACKRGOUND_SIZE : number = 2000;
    let backgroundClickedCount : number = 0;
    let backgroundClicked : boolean = false;

    export function init() {
        createBackground();   
        spaceBackground.setDisplaySize(BACKRGOUND_SIZE, BACKRGOUND_SIZE);
    }

    export function update(time : number, delta : number) {
        let globalDataService = GlobalDataService.getInstance();
        let newBackgroundSize = BACKRGOUND_SIZE * globalDataService.getCameraZoom();
        spaceBackground.setX(Camera.getDisplayPos().x);
        spaceBackground.setY(Camera.getDisplayPos().y);
        spaceBackground.setDisplaySize(newBackgroundSize, newBackgroundSize);

        if(backgroundClicked) {
            backgroundClickedCount++;
        }


        if(backgroundClickedCount > 30) {
            backgroundClickedCount = 0;
            backgroundClicked = false;
        }
    }

    export function getSpaceBackground() {
        return spaceBackground;
    }

    function createBackground() {
        let globalDataService = GlobalDataService.getInstance();
        spaceBackground = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1);
        spaceBackground.setInteractive();
        spaceBackground.on('pointerdown', onBackgroundClicked);
        spaceBackground.setDepth(DRAW_LAYERS.BACKGROUND_LAYER);

        spaceBackground.setX(globalDataService.getCameraX());
        spaceBackground.setY(globalDataService.getCameraY());
    }

    function onBackgroundClicked() {
        //TODO better solution. This prevents movement when pressing side panels
        let mouseX = InputHandler.getMouseX();
        let mouseY = InputHandler.getMouseY();
        if(mouseX > 52 && mouseX < GameScene.getInstance().getSceneWidth() - 320) {
            if(backgroundClicked) {
                let event : Events.BACKGROUND_CLICKED_TWICE_EVENT_CONFIG = {
                    eventId : Events.EEventType.BACKGROUND_CLICKED_TWICE_EVENT,
                    data : {
                        mouseX : mouseX,
                        mouseY : mouseY
                    }
                }
                EventHandler.pushEvent(event);
                backgroundClicked = false;
            } else {
                backgroundClicked = true;
                backgroundClickedCount = 0;
            }
        }
    }
}