import { GameObject } from "../game_objects/GameObject";
import { GameObjectHandler } from "./GameObjectHandler";
import { GameScene } from "../scenes/GameScene";



export module GUI {

    let coordinateDisplay : HTMLElement | null;

    export function init() {
        coordinateDisplay = document.getElementById("coord_display");
        //@ts-ignore
        coordinateDisplay.onclick = function() {
            
        }
    }

    export function update(time : number, delta : number) {
        let ship : GameObject | undefined =  GameObjectHandler.getShip();
            if(ship != undefined){
                //@ts-ignore
                coordinateDisplay.textContent = "(" + Math.floor(ship.getPos().x) + ", " + Math.floor(ship.getPos().y) + ")";
            }
    }
}
