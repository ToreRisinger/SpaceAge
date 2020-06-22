import { IGameObject } from "./IGameObject";
import { ICargo } from "../ICargo";

export interface IShipwreck extends IGameObject {
    cargo: ICargo
}