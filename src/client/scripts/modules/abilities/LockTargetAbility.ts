import { Ability } from "./Ability";
import { GlobalData } from "../GlobalData";
import { Ship } from "../../game_objects/Ship";
import { EAbilityState } from "./EAbilityState";
import { Events } from "../../../../shared/scripts/Events";
import { EventHandler } from "../EventHandler";
import { GameObject } from "../../game_objects/GameObject";
import { RadarDetectable } from "../../game_objects/RadarDetectable";

export class LockTargetAbility extends Ability {

    private LOCK_TARGET_NAME = "Lock Target";
    private UNLOCK_TARGET_NAME = "Unlock Target";
    private LOCK_DESCRIPTION = "Lock Target on an object";
    private UNLOCK_DESCRIPTION = "Unlock Target on an object";
    private LOCK_ICON_PATH = "icons/lock_target.png";
    private UNLOCK_ICON_PATH = "icons/unlock_target.png";

    //@ts-ignore
    private name : string;
    //@ts-ignore
    private description : string;
    //@ts-ignore
    private iconPath : string;

    public constructor(ship : Ship) {
        super(ship);
        this.setLockVariables();
    }

    public activate() : void {
        this.calculateState()
        if(this.getState() == EAbilityState.ENABLED) {
            this.sendEvent(GlobalData.selectedObject);
        } else if(this.getState() == EAbilityState.ACTIVATED) {
            this.sendEvent(undefined);
        }
    }

    public update(time : number, delta : number) : void {
        this.calculateState();
    }

    private calculateState() {
        if(GlobalData.targetObject != undefined) {
            this.setState(EAbilityState.ACTIVATED);
            this.setUnlockVariables();
        } else if(GlobalData.selectedObject != undefined) {
            this.setState(EAbilityState.ENABLED);
            this.setLockVariables();
        } else {
            this.setState(EAbilityState.DISABLED);
            this.setLockVariables();
        }
    }

    public getName() : string {
        return "Lock Target";
    }

    public getDescription() : string {
        return "Lock Target on an object";
    }

    public getIconPath(): string {
        return "assets/sprite/icons/lock_target_ability_icon.png";
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

    private setLockVariables() {
        this.name = this.LOCK_TARGET_NAME;
        this.description = this.LOCK_DESCRIPTION;
        this.iconPath = this. LOCK_ICON_PATH
    }

    private setUnlockVariables() {
        this.name = this.UNLOCK_TARGET_NAME;
        this.description = this.UNLOCK_DESCRIPTION;
        this.iconPath = this.UNLOCK_ICON_PATH
    }

    private sendEvent(object : RadarDetectable | undefined) {
        let newEvent : Events.TARGET_CHANGE_REQUEST_EVENT_CONFIG = {
            eventId : Events.EEventType.TARGET_CHANGE_REQUEST_EVENT,
            data : {
                object : object
            }
        }
        EventHandler.pushEvent(newEvent);
    }
}