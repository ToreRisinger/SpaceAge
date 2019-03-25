import { GameObject } from "../game_objects/GameObject";
import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/scripts/Events";
import { Utils } from "./Utils";
import { EventHandler } from "./EventHandler";
import { Ship } from "../game_objects/Ship";

export module GUI {

    let coordinateDisplay : HTMLElement | null;
    let shipHud : HTMLElement | null;
    let shipHudSpeed : HTMLElement | null;
    let ship_hud_shield_display : HTMLElement | null;
    let ship_hud_armor_display : HTMLElement | null;
    let ship_hud_hull_display : HTMLElement | null;
    let left_menu : HTMLElement | null;
    let left_menu_ship_button : HTMLElement | null;
    let ship_window : HTMLElement | null;

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
        shipHud = document.getElementById("ship_hud_display");
        shipHudSpeed = document.getElementById("ship_hud_speed_display");
        ship_hud_shield_display = document.getElementById("ship_hud_shield_display");
        ship_hud_armor_display = document.getElementById("ship_hud_armor_display");
        ship_hud_hull_display = document.getElementById("ship_hud_hull_display");
        left_menu = document.getElementById("left_menu");
        left_menu_ship_button = document.getElementById("left_menu_ship_button");
        ship_window = document.getElementById("ship_window");

        backgroundClickedThisFrame = false;
        htmlElementClickedThisFrame = false;
        counterToFireNewDestination = 0;

        setupOnClickFunctions(); 
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined =  GameObjectHandler.getShip();
        if(ship != undefined){
            //@ts-ignore
            coordinateDisplay.textContent = "(" + Math.floor(ship.getPos().x) + ", " + Math.floor(ship.getPos().y) + ")";
            //@ts-ignore
            shipHudSpeed.textContent = Math.floor(new Phaser.Math.Vector2(ship.getShipData().velVec[0], ship.getShipData().velVec[1]).length()) + " m/s";
            //@ts-ignore
            ship_hud_shield_display.textContent = ship.getShipData().properties.currentShield;
            //@ts-ignore
            ship_hud_armor_display.textContent = ship.getShipData().properties.currentArmor;
            //@ts-ignore
            ship_hud_hull_display.textContent = ship.getShipData().properties.currentHull;
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
        coordinateDisplay.onclick = doNothing;
        //@ts-ignore
        shipHud.onclick = doNothing;
        //@ts-ignore
        shipHudSpeed.onclick = doNothing;
        //@ts-ignore
        ship_hud_shield_display.onclick = doNothing;
        //@ts-ignore
        ship_hud_armor_display.onclick = doNothing;
        //@ts-ignore
        ship_hud_hull_display.onclick = doNothing;
        //@ts-ignore
        left_menu.onclick = doNothing;
        //@ts-ignore
        left_menu_ship_button.onclick = openShipButtonClicked;
        //@ts-ignore
        ship_window.onclick = doNothing;
    }

    function doNothing() {
        htmlElementClickedThisFrame = true;
    }

    function openShipButtonClicked() {
        closeAllOtherWindows();

        //@ts-ignore
        let visibility = window.getComputedStyle(ship_window, null).getPropertyValue("visibility");
        //@ts-ignore
        if(visibility == 'hidden') {
            //@ts-ignore
            ship_window.style.visibility = 'visible'; 
        } else {
            //@ts-ignore
            ship_window.style.visibility = 'hidden'; 
        }
    }

    function closeAllOtherWindows() {

    }
}
