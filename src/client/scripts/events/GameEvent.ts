import { EEventType } from "./EEventType";

export class GameEvent {

    private eventData : any;
    private eventType : EEventType;

    constructor(eventData : any, eventType: EEventType) {
        this.eventData = eventData;
        this.eventType = eventType;
    }

    getEventData() {
        return this.eventData;
    }

    getEventType() {
        return this.eventType;
    }

}