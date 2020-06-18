import { ISprite } from "../ISprite";
import { EMineralItemType } from "../item/EMineralItemType";
import { SPRITES } from "../../util/SPRITES";

export module AsteroidInfo {

    export interface IAsteroidInfo {
        name : string,
        description : string,
        sprite : ISprite,
        massPerM2 : number,
        mineral : string
    }

    const mineralTypeToAsteroidInfoMap : { [key: number]: IAsteroidInfo } = {
        
        [EMineralItemType.GOLD_ORE] : {
            name : "Gold Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.GOLD_ASTEROID.sprite,
            mineral : "Gold Ore"
        },
        [EMineralItemType.DIAMOND_ORE] : {
            name : "Diamond Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.DIAMOND_ASTEROID.sprite,
            mineral : "Diamond Ore"
        },
        [EMineralItemType.IRON_ORE] : {
            name : "Iron Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.IRON_ASTEROID.sprite,
            mineral : "Iron Ore"
        },
        [EMineralItemType.TITANIUM_ORE] : {
            name : "Titanium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.TITANIUM_ASTEROID.sprite,
            mineral : "Titanium Ore"
        },
        [EMineralItemType.URANIUM_ORE] : {
            name : "Uranium Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.URANIUM_ASTEROID.sprite,
            mineral : "Uranium Ore"
        }
    }

    export function getAsteroidInfo(asteroidType : EMineralItemType) : IAsteroidInfo {
        return mineralTypeToAsteroidInfoMap[asteroidType];
    }
}