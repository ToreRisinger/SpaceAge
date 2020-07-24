import { EventHandler } from "../modules/EventHandler";
import { Events } from "../../../shared/util/Events";

export module CUtils {
    
    export function newDestination(x : number, y : number) {
        /*
        let globalData = GlobalDataService.getInstance();
        let newDestination : Phaser.Math.Vector2 = Utils.screenVecToMapVec(new Phaser.Math.Vector2(x * globalData.getCameraZoom(), y * globalData.getCameraZoom()),
        Camera.getMapPos().x, Camera.getMapPos().y, globalData.getCameraWidth(), globalData.getCameraHeight());
        */
        let event : Events.PLAYER_SET_NEW_DESTINATION_EVENT_CONFIG = {
            eventId : Events.EEventType.PLAYER_SET_NEW_DESTINATION_EVENT,
            data : { 
                destinationX: x, 
                destinationY: y
            }
        }
        EventHandler.pushEvent(event);
    }
}