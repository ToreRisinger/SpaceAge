import { Spawner } from "./Spawner";
import { SSector } from "../sector/SSector";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { IdHandler } from "../IdHandler";
import { Utils } from "../../shared/util/Utils";

export class AsteroidSpawner extends Spawner {
    
    private type: EMineralItemType;
    private minSize: number;
    private maxSize: number;
    private generationRate: number;
    private maxNrOfAsteroids: number;
    private timePassedSinceLastGeneration: number;
    private x: number;
    private y: number;

    private startPos: {
        x: number,
        y: number
    }

    private endPos: {
        x: number,
        y: number
    }

    constructor(sector: SSector,
        x: number,
        y: number,
        type: EMineralItemType,  
        minSize: number, 
        maxSize: number, 
        generationRate: number,
        maxNrOfAsteroids: number) {
        super(sector);
        this.type = type;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generationRate = generationRate;
        this.maxNrOfAsteroids = maxNrOfAsteroids;
        this.timePassedSinceLastGeneration = 0;
        this.x = x;
        this.y = y;

        this.startPos = {
            x: 100000,
            y: -100000,
        }

        this.endPos = {
            x: 100000,
            y: 100000
        }
    }

    update1000ms(): void {
        this.timePassedSinceLastGeneration++;
        if(this.timePassedSinceLastGeneration >= this.generationRate 
            && this.getParentSector().getAsteroids().size < this.maxNrOfAsteroids) {
            
            this.timePassedSinceLastGeneration = 0;
            this.createAsteroid();
        }
    }

    update40ms(): void {
        
    }

    private createAsteroid() {
        let asteroid : IAsteroid = {
            id : IdHandler.getNewGameObjectId(),
            size : Utils.getRandomNumber(this.minSize, this.maxSize),
            type : this.type,
            x : 3000 + Utils.getRandomNumber(-50000, 50000),
            y : Utils.getRandomNumber(this.startPos.y, this.endPos.y)
        }

        this.getParentSector().getAsteroids().set(asteroid.id, asteroid);
    } 
    
    public getSceneObjects() {
        return new Array();
    }
}