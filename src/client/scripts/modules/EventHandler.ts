import { GameEvent } from "../events/GameEvent"
import { EEventType } from "../events/EEventType"

export module EventHandler {
    let eventQueue: Array<GameEvent> = [];
    let subscriberMap : { [key:number]:Array<(eventData : any) => void >} = {};

    export function init() {
        
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
        subscriberMap[eventType] = [];
        subscriberMap[eventType].push(callback);
    }
}