import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { PacketFactory } from "./PacketFactory";

const math = require('mathjs');
let UPDATES_PER_SECOND : number = 25;

export class Sector {

    protected ships : Map<number, ObjectInterfaces.IShip>;
    protected players :  Map<number, ObjectInterfaces.IPlayer>;

    protected x : number;
    protected y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;

        this.ships = new Map<number, ObjectInterfaces.IShip>();
        this.players = new Map<number, ObjectInterfaces.IPlayer>();
    }

    public update40ms() {
        this.updateShipPositions();
        this.sendShipUpdates();
    }

    public update1000ms() {
        this.ships.forEach((ship: ObjectInterfaces.IShip, key: number) => {
          if(ship.isAttacking) {
            this.handleAttackingShip(ship);
          }
        });
    }

    public addPlayer(player : ObjectInterfaces.IPlayer) {
        this.players.set(player.playerId, player);
        this.ships.set(player.ship.id, player.ship);
    }

    public removePlayer(player : ObjectInterfaces.IPlayer) {
        this.players.delete(player.playerId);
        this.ships.delete(player.ship.id);
        this.sendPlayerDisconnected(player.ship.id);
    }

    private sendPlayerDisconnected(disconnectedShipId : number) {
        let packet : any = PacketFactory.createPlayerDisconnectedPacket(disconnectedShipId);
        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
          player.socket.emit('ServerEvent', packet)
        });
    }

    private updateShipPositions() {
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
        
        this.ships.forEach((ship: ObjectInterfaces.IShip, key: number) => {
          let shipAcceleration = ship.stats[ObjectInterfaces.EShipStatType.acceleration];
          let destVec = ship.destVec;
          let shipPosVec = [ship.x, ship.y];
          let shipToDestVec = math.subtract(destVec, shipPosVec);
          let normalizedShipToDestVec = math.multiply(shipToDestVec, 1/math.length(shipToDestVec));
          let goodVelVecComp = math.multiply(normalizedShipToDestVec, math.multiply(ship.velVec, normalizedShipToDestVec));
          let badVelVecComp = math.subtract(ship.velVec, goodVelVecComp);
          
          if(ship.hasDestination) {
            if(math.length(shipToDestVec) <= shipAcceleration / UPDATES_PER_SECOND && math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
              ship.isMoving = false;
              ship.x = ship.destVec[0];
              ship.y = ship.destVec[1];
              ship.hasDestination = false;
            }
          } else {
            if(math.length(ship.velVec) - shipAcceleration / UPDATES_PER_SECOND <= 0) {
              ship.isMoving = false;
            }
          }
           
          if(ship.isMoving) {
            let newVelVec = ship.hasDestination 
              ? calculateNewVelocityVector(shipToDestVec, ship.velVec, goodVelVecComp, badVelVecComp, shipAcceleration)
              : math.subtract(ship.velVec, math.multiply(ship.velVec, (shipAcceleration/UPDATES_PER_SECOND)/math.length(ship.velVec)));

            let newVelVecLength = math.length(newVelVec);

            let shipMaxSpeed = ship.stats[ObjectInterfaces.EShipStatType.max_speed];
            if(newVelVecLength > shipMaxSpeed) {
              ship.velVec = math.multiply(newVelVec, shipMaxSpeed/newVelVecLength)
            } else {
              ship.velVec = newVelVec;
            }

            ship.x = ship.x + ship.velVec[0] / UPDATES_PER_SECOND;
            ship.y = ship.y + ship.velVec[1] / UPDATES_PER_SECOND;
            ship.meters_per_second = math.length(ship.velVec);
          } else {
            ship.meters_per_second = 0;
            ship.velVec = [0, 0];
          }
        });
    }

    private handleAttackingShip(attackingShip : ObjectInterfaces.IShip) {
        let targetShip = this.ships.get(attackingShip.targetId);
        if(targetShip != undefined) {
          let attackingShipPos = [attackingShip.x, attackingShip.y];
          let targetShipPos = [targetShip.x, targetShip.y];
          let attackingShipToTargetShipVec = math.subtract(attackingShipPos, targetShipPos);
          let attackingShipToTargetShipDistance : number = math.length(attackingShipToTargetShipVec);
          let attackingShipWeaponRange = attackingShip.stats[ObjectInterfaces.EShipStatType.weapon_range];
          if(attackingShipToTargetShipDistance <= attackingShipWeaponRange) {
            this.dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.EShipStatType.normal_dps], ObjectInterfaces.EDamageType.NORMAL_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.EShipStatType.explosive_dps], ObjectInterfaces.EDamageType.EXPLOSIVE_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.EShipStatType.heat_dps], ObjectInterfaces.EDamageType.HEAT_DAMAGE);
            this.dealDamageToShip(targetShip, attackingShip.stats[ObjectInterfaces.EShipStatType.impact_dps], ObjectInterfaces.EDamageType.IMPACT_DAMAGE);
          } 
        }
      }
  
      private dealDamageToShip(ship : ObjectInterfaces.IShip, damage : number, damageType : ObjectInterfaces.EDamageType) {
        let damageLeft = damage;
        let shield = ship.properties.currentShield;
        let armor = ship.properties.currentArmor;
        let hull = ship.properties.currentHull;
  
        //Damage to shield
        if(shield - damageLeft < 0) {
          damageLeft -= shield;
          ship.properties.currentShield = 0;
        } else {
          ship.properties.currentShield -= damageLeft;
          return;
        }
  
        //Damage to armor
        let damageTypeResistPercent = this.getDamageTypeResist(ship, damageType);
        let armorDamageAfterResist = math.floor(damageLeft * damageTypeResistPercent);
        if(armor - armorDamageAfterResist < 0) {
          damageLeft -= math.floor(armor / damageTypeResistPercent);
          ship.properties.currentArmor = 0;
        } else {
          ship.properties.currentArmor -= armorDamageAfterResist;
          return;
        }
  
        //Damage to hull
        if(hull - damageLeft < 0) {
          ship.properties.currentHull = 0;
        } else {
          ship.properties.currentHull -= damageLeft;
        }
      }
  
      private getDamageTypeResist(ship : ObjectInterfaces.IShip, damageType : ObjectInterfaces.EDamageType) : number {
        let resist : number = 0;
        switch(damageType) {
          case ObjectInterfaces.EDamageType.NORMAL_DAMAGE :
            resist = 1;
            break;
          case ObjectInterfaces.EDamageType.EXPLOSIVE_DAMAGE :
            resist = 1 - ship.stats[ObjectInterfaces.EShipStatType.armor_explosion_resistance] / 100;
            break;
          case ObjectInterfaces.EDamageType.HEAT_DAMAGE :
            resist = 1 - ship.stats[ObjectInterfaces.EShipStatType.armor_heat_resistance] / 100;
            break;
          case ObjectInterfaces.EDamageType.IMPACT_DAMAGE :
            resist = 1 - ship.stats[ObjectInterfaces.EShipStatType.armor_impact_resistance] / 100;
            break;  
        }
        return resist;
      }

    private sendShipUpdates() {
        let packet : any = PacketFactory.createShipsUpdatePacket(this.players);
        this.players.forEach((player: ObjectInterfaces.IPlayer, key: number) => {
          player.socket.emit("ServerEvent", packet);
        });
    }
}