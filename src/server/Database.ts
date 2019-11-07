import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { IdHandler } from "./IdHandler";
import { ItemFactory } from "./ItemFactory";
import { ShipModules } from "../shared/scripts/ShipModules"

export module Database {

    export function getPlayerId(username : string) {
      return IdHandler.getNewPlayerId();
    }

    export function getPlayer(playerId : number, socket : any) {
        let ship : ObjectInterfaces.IShip = {
          id: IdHandler.getNewGameObjectId(),
          x : 0,
          y : 0,
          meters_per_second: 0,
          isMoving : false,
          hasDestination : false,
          isAttacking : false,
          targetId : -1,
          destVec : [0, 0],
          velVec : [0, 0],
          modules : [
                        //TODO load from data base, dont create new shit
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.POWER_MODULE, 1), x: -1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.SHIELD_MODULE, 1), x: 0, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE, 1), x: 1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.LASER_MODULE, 1), x: -1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.MAIN_MODULE, 1), x: 0, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE, 1), x: 1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.CLOAK_SYSTEM_MODULE, 1), x: -1, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.RADAR_MODULE, 1), x: 0, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.ARMOR_MODULE, 1), x: 1, y : 1}
                    ],
          stats : {
            [ObjectInterfaces.EShipStatType.acceleration] : 0,
            [ObjectInterfaces.EShipStatType.max_speed] : 0,
            [ObjectInterfaces.EShipStatType.thrust] : 0,
            [ObjectInterfaces.EShipStatType.mass] : 0,
            [ObjectInterfaces.EShipStatType.power] : 0,
            [ObjectInterfaces.EShipStatType.hull] : 0,
            [ObjectInterfaces.EShipStatType.armor] : 0,
            [ObjectInterfaces.EShipStatType.shield] : 0,
            [ObjectInterfaces.EShipStatType.radar_range] : 0,
            [ObjectInterfaces.EShipStatType.shield_generation] : 0,
            [ObjectInterfaces.EShipStatType.armor_impact_resistance] : 0,
            [ObjectInterfaces.EShipStatType.armor_heat_resistance] : 0,
            [ObjectInterfaces.EShipStatType.armor_explosion_resistance] : 0,
            [ObjectInterfaces.EShipStatType.target_dodge_reduction] : 0,
            [ObjectInterfaces.EShipStatType.cargo_hold] : 0,
            [ObjectInterfaces.EShipStatType.dodge] : 0,
            [ObjectInterfaces.EShipStatType.radar_signature_reduction] : 0,
            [ObjectInterfaces.EShipStatType.weapon_range] : 0,
            [ObjectInterfaces.EShipStatType.explosive_dps] : 0,
            [ObjectInterfaces.EShipStatType.impact_dps] : 0,
            [ObjectInterfaces.EShipStatType.heat_dps] : 0,
            [ObjectInterfaces.EShipStatType.normal_dps] : 0,
            [ObjectInterfaces.EShipStatType.mining_laser_strength] : 0,
            [ObjectInterfaces.EShipStatType.mining_laser_range] : 0
          },
          properties : {
            currentArmor: 0,
            currentHull : 0,
            currentShield : 0
          }
        }  

        let updatedShip = updateShipProperties(ship);


        let newPlayer : ObjectInterfaces.IPlayer = {
          socket : socket,
          ship : updatedShip
        }

        return newPlayer;
    }

    function updateShipProperties(ship : ObjectInterfaces.IShip) : ObjectInterfaces.IShip {
      let newShip = ship;
      newShip.modules.forEach(
        module => module.module.stats.forEach(
          moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
        )
      );

      newShip.stats[ObjectInterfaces.EShipStatType.max_speed] = 1000;
      newShip.stats[ObjectInterfaces.EShipStatType.acceleration] = 
        newShip.stats[ObjectInterfaces.EShipStatType.thrust] / newShip.stats[ObjectInterfaces.EShipStatType.mass];


      //TODO weapon range average calculation  
      newShip.stats[ObjectInterfaces.EShipStatType.weapon_range] = 2000;

      newShip.properties.currentArmor = newShip.stats[ObjectInterfaces.EShipStatType.armor];
      newShip.properties.currentShield = newShip.stats[ObjectInterfaces.EShipStatType.shield];
      newShip.properties.currentHull = newShip.stats[ObjectInterfaces.EShipStatType.hull];
      return newShip;
    }

}