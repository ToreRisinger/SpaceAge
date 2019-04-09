import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/scripts/Events";
import { Utils } from "./Utils";
import { EventHandler } from "./EventHandler";
import { Ship } from "../game_objects/Ship";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { GlobalData } from "./GlobalData";

export module GUI {

    let shipHud : HTMLElement;
    let shipHudSpeed : HTMLElement;
    let ship_hud_shield_display : HTMLElement;
    let ship_hud_armor_display : HTMLElement;
    let ship_hud_hull_display : HTMLElement;
    let ship_hud_coordinate_display : HTMLElement;
    let ship_window_button : HTMLElement;
    let ship_window : HTMLElement;
    let chat_window : HTMLElement;
    let navigation_window : HTMLElement;
    
    let swsc_thrust : HTMLElement;
    let swsc_max_speed : HTMLElement;
    let swsc_weight : HTMLElement;
    let swsc_hull : HTMLElement;
    let swsc_armor : HTMLElement;
    let swsc_shield : HTMLElement;
    let swsc_proximity_radar_range : HTMLElement;
    let swsc_gravity_radar_range : HTMLElement;
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

    let backgroundClickedThisFrame : boolean;
    let backgroundClickedX : number;
    let backgroundClickedY : number;
    let htmlElementClickedThisFrame : boolean;
    let allowedToFireNewDestinationEvent : boolean;
    let counterToFireNewDestination : number;

    

    export function init() {
        let gameScene : GameScene = GameScene.getInstance();      
        gameScene.input.mouse.capture = true;
        backgroundClickedThisFrame = false;
        htmlElementClickedThisFrame = false;
        allowedToFireNewDestinationEvent = true;
        counterToFireNewDestination = 0;

        getAllHTMLElements();
        setupOnClickFunctions(); 
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined =  GlobalData.playerShip;
        if(ship != undefined) {
            let shipData = ship.getShipData();
            shipHudSpeed.textContent = Math.floor(new Phaser.Math.Vector2(shipData.velVec[0], shipData.velVec[1]).length()) + " m/s";
            ship_hud_shield_display.textContent = shipData.properties.currentShield + " (+" + 
            shipData.stats[ObjectInterfaces.ShipStatTypeEnum.shield_generation] + "/s)";
            ship_hud_armor_display.textContent = shipData.properties.currentArmor + " (+" + 
            shipData.stats[ObjectInterfaces.ShipStatTypeEnum.armor_repair] + "/s)";
            ship_hud_hull_display.textContent = String(shipData.properties.currentHull);
            ship_hud_coordinate_display.textContent = "(" + Math.floor(ship.getPos().x) + ", " + Math.floor(ship.getPos().y) + ")";
        }

        //TODO new phaser version hopefully makes it possible for
        //Html to block input
        handleHTMLBlockPhaserInputWorkaround();
    }

    function onBackgroundClicked(event : Events.BACKGROUND_CLICKED_EVENT_CONFIG) {
        backgroundClickedThisFrame = true;
        backgroundClickedX = event.data.mouseX;
        backgroundClickedY = event.data.mouseY;
    }

    function handleHTMLBlockPhaserInputWorkaround() {
        if(htmlElementClickedThisFrame) {
            counterToFireNewDestination = 0;
            allowedToFireNewDestinationEvent = false;
        }

        if(counterToFireNewDestination > 3) {
            allowedToFireNewDestinationEvent = true;
        }

        if(backgroundClickedThisFrame && allowedToFireNewDestinationEvent) {
            newDestination();
        }

        if(!allowedToFireNewDestinationEvent) {
            counterToFireNewDestination++;
        } 

        htmlElementClickedThisFrame = false;
        backgroundClickedThisFrame = false;
    }

    function newDestination() {
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(backgroundClickedX * GlobalData.cameraZoom, backgroundClickedY * GlobalData.cameraZoom));
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
        shipHud.onpointerdown = doNothing;
        shipHudSpeed.onpointerdown = doNothing;
        ship_hud_shield_display.onpointerdown = doNothing;
        ship_hud_armor_display.onpointerdown = doNothing;
        ship_hud_hull_display.onpointerdown = doNothing;
        ship_hud_coordinate_display.onpointerdown = doNothing;
        ship_window_button.onpointerdown = openShipButtonClicked;
        ship_window.onpointerdown = doNothing;
        chat_window.onpointerdown = doNothing;
        navigation_window.onpointerdown = doNothing;
    }

    function doNothing() {
        htmlElementClickedThisFrame = true;
    }

    function openShipButtonClicked() {
        htmlElementClickedThisFrame = true;
        closeAllOtherWindows();

        let visibility = window.getComputedStyle(ship_window, null).getPropertyValue("visibility");
        if(visibility == 'hidden') {
            ship_window.style.visibility = 'visible'; 
        } else {
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
        swsc_proximity_radar_range.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.proximity_radar_range]);
        swsc_gravity_radar_range.textContent = String(ship.getShipData().stats[ObjectInterfaces.ShipStatTypeEnum.gravity_radar_range]);
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
        EventHandler.on(Events.EEventType.BACKGROUND_CLICKED_EVENT, onBackgroundClicked);
    }

    function getAllHTMLElements() {
        //@ts-ignore
        shipHud = document.getElementById("ship_hud_display");
        //@ts-ignore
        shipHudSpeed = document.getElementById("ship_hud_speed_display");
        //@ts-ignore
        ship_hud_shield_display = document.getElementById("ship_hud_shield_display");
        //@ts-ignore
        ship_hud_armor_display = document.getElementById("ship_hud_armor_display");
        //@ts-ignore
        ship_hud_hull_display = document.getElementById("ship_hud_hull_display");
        //@ts-ignore
        ship_hud_coordinate_display = document.getElementById("ship_hud_coordinate_display");
        //@ts-ignore
        ship_window_button = document.getElementById("ship_window_button");
        //@ts-ignore
        ship_window = document.getElementById("ship_window");
        //@ts-ignore
        chat_window = document.getElementById("chat_window");
        //@ts-ignore
        navigation_window = document.getElementById("navigation_window");

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
        swsc_proximity_radar_range = document.getElementById("swsc_proximity_radar_range");
        //@ts-ignore
        swsc_gravity_radar_range = document.getElementById("swsc_gravity_radar_range");
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
    }
}
