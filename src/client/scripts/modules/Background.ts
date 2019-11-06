import { CONSTANTS } from "../constants/CONSTANTS";
import { GameScene } from "../scenes/GameScene"
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";
import { InputHandler } from "./InputHandler";

export module Background {

    let loadingBackground : Phaser.GameObjects.Sprite;
    let spaceBackground : Phaser.GameObjects.Sprite;
    let BACKRGOUND_SIZE : number = 2000;
    let backgroundClickedCount : number = 0;
    let backgroundClicked : boolean = false;

    export function init() {
        subscribeToEvents();

        createLoadingScreen();
        createBackground();   

        spaceBackground.setDisplaySize(BACKRGOUND_SIZE, BACKRGOUND_SIZE);
        loadingBackground.setDisplaySize(BACKRGOUND_SIZE, BACKRGOUND_SIZE);
    }

    export function update(time : number, delta : number) {
        let newBackgroundSize = BACKRGOUND_SIZE * GlobalData.cameraZoom;
        spaceBackground.setX(GlobalData.cameraX);
        spaceBackground.setY(GlobalData.cameraY);
        spaceBackground.setDisplaySize(newBackgroundSize, newBackgroundSize);

        if(backgroundClicked) {
            backgroundClickedCount++;
        }


        if(backgroundClickedCount > 15) {
            backgroundClickedCount = 0;
            backgroundClicked = false;
        }
    }

    export function getSpaceBackground() {
        return spaceBackground;
    }

    function onSpaceSceneStart() {
        loadingBackground.destroy();
    }

    function createLoadingScreen() {
        loadingBackground = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.LOADING_BACKGROUND);
        loadingBackground.setDepth(DRAW_LAYERS.COVER_EVERYTHING_LAYER);

        loadingBackground.setX(GlobalData.cameraX);
        loadingBackground.setY(GlobalData.cameraY);
    }

    function createBackground() {
        spaceBackground = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1);
        spaceBackground.setInteractive();
        spaceBackground.on('pointerdown', onBackgroundClicked);
        spaceBackground.setDepth(DRAW_LAYERS.BACKGROUND_LAYER);

        spaceBackground.setX(GlobalData.cameraX);
        spaceBackground.setY(GlobalData.cameraY);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }

    function onBackgroundClicked() {
        //TODO better solution. This prevents movement when pressing side panels
        let mouseX = InputHandler.getMouseX();
        let mouseY = InputHandler.getMouseY();
        if(mouseX > 52 && mouseY < GameScene.getInstance().getSceneWidth() - 320) {
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