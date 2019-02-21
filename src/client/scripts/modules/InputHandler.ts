import { GameScene } from "../scenes/GameScene"
import { EventHandler } from "./EventHandler"
import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../events/EEventType"

export module InputHandler {

    let mouseInput : Phaser.Input.Pointer;
    let mouseWasPressedPreviousFrame : boolean;

    export function init(gameScene : GameScene) {
        gameScene.input.mouse.capture = true;
        mouseInput = gameScene.input.activePointer;
        mouseWasPressedPreviousFrame = false;
    }

    export function update(time : number, delta : number) {
        if(mouseInput.isDown && !mouseWasPressedPreviousFrame) {
            mouseWasPressedPreviousFrame = true;
            EventHandler.pushEvent(new GameEvent(EEventType.PLAYER_MOVE_EVENT, {mouseX: mouseInput.x, mouseY: mouseInput.y}));
        } else if(!mouseInput.isDown) {
            mouseWasPressedPreviousFrame = false;
        }
    }

    /*
        TODO
        use phaser 3 eventEmitter inside EventHandler
        Make player movement work
        Make camera follow player
        try multiple players
    */
}