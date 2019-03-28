import { Ship } from "../game_objects/Ship";

export module GlobalData {

    /* Player */
    export let playerUsername : String = "Player1";
    export let playerShip : Ship | undefined = undefined;

    /* Camera */
    export let cameraZoom : number = 1;
    export let cameraX : number = 0;
    export let cameraY : number = 0;
    export let cameraWidth : number = 0;
    export let cameraHeight : number = 0;

    /* Server */
    export let ping : number = 1;


}