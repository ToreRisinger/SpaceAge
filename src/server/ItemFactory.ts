import { IdHandler } from "./IdHandler";
import { DataObjects } from "../shared/scripts/DataObjects";
import { ShipModules } from "../shared/scripts/ShipModules";

export module ItemFactory {

    export function createItem() {

    }
    
    export function createModule(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : DataObjects.IModule {
        return {id: IdHandler.getNewItemId(), 
                properties: generatePropertiesForModule(shipModuleType, quality), 
                quality: quality, 
                module_type: shipModuleType};
    }

    function generatePropertiesForModule(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : Array<DataObjects.Ship_Property_Config> {
        let result = new Array<DataObjects.Ship_Property_Config>();
        return result;
    }

}