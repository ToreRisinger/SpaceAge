import { ShipModules } from "../shared/scripts/ShipModules";
import { Items } from "../shared/scripts/Items";

export module ItemFactory {

    export function createMineral(itemType : Items.EMineralItemType, quantity : number) : Items.IItem {
        return {
            itemType : itemType,
            quantity : quantity,
            module : undefined,
        }
    }
    
    export function createModule(itemType : Items.EModuleItemType, quality : number) : Items.IItem {
        return {
            itemType : itemType,
            quantity : 1,
            module : {
                stats: generateModuleProperties(itemType, quality), 
                quality: quality
            }
        };
    }

    function generateModuleProperties(shipModuleType : Items.EModuleItemType, quality : number) : Array<Items.IModuleStat> {
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