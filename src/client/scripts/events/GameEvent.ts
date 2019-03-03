import { EEventType } from "../../../shared/EEventType";

export class GameEvent {

    private eventData : any;
    private eventType : EEventType;

    constructor(eventType: EEventType, eventData : any) {
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