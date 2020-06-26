import { PacketFactory } from "../PacketFactory";
import { SClient } from "../objects/SClient";
import { ESectorType } from "../../shared/data/sector/ESectorType";
import { SNpc } from "../objects/npc/SNpc";
import { SShip } from "../objects/SShip";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { Spawner } from "../spawner/Spawner";
import { IShipwreck } from "../../shared/data/gameobject/IShipwreck";
import { IdHandler } from "../IdHandler";
import { EMineralItemType } from "../../shared/data/item/EMineralItemType";
import { CargoUtils } from "../CargoUtils";
import { IItem } from "../../shared/data/item/IItem";
import { NpcInfo } from "../../shared/data/npc/NpcInfo";
import { Utils } from "../../shared/util/Utils";

const math = require('mathjs');
math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};

export interface IPlayerCargoPair {
  cargo: IShipwreck,
  playerId: number | undefined
}

export class SSector {

    protected clients: Map<number, SClient>;
    protected npcs: Map<number, SNpc>;
    private asteroids: Map<number, IAsteroid>;
    private shipWrecks: Map<number, IPlayerCargoPair>;
    private playerToShipWreckMap: Map<number, number>;

    private spawners: Array<Spawner>;
    
    protected x: number;
    protected y: number;
    protected sector_x: number;
    protected sector_y: number;
    protected sectorName: string;
    protected id: number;
    protected sectorType: ESectorType;

    constructor(
      sector_x : number,
      sector_y : number, 
      x : number, 
      y : number, 
      sectorName : string, 
      id : number,
      sectorType: ESectorType) {
        this.sector_x = sector_x;
        this.sector_y = sector_y;
        this.x = x;
        this.y = y;
        this.sectorName = sectorName;
        this.id = id;
        this.sectorType = sectorType;

        this.clients = new Map<number, SClient>();
        this.npcs = new Map<number, SNpc>();
        this.asteroids = new Map<number, IAsteroid>();
        this.shipWrecks = new Map<number, IPlayerCargoPair>();
        this.playerToShipWreckMap = new Map<number, number>();
        this.spawners = new Array();
    }

    public getSectorX() {
      return this.sector_x;
    }

    public getSectorY() {
      return this.sector_y;
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
    
    public getSectorType() : ESectorType {
      return this.sectorType;
    }

    public update40ms() {
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

      this.handleEmptyShipwrecks();
      
      this.sendShipWrecks();
    }

    public addClient(client : SClient) {
      this.clients.set(client.getData().id, client);
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

    public addShipWreck(shipWreck: IShipwreck): void {
      this.shipWrecks.set(shipWreck.id, {cargo: shipWreck, playerId: undefined});
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

    private sendShipWrecks() {
      let packet : any = PacketFactory.createShipWreckPacket(this.clients, this.shipWrecks);
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

    public getShipWrecks() {
      return this.shipWrecks;
    }

    public closeCargo(client: SClient): void {
      let cargoId = this.playerToShipWreckMap.get(client.getData().id);
      if(cargoId != undefined) {
        let cargo = this.shipWrecks.get(cargoId);
        if(cargo != undefined) {
          cargo.playerId = undefined;
        }
      }
      
      this.playerToShipWreckMap.delete(client.getData().id);
    }

    //Make this thread safe?
    public openCargoRequest(client: SClient, cargoId: number): boolean {
      let playerCargoPair = this.shipWrecks.get(cargoId);
      if(playerCargoPair != undefined) {
        if(this.canInteractWithCargo(client, playerCargoPair)) {
          this.lockCargo(client, playerCargoPair);
          return true;
        }
      }
      

      return false;
    }

    public takeItems(client: SClient, indexes: Array<number>, cargoId: number) {
      let playerCargoPair = this.shipWrecks.get(cargoId);
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
      this.playerToShipWreckMap.set(clientId, playerCargoPair.cargo.id);
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
          this.addShipWreck({
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

    private handleEmptyShipwrecks() {
      let idsToRemove: Array<number> = new Array();
      this.shipWrecks.forEach(shipwreck => {
        if(shipwreck.cargo.cargo.items.length == 0) {
          idsToRemove.push(shipwreck.cargo.id);
          let shipwreckToDelete = this.shipWrecks.get(shipwreck.cargo.id);
          if(shipwreckToDelete != undefined) {
            let playerLink = shipwreckToDelete.playerId;
            if(playerLink != undefined) {
              this.playerToShipWreckMap.delete(playerLink);
            }
          }
          this.shipWrecks.delete(shipwreck.cargo.id);
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
}