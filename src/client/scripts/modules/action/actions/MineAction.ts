import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/scripts/Events";
import { EventHandler } from "../../EventHandler";
import { Ship } from "../../../game_objects/Ship";
import { GlobalDataService } from "../../GlobalDataService";
import { Asteroid } from "../../../game_objects/Asteroid";
import { InputHandler } from "../../InputHandler";

export class MineAction extends Action {
   
    constructor() {
        super("Mine");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let newEvent : Events.PLAYER_START_MINING_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_START_MINING_EVENT,
            data : {
                //@ts-ignore
                targetId : target.getGameObjectData().id
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        let isMining = GlobalDataService.getInstance().getPlayerShip().getData().state.isMining;
        return target != undefined && target instanceof Asteroid && !isMining;
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.M;
    }
}