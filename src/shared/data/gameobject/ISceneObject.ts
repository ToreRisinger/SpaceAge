import { IGameObject } from "./IGameObject";
import { ESceneObjectType } from "../sceneobjects/ESceneObjectType";

export interface ISceneObject extends IGameObject {
    type: ESceneObjectType
}