import { Action } from "../fw/Action";
import { Asteroid } from "../../../game_objects/Asteroid";
import { CCharacter } from "../../../game_objects/CCharacter";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { TargetHandler } from "../../TargetHandler";
import { InputHandler } from "../../InputHandler";
import { GlobalDataService } from "../../GlobalDataService";
import { CShip } from "../../../game_objects/CShip";

export class TargetAction extends Action {
    
    constructor() {
        super("Target");
    }
   
    public run(context: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        TargetHandler.changeTarget(context);
    }

    public isEnabled(context: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return (GlobalDataService.getInstance().getPlayerShip().hasWeapon() || GlobalDataService.getInstance().getPlayerShip().hasMiningLaser())
            && (context != undefined 
            && ((context instanceof Asteroid 
            || context instanceof CShip)
            && context != TargetHandler.getTarget()));
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.T;
    }
}