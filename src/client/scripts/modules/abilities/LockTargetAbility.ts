import { Ability } from "./Ability";
import { GlobalData } from "../GlobalData";
import { Ship } from "../../game_objects/Ship";

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
        if(this.canActivate()) {
            if(GlobalData.targetObject) {
                GlobalData.targetObject = undefined;
                this.setLockVariables();
            } else {
                GlobalData.targetObject = GlobalData.selectedObject;
                this.setUnlockVariables();
            }
        }
    }

    public canActivate() : boolean {
        return GlobalData.targetObject != undefined || GlobalData.selectedObject != undefined;
    }

    public update(time : number, delta : number) : void {

    }

    public getName() : string {
        return "Lock Target";
    }

    public getDescription() : string {
        return "Lock Target on an object";
    }

    public getIconPath(): string {
        return "icons/ship_icon.png";
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
}