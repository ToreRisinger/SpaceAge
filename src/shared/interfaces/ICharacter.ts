import { ObjectInterfaces } from "../scripts/ObjectInterfaces";

export interface ICharacter {
    name : string,
    cargo : ObjectInterfaces.ICargo,
    sectorCoords : {
        x: number,
        y: number
    },
    ship : ObjectInterfaces.IShip
}