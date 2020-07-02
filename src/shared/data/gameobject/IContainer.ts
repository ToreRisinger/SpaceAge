import { IGameObject } from "./IGameObject";
import { ICargo } from "../ICargo";

export interface IContainer extends IGameObject {
    cargo: ICargo
}