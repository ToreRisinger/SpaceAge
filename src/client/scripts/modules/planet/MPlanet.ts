import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";

export module MPlanet {

    export interface IPlanet extends ObjectInterfaces.IGameObject {
        name: string,
        diameter: number,
        mass: string
    }

    const planetTypeToPlanetList : Array<IPlanet> = [
        {
            name: "Mercery",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 59839148000,
            y: 0
        },
        {
            name: "Venus",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 104718509000,
            y: 0
        },
        {
            name: "Earth",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 149597871000,
            y: 0
        },
        {
            name: "Mars",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 224396806000,
            y: 0
        }
        ,
        {
            name: "Jupiter",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 777908929000,
            y: 0
        }
        ,
        {
            name: "Saturn",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 1421179774000,
            y: 0
        }
        ,
        {
            name: "Uranus",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 2962037845000,
            y: 0
        }
        ,
        {
            name: "Neptune",
            diameter: 6779,
            mass: "6,39×10^23 kg (0,107 M⊕)",
            id: 0,
            x: 4487936130000,
            y: 0
        }
    ]

    export function getPlanets() : Array<IPlanet> {
        return planetTypeToPlanetList;
    }
}