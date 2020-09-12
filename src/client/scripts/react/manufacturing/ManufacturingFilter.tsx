import React, { ReactNode } from "react";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";

export interface ManufacturingFilterProps { onFilterChanged: (moduleType: EModuleItemType) => void }

export default class ManufacturingFilter extends React.Component<ManufacturingFilterProps, {}> {

    private selectedModuleType: EModuleItemType;
    private moduleTypes: Array<EModuleItemType>;

    constructor(props : ManufacturingFilterProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.selectedModuleType = EModuleItemType.ARMOR_MODULE;
        this.moduleTypes = [];
        Object.values(EModuleItemType).forEach(value => {
            if(!isNaN(Number(value))) {
                //@ts-ignore
                this.moduleTypes.push(value);
            }
        });
    }

    onChange(event: any) {
        this.props.onFilterChanged(event.target.value);
    }

    public getSelection(): EModuleItemType {
        return this.selectedModuleType;
    }

    render() {
        return (
            <div className="ManufacturingFilterContainer">
                <select className="ManufacturingFilter" onChange={this.onChange}>
                    {this.getOptions()}
                </select>
            </div> 
        );
    }

    getOptions() {
        let optionList : Array<ReactNode> = [];
        let key = 0;
        this.moduleTypes.forEach(element => {
            let itemInfo = ItemInfo.getItemInfo(element);
            let selectedModuleTypeName = itemInfo.name;
            optionList.push(<option key={key} value={element}>{selectedModuleTypeName}</option>);
            key++;
        });
        return optionList;
    }
}