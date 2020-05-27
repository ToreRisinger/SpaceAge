import { EventHandler } from "./EventHandler"
import { Events } from "../../../shared/scripts/Events";
import { EGameState } from "../../../shared/scripts/EGameState";

export module GameStateController {

    let gameState : EGameState;

    export function init() {
        gameState = EGameState.LOGIN
        subscribeToEvents();
    }

    export function update(time : number, delta : number) {
       
    }

    export function getGameState() : EGameState {
        return gameState;
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