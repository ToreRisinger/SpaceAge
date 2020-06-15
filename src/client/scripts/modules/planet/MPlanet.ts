import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import { ISpriteAnimation } from "../../../../shared/interfaces/ISprite";
import { SPRITES } from "../../../../shared/scripts/SPRITES";

export module MPlanet {

    export interface IPlanet extends ObjectInterfaces.IGameObject {
        name: string,
        diameter: number,
        mass: string,
        distanceFromSun: number,
        sprite: ISpriteAnimation
    }

    const planetTypeToPlanetList : Array<IPlanet> = [
        {
            name: "Sun",
            diameter: 1392700000,
            mass: "333000 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 0,
            sprite: SPRITES.MERCURY
        },
        {
            name: "Mercury",
            diameter: 4879400,
            mass: "0.057 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 59839148000,
            sprite:SPRITES.MERCURY
        },
        {
            name: "Venus",
            diameter: 12104000,
            mass: "0.815 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 104718509000,
            sprite: SPRITES.VENUS
        },
        {
            name: "Earth",
            diameter: 12742000,
            mass: "1 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 149597871000,
            sprite: SPRITES.EARTH
        },
        {
            name: "Mars",
            diameter: 6779000,
            mass: "0.107 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 224396806000,
            sprite: SPRITES.MARS
        }
        ,
        {
            name: "Jupiter",
            diameter: 139820000,
            mass: "317.800 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 777908929000,
            sprite: SPRITES.JUPITER
        }
        ,
        {
            name: "Saturn",
            diameter: 116460000,
            mass: "95.160 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 1421179774000,
            sprite: SPRITES.SATURN
        }
        ,
        {
            name: "Uranus",
            diameter: 50724000,
            mass: "14.540 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 2962037845000,
            sprite: SPRITES.URANUS
        }
        ,
        {
            name: "Neptune",
            diameter: 49244000,
            mass: "17.150 M⊕",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 4487936130000,
            sprite: SPRITES.NEPTUNE
        }
    ]

    export function getPlanets() : Array<IPlanet> {
        return planetTypeToPlanetList;
    }
}