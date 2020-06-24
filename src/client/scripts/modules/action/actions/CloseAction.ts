import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import LootWindow from "../../../react/mainComponents/cargo/LootWindow";

export class CloseAction extends Action {
   
    constructor() {
        super("Close");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        LootWindow.getInstance().closeWindow();
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return LootWindow.getInstance().isOpen();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.O;
    }
}