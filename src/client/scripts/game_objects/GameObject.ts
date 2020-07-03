import { IGameObject } from "../../../shared/data/gameobject/IGameObject";
import { Identifiable } from "./Identifiable";

interface Point {
    x: number,
    y: number
}

export class GameObject extends Identifiable {

    private static MS_TO_PROCESS_ALL_POINTS: number = 400;
    private gameObjectData : IGameObject;
    private shouldInterpolatePos: boolean;
    private interpolatePositions: Array<Point>
    private interpolatedPos: Point;
    private interpolationLastTime: number;

    constructor(gameObjectData : IGameObject, shouldInterpolatePos: boolean) {
        super(gameObjectData);   
        this.gameObjectData = gameObjectData;
        this.shouldInterpolatePos = shouldInterpolatePos;
        this.interpolatePositions = new Array();
        this.interpolatedPos = { x: gameObjectData.x, y: gameObjectData.y };
        this.interpolationLastTime = 0;
    }

    public getPos() {
        if(this.shouldInterpolatePos) {
            return new Phaser.Math.Vector2(this.interpolatedPos.x, this.interpolatedPos.y);
        } else {
            return new Phaser.Math.Vector2(this.gameObjectData.x, this.gameObjectData.y);
        }
    }

    public setPos(x: number, y: number) {
        this.gameObjectData.x = x;
        this.gameObjectData.y = y;
    }

    public update(time: number, delta: number) {
        if(this.shouldInterpolatePos && this.interpolatePositions.length > 2) {
            let timeToProcess = (this.interpolatePositions.length / GameObject.MS_TO_PROCESS_ALL_POINTS) * delta * delta;
            let startTime = this.interpolationLastTime;
            let endTime = startTime + timeToProcess;

            let firstPos = this.interpolatePositions[0];
            let secondPos = this.interpolatePositions[1];
            let ratio = endTime/40;
            while(endTime > 40) {
                endTime -= 40;
                ratio = endTime/40;
                firstPos = secondPos;
                secondPos = this.interpolatePositions[2];
                this.interpolatePositions.shift();
            }
            let diffX = firstPos.x + (secondPos.x - firstPos.x) * ratio;
            let diffY = firstPos.y + (secondPos.y - firstPos.y) * ratio;
            this.interpolatedPos = {x: diffX, y: diffY};
            this.interpolationLastTime = endTime;
        } 
    }

    public updateData(gameObjectData : IGameObject) {
        this.gameObjectData = gameObjectData;
        super.updateData(gameObjectData);
        if(this.shouldInterpolatePos) {
            this.interpolatePositions.push({x: gameObjectData.x, y: gameObjectData.y});
        }
    }

    public destroy() {
        
    }

    public updateGraphics(time: number, delta: number) {
        
    }
}