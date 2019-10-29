import { GameScene } from "../scenes/GameScene";
import { GlobalData } from "./GlobalData";

export module InputHandler {

    export enum KEY {
        UP,
        DOWN,
        ENTER
    }

    export enum KEY_STATE {
        PRESSED,
        DOWN,
        IDLE
    }

    let keyMap = new Map();
    let tmpKeyMap = new Map();


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

        keyMap.set(KEY.UP, KEY_STATE.IDLE);
        keyMap.set(KEY.DOWN, KEY_STATE.IDLE);
        keyMap.set(KEY.ENTER, KEY_STATE.IDLE);
        tmpKeyMap.set(KEY.UP, KEY_STATE.IDLE);
        tmpKeyMap.set(KEY.DOWN, KEY_STATE.IDLE);
        tmpKeyMap.set(KEY.ENTER, KEY_STATE.IDLE);
    }

    export function update(time : number, delta : number) {
        GlobalData.mouseX = mouseInput.x;
        GlobalData.mouseY = mouseInput.y;

        keyMap.set(KEY.UP, tmpKeyMap.get(KEY.UP));
        keyMap.set(KEY.DOWN, tmpKeyMap.get(KEY.DOWN));
        keyMap.set(KEY.ENTER, tmpKeyMap.get(KEY.ENTER));

        tmpKeyMap.set(KEY.UP, KEY_STATE.IDLE);
        tmpKeyMap.set(KEY.DOWN, KEY_STATE.IDLE);
        tmpKeyMap.set(KEY.ENTER, KEY_STATE.IDLE);

        if(upKey.isDown && tmpKeyMap.get(KEY.UP) != KEY_STATE.DOWN) {
            onKeyPressed(KEY.UP, KEY_STATE.DOWN);
        }

        if(downKey.isDown && tmpKeyMap.get(KEY.DOWN) != KEY_STATE.DOWN) {
            onKeyPressed(KEY.DOWN, KEY_STATE.DOWN);
        }
    }

    export function getKeyState(key : KEY) : KEY_STATE {
        return keyMap.get(key);
    }

    function onKeyUpPressed() {
        onKeyPressed(KEY.UP, KEY_STATE.PRESSED);
    }

    function onKeyDownPressed() {
        onKeyPressed(KEY.DOWN, KEY_STATE.PRESSED);
    }

    function onKeyEnterPressed() {
        onKeyPressed(KEY.ENTER, KEY_STATE.PRESSED);
    }

    function onKeyPressed(key : KEY, state : KEY_STATE) {
        tmpKeyMap.set(key, state);
    }
}