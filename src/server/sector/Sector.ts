import { PacketFactory } from "../PacketFactory";
import { SClient } from "../objects/SClient";
import { ESectorType } from "../../shared/data/sector/ESectorType";
import { SNpc } from "../objects/npc/SNpc";
import { SShip } from "../objects/SShip";
import { IAsteroid } from "../../shared/data/astroid/IAstroid";
import { Spawner } from "../spawner/Spawner";

const math = require('mathjs');
math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};


export class SSector {

    protected clients: Map<number, SClient>;
    protected npcs: Map<number, SNpc>;
    private asteroids: Map<number, IAsteroid>;
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

      this.spawners.forEach(spawner=> {
        spawner.update1000ms();
      });
    }

    public addClient(client : SClient) {
      this.clients.set(client.getData().id, client);
    }

    public removeClient(client : SClient) {
      this.clients.delete(client.getData().id);
      this.sendClientDisconnected(client.getCharacter().getData().id);
    }

    public addNpc(npc: SNpc): void {
      this.npcs.set(npc.getData().id, npc);
    }

    public addSpawner(spawner: Spawner): void {
      this.spawners.push(spawner);
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
}