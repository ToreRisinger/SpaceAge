import { GameScene } from "../scenes/GameScene";
import { Events } from "../../../shared/scripts/Events";
import { Utils } from "../../../shared/scripts/Utils";
import { EventHandler } from "./EventHandler";
import { Ship } from "../game_objects/Ship";
import { GlobalData } from "./GlobalData";

export module GUI {
    export function init() {
        let gameScene : GameScene = GameScene.getInstance();
        gameScene.input.mouse.capture = true;

        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let ship : Ship | undefined =  GlobalData.playerShip;
        if(ship != undefined) {
           //Set ship hud data
        }
    }

    function onBackgroundClicked(event : Events.BACKGROUND_CLICKED_TWICE_EVENT_CONFIG) {
        newDestination(event.data.mouseX, event.data.mouseY);
    }

    function newDestination(x : number, y : number) {
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(x * GlobalData.cameraZoom, y * GlobalData.cameraZoom),
        GlobalData.cameraX, GlobalData.cameraY, GlobalData.cameraWidth, GlobalData.cameraHeight);
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
    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.BACKGROUND_CLICKED_TWICE_EVENT, onBackgroundClicked);
    }
}
