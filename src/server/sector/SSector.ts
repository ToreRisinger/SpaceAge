import { PacketFactory } from "../PacketFactory";
import { SClient } from "../objects/SClient";
import { SNpc } from "../objects/npc/SNpc";
import { SShip } from "../objects/SShip";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { Spawner } from "../spawner/Spawner";
import { IContainer } from "../../shared/data/gameobject/IContainer";
import { IdHandler } from "../IdHandler";
import { CargoUtils } from "../CargoUtils";
import { IItem } from "../../shared/data/item/IItem";
import { NpcInfo } from "../../shared/data/npc/NpcInfo";
import { Utils } from "../../shared/util/Utils";
import { SCharacter } from "../objects/SCharacter";
import { SectorDefinition } from "./SectorDefinition";
import { AsteroidSpawner } from "../spawner/AsteroidSpawner";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { NpcSpawner } from "../spawner/NpcSpawner";
import { ENpcType } from "../../shared/data/npc/ENpcType";
import { Events } from "../../shared/util/Events";
import { ISpaceStation } from "../../shared/data/gameobject/ISpaceStation";
import { ISceneObject } from "../../shared/data/gameobject/ISceneObject";

const math = require('mathjs');
math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};

export interface IPlayerCargoPair {
  cargo: IContainer,
  playerId: number | undefined
}

export class SSector {

    protected clients: Map<number, SClient>;
    protected newClients: Array<SClient>;
    protected npcs: Map<number, SNpc>;
    private asteroids: Map<number, IAsteroid>;
    private containers: Map<number, IPlayerCargoPair>;
    private playerToContainerMap: Map<number, number>;
    private spaceStation: ISpaceStation | undefined;
    private sceneObjects: Array<ISceneObject>

    private spawners: Array<Spawner>;
    
    protected x: number;
    protected y: number;
    protected sectorId: number;
    protected sectorName: string;
    protected id: number;

    constructor(
      sectorId : number,
      x : number, 
      y : number, 
      sectorName : string, 
      id : number,
      sectorDefinitions: Array<SectorDefinition.ISectorDef>) {
        this.sectorId = sectorId;
        this.x = x;
        this.y = y;
        this.sectorName = sectorName;
        this.id = id;

        this.clients = new Map<number, SClient>();
        this.newClients = new Array();
        this.npcs = new Map<number, SNpc>();
        this.asteroids = new Map<number, IAsteroid>();
        this.containers = new Map<number, IPlayerCargoPair>();
        this.playerToContainerMap = new Map<number, number>();
        this.spawners = new Array();
        this.sceneObjects = new Array();

        this.setupSector(sectorDefinitions);

        this.spawners.forEach(spawner => {
          spawner.getSceneObjects().forEach(obj => {
            this.sceneObjects.push(obj);
          })
          
        });
    }

    private setupSector(sectorDefinitions: Array<SectorDefinition.ISectorDef>) {
      sectorDefinitions.forEach(def => {
        if(SectorDefinition.instanceOfIAsteroidDef(def)) {
          
          let asteroidType = this.getAsteroidType(def.asteroidType);
          this.addSpawner(new AsteroidSpawner(this, 0, 0, asteroidType, def.asteroidHardness, def.asteroidMinSize, def.maxNumberOfAsteroids, def.asteroidGenerationRate, def.maxNumberOfAsteroids));
        } else if(SectorDefinition.instanceOfIPirateDef(def)) {
          for(let i = 0; i < def.locations; i++) {
            this.addSpawner(new NpcSpawner(this, this.getNpcType(def.type), def.level, def.maxNrOfNpcs, def.spawnRate));
          }
        } else if(SectorDefinition.instanceOfISmugglerDef(def)) {
          for(let i = 0; i < def.locations; i++) {
            this.addSpawner(new NpcSpawner(this, this.getNpcType(def.type), def.level, def.maxNrOfNpcs, def.spawnRate));
          }
        } else if(SectorDefinition.instanceOfISpaceStationDef(def)) {
          this.spaceStation = {
            id: IdHandler.getNewGameObjectId(),
            x: Utils.getRandomNumber(-2000, 2000),
            y: Utils.getRandomNumber(-2000, 2000),
            name: this.getName()
          }
        }
      });
    }

    public getSectorId() {
      return this.sectorId;
    }

    public getX() {
      return this.x;
    }

    public getY() {
      return this.y;
    }

    public getName() {
      return this.sectorName;
    }

    public getId() {
      return this.id;
    }

    public update40ms() {
      this.newClients.forEach(client => {
        this.handleNewClient(client);
      })
      this.newClients = new Array();

      this.clients.forEach(client => {
        client.update40ms(this);
      });

      this.npcs.forEach(npc => {
        npc.update40ms(this);
      });
      this.spawners.forEach(spawner=> {
        spawner.update40ms();
      });

      this.sendShipUpdates();
    }

    public update1000ms() {
      this.clients.forEach(client => {
        client.update1000ms(this);
      });

      this.npcs.forEach(npc => {
        npc.update1000ms(this);
      });

      this.handleDestroyedNpcs();

      this.spawners.forEach(spawner=> {
        spawner.update1000ms();
      });

      this.handleEmptyContainers();
      this.sendContainers();
      this.handleDestroyedAsteroids();
      this.sendAsteroidUpdates();
      this.sendUpdatedCargo();
      this.sendSpaceStationData(this.spaceStation);
    }

    public addClient(client : SClient) {
      client.getCharacter().getData().sectorId = this.sectorId;
      this.clients.set(client.getData().id, client);
      this.newClients.push(client);

    }

    public removeClient(client : SClient) {
      this.clients.delete(client.getData().id);
      this.closeCargo(client);
      this.sendClientDisconnected(client.getCharacter().getData().id);
    }

    public addNpc(npc: SNpc): void {
      this.npcs.set(npc.getData().id, npc);
    }

    public addSpawner(spawner: Spawner): void {
      this.spawners.push(spawner);
    }

    public addContainer(container: IContainer): void {
      this.containers.set(container.id, {cargo: container, playerId: undefined});
    }

    private sendClientDisconnected(disconnectedShipId : number) {
      let packet : any = PacketFactory.createPlayerDisconnectedPacket(disconnectedShipId);
      this.clients.forEach((client: SClient, key: number) => {
        client.getData().socket.emit('ServerEvent', packet)
      });
    }
  
    private sendShipUpdates() {
      let packet : any = PacketFactory.createShipsUpdatePacket(this.clients, this.npcs);
      this.clients.forEach((client: SClient, key: number) => {
        client.getData().socket.emit("ServerEvent", packet);
      });
    }

    private sendContainers() {
      let packet : any = PacketFactory.createContainerPacket(this.clients, this.containers);
      this.clients.forEach((client: SClient, key: number) => {
        client.getData().socket.emit("ServerEvent", packet);
      });
    }

    public getShip(id: number): SShip | undefined{
      let client = this.clients.get(id);
      if(client != undefined) {
        return client.getCharacter();
      } else {
        let ship = this.npcs.get(id);
        if(ship != undefined) {
          return ship;
        } else {
          return undefined;
        }
      }
    }

    public getAsteroids() {
      return this.asteroids;
    }

    public getNpcs() {
      return this.npcs;
    }

    public getContainers() {
      return this.containers;
    }

    public closeCargo(client: SClient): void {
      let cargoId = this.playerToContainerMap.get(client.getData().id);
      if(cargoId != undefined) {
        let cargo = this.containers.get(cargoId);
        if(cargo != undefined) {
          cargo.playerId = undefined;
        }
      }
      
      this.playerToContainerMap.delete(client.getData().id);
    }

    //Make this thread safe?
    public openCargoRequest(client: SClient, cargoId: number): boolean {
      let playerCargoPair = this.containers.get(cargoId);
      if(playerCargoPair != undefined) {
        if(this.canInteractWithCargo(client, playerCargoPair)) {
          this.lockCargo(client, playerCargoPair);
          return true;
        }
      }
      

      return false;
    }

    public takeItems(client: SClient, indexes: Array<number>, cargoId: number) {
      let playerCargoPair = this.containers.get(cargoId);
      if(playerCargoPair != undefined) {
        if(this.canInteractWithCargo(client, playerCargoPair)) {
          let indexesSet = new Set(indexes);
          let itemsRemaining = new Array<IItem>();
          for(let i = 0; i < playerCargoPair.cargo.cargo.items.length; i++) {
            if(indexesSet.has(i)) {
              CargoUtils.addItemToPlayerCargo(playerCargoPair.cargo.cargo.items[i], client.getCharacter());
            } else {
              itemsRemaining.push(playerCargoPair.cargo.cargo.items[i]);
            }
          }
          playerCargoPair.cargo.cargo.items = itemsRemaining;
        }
      }
    }

    private canInteractWithCargo(client: SClient, playerCargoPair: IPlayerCargoPair): boolean {
      let clientId = client.getData().id;
      if(playerCargoPair.playerId == undefined || playerCargoPair.playerId == clientId) {
        let xDiff = client.getData().character.x - playerCargoPair.cargo.x;
        let yDiff = client.getData().character.y - playerCargoPair.cargo.y;
        let length = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        if(length <= 1000) {
          return true;
        }
      }

      return false;
    }

    private lockCargo(client: SClient, playerCargoPair: IPlayerCargoPair) {
      let clientId = client.getData().id;
      playerCargoPair.playerId = clientId;
      this.playerToContainerMap.set(clientId, playerCargoPair.cargo.id);
    }

    private handleDestroyedNpcs() {
      let destroyedNpcIds: Array<number> = new Array();
      this.npcs.forEach(npc => {
        if(npc.isDestroyed()) {
          let npcInfo: NpcInfo.INpcInfo = NpcInfo.getNpcInfo(npc.getData().type);
          let destroyedById: number | undefined = npc.getDestroyedById();
          if(destroyedById != undefined) {
            let destroyedBy: SClient | undefined = this.clients.get(destroyedById);
            if(destroyedBy != undefined) {
              destroyedBy.getData().character.money += Utils.getRandomNumber(npcInfo.bounty.bountyMin, npcInfo.bounty.bountyMax);
            }
          }
          
          let items: Array<IItem> = new Array();
          let nrOfLoot = Utils.getRandomNumber(npcInfo.loot.numberOfLootMin, npcInfo.loot.numberOfLootMax);
          for(let i = 0; i < nrOfLoot; i++) {
            let random = Utils.getRandomNumber(0, npcInfo.loot.possibleLootList.length - 1);
            let loot = npcInfo.loot.possibleLootList[Utils.getRandomNumber(0, npcInfo.loot.possibleLootList.length - 1)];
            let item: IItem = {
              itemType : loot.itemType,
              module: undefined,
              quantity: Utils.getRandomNumber(loot.quantityMin, loot.quantityMax)
            }
            items.push(item);
          }

          destroyedNpcIds.push(npc.getData().id);
          this.addContainer({
            id: IdHandler.getNewGameObjectId(),
            x: npc.getData().x,
            y: npc.getData().y,
            cargo: {
              items: items
            }
          })
        }
      });

      destroyedNpcIds.forEach(npcId => {
        this.npcs.delete(npcId);
      })

      this.sendDestroyedGameObjects(destroyedNpcIds);
    }

    private handleEmptyContainers() {
      let idsToRemove: Array<number> = new Array();
      this.containers.forEach(container => {
        if(container.cargo.cargo.items.length == 0) {
          idsToRemove.push(container.cargo.id);
          let containerToDelete = this.containers.get(container.cargo.id);
          if(containerToDelete != undefined) {
            let playerLink = containerToDelete.playerId;
            if(playerLink != undefined) {
              this.playerToContainerMap.delete(playerLink);
            }
          }
          this.containers.delete(container.cargo.id);
        }
      });

      this.sendDestroyedGameObjects(idsToRemove);
    }

    private sendDestroyedGameObjects(idList : number[]) {
      let packet : any = PacketFactory.createDestroyedGameObjectsPacket(idList);
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

  private sendAsteroidUpdates() {
    let packet : any = PacketFactory.createAsteroidsUpdatePacket(this.getAsteroids());
    this.clients.forEach((client: SClient, key: number) => {
      client.getData().socket.emit("ServerEvent", packet);
    });
  }

  private sendSpaceStationData(spaceStation: ISpaceStation | undefined) {
    if(spaceStation == undefined) {
      return;
    }

    let packet: Events.SPACE_STATION_UPDATE_EVENT_CONFIG = {
        eventId: Events.EEventType.SPACE_STATION_UPDATE_EVENT,
        data: {
            spaceStation: spaceStation
        }
    }
    this.clients.forEach(client => {
        client.getData().socket.emit("ServerEvent", packet);
    });
  }

  private getAsteroidType(typeString : string) : EMineralItemType {
    switch (typeString) {
        case "gold":
            return EMineralItemType.GOLD_ORE;
        case "iron":
            return EMineralItemType.IRON_ORE; 
        case "diamond":
            return EMineralItemType.DIAMOND_ORE;
        case "uranium":
            return EMineralItemType.URANIUM_ORE;
        case "titanium":
            return EMineralItemType.TITANIUM_ORE;   
        default:
            throw new TypeError("Sector definition error. Could not parse asteroidType");
    }
  }

  private getNpcType(typeString : string) : ENpcType {
    switch (typeString) {
        case "smuggler":
            return ENpcType.SMUGGLER;
        case "pirate":
            return ENpcType.PIRATE; 
        case "TRADER":
            return ENpcType.TRADER;  
        default:
          throw new TypeError("Sector definition error. Could not parse npc type");
    }
  }

  private handleNewClient(client: SClient): void {
    let packet: Events.SCENE_OBJECT_UPDATE_EVENT_CONFIG = {
      eventId: Events.EEventType.SCENE_OBJECT_UPDATE_EVENT,
      data: {
        sceneObjects: this.sceneObjects
      }
    }
    client.getData().socket.emit("ServerEvent", packet);
  }
}