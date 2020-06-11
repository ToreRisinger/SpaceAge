import { GameScene } from "../scenes/GameScene";
export module InputHandler {

    export enum EKey {
        UP = "up",
        DOWN = "down",
        ENTER = "ENTER",
        SPACE = "space",
        Z = "z",
        X = "x"
    }

    export enum EMouseKey {
        MOUSE_RIGHT,
        MOUSE_LEFT
    }

    export enum EKeyState {
        PRESSED,
        DOWN,
        IDLE
    }

    let mouseKeyStateMap = new Map();
    let tmpMouseKeyStateMap = new Map();

    let keyMap: Map<string, Phaser.Input.Keyboard.Key> = new Map();
    let keyStateMap: Map<string, EKeyState> = new Map();
    let tmpKeyStateMap: Map<string, EKeyState> = new Map();

    let mouseInput : Phaser.Input.Pointer;
    let mouseManager : Phaser.Input.Mouse.MouseManager;

    let mouseX : number;
    let mouseY : number;

    export function init() {
        let gameScene : GameScene = GameScene.getInstance();

        mouseInput = gameScene.input.activePointer;
        mouseManager = gameScene.input.mouse;
        mouseManager.disableContextMenu();

        mouseX = mouseInput.x;
        mouseY = mouseInput.y;

        Object.values(EKey).forEach(obj => {
            let key = GameScene.getInstance().input.keyboard.addKey(obj.toString());
            key.on('down', () => onKeyPressedCallback(obj));
            keyMap.set(obj.toString(), key);
        });

        Object.values(EKey).forEach(obj => {
            keyStateMap.set(obj.toString(), EKeyState.IDLE);
            tmpKeyStateMap.set(obj.toString(), EKeyState.IDLE);
        });

        for(let value in EMouseKey) {
            mouseKeyStateMap.set(value, EKeyState.IDLE);
            tmpMouseKeyStateMap.set(value, EKeyState.IDLE);
        }
    }

    export function update(time : number, delta : number) {
        Object.values(EKey).forEach(_enum => {
            //@ts-ignore
            keyStateMap.set(_enum.toString(), tmpKeyStateMap.get(_enum.toString()));
            tmpKeyStateMap.set(_enum.toString(), EKeyState.IDLE);
        });

        Object.values(EKey).forEach(_enum => {
            //@ts-ignore
            let key = keyMap.get(_enum.toString());
            //@ts-ignore
            if(key.isDown && tmpKeyStateMap.get(_enum.toString()) != EKeyState.DOWN) {
                //@ts-ignore
                onKeyPressed(_enum, EKeyState.DOWN);
            }
        });

        /*
            MOUSE
        */
       mouseX = mouseInput.x;
       mouseY = mouseInput.y;

        Object.values(EMouseKey).filter(obj => !isNaN(Number(obj))).forEach(_enum => {
            mouseKeyStateMap.set(_enum, tmpMouseKeyStateMap.get(_enum));
            tmpMouseKeyStateMap.set(_enum, EKeyState.IDLE);
        });

        if(mouseInput.rightButtonDown()) {
            if(mouseKeyStateMap.get(EMouseKey.MOUSE_RIGHT) != EKeyState.PRESSED && mouseKeyStateMap.get(EMouseKey.MOUSE_RIGHT) != EKeyState.DOWN) {
                onMouseKeyPressed(EMouseKey.MOUSE_RIGHT, EKeyState.PRESSED);
            } else {
                onMouseKeyPressed(EMouseKey.MOUSE_RIGHT, EKeyState.DOWN);
            }
        } 

        if(mouseInput.leftButtonDown()) {
            if(mouseKeyStateMap.get(EMouseKey.MOUSE_LEFT) != EKeyState.PRESSED && mouseKeyStateMap.get(EMouseKey.MOUSE_RIGHT) != EKeyState.DOWN) {
                onMouseKeyPressed(EMouseKey.MOUSE_LEFT, EKeyState.PRESSED);
            } else {
                onMouseKeyPressed(EMouseKey.MOUSE_LEFT, EKeyState.DOWN);
            }
        } 
    }

    export function getKeyState(key: EKey): EKeyState {
        //@ts-ignore
        return keyStateMap.get(key.toString());
    }

    export function getMouseKeyState(key: EMouseKey): EKeyState {
        return mouseKeyStateMap.get(key);
    }

    export function getMouseX() : number {
        return mouseX;
    }

    export function getMouseY() : number {
        return mouseY;
    }

    function onKeyPressedCallback(key: EKey) {
        onKeyPressed(key, EKeyState.PRESSED);
    }

    function onKeyPressed(key : EKey, state : EKeyState) {
        tmpKeyStateMap.set(key.toString(), state);
    }

    function onMouseKeyPressed(key : EMouseKey, state : EKeyState) {
        tmpMouseKeyStateMap.set(key, state);
    }
}