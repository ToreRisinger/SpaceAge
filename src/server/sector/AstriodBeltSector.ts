import { Sector } from "./Sector";
import { AsteroidInfo } from "../../shared/data/astroid/AsteroidInfo";
import { IdHandler } from "../IdHandler";
import { Utils } from "../../shared/util/Utils";
import { PacketFactory } from "../PacketFactory";
import { ItemFactory } from "../ItemFactory";
import { CargoUtils } from "../CargoUtils";
import { SClient } from "../objects/SClient";
import { CombatLogManager } from "../CombatLogManager";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { ESectorType } from "../../shared/data/sector/ESectorType";
import { EStatType } from "../../shared/data/stats/EStatType";
import { NpcSpawner } from "../spawner/NpcSpawner";
import { ENpcType } from "../../shared/data/npc/ENpcType";

const math = require('mathjs');

export class AsteroidBeltSector extends Sector {

    private type: EMineralItemType;
    private hardness: number;
    private minSize: number;
    private maxSize: number;
    private generationRate: number;
    private maxNrOfAsteroids: number;
    private timePassedSinceLastGeneration: number;
    private asteroids: Map<number, IAsteroid>;
    private npcSpawner: NpcSpawner;

    constructor(
        sector_x : number,
        sector_y : number,
        x : number, 
        y : number, 
        sectorName : string,
        id : number,
        sectorType: ESectorType,
        type : EMineralItemType, 
        hardness : number, 
        minSize : number, 
        maxSize : number, 
        generationRate : number,
        maxNrOfAsteroids : number) {
        super(sector_x, sector_y, x, y, sectorName, id, sectorType);
        this.type = type;
        this.hardness = hardness;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generationRate = generationRate;
        this.maxNrOfAsteroids = maxNrOfAsteroids;
        this.timePassedSinceLastGeneration = 0;

        this.npcSpawner = new NpcSpawner(ENpcType.SMUGGLER, this);
        this.asteroids = new Map<number, IAsteroid>();
    }

    public update40ms() {
        super.update40ms();
        this.npcSpawner.update40ms();
    }

    public update1000ms() {
        super.update1000ms();
        this.npcSpawner.update1000ms();
        this.timePassedSinceLastGeneration++;
        if(this.timePassedSinceLastGeneration >= this.generationRate && this.asteroids.size < this.maxNrOfAsteroids) {
            this.timePassedSinceLastGeneration = 0;
            this.createAsteroid();
        }

        this.clients.forEach((client: SClient, key: number) => {
            if(client.getData().character.state.isMining) {
              this.handleMiningShip(client);
            }
        });

        this.handleDestroyedAsteroids();
        this.sendAsteroidUpdates();
        this.sendUpdatedCargo();
        
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

        this.asteroids.set(asteroid.id, asteroid);
    }

    private handleMiningShip(client: SClient) {
        let character = client.getData().character;
        let targetAsteroid = this.asteroids.get(character.state.targetId);
        let cargoSpaceLeft = client.getCharacter().getData().stats[EStatType.cargo_hold] - CargoUtils.getCargoSize(client);
        if(targetAsteroid != undefined && cargoSpaceLeft > 0) {
          let miningShipPos = [character.x, character.y];
          let asteroidPos = [targetAsteroid.x, targetAsteroid.y];
          let miningShipToAsteroidVec = math.subtract(miningShipPos, asteroidPos);
          let miningShipToAsteroidDistance : number = math.length(miningShipToAsteroidVec);
          let miningShipMiningRange = client.getCharacter().getData().stats[EStatType.mining_laser_range];
          if(miningShipToAsteroidDistance <= miningShipMiningRange) {
            let sizeMined = Math.floor(client.getCharacter().getData().stats[EStatType.mining_laser_strength] / targetAsteroid.hardness);
            if(sizeMined == 0) {
                sizeMined = 1;
            }

            if(sizeMined > cargoSpaceLeft) {
                sizeMined = cargoSpaceLeft;
            }

            if(targetAsteroid.size >= sizeMined) {
                CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, sizeMined), client);
                targetAsteroid.size = targetAsteroid.size - sizeMined;
            } else {
                CargoUtils.addItemToPlayerCargo(ItemFactory.createMineral(targetAsteroid.type, targetAsteroid.size), client);
                targetAsteroid.size = 0;
            }

            CombatLogManager.addCombatLogAstroidMinedMessage(client.getCharacter(), targetAsteroid, sizeMined);
          } 
        }
    }

    private sendAsteroidUpdates() {
        let packet : any = PacketFactory.createAsteroidsUpdatePacket(this.asteroids);
        this.clients.forEach((client: SClient, key: number) => {
          client.getData().socket.emit("ServerEvent", packet);
        });
    }

    private sendUpdatedCargo() {
        CargoUtils.getClientsWithChangedCargo().forEach((client: SClient, key: number) => {
            let packet : any = PacketFactory.createCargoUpdatePacket(client.getData().character.cargo);
            client.getData().socket.emit("ServerEvent", packet);
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
        this.clients.forEach((client: SClient, key: number) => {
            client.getData().socket.emit("ServerEvent", packet);
        });
    }
}