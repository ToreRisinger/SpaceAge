import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";
import { InputHandler } from "../../InputHandler";

export class StopMineAction extends Action {
   
    constructor() {
        super("Stop Mine");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_STOP_MINING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_MINING_EVENT,
            data : { }
        }
        EventHandler.pushEvent(newEvent);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        return GlobalDataService.getInstance().getPlayerShip().getData().state.isMining;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.M;
    }
}