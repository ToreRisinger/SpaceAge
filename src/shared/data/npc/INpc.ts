import { IShip } from "../gameobject/IShip";
import { ENpcType } from "./ENpcType";

export interface INpc extends IShip {
    type: ENpcType
}