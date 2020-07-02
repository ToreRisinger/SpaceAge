import { IGameObject } from "../gameobject/IGameObject";

export interface ISector extends IGameObject {
    name: string,
    sectorId: number
}