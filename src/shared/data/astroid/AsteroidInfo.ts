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
        [EMineralItemType.IRON_ORE] : {
            name : "Iron Asteroid",
            description : "This asteroid ...",
            massPerM2 : 100,
            sprite : SPRITES.IRON_ASTEROID.sprite,
            mineral : "Iron Ore"
        },
    }

    export function getAsteroidInfo(asteroidType : EMineralItemType) : IAsteroidInfo {
        return mineralTypeToAsteroidInfoMap[asteroidType];
    }
}