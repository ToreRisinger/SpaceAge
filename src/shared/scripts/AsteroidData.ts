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
        description : string,
        sprite : ObjectInterfaces.ISprite,
        massPerM2 : number
    }

    const asteroidTypeToAsteroidInfoMap : { [key: number]: IAsteroidInfo } = {
        
        [EAsteroidType.GOLD] : {
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.GOLD_ASTEROID.sprite
        },
        [EAsteroidType.DIAMOND] : {
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.DIAMOND_ASTEROID.sprite
        },
        [EAsteroidType.IRON] : {
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.IRON_ASTEROID.sprite
        },
        [EAsteroidType.TITANIUM] : {
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.TITANIUM_ASTEROID.sprite
        },
        [EAsteroidType.URANIUM] : {
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.URANIUM_ASTEROID.sprite
        }
    }

    export function getAsteroidInfo(asteroidType : EAsteroidType) : IAsteroidInfo {
        return asteroidTypeToAsteroidInfoMap[asteroidType];
    }
}