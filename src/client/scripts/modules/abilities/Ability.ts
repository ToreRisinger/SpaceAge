import { Ship } from "../../game_objects/Ship";

export abstract class Ability {

    private ship : Ship;


    public constructor(ship : Ship) {
        this.ship = ship;
    }

    abstract activate() : void;
    abstract canActivate() : boolean;
    abstract update(time : number, delta : number) : void;
    abstract getName() : string;
    abstract getDescription() : string;
    abstract getIconPath(): string;
    abstract getCooldown() : number;
    abstract getCooldownRemaining() : number;

    protected getShip() {
        return this.ship;
    }
    
}