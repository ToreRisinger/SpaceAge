import { Action } from "./fw/Action";
import { TargetAction } from "./actions/TargetAction";
import { AttackAction } from "./actions/AttackAction";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import { RemoveTargetAction } from "./actions/RemoveTargetAction";
import { StopAttackAction } from "./actions/StopAttack";
import { SelectionHandler } from "../SelectionHandler";
import { TargetHandler } from "../TargetHandler";
import { MineAction } from "./actions/MineAction";
import { StopMineAction } from "./actions/StopMineAction";
import { StopAction } from "./actions/StopAction";
import { WarpAction } from "./actions/WarpAction";

export module ActionManager {

    let actions: Array<Action>;

    export function init() {
        actions = new Array(
            new TargetAction(), 
            new RemoveTargetAction(), 
            new AttackAction(), 
            new StopAttackAction(), 
            new MineAction(), 
            new StopMineAction(),
            new StopAction(),
            new WarpAction());

        subscribeToEvents();
    }

    export function getActions() {
        let selection = SelectionHandler.getSelection();
        let target = TargetHandler.getTarget();
        return actions.filter(action => action.isEnabled(selection, target));
    }

    export function runAction(action: Action): void {
        let selection = SelectionHandler.getSelection();
        let target = TargetHandler.getTarget();
        if(action.isEnabled(selection, target)) {
            action.run(selection, target);
        }
    }

    function subscribeToEvents() {

    }
}