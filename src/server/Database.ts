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
          acceleration : 0.1,
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
          properties : {
            [DataObjects.ShipProperyTypeEnum.acceleration] : 0,
            [DataObjects.ShipProperyTypeEnum.armor] : 0,
            [DataObjects.ShipProperyTypeEnum.armor_explosion_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.armor_heat_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.armor_impact_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.armor_repair] : 0,
            [DataObjects.ShipProperyTypeEnum.avoidance_systems] : 0,
            [DataObjects.ShipProperyTypeEnum.cargo_hold] : 0,
            [DataObjects.ShipProperyTypeEnum.energy_grid] : 0,
            [DataObjects.ShipProperyTypeEnum.gravity_detection_range] : 0,
            [DataObjects.ShipProperyTypeEnum.hull] : 0,
            [DataObjects.ShipProperyTypeEnum.max_speed] : 0,
            [DataObjects.ShipProperyTypeEnum.shield] : 0,
            [DataObjects.ShipProperyTypeEnum.shield_explosion_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.shield_generation] : 0,
            [DataObjects.ShipProperyTypeEnum.shield_heat_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.shield_impact_resistance] : 0,
            [DataObjects.ShipProperyTypeEnum.targeting_systems] : 0,
            [DataObjects.ShipProperyTypeEnum.thrust] : 0,
            [DataObjects.ShipProperyTypeEnum.vision_range] : 0,
            [DataObjects.ShipProperyTypeEnum.weight] : 0
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
        module => module.module.properties.forEach(
          moduleProp => ship.properties[moduleProp.property] = ship.properties[moduleProp.property] + moduleProp.value
        )
      );
      return newShip;
    }

}