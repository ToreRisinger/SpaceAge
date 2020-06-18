import { IModule } from "./IModule";
import { EItemType } from "./EItemType";

export interface IItem {
    itemType : EItemType
    quantity : number,
    module : IModule | undefined
}