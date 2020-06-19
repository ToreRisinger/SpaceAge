import { PacketFactory } from "../PacketFactory";
import { SClient } from "../objects/SClient";
import { SCharacter } from "../objects/SCharacter";
import { ICharacter } from "../../shared/data/gameobject/ICharacter";
import { DamageService } from "../DamageService";
import { ESectorType } from "../../shared/data/sector/ESectorType";
import { EStatType } from "../../shared/data/stats/EStatType";
import { SNpc } from "../objects/npc/SNpc";
import { Utils } from "../../shared/util/Utils";
import { SShip } from "../objects/SShip";
import { IShip } from "../../shared/data/gameobject/IShip";
import { NpcSpawner } from "../spawner/NpcSpawner";

const math = require('mathjs');
math.length = function vec2Length(vec2 : Array<number>) {
  return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
};

let UPDATES_PER_SECOND : number = 25;

export class Sector {

    protected clients: Map<number, SClient>;
    protected npcs: Map<number, SNpc>;
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

    public addNpc(npc: SNpc): void {
      this.npcs.set(npc.getData().id, npc);
    }

    public update40ms() {
      this.clients.forEach((client: SClient, key: number) => {
        let character: SCharacter = client.getCharacter();
        if(character.getData().warpState.isWarping) {
          this.updateWarpingShipPosition(character);
        } else if(character.getData().state.isMoving || character.getData().state.hasDestination) {
          this.updateShipPosition(character);
        }
      });

      this.npcs.forEach(npc => {
        npc.update40ms();
        if(npc.getData().state.isMoving || npc.getData().state.hasDestination) {
          this.updateShipPosition(npc);
        }
      });
        
      this.sendShipUpdates();
    }

    public update1000ms() {

        this.clients.forEach((client: SClient, key: number) => {
          if(client.getCharacter().getData().state.isAttacking) {
            this.handleAttackingShip(client.getCharacter());
          }
        });

        this.npcs.forEach((npc: SShip, key: number) => {
          npc.update1000ms();
          if(npc.getData().state.isAttacking) {
            this.handleAttackingShip(npc);
          }
        });

        if(Utils.chance(10)) {
          this.npcs.set
        }

        /*
        TODO check if any ship died
        handleDestroyedShip(ship);
        */
    }

    public addClient(client : SClient) {
        this.clients.set(client.getData().id, client);
    }

    public removeClient(client : SClient) {
        this.clients.delete(client.getData().id);
        this.sendClientDisconnected(client.getCharacter().getData().id);
    }

    private sendClientDisconnected(disconnectedShipId : number) {
        let packet : any = PacketFactory.createPlayerDisconnectedPacket(disconnectedShipId);
        this.clients.forEach((client: SClient, key: number) => {
          client.getData().socket.emit('ServerEvent', packet)
        });
    }

    private updateWarpingShipPosition(character : SCharacter) {
      let characterData: ICharacter = character.getData();
      let totalLength = math.length(math.subtract(characterData.warpState.warpDestination,[this.x + characterData.warpState.warpSource[0], this.y + characterData.warpState.warpSource[1]] ));
      let distanceTraveled = math.length(
                                math.subtract([this.x + characterData.warpState.warpSource[0], this.y + characterData.warpState.warpSource[1]], 
                                  [this.x + characterData.x, this.y + characterData.y]));;
      let shipToDest = math.subtract(characterData.warpState.warpDestination, [this.x + characterData.x, this.y + characterData.y]);
      
      let speed = 1000000;
      let ratio = distanceTraveled / totalLength;
      let acceleration = 1 + ratio * speed;
      let velVec = math.multiply(math.multiply(shipToDest, 1/math.length(shipToDest)), acceleration);

      characterData.x = characterData.x + velVec[0];
      characterData.y = characterData.y + velVec[1];
      characterData.state.meters_per_second = math.length(velVec) / UPDATES_PER_SECOND
    }

    private updateShipPosition(ship : SShip) {
      let shipData: IShip = ship.getData();
        function getMidPointVec(shipToDestVec :  Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
          function getDivider(goodVelVecComp : Array<number>, badVelVecComp : Array<number>) {
            if(math.length(badVelVecComp) != 0) {
              let lengthOfBadVelVecComp = math.length(badVelVecComp);
              let lengthOfBadVelVecCompSquared1 = lengthOfBadVelVecComp * lengthOfBadVelVecComp;
              //let lengthOfBadVelVecCompSquared2 = lengthOfBadVelVecCompSquared1 * lengthOfBadVelVecCompSquared1;
              //let lengthOfBadVelVecCompSquared3 = lengthOfBadVelVecCompSquared2 * lengthOfBadVelVecCompSquared2;
              //let lengthOfBadVelVecCompSquared4 = lengthOfBadVelVecCompSquared3 * lengthOfBadVelVecCompSquared3;
              let divider = lengthOfBadVelVecCompSquared1;
              return math.length(goodVelVecComp) / (math.length(goodVelVecComp) + divider);
            } else {
              return 1;
            }
          }
      
          let divider = getDivider(goodVelVecComp, badVelVecComp);
          if(divider < 0.25) {
            divider = 0.25;
          }
      
          let midPointVec = math.multiply(shipToDestVec, divider);
          return  midPointVec;
        }

        function calculateNewVelocityVector(shipToDestVec : Array<number>, shipVelVec : Array<number>, goodVelVecComp : Array<number>, badVelVecComp : Array<number>, shipAcceleration : number) {
          let newVelVec = [0, 0];
          let midPoint = getMidPointVec(shipToDestVec, goodVelVecComp, badVelVecComp);
          let nrOfUpdatesUntilReachDestination = math.multiply(math.length(shipToDestVec), 1/math.length(goodVelVecComp));
          let nrOfStepsNeededToDecelerate = math.multiply(math.length(goodVelVecComp), 1/shipAcceleration)
          if(nrOfUpdatesUntilReachDestination <= nrOfStepsNeededToDecelerate) {
            midPoint = [0.5, 0.5];
          }
      
          let velVecToMidPoint = math.subtract(midPoint, shipVelVec);
          let normalizedVelVecToMidPoint = math.multiply(velVecToMidPoint, 1/math.length(velVecToMidPoint));
          let directionVecAdjustmentVec = math.multiply(normalizedVelVecToMidPoint, shipAcceleration  / UPDATES_PER_SECOND);
          newVelVec = math.add(shipVelVec, directionVecAdjustmentVec);
      
          return newVelVec;
        }
        
        let acceleration = shipData.stats[EStatType.acceleration];
        let destVec = shipData.state.destVec;
        let shipPosVec = [shipData.x, shipData.y];
        let shipToDestVec = math.subtract(destVec, shipPosVec);
        let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
        let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(shipData.state.velVec, normalizedShipToDestVec));
        let badVelVecComp = math.subtract(shipData.state.velVec, goodVelVecComp);
        
        if(shipData.state.hasDestination) {
          if(math.length(shipToDestVec) <= acceleration / UPDATES_PER_SECOND && math.length(shipData.state.velVec) - acceleration / UPDATES_PER_SECOND <= 0) {
            shipData.state.isMoving = false;
            shipData.x = shipData.state.destVec[0];
            shipData.y = shipData.state.destVec[1];
            shipData.state.hasDestination = false;
          }
        } else if(math.length(shipData.state.velVec) - acceleration / UPDATES_PER_SECOND <= 0) {
          shipData.state.isMoving = false;
        }
          
        if(shipData.state.isMoving) { 
          let newVelVec = shipData.state.hasDestination
            ? calculateNewVelocityVector(shipToDestVec, shipData.state.velVec, goodVelVecComp, badVelVecComp, acceleration)
            : math.subtract(shipData.state.velVec, math.multiply(shipData.state.velVec, (acceleration/UPDATES_PER_SECOND)/math.length(shipData.state.velVec)));

          let newVelVecLength = math.length(newVelVec);

          let shipMaxSpeed = shipData.stats[EStatType.max_speed];
          if(newVelVecLength > shipMaxSpeed) {
            shipData.state.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
          } else {
            shipData.state.velVec = newVelVec;
          }

          shipData.x = shipData.x + shipData.state.velVec[0] / UPDATES_PER_SECOND;
          shipData.y = shipData.y + shipData.state.velVec[1] / UPDATES_PER_SECOND;
          shipData.state.meters_per_second = math.length(shipData.state.velVec);
        } else {
          shipData.state.meters_per_second = 0;
          shipData.state.velVec = [0, 0];
        }
    }

    private handleAttackingShip(attackingShip : SShip) {
        let targetClient = this.clients.get(attackingShip.getData().state.targetId);
        if(targetClient != undefined) {
            let targetCharacter : SCharacter = targetClient.getCharacter();
            let attackingShipPos = [attackingShip.getData().x, attackingShip.getData().y];
            let targetShipPos = [targetCharacter.getData().x, targetCharacter.getData().y];
            let attackingShipToTargetShipVec = math.subtract(attackingShipPos, targetShipPos);
            let attackingShipToTargetShipDistance : number = math.length(attackingShipToTargetShipVec);
            let attackingShipWeaponRange = attackingShip.getData().stats[EStatType.weapon_range];
            if(attackingShipToTargetShipDistance <= attackingShipWeaponRange) {
                DamageService.attackShip(attackingShip, targetCharacter);
            } 
        }
    }
  
    private sendShipUpdates() {
        let packet : any = PacketFactory.createShipsUpdatePacket(this.clients, this.npcs);
        this.clients.forEach((client: SClient, key: number) => {
          client.getData().socket.emit("ServerEvent", packet);
        });
    }
}