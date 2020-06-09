import { ObjectInterfaces } from "../scripts/ObjectInterfaces";

export enum ESectorType {
    SPACE_STATION,
    ASTROID_BELT
}

export interface ISector extends ObjectInterfaces.IGameObject {
    name: string,
    sectorType: ESectorType
}