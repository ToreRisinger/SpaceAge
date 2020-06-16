import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { Ship } from "../../../game_objects/Ship";
import { GlobalDataService } from "../../GlobalDataService";
import { Sector } from "../../../game_objects/Sector";

export class WarpAction extends Action {
   
    constructor() {
        super("Warp");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_START_WARP_REQUEST_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_START_WARP_REQUEST_EVENT,
            data : {
                //@ts-ignore
                targetId : selection.getGameObjectData().id
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return selection != undefined && selection instanceof Sector && !GlobalDataService.getInstance().getCharacter().state.isWarping;
    }

    
}