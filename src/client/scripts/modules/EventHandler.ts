import { Events } from "../../../shared/Events"

export module EventHandler {
    let eventQueue: Array<Events.GameEvent> = [];
    let subscriberMap : { [key:number]:Array<(event : Events.GameEvent) => void >} = {};

    export function init() {
        Object.values(Events.EEventType).forEach(enumValue => subscriberMap[enumValue] = []);
    }

    export function update(time : number, delta : number) {
        for(let i = 0; i < eventQueue.length; ++i) {
            let event = eventQueue.pop();
            if(event == null || subscriberMap[event.eventId] == null) {
                continue;
            }

            //Call callback functions
            for(let i = 0; i < subscriberMap[event.eventId].length; i++) {
                subscriberMap[event.eventId][i](event);
            }
           
        }
    }

    export function pushEvent(event : Events.GameEvent) {
        eventQueue.push(event);
    }

    export function on(eventType : Events.EEventType, callback : (event : Events.GameEvent) => void) {
        subscriberMap[eventType].push(callback);
    }
}