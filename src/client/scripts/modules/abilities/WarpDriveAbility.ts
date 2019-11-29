import { Ability } from "./Ability";
import { GlobalData } from "../GlobalData";
import { EAbilityState } from "./EAbilityState";
import { Ship } from "../../game_objects/Ship";
import { Events } from "../../../../shared/scripts/Events";
import { EventHandler } from "../EventHandler";
import { Sector } from "../../game_objects/Sector";

export class WarpDriveAbility extends Ability {

    private COOLDOWN : number = 10000;
    private coolDownRemaining : number = 0;

    public constructor(ship : Ship) {
        super(ship);
    }

    public activate() : void {
        this.calculateState();
        switch(this.getState()) {
            case EAbilityState.COOLDOWN : 
                break;
            case EAbilityState.DISABLED :
                break;
            case EAbilityState.ENABLED :
                this.startWarpDrive();
                this.setState(EAbilityState.COOLDOWN);
                this.coolDownRemaining = this.COOLDOWN;
            break;
        }
    }

    public update(time : number, delta : number) : void {
        if(this.getState() == EAbilityState.COOLDOWN) {
            this.coolDownRemaining -= delta;
        }

        this.calculateState();
    }

    public getName() : string {
        return "Warp";
    }

    public getDescription() : string {
        return "Activate Warp Drive to travel fast to the location.";
    }

    public getIconPath(): string {
        return "assets/sprite/icons/warp_drive_ability_icon.png";
    }

    public hasCooldown() : boolean {
        return true;
    }

    public getCooldown(): number {
        return this.COOLDOWN;
    }

    public getCooldownRemaining() : number {
        return Math.ceil(this.coolDownRemaining / 1000);
    }

    private calculateState() {
        switch(this.getState()) {
            case EAbilityState.COOLDOWN : 
                if(this.coolDownRemaining <= 0) {
                    this.setState(EAbilityState.DISABLED);
                }
                break;
            case EAbilityState.DISABLED :
                if(this.shouldBeEnabled()) {
                    this.setState(EAbilityState.ENABLED);
                }
                break;
            case EAbilityState.ENABLED :
                if(!this.shouldBeEnabled()) {
                    this.setState(EAbilityState.DISABLED);
                }
                break;
        }
    }

    private startWarpDrive() {
        /*
        if(GlobalData.targetObject != undefined) {
            this.setState(EAbilityState.ACTIVATED);
            let newEvent : Events.PLAYER_START_MINING_EVENT_CONFIG = {
                eventId : Events.EEventType.PLAYER_START_MINING_EVENT,
                data : {
                    targetId : GlobalData.targetObject.getGameObjectData().id
                }
            }
            EventHandler.pushEvent(newEvent);
        } 
        */
    }

    private shouldBeEnabled() {
        return GlobalData.selectedObject != undefined && GlobalData.sector != undefined && GlobalData.selectedObject instanceof Sector 
            && GlobalData.selectedObject.getGameObjectData().id != GlobalData.sector.getGameObjectData().id;
    }
}