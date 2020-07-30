import { IItem } from "../../../shared/data/item/IItem";
import { Events } from "../../../shared/util/Events";
import { EventHandler } from "./EventHandler";
import { GlobalDataService } from "./GlobalDataService";

export module RefineryHandler {

    let item: IItem | undefined;
    let currentProgress: number;
    let totalProgress: number;

    export function init() {
        item = GlobalDataService.getInstance().getPlayerShip().getProcessingOreItem();
        EventHandler.on(Events.EEventType.SERVER_START_ORE_PROCESSING_ACK, onStartProcessing);
    }

    function onStartProcessing(event: Events.SERVER_START_ORE_PROCESSING_ACK) {
        item = event.data.item;
    }

    export function getItem(): IItem | undefined {
        return item;
    }

    export function getCurrentProgress(): number {
        return currentProgress;
    }

    export function getTotalProgress(): number {
        return totalProgress;
    }

    export function startRefine(item: IItem, itemIndex: number) {
        let event: Events.CLIENT_START_ORE_PROCESSING_REQ = {
            eventId: Events.EEventType.CLIENT_START_ORE_PROCESSING_REQ,
            data: {
                itemIndex: itemIndex
            }
        }
        EventHandler.pushEvent(event);
    }

    export function stopRefine() {
        let event: Events.CLIENT_STOP_ORE_PROCESSING_REQ = {
            eventId: Events.EEventType.CLIENT_STOP_ORE_PROCESSING_REQ,
            data: {}
        }
        EventHandler.pushEvent(event);
        item = undefined;
    }

}