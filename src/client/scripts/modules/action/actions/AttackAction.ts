import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";
import { CCharacter } from "../../../game_objects/CCharacter";
import { GlobalDataService } from "../../GlobalDataService";
import { InputHandler } from "../../InputHandler";
import { CShip } from "../../../game_objects/CShip";

export class AttackAction extends Action {
   
    constructor() {
        super("Attack");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_START_ATTACKING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_START_ATTACKING_EVENT,
            data : {
                //@ts-ignore
                targetId : selection.getId()
            }
        }
        EventHandler.pushEvent(newEvent); 
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return this.canAttack(selection, target);
    }

    public canAttack(selection: RadarDetectable | undefined, targetObject: RadarDetectable | undefined): boolean {
        let isAttacking = GlobalDataService.getInstance().getPlayerShip().isAttacking();
        return targetObject != undefined && targetObject instanceof CShip && !isAttacking && GlobalDataService.getInstance().getPlayerShip().hasWeapon();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.A;
    }
}