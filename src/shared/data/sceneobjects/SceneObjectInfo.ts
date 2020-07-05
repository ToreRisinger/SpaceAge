import { ISprite } from "../ISprite";
import { ESceneObjectType } from "./ESceneObjectType";
import { SPRITES } from "../../util/SPRITES";

export namespace SceneObjectInfo {

    export interface ISceneObjectInfo {
        name: string,
        sprite: ISprite
    }

    const sceneObjectTypeToInfo : { [key: number]: ISceneObjectInfo } = {
        [ESceneObjectType.PIRATE_HOLD] : {
            name: "Pirate Hold",
            sprite: SPRITES.PIRATE_HOLD.sprite
        },
        [ESceneObjectType.SMUGGLER_HIDEOUT] : {
            name: "Smuggler Hideout",
            sprite: SPRITES.SMUGGLER_HIDEOUT.sprite
        },
        [ESceneObjectType.WARP_GATE] : {
            name: "Warp Gate",
            sprite: SPRITES.WARP_GATE.sprite
        },
        [ESceneObjectType.SPACE_STATION] : {
            name: "Space Station",
            sprite: SPRITES.SPACE_STATION.sprite
        },

    }

    export function getSceneObjectInfo(type : ESceneObjectType) : ISceneObjectInfo {
        return sceneObjectTypeToInfo[type];
    }

}