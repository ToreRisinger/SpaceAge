import { IGameObject } from "../gameobject/IGameObject";
import { ISpriteAnimation } from "../ISprite";

export interface IPlanet extends IGameObject {
    name: string,
    diameter: number,
    mass: string,
    distanceFromSun: number,
    sprite: ISpriteAnimation
}