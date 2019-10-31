import { LockTargetAbility } from "./LockTargetAbility";
import { GlobalData } from "../GlobalData";
import { Ability } from "./Ability";

export module AbilityHandler {

    let abilities = new Array<Ability>();
    let initialized = false;

    export function init() {
        subscribeToEvents();
        //@ts-ignore
        abilities.push(new LockTargetAbility(GlobalData.playerShip));
        //@ts-ignore
        abilities.push(new LockTargetAbility(GlobalData.playerShip));
        //@ts-ignore
        abilities.push(new LockTargetAbility(GlobalData.playerShip));
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

    function subscribeToEvents() {
        //EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }
}