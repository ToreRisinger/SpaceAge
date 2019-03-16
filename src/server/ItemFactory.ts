import { IdHandler } from "./IdHandler";
import { DataObjects } from "../shared/scripts/DataObjects";
import { ShipModules } from "../shared/scripts/ShipModules";

export module ItemFactory {

    export function createItem() {

    }
    
    export function createModule(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : DataObjects.IModule {
        return {id: IdHandler.getNewItemId(), 
                properties: generateModuleProperties(shipModuleType, quality), 
                quality: quality, 
                module_type: shipModuleType};
    }

    function generateModuleProperties(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : Array<DataObjects.IModulePropery> {
        let result = new Array<DataObjects.IModulePropery>();
        let shipModuleInfo : DataObjects.IShipModuleInfo = ShipModules.getModuleInfo(shipModuleType);
        shipModuleInfo.properties.base.forEach(
            obj => result.push(generateModuleProperty(obj))
        );
        return result;
    }

    function generateModuleProperty(modulePropertyGenerationConfig : DataObjects.ModulePropertyGenerationConfig) : DataObjects.IModulePropery {
        return { 
            property : modulePropertyGenerationConfig.property,
            modifier : modulePropertyGenerationConfig.modifier,
            value : generateModulePropertyValue(modulePropertyGenerationConfig.min, modulePropertyGenerationConfig.max)
        }
    }

    function generateModulePropertyValue(min : number, max : number) : number {
        let naturalMin = Math.ceil(min);
        let naturalMax = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}