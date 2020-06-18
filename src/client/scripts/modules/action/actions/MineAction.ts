import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";
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
                targetId : target.getId()
            }
        }
        EventHandler.pushEvent(newEvent);
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        let isMining = GlobalDataService.getInstance().getPlayerShip().isMining();
        return target != undefined && target instanceof Asteroid && !isMining && GlobalDataService.getInstance().getPlayerShip().hasMiningLaser();
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.M;
    }
}