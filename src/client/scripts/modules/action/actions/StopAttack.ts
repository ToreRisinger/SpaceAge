import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { TargetHandler } from "../../TargetHandler";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";

export class StopAttackAction extends Action {
   
    constructor() {
        super("Stop Attack");
    }

    public run(context: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_ATTACKING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }
    
    public isEnabled(context: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return this.canStopAttack();
    }

    public canStopAttack(): boolean {
        return GlobalDataService.getInstance().getPlayerShip().getData().state.isAttacking;
    }
}