import * as map_config from "./resources/server-map.json";
import { Sector } from "./Sector";
import { AsteroidBeltSector } from "./AstriodBeltSector";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces.js";

export class SectorHandler {

    private SECTOR_WIDTH : number = 8;
    private SECTOR_HEIGHT : number = 8;

    private sectors : Array<Array<Sector>>;

    private playersToSectorMap :  Map<number, {x : number, y : number}>;

    constructor() {
        this.sectors = new Array<Array<Sector>>();
        this.playersToSectorMap = new Map<number, {x : number, y : number}>();
        this.createSectors();
    }

    public update40ms() {
        for(let x = 0; x < this.SECTOR_WIDTH; x++) {
            for(let y = 0; y < this.SECTOR_HEIGHT; y++) {
                this.sectors[x][y].update40ms();
            }
        }
    }

    public update1000ms() {
        for(let x = 0; x < this.SECTOR_WIDTH; x++) {
            for(let y = 0; y < this.SECTOR_HEIGHT; y++) {
                this.sectors[x][y].update1000ms();
            }
        }
    }

    public addPlayerToSector(player : ObjectInterfaces.IPlayer, sector_x : number, sector_y : number) {
        this.sectors[sector_x][sector_y].addPlayer(player);
        this.playersToSectorMap.set(player.playerId, {x: sector_x, y: sector_y });
    }

    public removePlayerFromSector(player : ObjectInterfaces.IPlayer) {
        let sectorCoordinates = this.playersToSectorMap.get(player.playerId);
        if(sectorCoordinates != undefined) {
            this.sectors[sectorCoordinates.x][sectorCoordinates.y].removePlayer(player);
            this.playersToSectorMap.delete(player.playerId);
        }
    }

    private createSectors() {
        for(let x = 0; x < this.SECTOR_WIDTH; x++) {
            this.sectors.push(new Array<Sector>());
            for(let y = 0; y < this.SECTOR_HEIGHT; y++) {
                let sector = map_config.sections.find(sector => sector.x == x && sector.y == y);
                if(sector != undefined) {
                    if(sector.type == "none") {
                        this.sectors[x].push(new Sector(x, y));
                    } else if(sector.type == "asteroid-belt") {
                        this.verifySectorData(sector);
                        
                        //@ts-ignore
                        let asteriod_type = this.getAsteroidType(sector["asteroid-type"]);
                        if(asteriod_type == undefined) {
                            throw new Error("Error reading asteroid-type value in config.");
                        }

                        this.sectors[x].push(new AsteroidBeltSector(x, 
                            y, 
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
        }
    }

    private getAsteroidType(typeString : string) : AsteroidData.EAsteroidType | undefined {
        switch (typeString) {
            case "gold":
                return AsteroidData.EAsteroidType.GOLD;
            case "iron":
                return AsteroidData.EAsteroidType.IRON; 
            case "diamond":
                return AsteroidData.EAsteroidType.DIAMOND;
            case "uranium":
                return AsteroidData.EAsteroidType.URANIUM;
            case "titanium":
                return AsteroidData.EAsteroidType.TITANIUM;   
            default:
                return undefined;
        }
    }

}