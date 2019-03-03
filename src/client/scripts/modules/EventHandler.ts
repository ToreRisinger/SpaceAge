import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../../../shared/EEventType"

export module EventHandler {
    let eventQueue: Array<GameEvent> = [];
    let subscriberMap : { [key:number]:Array<(eventData : any) => void >} = {};

    export function init() {
        Object.values(EEventType).forEach(enumValue => subscriberMap[enumValue] = []);
    }

    export function update(time : number, delta : number) {
        for(let i = 0; i < eventQueue.length; ++i) {
            let event = eventQueue.pop();
            if(event == null || subscriberMap[event.getEventType()] == null) {
                continue;
            }

            //Call callback functions
            for(let i = 0; i < subscriberMap[event.getEventType()].length; i++) {
                subscriberMap[event.getEventType()][i](event);
            }
           
        }
    }

    export function pushEvent(event : GameEvent) {
        eventQueue.push(event);
    }

    export function on(eventType : EEventType, callback : (event : GameEvent) => void) {
        subscriberMap[eventType].push(callback);
    }
}