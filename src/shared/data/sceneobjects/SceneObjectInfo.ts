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
        }
    }

    export function getSceneObjectInfo(type : ESceneObjectType) : ISceneObjectInfo {
        return sceneObjectTypeToInfo[type];
    }

}