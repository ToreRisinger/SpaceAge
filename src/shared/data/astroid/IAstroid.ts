import { IGameObject } from "../gameobject/IGameObject";
import { EMineralItemType } from "../item/EMineralItemType";

export interface IAsteroid extends IGameObject {
    type : EMineralItemType,
    size : number
}