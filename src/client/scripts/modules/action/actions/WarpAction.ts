import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";
import { CSector } from "../../../game_objects/Sector";
import { InputHandler } from "../../InputHandler";

export class WarpAction extends Action {
   
    constructor() {
        super("Warp");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT,
            data : {
                //@ts-ignore
                targetId : selection.getId()
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        let sectorId = GlobalDataService.getInstance().getSector().getId();
        return selection != undefined && selection instanceof CSector && !GlobalDataService.getInstance().getPlayerShip().isWarping()
        && sectorId != selection.getId();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.W;
    }
}