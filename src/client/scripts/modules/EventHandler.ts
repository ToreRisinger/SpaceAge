import { Events } from "../../../shared/util/Events"

export module EventHandler {
    let eventQueue: Array<Events.GameEvent> = [];
    let subscriberMap : { [key:number]:Array<(event : Events.GameEvent) => void >} = {};
    let initialized : boolean = false;


    export function init() {
        //@ts-ignore
        Object.values(Events.EEventType).forEach(enumValue => subscriberMap[enumValue] = []);
        initialized = true;
    }

    export function update(time : number, delta : number) {
        for(let i = 0; i < eventQueue.length; ++i) {
            let event = eventQueue[i];
            if(event == null || subscriberMap[event.eventId] == null) {
                continue;
            }

            //Call callback functions
            for(let i = 0; i < subscriberMap[event.eventId].length; i++) {              
                subscriberMap[event.eventId][i](event);
            }
        }

        eventQueue = [];
    }

    export function pushEvent(event : Events.GameEvent) {
        eventQueue.push(event);
    }

    export function isInitialized() : boolean {
        return initialized;
    }

    export function on(eventType : Events.EEventType, callback : (event : Events.GameEvent) => void) {
        subscriberMap[eventType].push(callback);
    }
}