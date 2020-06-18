import { IGameObject } from "../gameobject/IGameObject";
import { ESectorType } from "./ESectorType";

export interface ISector extends IGameObject {
    name: string,
    sectorType: ESectorType
}