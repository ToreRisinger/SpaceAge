import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events";

export module GameStates {

    export function init() {
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
       
    }

    function onInitialGameLoadEvent() {
        let event : Events.GameEvent = {
            eventId : Events.EEventType.SPACE_SCENE_GAME_STATE_EVENT,
            data : { }
        }
        EventHandler.pushEvent(event);
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.INITAL_GAME_LOAD_EVENT, onInitialGameLoadEvent);
    }
}