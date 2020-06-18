import { IGameObject } from "../../../shared/data/gameobject/IGameObject";
import { Identifiable } from "./Identifiable";

export class GameObject extends Identifiable {

    private gameObjectData : IGameObject;

    constructor(gameObjectData : IGameObject) {
        super(gameObjectData);   
        /*
        gameObjectData.x = Math.floor(gameObjectData.x);
        gameObjectData.y = Math.floor(gameObjectData.y);
        */
        this.gameObjectData = gameObjectData;
    }

    public getPos() {
        return new Phaser.Math.Vector2(this.gameObjectData.x, this.gameObjectData.y);
    }

    public setPos(x: number, y: number) {
        this.gameObjectData.x = x;
        this.gameObjectData.y = y;
    }

    public update() {
        
    }

    public updateData(gameObjectData : IGameObject) {
        this.gameObjectData = gameObjectData;
        super.updateData(gameObjectData);
    }

    public destroy() {
        
    }
}