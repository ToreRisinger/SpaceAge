import { Sector } from "./Sector";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { IdHandler } from "./IdHandler";
import { Utils } from "../shared/scripts/Utils";
import { PacketFactory } from "./PacketFactory";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";

export class AsteroidBeltSector extends Sector {

    private type : AsteroidData.EAsteroidType;
    private hardness : number;
    private minSize : number;
    private maxSize : number;
    private generationRate : number;
    private maxNrOfAsteroids : number;

    private timePassedSinceLastGeneration : number;

    private asteroids : Map<number, AsteroidData.IAsteroid>;

    constructor(
        x : number, 
        y : number, 
        type : AsteroidData.EAsteroidType, 
        hardness : number, 
        minSize : number, 
        maxSize : number, 
        generationRate : number,
        maxNrOfAsteroids : number) {
        super(x, y);
        this.type = type;
        this.hardness = hardness;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generationRate = generationRate;
        this.maxNrOfAsteroids = maxNrOfAsteroids;
        this.timePassedSinceLastGeneration = 0;

        this.asteroids = new Map<number, AsteroidData.IAsteroid>();
    }

    public update40ms() {
        super.update40ms();
    }

    public update1000ms() {
        super.update1000ms();
        this.timePassedSinceLastGeneration++;
        if(this.timePassedSinceLastGeneration >= this.generationRate && this.asteroids.size < this.maxNrOfAsteroids) {
            this.timePassedSinceLastGeneration = 0;
            this.createAsteroid();
        }

        this.sendAsteroidUpdates();

        /*
        TODO mining
        if(ship.isMining) {
            handleMiningShip(ship);
        }

        TODO check if any ship died
        handleDestroyedShip(ship);
        */
    }

    private createAsteroid() {
        let asteroid : AsteroidData.IAsteroid = {
            id : IdHandler.getNewGameObjectId(),
            hardness : this.hardness,
            size : Utils.getRandomNumber(this.minSize, this.maxSize),
            type : this.type,
            x : Utils.getRandomNumber(0, 1000),
            y : Utils.getRandomNumber(0, 1000)
        }

        this.asteroids.set(asteroid.id, asteroid);
    }

    private sendAsteroidUpdates() {
        let packet : any = PacketFactory.createAsteroidsUpdatePacket(this.asteroids);
        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
          player.socket.emit("ServerEvent", packet);
        });
    }
}