import { GameScene } from "../scenes/GameScene";
import { Ship } from "../ship/Ship";

export class Player {

    private ship : Ship;
    private id : number;

    constructor(id : number) {
        this.id = id;
        this.ship = new Ship();
    }

    getShip() {
        return this.ship;
    }

    getId() {
        return this.id;
    }

}