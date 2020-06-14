import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";

export module MPlanet {

    export interface IPlanet extends ObjectInterfaces.IGameObject {
        name: string,
        diameter: number,
        mass: string,
        distanceFromSun: number
    }

    const planetTypeToPlanetList : Array<IPlanet> = [
        {
            name: "Sun",
            diameter: 6779000,
            mass: "1.9884×1030 kg (333,000 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 0
        },
        {
            name: "Mercery",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 59839148000
        },
        {
            name: "Venus",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 104718509000
        },
        {
            name: "Earth",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 149597871000
        },
        {
            name: "Mars",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 224396806000
        }
        ,
        {
            name: "Jupiter",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 777908929000
        }
        ,
        {
            name: "Saturn",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 1421179774000
        }
        ,
        {
            name: "Uranus",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 2962037845000
        }
        ,
        {
            name: "Neptune",
            diameter: 6779000,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 0,
            y: 0,
            distanceFromSun: 4487936130000
        }
    ]

    export function getPlanets() : Array<IPlanet> {
        return planetTypeToPlanetList;
    }
}