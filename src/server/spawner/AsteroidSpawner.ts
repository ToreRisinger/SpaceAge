import { Spawner } from "./Spawner";
import { SSector } from "../sector/SSector";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { IdHandler } from "../IdHandler";
import { Utils } from "../../shared/util/Utils";

export class AsteroidSpawner extends Spawner {
    
    private type: EMineralItemType;
    private hardness: number;
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
        hardness: number, 
        minSize: number, 
        maxSize: number, 
        generationRate: number,
        maxNrOfAsteroids: number) {
        super(sector);
        this.type = type;
        this.hardness = hardness;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generationRate = generationRate;
        this.maxNrOfAsteroids = maxNrOfAsteroids;
        this.timePassedSinceLastGeneration = 0;
        this.x = x;
        this.y = y;

        this.startPos = {
            x: 3000,
            y: -5000,
        }

        this.endPos = {
            x: 3000,
            y: 5000
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
            hardness : this.hardness,
            size : Utils.getRandomNumber(this.minSize, this.maxSize),
            type : this.type,
            x : 3000 + Utils.getRandomNumber(-500, 500),
            y : Utils.getRandomNumber(this.startPos.y, this.endPos.y)
        }

        this.getParentSector().getAsteroids().set(asteroid.id, asteroid);
    }  
}