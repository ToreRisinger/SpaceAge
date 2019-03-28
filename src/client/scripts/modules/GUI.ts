import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/scripts/Events";
import { Utils } from "./Utils";
import { EventHandler } from "./EventHandler";
import { Ship } from "../game_objects/Ship";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { GlobalData } from "./GlobalData";

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

    let swsc_thrust : HTMLElement;
    let swsc_max_speed : HTMLElement;
    let swsc_weight : HTMLElement;
    let swsc_hull : HTMLElement;
    let swsc_armor : HTMLElement;
    let swsc_shield : HTMLElement;
    let swsc_vision_range : HTMLElement;
    let swsc_gravity_detection_range : HTMLElement;
    let swsc_shield_generation : HTMLElement;
    let swsc_armor_repair : HTMLElement;
    let swsc_armor_impact_resistance : HTMLElement;
    let swsc_armor_heat_resistance : HTMLElement;
    let swsc_armor_explosion_resistance : HTMLElement;
    let swsc_shield_impact_resistance : HTMLElement;
    let swsc_shield_heat_resistance : HTMLElement;
    let swsc_shield_explosion_resistance : HTMLElement;
    let swsc_targeting_systems : HTMLElement;
    let swsc_avoidance_systems : HTMLElement;
    let swsc_enery_grid : HTMLElement;
    let swsc_cargo_hold : HTMLElement;
    let swsc_acceleration : HTMLElement;

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

        //@ts-ignore
        swsc_thrust = document.getElementById("swsc_thrust");
        //@ts-ignore
        swsc_max_speed = document.getElementById("swsc_max_speed");
        //@ts-ignore
        //@ts-ignore
        swsc_weight = document.getElementById("swsc_weight");
        //@ts-ignore
        swsc_hull = document.getElementById("swsc_hull");
        //@ts-ignore
        swsc_armor = document.getElementById("swsc_armor");
        //@ts-ignore
        swsc_shield = document.getElementById("swsc_shield");
        //@ts-ignore
        swsc_vision_range = document.getElementById("swsc_vision_range");
        //@ts-ignore
        swsc_gravity_detection_range = document.getElementById("swsc_gravity_detection_range");
        //@ts-ignore
        swsc_shield_generation = document.getElementById("swsc_shield_generation");
        //@ts-ignore
        swsc_armor_repair = document.getElementById("swsc_armor_repair");
        //@ts-ignore
        swsc_armor_impact_resistance = document.getElementById("swsc_armor_impact_resistance");
        //@ts-ignore
        swsc_armor_heat_resistance = document.getElementById("swsc_armor_heat_resistance");
        //@ts-ignore
        swsc_armor_explosion_resistance = document.getElementById("swsc_armor_explosion_resistance");
        //@ts-ignore
        swsc_shield_impact_resistance = document.getElementById("swsc_shield_impact_resistance");
        //@ts-ignore
        swsc_shield_heat_resistance = document.getElementById("swsc_shield_heat_resistance");
        //@ts-ignore
        swsc_shield_explosion_resistance = document.getElementById("swsc_shield_explosion_resistance");
        //@ts-ignore
        swsc_targeting_systems = document.getElementById("swsc_targeting_systems");
        //@ts-ignore
        swsc_avoidance_systems = document.getElementById("swsc_avoidance_systems");
        //@ts-ignore
        swsc_enery_grid = document.getElementById("swsc_enery_grid");
        //@ts-ignore
        swsc_cargo_hold = document.getElementById("swsc_cargo_hold");
        //@ts-ignore
        swsc_acceleration = document.getElementById("swsc_acceleration");

        backgroundClickedThisFrame = false;
        htmlElementClickedThisFrame = false;
        counterToFireNewDestination = 0;

        setupOnClickFunctions(); 
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined =  GlobalData.playerShip;
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
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(mouseInput.x * GlobalData.cameraZoom, mouseInput.y * GlobalData.cameraZoom));
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

    function onSpaceSceneGameEvent() {
        //@ts-ignore
        let ship : Ship =  GlobalData.playerShip;
        
        swsc_thrust.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.thrust]);
        swsc_max_speed.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.max_speed]);
        swsc_weight.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.weight]);
        swsc_hull.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.hull]);
        swsc_armor.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.armor]);
        swsc_shield.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.shield]);
        swsc_vision_range.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.radar_range]);
        swsc_gravity_detection_range.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.gravity_detection_range]);
        swsc_shield_generation.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.shield_generation]);
        swsc_armor_repair.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.armor_repair]);
        swsc_armor_impact_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance]);
        swsc_armor_heat_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance]);
        swsc_armor_explosion_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance]);
        swsc_shield_impact_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.shield_impact_resistance]);
        swsc_shield_heat_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.shield_heat_resistance]);
        swsc_shield_explosion_resistance.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.shield_explosion_resistance]);
        swsc_targeting_systems.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.targeting_systems]);
        swsc_avoidance_systems.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.avoidance_systems]);
        swsc_enery_grid.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.energy_grid]);
        swsc_cargo_hold.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.cargo_hold]);
        swsc_acceleration.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.acceleration]);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneGameEvent);
    }
}
