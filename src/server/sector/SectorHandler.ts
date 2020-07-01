import * as map_config from "../resources/server-map.json";
import { SSector } from "./SSector";
import { AsteroidBeltSector } from "./AstriodBeltSector";
import { IdHandler } from "../IdHandler.js";
import { PacketFactory } from "../PacketFactory.js";
import { SClient } from "../objects/SClient.js";
import { SpaceStationSector } from "./SpaceStationSector.js";
import { ESectorType } from "../../shared/data/sector/ESectorType.js";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType.js";

const math = require('mathjs');

export class SectorHandler {

    private sectors : Map<number, SSector>;
    private SECTOR_COORD_TO_MAP_COORD : number = 10000000;
    private playersToSectorMap :  Map<number, SSector>;
    private location: string = "unknown";

    private warpingPlayers : Map<number, {
        client : SClient, 
        playerStartPos : Array<number>, 
        destinationSector : SSector, 
        sourceSector : SSector}>;

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

    public onPlayerStartWarping(client: SClient, destinationSector : SSector) {
        let sourceSector = this.playersToSectorMap.get(client.getData().id);
        if(sourceSector != undefined) {
            this.warpingPlayers.set(client.getData().id, 
                {
                    client : client, 
                    playerStartPos : [client.getData().character.x, client.getData().character.y],
                    destinationSector: destinationSector, 
                    sourceSector : sourceSector
                });
        }
    }

    public getSectorForPlayer(client: SClient): SSector | undefined {
        return this.playersToSectorMap.get(client.getData().id);
    }

    private handleWarpingPlayers() {
        let toRemove : Array<SClient> = new Array();

        this.warpingPlayers.forEach((value, key) => {
            let sourceCoordinates = [value.sourceSector.getX(), value.sourceSector.getY()];
            let destinationCoordinates = [value.destinationSector.getX(), value.destinationSector.getY()];

            let destToSource_test = math.subtract(sourceCoordinates, destinationCoordinates);
            let distanceTraveled = math.length(
                                        math.subtract(value.playerStartPos, [value.client.getData().character.x, value.client.getData().character.y]));

            if(distanceTraveled > 20000) {
                //Player finish warp
                let sectorToLeave = value.sourceSector;
                let sectorToEnter = value.destinationSector;
                if(sectorToLeave != undefined && sectorToEnter != undefined) {
                    let newShipPosition = math.add([0, 0], math.multiply(destToSource_test, 2000/math.length(destToSource_test)));
                    value.client.getData().character.x = newShipPosition[0];
                    value.client.getData().character.y = newShipPosition[1];
                    value.client.getData().character.state.velVec = [0, 0];
                    sectorToLeave.removeClient(value.client);
                    sectorToEnter.addClient(value.client);
                    toRemove.push(value.client);
                    this.playersToSectorMap.set(value.client.getData().id, sectorToEnter);
                    this.sendSectorChangedEvent(value.client, sectorToEnter.getId());
                    value.client.getData().character.warpState.isWarping = false;
                    value.client.getData().character.state.isMoving = false;
                    value.client.getData().character.state.hasDestination = false;
                    value.client.getData().character.state.meters_per_second = 0;
                }
                //TODO if something goes wrong here..
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
            if(sector.type == "asteroid-belt") {
                this.verifySectorData(sector);

                //@ts-ignore
                let asteriod_type = this.getAsteroidType(sector["asteroid-type"]);
                if(asteriod_type == undefined) {
                    throw new Error("Error reading asteroid-type value in config.");
                }
            
                this.addSector(new AsteroidBeltSector(sector["id"], sector.x, 
                    sector.y,
                    //@ts-ignore
                    sector["name"],
                    IdHandler.getNewGameObjectId(),
                    ESectorType.ASTROID_BELT,
                    asteriod_type, 
                    //@ts-ignore
                    sector["asteroid-hardness"], 
                    sector["asteroid-min-size"], 
                    sector["asteroid-max-size"],
                    sector["asteroid-generation-rate"],
                    sector["max-number-of-asteroids"]));
            } else if(sector.type == "space-station") {
                this.addSector(new SpaceStationSector(sector["id"], sector.x, 
                    sector.y,
                    //@ts-ignore
                    sector["name"],
                    IdHandler.getNewGameObjectId(),
                    ESectorType.ASTROID_BELT));
            }
        }
    }

    private verifySectorData(sector : Object) {
        //@ts-ignore
        if(sector["asteroid-type"] == undefined){
            throw new Error("Error reading asteroid-type value in config.");
        //@ts-ignore
        } else if(sector["asteroid-hardness"] == undefined) {
            throw new Error("Error reading asteroid-hardness value in config.");
        //@ts-ignore
        } else if(sector["asteroid-max-size"] == undefined) {
            throw new Error("Error reading asteroid-max-size value in config.");
        //@ts-ignore
        } else if(sector["asteroid-min-size"] == undefined) {
            throw new Error("Error reading asteroid-min-size value in config.");
        //@ts-ignore
        } else if(sector["asteroid-generation-rate"] == undefined) {
            throw new Error("Error reading generation-rate value in config.");
        //@ts-ignore
        } else if(sector["max-number-of-asteroids"] == undefined) {
            throw new Error("Error reading max-number-of-asteroids value in config.");
        //@ts-ignore
        } else if(sector["name"] == undefined) {
            throw new Error("Error reading name value in config.");
        }
    }

    private getAsteroidType(typeString : string) : EMineralItemType | undefined {
        switch (typeString) {
            case "gold":
                return EMineralItemType.GOLD_ORE;
            case "iron":
                return EMineralItemType.IRON_ORE; 
            case "diamond":
                return EMineralItemType.DIAMOND_ORE;
            case "uranium":
                return EMineralItemType.URANIUM_ORE;
            case "titanium":
                return EMineralItemType.TITANIUM_ORE;   
            default:
                return undefined;
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