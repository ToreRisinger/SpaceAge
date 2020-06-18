import { Sector } from "./Sector";
import { ISpaceStation } from "../../shared/data/ISpaceStation";
import { IdHandler } from "../IdHandler";
import { Utils } from "../../shared/util/Utils";
import { Events } from "../../shared/util/Events";
import { ESectorType } from "../../shared/data/sector/ESectorType";

export class SpaceStationSector extends Sector {

    private spaceStation : ISpaceStation;

    constructor(
        sector_x : number,
        sector_y : number,
        x : number, 
        y : number, 
        sectorName : string,
        id : number,
        sectorType: ESectorType) {
        super(sector_x, sector_y, x, y, sectorName, id, sectorType);

        this.spaceStation = {
            id: IdHandler.getNewGameObjectId(),
            x: Utils.getRandomNumber(-2000, 2000),
            y: Utils.getRandomNumber(-2000, 2000),
            name: sectorName
        }
    }

    public update40ms() {
        super.update40ms();
    }

    public update1000ms() {
        super.update1000ms();
        
        this.sendSpaceStationData();
    }

    private sendSpaceStationData() {
        let packet: Events.SPACE_STATION_UPDATE_EVENT_CONFIG = {
            eventId: Events.EEventType.SPACE_STATION_UPDATE_EVENT,
            data: {
                spaceStation: this.spaceStation
            }
        }
        this.clients.forEach(client => {
            client.getData().socket.emit("ServerEvent", packet);
        });
    }
}