import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../events/EEventType"

export module EventHandler {
    let eventQueue: Array<GameEvent> = [];
    let subscriberMap : { [key:number]:(eventData : any) => void } = {};

    export function init() {
        
    }

    export function update(time : number, delta : number) {
        for(let i = 0; i < eventQueue.length; ++i) {
            let event = eventQueue.pop();
            if(event == null || subscriberMap[event.getEventType()] == null) {
                continue;
            }

            //Call callback function
            subscriberMap[event.getEventType()](event.getEventData());
        }
    }

    export function pushEvent(event : GameEvent) {
        eventQueue.push(event);
    }

    export function subscribe(eventType : EEventType, callback : (eventData : any) => void) {
        subscriberMap[eventType] = callback;
    }
}