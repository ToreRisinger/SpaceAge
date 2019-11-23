import { Sector } from "./Sector";
import { AsteroidData } from "../shared/scripts/AsteroidData";
import { IdHandler } from "./IdHandler";
import { Utils } from "../shared/scripts/Utils";
import { PacketFactory } from "./PacketFactory";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { ItemFactory } from "./ItemFactory";
import { Items } from "../shared/scripts/Items";
import { CargoUtils } from "./CargoUtils";
import { Asteroid } from "../client/scripts/game_objects/Asteroid";

const math = require('mathjs');

export class AsteroidBeltSector extends Sector {

    private type : Items.EMineralItemType;
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
        type : Items.EMineralItemType, 
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

        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
            if(player.ship.isMining) {
              this.handleMiningShip(player.ship, player);
            }
        });

        this.handleDestroyedAsteroids();
        this.sendAsteroidUpdates();
        this.sendUpdatedCargo();
        
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

    private handleMiningShip(miningShip : ObjectInterfaces.IShip, player : ObjectInterfaces.IPlayer) {
        let targetAsteroid = this.asteroids.get(miningShip.targetId);
        let cargoSpaceLeft = miningShip.stats[ObjectInterfaces.EShipStatType.cargo_hold] - CargoUtils.getCargoSize(player);
        if(targetAsteroid != undefined && cargoSpaceLeft > 0) {
          let miningShipPos = [miningShip.x, miningShip.y];
          let asteroidPos = [targetAsteroid.x, targetAsteroid.y];
          let miningShipToAsteroidVec = math.subtract(miningShipPos, asteroidPos);
          let miningShipToAsteroidDistance : number = math.length(miningShipToAsteroidVec);
          let miningShipMiningRange = miningShip.stats[ObjectInterfaces.EShipStatType.mining_laser_range];
          if(miningShipToAsteroidDistance <= miningShipMiningRange) {
            let sizeMined = Math.floor(miningShip.stats[ObjectInterfaces.EShipStatType.mining_laser_strength] / targetAsteroid.hardness);
            if(sizeMined == 0) {
                sizeMined = 1;
            }

            if(sizeMined > cargoSpaceLeft) {
                sizeMined = cargoSpaceLeft;
            }

            if(targetAsteroid.size >= sizeMined) {
                CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, sizeMined), player);
                targetAsteroid.size = targetAsteroid.size - sizeMined;
            } else {
                CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, targetAsteroid.size), player);
                targetAsteroid.size = 0;
            }
          } 
        }
    }

    private sendAsteroidUpdates() {
        let packet : any = PacketFactory.createAsteroidsUpdatePacket(this.asteroids);
        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
          player.socket.emit("ServerEvent", packet);
        });
    }

    private sendUpdatedCargo() {
        CargoUtils.getPlayersWithChangedCargo().forEach((player: ObjectInterfaces.IPlayer, key: number) => {
            let packet : any = PacketFactory.createCargoUpdatePacket(player.cargo);
            player.socket.emit("ServerEvent", packet);
        });
    }

    private handleDestroyedAsteroids() {
        let allAsteroidsToDestroy = Array.from(this.asteroids.values()).filter(current => current.size == 0).map(asteroid => asteroid.id);
        if(allAsteroidsToDestroy.length > 0) {
            this.sendDestroyedAsteroids(allAsteroidsToDestroy);
            allAsteroidsToDestroy.forEach(asteroid => this.asteroids.delete(asteroid))
        }
    }

    private sendDestroyedAsteroids(asteroidIdsTodestroy : number[]) {
        let packet : any = PacketFactory.createDestroyedGameObjectsPacket(asteroidIdsTodestroy);
        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
            player.socket.emit("ServerEvent", packet);
        });
    }
}