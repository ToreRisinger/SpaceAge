import { Ability } from "./Ability";
import { GlobalData } from "../GlobalData";
import { EAbilityState } from "./EAbilityState";
import { Ship } from "../../game_objects/Ship";
import { Events } from "../../../../shared/scripts/Events";
import { EventHandler } from "../EventHandler";

export class AttackAbility extends Ability {

    public constructor(ship : Ship) {
        super(ship);
    }

    public activate() : void {
        this.calculateState();
        switch(this.getState()) {
            case EAbilityState.ACTIVATED : 
                this.stopAttack();
                break;
            case EAbilityState.DISABLED :
                break;
            case EAbilityState.ENABLED :
                this.startAttack();
        }
        
    }

    public update(time : number, delta : number) : void {
        this.calculateState();
    }

    public getName() : string {
        return "Attack";
    }

    public getDescription() : string {
        return "Activate all weapon modules to attack the target.";
    }

    public getIconPath(): string {
        return "assets/sprite/icons/attack_ability_icon.png";
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

    private calculateState() {
        switch(this.getState()) {
            case EAbilityState.ACTIVATED : 
                if(GlobalData.targetObject == undefined) {
                    this.setState(EAbilityState.DISABLED);
                    this.stopAttack();
                }
                break;
            case EAbilityState.DISABLED :
                if(GlobalData.targetObject != undefined) {
                    this.setState(EAbilityState.ENABLED);
                }
                break;
            case EAbilityState.ENABLED :
                if(GlobalData.targetObject == undefined) {
                    this.setState(EAbilityState.DISABLED);
                }
        }
    }

    private startAttack() {
        if(GlobalData.targetObject != undefined) {
            this.setState(EAbilityState.ACTIVATED);
            let newEvent : Events.PLAYER_START_ATTACKING_EVENT_CONFIG = {
                eventId : Events.EEventType.PLAYER_START_ATTACKING_EVENT,
                data : {
                    targetId : GlobalData.targetObject.getGameObjectData().id
                }
            }
            EventHandler.pushEvent(newEvent);
        } 
    }

    private stopAttack() {
        this.setState(EAbilityState.ENABLED);
        let newEvent : Events.PLAYER_STOP_ATTACKING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_ATTACKING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }
}