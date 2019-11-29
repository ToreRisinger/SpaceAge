import { LockTargetAbility } from "./LockTargetAbility";
import { GlobalData } from "../GlobalData";
import { Ability } from "./Ability";
import { StopShipAbility } from "./StopShipAbility"
import { AttackAbility } from "./AttackAbility";
import { EventHandler } from "../EventHandler";
import { Events } from "../../../../shared/scripts/Events";
import { MiningAbility } from "./MiningAbility";
import { WarpDriveAbility } from "./WarpDriveAbility";

export module AbilityHandler {

    let abilities = new Array<Ability>();
    let initialized = false;

    export function init() {
        subscribeToEvents();
        initialized = true;
    }

    export function update(time : number, delta : number) {
        abilities.forEach(ability => ability.update(time, delta));
    }

    export function getAbilities() : Array<Ability> {
        return abilities;
    }

    export function isInitialized() : boolean {
        return initialized;
    }

    function onSpaceSceneStart() {
        if(GlobalData.playerShip != undefined) {
            let hasMiningLaserOrWeapon = false;
            if(GlobalData.playerShip.getShipData().hasWeapon) {
                //@ts-ignore
                abilities.push(new AttackAbility(GlobalData.playerShip));
                hasMiningLaserOrWeapon = true;
            }

            if(GlobalData.playerShip.getShipData().hasMiningLaser) {
                //@ts-ignore
                abilities.push(new MiningAbility(GlobalData.playerShip));
                hasMiningLaserOrWeapon = true;
            }

            if(hasMiningLaserOrWeapon) {
                //@ts-ignore
                abilities.push(new LockTargetAbility(GlobalData.playerShip));
            }
           
            abilities.push(new WarpDriveAbility(GlobalData.playerShip));
        }
        
        //@ts-ignore
        abilities.push(new StopShipAbility(GlobalData.playerShip));

        initialized = true;
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }
}