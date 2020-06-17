import { Action } from "../fw/Action";
import { Asteroid } from "../../../game_objects/Asteroid";
import { Ship } from "../../../game_objects/Ship";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { TargetHandler } from "../../TargetHandler";
import { InputHandler } from "../../InputHandler";
import { GlobalDataService } from "../../GlobalDataService";

export class TargetAction extends Action {
    
    constructor() {
        super("Target");
    }
   
    public run(context: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        TargetHandler.changeTarget(context);
    }

    public isEnabled(context: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return (GlobalDataService.getInstance().getPlayerShip().getData().state.hasWeapon || GlobalDataService.getInstance().getPlayerShip().getData().state.hasMiningLaser)
            && (context != undefined 
            && ((context instanceof Asteroid 
            || context instanceof Ship)
            && context != TargetHandler.getTarget()));
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.T;
    }
}