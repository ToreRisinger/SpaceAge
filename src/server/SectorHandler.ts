import * as map_config from "./resources/server-map.json";
import { Sector } from "./Sector";
import { AsteroidBeltSector } from "./AstriodBeltSector";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces.js";
import { Items } from "../shared/scripts/Items.js";

export class SectorHandler {

    private sectors : Map<string, Sector>;

    private playersToSectorMap :  Map<number, {x : number, y : number}>;

    constructor() {
        this.sectors = new Map();
        this.playersToSectorMap = new Map<number, {x : number, y : number}>();
        this.createSectors();
    }

    public update40ms() {
        this.sectors.forEach((value, key) => {
            value.update40ms();
        });
    }

    public update1000ms() {
        this.sectors.forEach((value, key) => {
            value.update1000ms();
        });
    }

    public addPlayerToSector(player : ObjectInterfaces.IPlayer, sector_x : number, sector_y : number) {
        let sector = this.sectors.get("" + sector_x + sector_y);
        console.log(sector);
        console.log(this.sectors);
        console.log(sector_x);
        console.log(sector_y);
        if(sector != undefined) {
            sector.addPlayer(player);
            this.playersToSectorMap.set(player.playerId, {x: sector_x, y: sector_y });
        } else {
            //TODO error?
        }
    }

    public removePlayerFromSector(player : ObjectInterfaces.IPlayer) {
        let sectorCoordinates = this.playersToSectorMap.get(player.playerId);
        if(sectorCoordinates != undefined) {
            let sector = this.sectors.get("" + sectorCoordinates.x + sectorCoordinates.y);
            if(sector != undefined) {
                sector.removePlayer(player);
                this.playersToSectorMap.delete(player.playerId);
            }
        }
    }

    private createSectors() {
       for(let i = 0; i < map_config.sections.length; i++) {
           let sector = map_config.sections[i];
           if(sector.type == "asteroid-belt") {
                this.verifySectorData(sector);

                //@ts-ignore
                let asteriod_type = this.getAsteroidType(sector["asteroid-type"]);
                if(asteriod_type == undefined) {
                    throw new Error("Error reading asteroid-type value in config.");
                }

                this.sectors.set("" + sector.x + sector.y, new AsteroidBeltSector(sector.x, 
                    sector.y,
                    //@ts-ignore
                    sector["name"],
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

}