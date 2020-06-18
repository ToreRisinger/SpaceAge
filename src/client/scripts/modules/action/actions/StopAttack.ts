import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";
import { InputHandler } from "../../InputHandler";

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
        return GlobalDataService.getInstance().getPlayerShip().isAttacking();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.A;
    }
}