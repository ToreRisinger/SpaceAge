import * as map_config from "./resources/server-map.json";
import { Sector } from "./Sector";
import { AsteroidBeltSector } from "./AstriodBeltSector";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces.js";
import { Items } from "../shared/scripts/Items.js";
import { IdHandler } from "./IdHandler.js";
import { PacketFactory } from "./PacketFactory.js";
import { IClient } from "./interfaces/IClient.js";
import { IPlayer } from "../shared/interfaces/IPlayer.js";

const math = require('mathjs');

export class SectorHandler {

    private sectors : Map<string, Sector>;
    private SECTOR_COORD_TO_MAP_COORD : number = 10000000;
    private playersToSectorMap :  Map<number, Sector>;
    private location: string = "unknown";

    private warpingPlayers : Map<number, {
        client : IClient, 
        playerStartPos : Array<number>, 
        destinationSector : Sector, 
        sourceSector : Sector}>;

    constructor() {
        this.sectors = new Map();
        this.warpingPlayers = new Map();
        this.playersToSectorMap = new Map<number, Sector>();
        this.createSectors();
    }

    public getLocation(): string {
        return this.location;
    }

    public getSectors() : Array<Sector> {
        return Array.from(this.sectors.values());
    }

    public update40ms() {

        this.handleWarpingPlayers();
        

        this.sectors.forEach((value, key) => {
            value.update40ms();
        });
    }

    public update1000ms() {
        this.sectors.forEach((value, key) => {
            value.update1000ms();
        });
    }

    public addClientToSector(client : IClient, sector_x : number, sector_y : number) {
        let sector = this.getSector(sector_x, sector_y);
        if(sector != undefined) {
            sector.addClient(client);
            this.playersToSectorMap.set(client.id, sector);
        } else {
            //TODO error?
        }
    }

    public removePlayerFromSector(client : IClient) {
        let sector = this.playersToSectorMap.get(client.id);
        if(sector != undefined) {
            sector.removeClient(client);
            this.playersToSectorMap.delete(client.id);
        }
    }

    public getSectorOfPlayer(player : IPlayer) : Sector | undefined {
        return this.playersToSectorMap.get(player.playerId);
    }

    public onPlayerStartWarping(client: IClient, destinationSector : Sector) {
        let sourceSector = this.playersToSectorMap.get(client.id);
        if(sourceSector != undefined) {
            this.warpingPlayers.set(client.id, 
                {
                    client : client, 
                    playerStartPos : [client.character.ship.x, client.character.ship.y],
                    destinationSector: destinationSector, 
                    sourceSector : sourceSector
                });
        }
    }

    private handleWarpingPlayers() {
        let toRemove : Array<IClient> = new Array();

        this.warpingPlayers.forEach((value, key) => {
            let sourceCoordinates = [value.sourceSector.getX(), value.sourceSector.getY()];
            let destinationCoordinates = [value.destinationSector.getX(), value.destinationSector.getY()];

            let destToSource_test = math.subtract(sourceCoordinates, destinationCoordinates);
            let distanceTraveled = math.length(math.subtract(value.playerStartPos, [value.client.character.ship.x, value.client.character.ship.y]));

            if(distanceTraveled > 20000) {
                //Player finish warp
                let sectorToLeave = value.sourceSector;
                let sectorToEnter = value.destinationSector;
                if(sectorToLeave != undefined && sectorToEnter != undefined) {
                    let newShipPosition = math.add([0, 0], math.multiply(destToSource_test, 2000/math.length(destToSource_test)));
                    value.client.character.ship.x = newShipPosition[0];
                    value.client.character.ship.y = newShipPosition[1];
                    value.client.character.ship.velVec = [0, 0];
                    sectorToLeave.removeClient(value.client);
                    sectorToEnter.addClient(value.client);
                    toRemove.push(value.client);
                    this.playersToSectorMap.set(value.client.id, sectorToEnter);
                    this.sendSectorChangedEvent(value.client, sectorToEnter.getId());
                    value.client.character.ship.isWarping = false;
                    value.client.character.ship.isMoving = false;
                    value.client.character.ship.hasDestination = false;
                    value.client.character.ship.meters_per_second = 0;
                }
                //TODO if something goes wrong here..
            }
        });

        toRemove.forEach(client => this.warpingPlayers.delete(client.id));
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
            
                this.addSector(sector.x, sector.y, new AsteroidBeltSector(sector.x, sector.y, sector.x * this.SECTOR_COORD_TO_MAP_COORD, 
                    sector.y * this.SECTOR_COORD_TO_MAP_COORD,
                    //@ts-ignore
                    sector["name"],
                    IdHandler.getNewGameObjectId(),
                    asteriod_type, 
                    //@ts-ignore
                    sector["asteroid-hardness"], 
                    sector["asteroid-min-size"], 
                    sector["asteroid-max-size"],
                    sector["asteroid-generation-rate"],
                    sector["max-number-of-asteroids"]));
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

    private getAsteroidType(typeString : string) : Items.EMineralItemType | undefined {
        switch (typeString) {
            case "gold":
                return Items.EMineralItemType.GOLD_ORE;
            case "iron":
                return Items.EMineralItemType.IRON_ORE; 
            case "diamond":
                return Items.EMineralItemType.DIAMOND_ORE;
            case "uranium":
                return Items.EMineralItemType.URANIUM_ORE;
            case "titanium":
                return Items.EMineralItemType.TITANIUM_ORE;   
            default:
                return undefined;
        }
    }

    public getSector(x : number, y : number) : Sector | undefined {
        let sector : Sector | undefined = undefined;
        this.sectors.forEach((value, key) => {
            if(value.getSectorX() == x && value.getSectorY() == y) {
                sector = value;
                return sector;
            }
        });
        return sector;
    }

    private addSector(x : number, y : number, sector : Sector) {
        this.sectors.set("" + x + y, sector);
    }

    private sendSectorChangedEvent(client : IClient, sectorId : number) {
        let packet : any = PacketFactory.createSectorChangedPacket(sectorId);
        client.socket.emit("ServerEvent", packet);
    }
}