import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import { Camera } from "../../Camera";
import { GlobalDataService } from "../../GlobalDataService";

export class CenterOnAction extends Action {
   
    constructor() {
        super("Center On");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        if(selection == undefined) {
            Camera.centerOn(GlobalDataService.getInstance().getPlayerShip());
        } else {
            Camera.centerOn(selection);
        }
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        let centeredObject = Camera.getCenteredObject();
        return selection == undefined || (selection != undefined && (centeredObject == undefined || centeredObject.getId() != selection.getId()));
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.C;
    }
}