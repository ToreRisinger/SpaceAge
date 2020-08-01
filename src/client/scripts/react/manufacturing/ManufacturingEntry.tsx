import React  from "react";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";

export interface ManufacturingEntryProps { quality: number, moduleType: EModuleItemType }

export default class ManufacturingEntry extends React.Component<ManufacturingEntryProps, {}> {

    constructor(props : ManufacturingEntryProps) {
        super(props)
    }

    render() {
        let moduleInfo = ShipModuleInfo.getModuleInfo(this.props.moduleType);
        
        return (
                <div className="ManufacturingEntry">

                </div> 
        );
    }
}