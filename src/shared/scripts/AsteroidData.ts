import { ObjectInterfaces } from "./ObjectInterfaces";
import { SPRITES } from "./SPRITES";

export module AsteroidData {

    export enum EAsteroidType {
        GOLD,
        IRON,
        TITANIUM,
        URANIUM,
        DIAMOND
    }

    export interface IAsteroid extends ObjectInterfaces.IGameObject {
        type : EAsteroidType,
        hardness : number,
        size : number
    }

    export interface IAsteroidInfo {
        name : string,
        description : string,
        sprite : ObjectInterfaces.ISprite,
        massPerM2 : number
    }

    const asteroidTypeToAsteroidInfoMap : { [key: number]: IAsteroidInfo } = {
        
        [EAsteroidType.GOLD] : {
            name : "Gold Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.GOLD_ASTEROID.sprite
        },
        [EAsteroidType.DIAMOND] : {
            name : "Diamond Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.DIAMOND_ASTEROID.sprite
        },
        [EAsteroidType.IRON] : {
            name : "Iron Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.IRON_ASTEROID.sprite
        },
        [EAsteroidType.TITANIUM] : {
            name : "Titanium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.TITANIUM_ASTEROID.sprite
        },
        [EAsteroidType.URANIUM] : {
            name : "Uranium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.URANIUM_ASTEROID.sprite
        }
    }

    export function getAsteroidInfo(asteroidType : EAsteroidType) : IAsteroidInfo {
        return asteroidTypeToAsteroidInfoMap[asteroidType];
    }
}