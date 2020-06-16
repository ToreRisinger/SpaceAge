import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { TargetHandler } from "../../TargetHandler";

export class RemoveTargetAction extends Action {
    
    constructor() {
        super("Remove Target");
    }
   
    public run(context: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        TargetHandler.changeTarget(undefined);
    }

    public isEnabled(context: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return TargetHandler.getTarget() != undefined;
    }
}