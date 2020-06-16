import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { GlobalDataService } from "../../GlobalDataService";
import { Asteroid } from "../../../game_objects/Asteroid";
import { isSymbol } from "util";
import { InputHandler } from "../../InputHandler";

export class StopAction extends Action {
   
    constructor() {
        super("Stop");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let event : Events.PLAYER_STOP_SHIP_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_STOP_SHIP_EVENT,
            data : {
                
            }
        }
        EventHandler.pushEvent(event);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        let hasDestination = GlobalDataService.getInstance().getPlayerShip().getData().state.hasDestination;
        return hasDestination;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.S;
    }
}