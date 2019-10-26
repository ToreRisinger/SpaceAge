import { Ship } from "../game_objects/Ship";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { GameObject } from "../game_objects/GameObject";

export module GlobalData {

    /* Player */
    export let playerUsername : String = "Player1";
    export let selectedObject : GameObject | undefined = undefined;
    export let playerShip : Ship | undefined = undefined;
    
    /* Camera */
    export let cameraZoom : number = 1;
    export let cameraX : number = 0;
    export let cameraY : number = 0;
    export let cameraWidth : number = 0;
    export let cameraHeight : number = 0;

    /* Server */
    export let ping : number = 1;

    /* Input */
    export let mouseX : number = 0;
    export let mouseY : number = 0;

    export function getPlayerShipData() : ObjectInterfaces.IShip | undefined {
        if(playerShip != undefined) {
            return playerShip.getShipData()
        } else {
            return undefined;
        }
    }
}