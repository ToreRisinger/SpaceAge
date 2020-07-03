import { IGameObject } from "../../../shared/data/gameobject/IGameObject";
import { Identifiable } from "./Identifiable";

interface Point {
    x: number,
    y: number
}

export class GameObject extends Identifiable {

    private gameObjectData : IGameObject;
    private shouldInterpolatePos: boolean;
    private interpolatePositions: Array<Point>
    private interpolatedPos: Point;
    private firstRun: boolean;
    private timer: number;
    private UPDATE_TIME: number = 16.666;
    //private timestamp: number;
    private waitTime: number = 0;

    constructor(gameObjectData : IGameObject, shouldInterpolatePos: boolean) {
        super(gameObjectData);   
        this.gameObjectData = gameObjectData;
        this.shouldInterpolatePos = shouldInterpolatePos;
        this.interpolatePositions = new Array();
        this.interpolatedPos = { x: gameObjectData.x, y: gameObjectData.y };
        this.firstRun = true;
        this.timer = 0;
        //this.timestamp = -1;
    }

    public getPos() {
        //if(this.shouldInterpolatePos) {
        //    return new Phaser.Math.Vector2(this.interpolatedPos.x, this.interpolatedPos.y);
        //} else {
            return new Phaser.Math.Vector2(this.gameObjectData.x, this.gameObjectData.y);
        //}
    }

    public setPos(x: number, y: number) {
        this.gameObjectData.x = x;
        this.gameObjectData.y = y;
    }

    public update() {
        /*
        this.waitTime++;
        console.log(this.interpolatePositions.length);
        if(this.waitTime > 20 && this.shouldInterpolatePos && this.interpolatePositions.length > 2) {
            this.timer += this.UPDATE_TIME;
            let firstPos = this.interpolatePositions[0];
            let secondPos = this.interpolatePositions[1];
            if(this.firstRun) { //first time
                this.interpolatedPos = {x: firstPos.x, y: firstPos.y};
                //this.interpolatePositions.shift();
                //this.timestamp = performance.now();
                this.firstRun = false;
            } else {
                let ratio = this.timer/40;
                while(ratio > 1) {
                    this.timer -= 40;
                    ratio = this.timer/40;
                    firstPos = secondPos;
                    secondPos = this.interpolatePositions[2];
                    this.interpolatePositions.shift();
                }
                let diffX = firstPos.x + (secondPos.x - firstPos.x) * ratio;
                let diffY = firstPos.y + (secondPos.y - firstPos.y) * ratio;
                this.interpolatedPos = {x: diffX, y: diffY};
            }
        }
        */
    }

    public updateData(gameObjectData : IGameObject) {
        this.gameObjectData = gameObjectData;
        super.updateData(gameObjectData);
        this.interpolatePositions.push({x: gameObjectData.x, y: gameObjectData.y});
    }

    public destroy() {
        
    }

    public updateGraphics() {
        
    }
}