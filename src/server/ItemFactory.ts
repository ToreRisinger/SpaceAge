import { ShipModules } from "../shared/scripts/ShipModules";
import { Items } from "../shared/scripts/Items";

export module ItemFactory {

    export function createItem() {

    }
    
    export function createModule(shipModuleType : Items.EItemType, quality : number) : Items.IItem {
        return {
            itemType : shipModuleType,
            quantity : 1,
            module : {
                stats: generateModuleProperties(shipModuleType, quality), 
                quality: quality
            }
        };
    }

    function generateModuleProperties(shipModuleType : Items.EItemType, quality : number) : Array<Items.IModuleStat> {
        let result = new Array<Items.IModuleStat>();
        let shipModuleInfo : ShipModules.IShipModuleInfo = ShipModules.getModuleInfo(shipModuleType);
        shipModuleInfo.stats.base.forEach(
            obj => result.push(generateModuleProperty(obj, quality))
        );
        return result;
    }

    function generateModuleProperty(modulePropertyGenerationConfig : ShipModules.ModuleStatGenerationConfig, quality : number) : Items.IModuleStat {
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