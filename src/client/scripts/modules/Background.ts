import { CONSTANTS } from "../constants/CONSTANTS";
import { Camera } from "./Camera"
import { InputHandler } from "./InputHandler"
import { GameScene } from "../scenes/GameScene"
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";

export module Background {

    let loadingBackground : Phaser.GameObjects.Sprite;
    let spaceBackground : Phaser.GameObjects.Sprite;

    export function init() {
        subscribeToEvents();

        createLoadingScreen();
        createBackground();   

        //Todo, make the background very big, so it fits big screens
        spaceBackground.setDisplaySize(4000, 4000);
        //loadingBackground.setDisplaySize(w, h);
    }

    export function update(time : number, delta : number) {
        spaceBackground.setX(Camera.getX());
        spaceBackground.setY(Camera.getY());
    }

    function onSpaceSceneStart() {
        loadingBackground.destroy();
    }

    function createLoadingScreen() {
        loadingBackground = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.LOADING_BACKGROUND);
        loadingBackground.setDepth(DRAW_LAYERS.COVER_EVERYTHING_LAYER);

        loadingBackground.setX(Camera.getX());
        loadingBackground.setY(Camera.getY());
    }

    function createBackground() {
        spaceBackground = GameScene.getInstance().add.sprite(0, 0, CONSTANTS.IMAGE.SPACE_BACKGROUND_1);
        spaceBackground.setInteractive();
        spaceBackground.on('pointerdown', InputHandler.onBackgroundClicked);
        spaceBackground.setDepth(DRAW_LAYERS.BACKGROUND_LAYER);

        spaceBackground.setX(Camera.getX());
        spaceBackground.setY(Camera.getY());
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }
}