import { ObjectInterfaces } from "../scripts/ObjectInterfaces";
import { ICargo } from "./ICargo";

export interface IPlayer {
    playerId : number,
    socket: any,
    ship: ObjectInterfaces.IShip,
    cargo : ICargo
}