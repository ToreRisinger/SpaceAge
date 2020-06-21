import { SSector } from "./Sector";
import { IdHandler } from "../IdHandler";
import { Utils } from "../../shared/util/Utils";
import { PacketFactory } from "../PacketFactory";
import { CargoUtils } from "../CargoUtils";
import { SClient } from "../objects/SClient";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { ESectorType } from "../../shared/data/sector/ESectorType";
import { NpcSpawner } from "../spawner/NpcSpawner";
import { ENpcType } from "../../shared/data/npc/ENpcType";
import { SCharacter } from "../objects/SCharacter";
import { AsteroidSpawner } from "../spawner/AsteroidSpawner";

const math = require('mathjs');

export class AsteroidBeltSector extends SSector {


    
    private npcSpawner: NpcSpawner;
    private asteroidSpawner: AsteroidSpawner;

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

        this.npcSpawner = new NpcSpawner(ENpcType.SMUGGLER, this);
        this.asteroidSpawner = new AsteroidSpawner(this, type, hardness, minSize, maxSize, generationRate, maxNrOfAsteroids);
        
        this.addSpawner(this.npcSpawner);
        this.addSpawner(this.asteroidSpawner);
    }

    public update40ms() {
        super.update40ms();
    }

    public update1000ms() {
        super.update1000ms();
        
        this.handleDestroyedAsteroids();
        this.sendAsteroidUpdates();
        this.sendUpdatedCargo(); 
    }

    

    private sendAsteroidUpdates() {
        let packet : any = PacketFactory.createAsteroidsUpdatePacket(this.getAsteroids());
        this.clients.forEach((client: SClient, key: number) => {
          client.getData().socket.emit("ServerEvent", packet);
        });
    }

    private sendUpdatedCargo() {
        CargoUtils.getClientsWithChangedCargo().forEach((character: SCharacter, key: number) => {
            let client = this.clients.get(character.getData().id);
            if(client != undefined) {
                let packet : any = PacketFactory.createCargoUpdatePacket(client.getData().character.cargo);
                client.getData().socket.emit("ServerEvent", packet);
            }
        });
    }

    private handleDestroyedAsteroids() {
        let allAsteroidsToDestroy = Array.from(this.getAsteroids().values()).filter(current => current.size == 0).map(asteroid => asteroid.id);
        if(allAsteroidsToDestroy.length > 0) {
            this.sendDestroyedAsteroids(allAsteroidsToDestroy);
            allAsteroidsToDestroy.forEach(asteroid => this.getAsteroids().delete(asteroid))
        }
    }

    private sendDestroyedAsteroids(asteroidIdsTodestroy : number[]) {
        let packet : any = PacketFactory.createDestroyedGameObjectsPacket(asteroidIdsTodestroy);
        this.clients.forEach((client: SClient, key: number) => {
            client.getData().socket.emit("ServerEvent", packet);
        });
    }
}