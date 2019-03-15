import { SHIP_MODULE_TYPE_ENUM } from "../shared/scripts/SHIP_MODULE_TYPE_ENUM";
import { IdHandler } from "./IdHandler";
import { DataObjects } from "../shared/scripts/DataObjects";

export module ItemFactory {

    const moduleTypeToProperyMap : { [key: number]: ModuleTypePropertyConfig } = {
        [SHIP_MODULE_TYPE_ENUM.AVOIDANCE_SYSTEM_MODULE_I] : {
            base: [
                {
                    property: DataObjects.Ship_Property_Type_Enum.avoidance_systems,
                    max : 4,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.weight,
                    max : 30,
                    min : 30,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ],
            possibleExtraProps : [
                {
                    property: DataObjects.Ship_Property_Type_Enum.vision_range,
                    max : 4,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor,
                    max : 4,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ]
        },
        [SHIP_MODULE_TYPE_ENUM.CARGO_HOLD_MODULE_I] :  {
            base: [
                {
                    property: DataObjects.Ship_Property_Type_Enum.cargo_hold,
                    max : 20,
                    min : 10,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.weight,
                    max : 30,
                    min : 30,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ],
            possibleExtraProps : [
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor,
                    max : 2,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor_explosion_resistance,
                    max : 2,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor_heat_resistance,
                    max : 2,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor_impact_resistance,
                    max : 2,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ]
        },
        [SHIP_MODULE_TYPE_ENUM.ENGINE_MODULE_I] :  {
            base: [
                {
                    property: DataObjects.Ship_Property_Type_Enum.thrust,
                    max : 4,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.weight,
                    max : 30,
                    min : 30,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ],
            possibleExtraProps : []
        },
        [SHIP_MODULE_TYPE_ENUM.LASER_MODULE_I] :  {
            base: [
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor,
                    max : 2,
                    min : 1,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.weight,
                    max : 30,
                    min : 30,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ],
            possibleExtraProps : []
        },
        [SHIP_MODULE_TYPE_ENUM.MAIN_MODULE_I] :  {
            base: [
                {
                    property: DataObjects.Ship_Property_Type_Enum.armor,
                    max : 20,
                    min : 10,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.thrust,
                    max : 20,
                    min : 10,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.vision_range,
                    max : 20,
                    min : 10,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.cargo_hold,
                    max : 20,
                    min : 10,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.energy_grid,
                    max : 5,
                    min : 3,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                },
                {
                    property: DataObjects.Ship_Property_Type_Enum.weight,
                    max : 30,
                    min : 30,
                    modifier : DataObjects.Ship_Propery_Modifier_Enum.increase
                }
            ],
            possibleExtraProps : []
        }

    }


    interface ModuleTypePropertyConfig {
        base : Array<ModulePropertyGenerationConfig>,
        possibleExtraProps : Array<ModulePropertyGenerationConfig>
    }

    interface ModulePropertyGenerationConfig {
        property : DataObjects.Ship_Property_Type_Enum,
        modifier : DataObjects.Ship_Propery_Modifier_Enum,
        min : number,
        max : number
    }

    export function createItem() {

    }

    
    export function createModule(shipModuleType : SHIP_MODULE_TYPE_ENUM, quality : number) : DataObjects.Module_Config {
        return {id: IdHandler.getNewItemId(), 
                properties: [], 
                quality: quality, 
                module_type: shipModuleType};
    }

    function generatePropertiesForModule(shipModuleType : SHIP_MODULE_TYPE_ENUM, quality : number) {

    }

}