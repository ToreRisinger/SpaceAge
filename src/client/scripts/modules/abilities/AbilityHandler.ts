import { LockTargetAbility } from "./LockTargetAbility";
import { Ability } from "./Ability";
import { StopShipAbility } from "./StopShipAbility"
import { AttackAbility } from "./AttackAbility";
import { EventHandler } from "../EventHandler";
import { Events } from "../../../../shared/scripts/Events";
import { MiningAbility } from "./MiningAbility";
import { WarpDriveAbility } from "./WarpDriveAbility";
import { GlobalDataService } from "../GlobalDataService";
import { Ship } from "../../game_objects/Ship";

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
        let playerShip : Ship = GlobalDataService.getInstance().getPlayerShip();
        let hasMiningLaserOrWeapon = false;
        if(playerShip.getShipData().hasWeapon) {
            //@ts-ignore
            abilities.push(new AttackAbility(playerShip));
            hasMiningLaserOrWeapon = true;
        }

        if(playerShip.getShipData().hasMiningLaser) {
            //@ts-ignore
            abilities.push(new MiningAbility(playerShip));
            hasMiningLaserOrWeapon = true;
        }

        if(hasMiningLaserOrWeapon) {
            //@ts-ignore
            abilities.push(new LockTargetAbility(playerShip));
        }
        
        abilities.push(new WarpDriveAbility(playerShip));
        
        //@ts-ignore
        abilities.push(new StopShipAbility(playerShip));

        initialized = true;
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }
}