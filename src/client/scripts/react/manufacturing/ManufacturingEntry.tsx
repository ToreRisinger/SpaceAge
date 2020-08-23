import React  from "react";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";

export interface ManufacturingEntryProps { quality: number, moduleInfo: ShipModuleInfo.IShipModuleInfo }

export default class ManufacturingEntry extends React.Component<ManufacturingEntryProps, {}> {

    constructor(props : ManufacturingEntryProps) {
        super(props)
        this.getResources = this.getResources.bind(this);
    }

    render() {
        
        return (
                <div className="ManufacturingEntry">
                    Quality: {this.props.quality}. Resources: {this.getResources()}
                </div> 
        );
    }

    getResources() {
        let text  = "";
        this.props.moduleInfo.minerals.forEach(element => {
            let itemInfo = ItemInfo.getItemInfo(element.mineral);
            let amount = element.base + element.increase * (this.props.quality - 1);
            text += itemInfo.name + ": " + amount + ", "
        });
        return text;
    }
}