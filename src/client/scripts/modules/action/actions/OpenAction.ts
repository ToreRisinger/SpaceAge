import { Action } from "../fw/Action";
import { RadarDetectable } from "../../../game_objects/RadarDetectable";
import { InputHandler } from "../../InputHandler";
import { CShipwreck } from "../../../game_objects/CShipwreck";
import LootWindow from "../../../react/mainComponents/cargo/LootWindow";
import { GlobalDataService } from "../../GlobalDataService";
import { Events } from "../../../../../shared/util/Events";
import { EventHandler } from "../../EventHandler";

export class OpenAction extends Action {
   
    constructor() {
        super("Open");
    }

    public run(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): void {
        let cargoWindow = LootWindow.getInstance();
        if(!cargoWindow.isOpen()) {
            let event: Events.OPEN_CARGO_REQUEST_CONFIG = {
                eventId: Events.EEventType.OPEN_CARGO_REQUEST,
                data: {
                    //@ts-ignore
                    id: selection.getId()
                }
            }
            EventHandler.pushEvent(event);
        } else {
            cargoWindow.closeWindow();
            let event: Events.CLOSE_CARGO_CONFIG = {
                eventId: Events.EEventType.CLOSE_CARGO,
                data: {
                    //@ts-ignore
                    id: selection.getId()
                }
            }
            EventHandler.pushEvent(event);
        } 
    }

    public isEnabled(selection: RadarDetectable | undefined, target: RadarDetectable | undefined): boolean {
        if(selection != undefined && selection instanceof CShipwreck) {
            let thisShipPos = GlobalDataService.getInstance().getPlayerShip().getPos();
            return thisShipPos.subtract(selection.getPos()).length() <= 1000;
        } else {
            return false;
        }
    }

    public getShortCut(): InputHandler.EKey {
        return InputHandler.EKey.O;
    }
}