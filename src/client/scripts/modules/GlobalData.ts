import { Ship } from "../game_objects/Ship";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces"
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { Sector } from "../game_objects/Sector";

export module GlobalData {

    /* Player */
    export let playerUsername : String = "Player1";
    export let selectedObject : RadarDetectable | undefined = undefined;
    export let targetObject : RadarDetectable | undefined = undefined;

    export let playerShip : Ship | undefined = undefined;
    export let sector : Sector | undefined = undefined;
    
    /* Camera */
    export let cameraZoom : number = 1;
    export let cameraX : number = 0;
    export let cameraY : number = 0;
    export let cameraWidth : number = 0;
    export let cameraHeight : number = 0;

    /* Server */
    export let ping : number = 1;

    export function getPlayerShipData() : ObjectInterfaces.IShip | undefined {
        if(playerShip != undefined) {
            return playerShip.getShipData()
        } else {
            return undefined;
        }
    }
}