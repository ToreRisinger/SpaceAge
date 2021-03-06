import { ShipModuleInfo } from "../shared/data/shipmodule/ShipModuleInfo";
import { IItem } from "../shared/data/item/IItem";
import { EModuleItemType } from "../shared/data/item/EModuleItemType";
import { IModuleStat } from "../shared/data/item/IModuleStat";
import { IModuleStatGenerationConfig } from "../shared/data/shipmodule/IModuleStatGenerationConfig";
import { EItemType } from "../shared/data/item/EItemType";

export module ItemFactory {

    export function createItem(itemType : EItemType, quantity : number) : IItem {
        return {
            itemType : itemType,
            quantity : quantity,
            module : undefined,
        }
    }
    
    export function createModule(itemType : EModuleItemType, quality : number) : IItem {
        return {
            itemType : itemType,
            quantity : 1,
            module : {
                stats: generateModuleProperties(itemType, quality), 
                quality: quality
            }
        };
    }

    function generateModuleProperties(shipModuleType : EModuleItemType, quality : number) : Array<IModuleStat> {
        let result = new Array<IModuleStat>();
        let shipModuleInfo : ShipModuleInfo.IShipModuleInfo = ShipModuleInfo.getModuleInfo(shipModuleType);
        shipModuleInfo.stats.base.forEach(
            obj => result.push(generateModuleProperty(obj, quality))
        );
        return result;
    }

    function generateModuleProperty(modulePropertyGenerationConfig : IModuleStatGenerationConfig, quality : number) : IModuleStat {
        let min = modulePropertyGenerationConfig.baseMin + modulePropertyGenerationConfig.increase * quality - 1;
        let max = modulePropertyGenerationConfig.baseMax + modulePropertyGenerationConfig.increase * quality - 1;
        return { 
            property : modulePropertyGenerationConfig.stat,
            modifier : modulePropertyGenerationConfig.modifier,
            value : generateModulePropertyValue(min, max)
        }
    }

    function generateModulePropertyValue(min : number, max : number) : number {
        let naturalMin = Math.ceil(min);
        let naturalMax = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}