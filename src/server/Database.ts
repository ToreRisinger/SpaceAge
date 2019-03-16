import { DataObjects } from "../shared/scripts/DataObjects";
import { IdHandler } from "./IdHandler";
import { ItemFactory } from "./ItemFactory";
import { ShipModules } from "../shared/scripts/ShipModules"

export module Database {

    export function getPlayerId(username : string) {
      return IdHandler.getNewPlayerId();
    }

    export function getPlayer(playerId : number, socket : any) {
        let ship : DataObjects.Ship_Config = {
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
            [DataObjects.Ship_Property_Type_Enum.acceleration] : 0,
            [DataObjects.Ship_Property_Type_Enum.armor] : 0,
            [DataObjects.Ship_Property_Type_Enum.armor_explosion_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.armor_heat_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.armor_impact_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.armor_repair] : 0,
            [DataObjects.Ship_Property_Type_Enum.avoidance_systems] : 0,
            [DataObjects.Ship_Property_Type_Enum.cargo_hold] : 0,
            [DataObjects.Ship_Property_Type_Enum.energy_grid] : 0,
            [DataObjects.Ship_Property_Type_Enum.gravity_detection_range] : 0,
            [DataObjects.Ship_Property_Type_Enum.hull] : 0,
            [DataObjects.Ship_Property_Type_Enum.max_speed] : 0,
            [DataObjects.Ship_Property_Type_Enum.shield] : 0,
            [DataObjects.Ship_Property_Type_Enum.shield_explosion_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.shield_generation] : 0,
            [DataObjects.Ship_Property_Type_Enum.shield_heat_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.shield_impact_resistance] : 0,
            [DataObjects.Ship_Property_Type_Enum.targeting_systems] : 0,
            [DataObjects.Ship_Property_Type_Enum.thrust] : 0,
            [DataObjects.Ship_Property_Type_Enum.vision_range] : 0,
            [DataObjects.Ship_Property_Type_Enum.weight] : 0
          }
        }  
        let newPlayer : DataObjects.Player = {
          socket : socket,
          ship : ship
        }
        return newPlayer;
    }


}