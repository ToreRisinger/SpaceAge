import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { ICargo } from "./ICargo";

export interface ICharacter {
    name: string,
    cargo: ICargo,
    sectorCoords: {
        x: number,
        y: number
    },
    location: string,
    ship: ObjectInterfaces.IShip
}