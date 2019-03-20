import { GameObject } from "../game_objects/GameObject";
import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/scripts/Events";
import { Utils } from "./Utils";
import { EventHandler } from "./EventHandler";

export module GUI {

    let coordinateDisplay : HTMLElement | null;
    let mouseInput : Phaser.Input.Pointer;
    let mouseManager : Phaser.Input.Mouse.MouseManager;
    let backgroundClickedThisFrame : boolean;
    let htmlElementClickedThisFrame : boolean;
    let counterToFireNewDestination : number;


    export function init() {

        let gameScene : GameScene = GameScene.getInstance();
        mouseInput = gameScene.input.activePointer;
        mouseManager = gameScene.input.mouse;
        gameScene.input.mouse.capture = true;
        mouseManager.disableContextMenu();

        coordinateDisplay = document.getElementById("coord_display");
        backgroundClickedThisFrame = false;
        htmlElementClickedThisFrame = false;
        counterToFireNewDestination = 0;

        setupOnClickFunctions(); 
    }

    export function update(time : number, delta : number) {
        let ship : GameObject | undefined =  GameObjectHandler.getShip();
        if(ship != undefined){
            //@ts-ignore
            coordinateDisplay.textContent = "(" + Math.floor(ship.getPos().x) + ", " + Math.floor(ship.getPos().y) + ")";
        }

        //TODO new phaser version hopefully makes it possible for
        //Html to block input
        handleHTMLBlockPhaserInputWorkaround();
    }

    export function onBackgroundClicked() {
        backgroundClickedThisFrame = true;
    }

    function handleHTMLBlockPhaserInputWorkaround() {
        if(backgroundClickedThisFrame) {
            if(htmlElementClickedThisFrame) {
                counterToFireNewDestination = 0;
                backgroundClickedThisFrame = false;
            } else {
                counterToFireNewDestination++; 
            } 
        }

        if(counterToFireNewDestination == 6) {
            newDestination();
            counterToFireNewDestination = 0;
            backgroundClickedThisFrame = false;
        }

        htmlElementClickedThisFrame = false;
    }

    function newDestination() {
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(mouseInput.x, mouseInput.y));
        let event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT,
            data : { 
                destinationX: 
                newDestination.x, 
                destinationY: 
                newDestination.y
            }
        }
        EventHandler.pushEvent(event);
    }
    function setupOnClickFunctions() {
        //@ts-ignore
        coordinateDisplay.onclick = function() {
            htmlElementClickedThisFrame = true;
        }
    }
}
