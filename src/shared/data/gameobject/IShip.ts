import { IProperties } from "../IProperties";
import { IShipModuleInstance } from "../shipmodule/IShipModuleInstance";
import { IGameObject } from "./IGameObject";
import { IShipState } from "./IShipState";

export interface IShip extends IGameObject {
    name: string,
    properties: IProperties,
    state: IShipState,
    stats: Array<number>,
    modules: Array<IShipModuleInstance>
}