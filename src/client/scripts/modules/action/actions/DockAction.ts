import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import { SpaceStation } from "../../../game_objects/SpaceStation";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";

export class DockAction extends Action {
   
    constructor() {
        super("Dock");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let event: Events.CLIENT_DOCK_REQ = {
            eventId: Events.EEventType.CLIENT_DOCK_REQ,
            data: {
                //@ts-ignore
                spaceStationId: selection.getId()
            }
        }
        EventHandler.pushEvent(event);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return selection != undefined && selection instanceof SpaceStation && !GlobalDataService.getInstance().getPlayerShip().isWarping();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.D;
    }
}