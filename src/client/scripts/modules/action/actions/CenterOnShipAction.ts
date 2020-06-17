import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import { Camera } from "../../Camera";
import { GlobalDataService } from "../../GlobalDataService";

export class CenterOnShipAction extends Action {
   
    constructor() {
        super("Center On Ship");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        Camera.centerOn(GlobalDataService.getInstance().getPlayerShip());
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return true;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.SPACE;
    }
}