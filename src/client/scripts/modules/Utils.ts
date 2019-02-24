import { Camera } from "./Camera";

export module Utils {

    export function screenVecToMapVec(vector : Phaser.Math.Vector2) : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(Camera.getX() - (Camera.getWidth() / 2) + vector.x, Camera.getY() - (Camera.getHeight() / 2) + vector.y)
    }
}