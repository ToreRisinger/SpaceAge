import { GameScene } from "../scenes/GameScene";
import { EventHandler } from "./EventHandler";
import { Events } from "../../../shared/scripts/Events";
import { GlobalData } from "./GlobalData";

export module InputHandler {

    let upKey : Phaser.Input.Keyboard.Key;
    let downKey : Phaser.Input.Keyboard.Key;
    let enterKey : Phaser.Input.Keyboard.Key;

    let mouseInput : Phaser.Input.Pointer;
    let mouseManager : Phaser.Input.Mouse.MouseManager;

    export function init() {
        let gameScene : GameScene = GameScene.getInstance();

        upKey = GameScene.getInstance().input.keyboard.addKey('up');
        downKey = GameScene.getInstance().input.keyboard.addKey('down');
        enterKey = GameScene.getInstance().input.keyboard.addKey('ENTER');
        upKey.on('down', onKeyUpPressed);
        downKey.on('down', onKeyDownPressed);
        enterKey.on('down', onKeyEnterPressed);

        mouseInput = gameScene.input.activePointer;
        mouseManager = gameScene.input.mouse;
        mouseManager.disableContextMenu();
    }

    export function update(time : number, delta : number) {
        GlobalData.mouseX = mouseInput.x;
        GlobalData.mouseY = mouseInput.y;
    }

    function onKeyUpPressed() {
        onKeyPressed("up");
    }

    function onKeyDownPressed() {
        onKeyPressed("down");
    }

    function onKeyEnterPressed() {
        onKeyPressed("enter");
    }

    function onKeyPressed(key : String) {
        let event : Events.KEY_PRESSED_EVENT_CONFIG = {
            eventId : Events.EEventType.KEY_PRESSED_EVENT,
            data : {
                key : key
            }
        }
        EventHandler.pushEvent(event);
    }
}