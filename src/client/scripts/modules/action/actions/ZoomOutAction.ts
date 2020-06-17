import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";

export class ZoomOutAction extends Action {
   
    constructor() {
        super("Zoom Out");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return true;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.X;
    }
}