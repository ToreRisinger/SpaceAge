import { GameScene } from "../scenes/GameScene"
import { EventHandler } from "./EventHandler"
import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../events/EEventType"
import { Background } from "./Background";

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
        /*
        if(mouseInput.isDown && !mouseWasPressedPreviousFrame) {
            mouseWasPressedPreviousFrame = true;
            EventHandler.pushEvent(new GameEvent(EEventType.PLAYER_MOVE_EVENT, {mouseX: mouseInput.x, mouseY: mouseInput.y}));
        } else if(!mouseInput.isDown) {
            mouseWasPressedPreviousFrame = false;
        }
        */
    }

    export function onBackgroundClicked() {
        EventHandler.pushEvent(new GameEvent(EEventType.PLAYER_SET_NEW_DESTINATION_EVENT, {mouseX: mouseInput.x, mouseY: mouseInput.y}));
    }
}