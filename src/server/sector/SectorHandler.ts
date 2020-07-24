import * as map_config from "../resources/server-map.json";
import { SSector } from "./SSector";
import { IdHandler } from "../IdHandler.js";
import { PacketFactory } from "../PacketFactory.js";
import { SClient } from "../objects/SClient.js";
import { Utils } from "../../shared/util/Utils.js";

const math = require('mathjs');

export class SectorHandler {

    private sectors : Map<number, SSector>;
    private playersToSectorMap :  Map<number, SSector>;
    private location: string = "unknown";

    private warpingPlayers : Map<number, {
        client : SClient,
        toSector : SSector,
        fromSector : SSector
        destinationX: number,
        destinationY: number, 
    }>;

    constructor() {
        this.sectors = new Map();
        this.warpingPlayers = new Map();
        this.playersToSectorMap = new Map<number, SSector>();
        this.createSectors();
    }

    public getLocation(): string {
        return this.location;
    }

    public getSectors() : Array<SSector> {
        return Array.from(this.sectors.values());
    }

    public update40ms() {
        this.handleWarpingPlayers();
        this.sectors.forEach((sector, key) => {
            sector.update40ms();
        });
    }

    public update1000ms() {
        this.sectors.forEach((sector, key) => {
            sector.update1000ms();
        });
    }

    public addClientToSector(client : SClient, sectorId: number) {
        let sector = this.getSector(sectorId);
        if(sector != undefined) {
            sector.addClient(client);
            this.playersToSectorMap.set(client.getData().id, sector);
        } else {
            //TODO error?
        }
    }

    public removePlayerFromSector(client : SClient) {
        let sector = this.playersToSectorMap.get(client.getData().id);
        if(sector != undefined) {
            sector.removeClient(client);
            this.playersToSectorMap.delete(client.getData().id);
        }
    }

    public onPlayerDockRequest(client: SClient, spaceStationId: number) {
        let sector = this.playersToSectorMap.get(client.getData().id);
        if(sector != undefined) {
            sector.onPlayerDockRequest(client, spaceStationId);
        }
    }

    public onPlayerStartWarping(client: SClient, toSector : SSector) {
        let fromSector = this.playersToSectorMap.get(client.getData().id);
        if(fromSector != undefined) {
            let destinationX = Utils.getRandomNumber(-2000, 2000);
            let destinationY = Utils.getRandomNumber(-2000, 2000);
            

            let destVec = client.getData().character.state.destVec = [toSector.getX() - fromSector.getX() + destinationX, toSector.getY() - fromSector.getY() + destinationY];
            let toSectorId = client.getData().character.warpState.toSectorId = toSector.getId();
            let fromSectorId = client.getData().character.warpState.fromSectorId = fromSector.getId();
            client.getCharacter().startWarping(destVec[0], destVec[1], toSectorId, fromSectorId);

            this.warpingPlayers.set(client.getData().id, {
                    client : client, 
                    toSector: toSector,
                    fromSector : fromSector,
                    destinationX: destinationX,
                    destinationY: destinationY
            });
        }
    }

    public getSectorForPlayer(client: SClient): SSector | undefined {
        return this.playersToSectorMap.get(client.getData().id);
    }

    private handleWarpingPlayers() {
        let toRemove : Array<SClient> = new Array();

        this.warpingPlayers.forEach((value, key) => {
            let destinationCoordinates = [value.client.getData().character.state.destVec[0], value.client.getData().character.state.destVec[1]]; 
            let playerPos = [value.client.getData().character.x, value.client.getData().character.y];
            let posToDestinationLength = math.length(math.subtract(playerPos, destinationCoordinates));

           //finish warp
           if(posToDestinationLength == 0) {
               let fromSector = value.fromSector;
               let toSector = value.toSector;
               if(fromSector != undefined && toSector != undefined) {
                   fromSector.removeClient(value.client);
                   toSector.addClient(value.client);
                   toRemove.push(value.client);
                   this.playersToSectorMap.set(value.client.getData().id, toSector);
                   this.sendSectorChangedEvent(value.client, toSector.getId());
                   value.client.getData().character.warpState.isWarping = false;
                   value.client.getData().character.state.isMoving = false;
                   value.client.getData().character.state.hasDestination = false;
                   value.client.getData().character.x = value.destinationX;
                   value.client.getData().character.y = value.destinationY;
               }
           }
        });

        toRemove.forEach(client => this.warpingPlayers.delete(client.getData().id));
    }

    private playerFinishWarp() {
        
    }

    private createSectors() {
        this.location = map_config.location;
        for(let i = 0; i < map_config.sections.length; i++) {
            let sector = map_config.sections[i];
            this.addSector(new SSector(sector.id, sector.x, sector.y, sector.name, IdHandler.getNewGameObjectId(), sector.content));
        }
    }

    public getSector(id: number) : SSector | undefined {
        return this.sectors.get(id);
    }

    private addSector(sector : SSector) {
        this.sectors.set(sector.getSectorId(), sector);
    }

    private sendSectorChangedEvent(client : SClient, sectorId : number) {
        let packet : any = PacketFactory.createSectorChangedPacket(sectorId);
        client.getData().socket.emit("ServerEvent", packet);
    }
}