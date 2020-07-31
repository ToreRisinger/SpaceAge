import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import LootWindow from "../../../react/cargo/LootWindow";
import { CUtils } from "../../../utils/CUtils";

export class MoveToAction extends Action {
   
    constructor() {
        super("Move To");
    }
    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        //@ts-ignore
        let pos = selection.getPos();
        CUtils.newDestination(pos.x, pos.y);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return selection != undefined;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.M;
    }
}