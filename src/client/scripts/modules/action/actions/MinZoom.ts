import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import { Camera } from "../../Camera";

export class MinZoomAction extends Action {
   
    constructor() {
        super("Min Zoom");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        Camera.setMinZoom();
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return true;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.NONE;
    }
}