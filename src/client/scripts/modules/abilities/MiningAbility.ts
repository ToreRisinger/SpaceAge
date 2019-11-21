import { Ability } from "./Ability";
import { GlobalData } from "../GlobalData";
import { EAbilityState } from "./EAbilityState";
import { Ship } from "../../game_objects/Ship";
import { Events } from "../../../../shared/scripts/Events";
import { EventHandler } from "../EventHandler";
import { Asteroid } from "../../game_objects/Asteroid";

export class MiningAbility extends Ability {

    public constructor(ship : Ship) {
        super(ship);
    }

    public activate() : void {
        this.calculateState();
        switch(this.getState()) {
            case EAbilityState.ACTIVATED : 
                this.stopMining();
                break;
            case EAbilityState.DISABLED :
                break;
            case EAbilityState.ENABLED :
                this.startMining();
        }
        
    }

    public update(time : number, delta : number) : void {
        this.calculateState();
    }

    public getName() : string {
        return "Mine";
    }

    public getDescription() : string {
        return "Activate all mining laser modules to mine the target asteroid.";
    }

    public getIconPath(): string {
        return "assets/sprite/icons/mining_laser_ability_icon.png";
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
                    this.stopMining();
                }
                break;
            case EAbilityState.DISABLED :
                if(GlobalData.targetObject != undefined && GlobalData.targetObject instanceof Asteroid) {
                    this.setState(EAbilityState.ENABLED);
                }
                break;
            case EAbilityState.ENABLED :
                if(GlobalData.targetObject == undefined) {
                    this.setState(EAbilityState.DISABLED);
                }
        }
    }

    private startMining() {
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
    }

    private stopMining() {
        this.setState(EAbilityState.ENABLED);
        let newEvent : Events.PLAYER_STOP_MINING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_MINING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }
}