import { Ship } from "../../game_objects/Ship";
import { EAbilityState } from "./EAbilityState";

export abstract class Ability {

    private ship : Ship;
    private state : EAbilityState;

    public constructor(ship : Ship) {
        this.ship = ship;
        this.state = EAbilityState.ENABLED;
    }

    abstract activate() : void;
    abstract update(time : number, delta : number) : void;
    abstract getName() : string;
    abstract getDescription() : string;
    abstract getIconPath() : string;
    abstract hasCooldown() : boolean;
    abstract getCooldown() : number;
    abstract getCooldownRemaining() : number;

    protected setState(state : EAbilityState) {
        this.state = state;
    }

    public getState() : EAbilityState {
        return this.state;
    }

    protected getShip() {
        return this.ship;
    }
    
}