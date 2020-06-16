import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { Ship } from "../../../game_objects/Ship";
import { GlobalDataService } from "../../GlobalDataService";

export class AttackAction extends Action {
   
    constructor() {
        super("Attack");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_START_ATTACKING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_START_ATTACKING_EVENT,
            data : {
                //@ts-ignore
                targetId : selection.getGameObjectData().id
            }
        }
        EventHandler.pushEvent(newEvent); 
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return this.canAttack(selection, target);
    }

    public canAttack(selection: RadarDetectable | undefined, targetObject: RadarDetectable | undefined): boolean {
        let isAttacking = GlobalDataService.getInstance().getPlayerShip().getData().state.isAttacking;
        return targetObject != undefined && targetObject instanceof Ship && !isAttacking;
    }
}