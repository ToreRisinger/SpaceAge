import { GameScene } from "../scenes/GameScene"
import { EventHandler } from "./EventHandler"
import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../events/EEventType"
import { Background } from "./Background";
import { Utils } from "./Utils";

export module InputHandler {

    let mouseInput : Phaser.Input.Pointer;
    let mouseWasPressedPreviousFrame : boolean;
    let mouseManager : Phaser.Input.Mouse.MouseManager;

    export function init() {
        let gameScene : GameScene = GameScene.getInstance();
        mouseInput = gameScene.input.activePointer;
        mouseManager = gameScene.input.mouse;
        gameScene.input.mouse.capture = true;
        mouseWasPressedPreviousFrame = false;
        mouseManager.disableContextMenu();
    }

    export function update(time : number, delta : number) {
        
    }

    export function onBackgroundClicked() {
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(mouseInput.x, mouseInput.y));
        EventHandler.pushEvent(new GameEvent(EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, {mouseX: newDestination.x, mouseY: newDestination.y}));
    }
}