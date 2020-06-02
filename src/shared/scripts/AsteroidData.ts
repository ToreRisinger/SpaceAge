import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";
import { Items } from "./Items";
import { ISprite } from "../interfaces/ISprite";

export module AsteroidData {

    /*
    export enum EAsteroidType {
        GOLD,
        IRON,
        TITANIUM,
        URANIUM,
        DIAMOND
    }
    */

    export interface IAsteroid extends ObjectInterfaces.IGameObject {
        type : Items.EMineralItemType,
        hardness : number,
        size : number
    }

    export interface IAsteroidInfo {
        name : string,
        description : string,
        sprite : ISprite,
        massPerM2 : number,
        mineral : string
    }

    const mineralTypeToAsteroidInfoMap : { [key: number]: IAsteroidInfo } = {
        
        [Items.EMineralItemType.GOLD_ORE] : {
            name : "Gold Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.GOLD_ASTEROID.sprite,
            mineral : "Gold Ore"
        },
        [Items.EMineralItemType.DIAMOND_ORE] : {
            name : "Diamond Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.DIAMOND_ASTEROID.sprite,
            mineral : "Diamond Ore"
        },
        [Items.EMineralItemType.IRON_ORE] : {
            name : "Iron Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.IRON_ASTEROID.sprite,
            mineral : "Iron Ore"
        },
        [Items.EMineralItemType.TITANIUM_ORE] : {
            name : "Titanium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.TITANIUM_ASTEROID.sprite,
            mineral : "Titanium Ore"
        },
        [Items.EMineralItemType.URANIUM_ORE] : {
            name : "Uranium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.URANIUM_ASTEROID.sprite,
            mineral : "Uranium Ore"
        }
    }

    export function getAsteroidInfo(asteroidType : Items.EMineralItemType) : IAsteroidInfo {
        return mineralTypeToAsteroidInfoMap[asteroidType];
    }
}