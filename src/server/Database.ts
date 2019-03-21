import { DataObjects } from "../shared/scripts/ObjectInterfaces";
import { IdHandler } from "./IdHandler";
import { ItemFactory } from "./ItemFactory";
import { ShipModules } from "../shared/scripts/ShipModules"

export module Database {

    export function getPlayerId(username : string) {
      return IdHandler.getNewPlayerId();
    }

    export function getPlayer(playerId : number, socket : any) {
        let ship : DataObjects.IShip = {
          id: IdHandler.getNewGameObjectId(),
          x : 0,
          y : 0,
          speed: 2,
          isMoving : false,
          destinationX : 0,
          destinationY : 0,
          acceleration : 0.2,
          velVec : [0, 0],
          maxSpeed : 10,
          modules : [
                        //TODO load from data base, dont create new shit
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.POWER_GENERATOR_MODULE_I, 1), x: -1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.SHIELD_GENERATOR_MODULE_I, 1), x: 0, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE_I, 1), x: 1, y : -1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.LASER_MODULE_I, 1), x: -1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I, 1), x: 0, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE_I, 1), x: 1, y : 0},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.AVOIDANCE_SYSTEM_MODULE_I, 1), x: -1, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.REPAIR_FACILITY_MODULE_I, 1), x: 0, y : 1},
                        {module: ItemFactory.createModule(ShipModules.SHIP_MODULE_TYPE_ENUM.SHIP_PLATING_MODULE_I, 1), x: 1, y : 1}
                    ],
          stats : {
            [DataObjects.ShipStatTypeEnum.acceleration] : 0,
            [DataObjects.ShipStatTypeEnum.armor] : 0,
            [DataObjects.ShipStatTypeEnum.armor_explosion_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.armor_heat_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.armor_impact_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.armor_repair] : 0,
            [DataObjects.ShipStatTypeEnum.avoidance_systems] : 0,
            [DataObjects.ShipStatTypeEnum.cargo_hold] : 0,
            [DataObjects.ShipStatTypeEnum.energy_grid] : 0,
            [DataObjects.ShipStatTypeEnum.gravity_detection_range] : 0,
            [DataObjects.ShipStatTypeEnum.hull] : 0,
            [DataObjects.ShipStatTypeEnum.max_speed] : 0,
            [DataObjects.ShipStatTypeEnum.shield] : 0,
            [DataObjects.ShipStatTypeEnum.shield_explosion_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.shield_generation] : 0,
            [DataObjects.ShipStatTypeEnum.shield_heat_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.shield_impact_resistance] : 0,
            [DataObjects.ShipStatTypeEnum.targeting_systems] : 0,
            [DataObjects.ShipStatTypeEnum.thrust] : 0,
            [DataObjects.ShipStatTypeEnum.vision_range] : 0,
            [DataObjects.ShipStatTypeEnum.weight] : 0
          },
          properties : {
            currentArmor: 0,
            currentHull : 0,
            currentShield : 0
          }
        }  

        let updatedShip = updateShipProperties(ship);

        let newPlayer : DataObjects.IPlayer = {
          socket : socket,
          ship : updatedShip
        }

        return newPlayer;
    }

    function updateShipProperties(ship : DataObjects.IShip) : DataObjects.IShip {
      let newShip = ship;
      newShip.modules.forEach(
        module => module.module.stats.forEach(
          moduleProp => ship.stats[moduleProp.property] = ship.stats[moduleProp.property] + moduleProp.value
        )
      );

      newShip.properties.currentArmor = newShip.stats[DataObjects.ShipStatTypeEnum.armor];
      newShip.properties.currentShield = newShip.stats[DataObjects.ShipStatTypeEnum.shield];
      newShip.properties.currentHull = newShip.stats[DataObjects.ShipStatTypeEnum.hull];
      return newShip;
    }

}