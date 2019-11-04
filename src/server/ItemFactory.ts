import { IdHandler } from "./IdHandler";
import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { ShipModules } from "../shared/scripts/ShipModules";

export module ItemFactory {

    export function createItem() {

    }
    
    export function createModule(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : ObjectInterfaces.IModule {
        return {id: IdHandler.getNewItemId(), 
                stats: generateModuleProperties(shipModuleType, quality), 
                quality: quality, 
                module_type: shipModuleType};
    }

    function generateModuleProperties(shipModuleType : ShipModules.SHIP_MODULE_TYPE_ENUM, quality : number) : Array<ObjectInterfaces.IModuleStat> {
        let result = new Array<ObjectInterfaces.IModuleStat>();
        let shipModuleInfo : ObjectInterfaces.IShipModuleInfo = ShipModules.getModuleInfo(shipModuleType);
        shipModuleInfo.stats.base.forEach(
            obj => result.push(generateModuleProperty(obj, quality))
        );
        return result;
    }

    function generateModuleProperty(modulePropertyGenerationConfig : ObjectInterfaces.ModuleStatGenerationConfig, quality : number) : ObjectInterfaces.IModuleStat {
        return { 
            property : modulePropertyGenerationConfig.stat,
            modifier : modulePropertyGenerationConfig.modifier,
            value : generateModulePropertyValue(modulePropertyGenerationConfig.min[quality-1], modulePropertyGenerationConfig.max[quality-1])
        }
    }

    function generateModulePropertyValue(min : number, max : number) : number {
        let naturalMin = Math.ceil(min);
        let naturalMax = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}