import { Action } from "./fw/Action";
import { TargetAction } from "./actions/TargetAction";
import { AttackAction } from "./actions/AttackAction";
import { RemoveTargetAction } from "./actions/RemoveTargetAction";
import { StopAttackAction } from "./actions/StopAttack";
import { SelectionHandler } from "../SelectionHandler";
import { TargetHandler } from "../TargetHandler";
import { MineAction } from "./actions/MineAction";
import { StopMineAction } from "./actions/StopMineAction";
import { StopAction } from "./actions/StopAction";
import { WarpAction } from "./actions/WarpAction";
import { InputHandler } from "../InputHandler";
import { ZoomInAction } from "./actions/ZoomInAction";
import { ZoomOutAction } from "./actions/ZoomOutAction";
import { MinZoomAction } from "./actions/MinZoom";
import { MaxZoomAction } from "./actions/MaxZoom";
import { CenterOnAction } from "./actions/CenterOnAction";
import { CenterOnShipAction } from "./actions/CenterOnShipAction";
import { OpenAction } from "./actions/OpenAction";
import { CloseAction } from "./actions/CloseAction";

export module ActionManager {

    let actions: Array<Action>;
    let shortcutMap: Map<InputHandler.EKey, Array<Action>>;

    export function init() {
        actions = new Array(
            new TargetAction(), 
            new RemoveTargetAction(), 
            new AttackAction(), 
            new StopAttackAction(), 
            new MineAction(), 
            new StopMineAction(),
            new StopAction(),
            new WarpAction(),
            new ZoomInAction(),
            new ZoomOutAction(),
            new MinZoomAction(),
            new MaxZoomAction(),
            new CenterOnAction(),
            new CenterOnShipAction(),
            new OpenAction(),
            new CloseAction());

        shortcutMap = new Map();
        actions.forEach(action => {
            let array = shortcutMap.get(action.getShortCut());
            if(array == undefined) {
                array = new Array();
                shortcutMap.set(action.getShortCut(), array);
            }
            array.push(action);
            shortcutMap.set(action.getShortCut(), array);
        });

        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
        let selection = SelectionHandler.getSelection();
        let target = TargetHandler.getTarget();
        shortcutMap.forEach((actions: Array<Action>, key: InputHandler.EKey) => {
            let performedAction = false;
            actions.forEach(action => {
                if(!performedAction && InputHandler.getKeyState(key) == InputHandler.EKeyState.PRESSED 
                    && action.isEnabled(selection, target)) {
                    action.run(selection, target);
                    performedAction = true;
                }
            });
        });
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