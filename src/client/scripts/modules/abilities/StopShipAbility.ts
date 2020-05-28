import { Ability } from "./Ability";
import { Ship } from "../../game_objects/Ship";
import { EAbilityState } from "./EAbilityState";
import { Events } from "../../../../shared/scripts/Events";
import { EventHandler } from "../EventHandler";
import { GlobalDataService } from "../GlobalDataService";

export class StopShipAbility extends Ability {

    public constructor(ship : Ship) {
        super(ship);
    }

    public activate() : void {
        if(this.getState() == EAbilityState.ENABLED) {
            let event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG = {
                eventId : Events.EEventType.PLAYER_STOP_SHIP_EVENT,
                data : {
                    
                }
            }
            EventHandler.pushEvent(event);
        }
    }

    public update(time : number, delta : number) : void {
        this.calculateState();
    }

    private calculateState() { 
        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        if(playerShip != undefined && playerShip.getShipData().hasDestination) {
            this.setState(EAbilityState.ENABLED);
        } else {
            this.setState(EAbilityState.DISABLED);
        }
    }

    public getName() : string {
        return "Stop Ship";
    }

    public getDescription() : string {
        return "Stops the ship";
    }

    public getIconPath(): string {
        return "assets/sprite/icons/stop_ship_ability_icon.png";
    }

    public hasCooldown() : boolean {
        return false;
    }

    public getCooldown(): number {
        return 0;
    }

    public getCooldownRemaining() : number {
        return 0;
    }
}