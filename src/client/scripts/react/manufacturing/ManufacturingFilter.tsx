import React from "react";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";

export interface ManufacturingFilterProps { onFilterChanged: (moduleType: EModuleItemType) => void }

export default class ManufacturingFilter extends React.Component<ManufacturingFilterProps, {}> {

    private selectedModuleType: EModuleItemType;
    private moduleTypes: Array<EModuleItemType>;

    constructor(props : ManufacturingFilterProps) {
        super(props);
        this.onClickFilterHeader = this.onClickFilterHeader.bind(this);
        this.selectedModuleType = EModuleItemType.ARMOR_MODULE;
        this.moduleTypes = [];
        Object.values(EModuleItemType).forEach(value => {
            if(!isNaN(Number(value))) {
                //@ts-ignore
                this.moduleTypes.push(value);
            }
        });
    }

    onClickFilterHeader() {
        
    }

    public getSelection(): EModuleItemType {
        return this.selectedModuleType;
    }

    render() {
        let itemInfo = ItemInfo.getItemInfo(this.selectedModuleType);
        let selectedModuleTypeName = itemInfo.name;
        return (
            <div className="ManufacturingFilterContainer">
                <div className="ManufacturingFilter" onClick={this.onClickFilterHeader}>
                    {selectedModuleTypeName}
                </div> 
            </div> 
        );
    }
}