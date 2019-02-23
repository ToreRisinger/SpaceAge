import { GameScene } from "../scenes/GameScene";
import { Ship } from "../game_objects/Ship";

export class Player {

    private ship : Ship;
    private id : number;

    constructor(id : number, ship : Ship) {
        this.id = id;
        this.ship = ship
    }

    getShip() {
        return this.ship;
    }

    getId() {
        return this.id;
    }

}