import { Spawner } from "./Spawner";
import { SSector } from "../sector/Sector";
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

    constructor(sector: SSector, 
        type : EMineralItemType, 
        hardness : number, 
        minSize : number, 
        maxSize : number, 
        generationRate : number,
        maxNrOfAsteroids : number) {
        super(sector);
        this.type = type;
        this.hardness = hardness;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generationRate = generationRate;
        this.maxNrOfAsteroids = maxNrOfAsteroids;
        this.timePassedSinceLastGeneration = 0;
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
            x : Utils.getRandomNumber(0, 1000),
            y : Utils.getRandomNumber(0, 1000)
        }

        this.getParentSector().getAsteroids().set(asteroid.id, asteroid);
    }  
}