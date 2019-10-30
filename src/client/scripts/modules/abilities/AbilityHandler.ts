import { LockTargetAbility } from "./LockTargetAbility";
import { GlobalData } from "../GlobalData";

export module AbilityHandler {

    let abilities = new Array();

    export function init() {
        subscribeToEvents();
        //@ts-ignore
        abilities.push(new LockTargetAbility(GlobalData.playerShip));
    }

    export function update(time : number, delta : number) {
        abilities.forEach(ability => ability.update(time, delta));
    }

   
    function subscribeToEvents() {
        //EventHandler.on(Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT, onSpaceSceneStart);
    }
}