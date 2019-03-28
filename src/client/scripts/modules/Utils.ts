import { GlobalData } from "./GlobalData";

export module Utils {

    export function screenVecToMapVec(vector : Phaser.Math.Vector2) : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(GlobalData.cameraX - (GlobalData.cameraWidth / 2) + vector.x, GlobalData.cameraY - (GlobalData.cameraHeight / 2) + vector.y)
    }
}