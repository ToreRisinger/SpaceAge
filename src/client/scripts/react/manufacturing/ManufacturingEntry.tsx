import React, { Fragment, ReactNode }  from "react";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";
import CargoItem from "../cargo/CargoItem";
import { IItem } from "../../../../shared/data/item/IItem";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import ProgressBar from "../general/ProgressBar";
import { ERefinedMineralItemType } from "../../../../shared/data/item/ERefinedMineralItemType";

export interface ManufacturingEntryProps {
    quality: number, 
    moduleType: EModuleItemType,
    moduleInfo: ShipModuleInfo.IShipModuleInfo, 
    resourceMap: Map<ERefinedMineralItemType, number>}

export default class ManufacturingEntry extends React.Component<ManufacturingEntryProps, {}> {

    constructor(props : ManufacturingEntryProps) {
        super(props)
        this.getResources = this.getResources.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBuild = this.onBuild.bind(this);
    }

    onClick() { }

    onBuild() {

    }

    render() {
        let moduleName = ItemInfo.getItemInfo(this.props.moduleType).name;
        

        return (
                <div className="ManufacturingEntry">
                    <div className="ManufacturingEntryTitle">
                        {moduleName}
                    </div>
                    <div className="ManufacturingEntrySubtitle">
                        Quality: {this.props.quality}
                    </div>
                    <div className="ManufacturingEntryContentContainer">
                        <div className="ManufacturingEntryResourceContainer">
                            {this.getResources()}
                        </div>
                        <div className="ManufacturingEntryButtonContainer">
                            <div className="ManufacturingEntryStartBuildModuleButton" onClick={this.onBuild}>Build</div>    
                            <ProgressBar currentProgress={0} totalProgress={100}/>
                        </div>
                    </div>
                </div> 
        );
    }

    getResources() {
        let resourceList : Array<ReactNode> = [];
        let key = 0;
        this.props.moduleInfo.minerals.forEach(element => {
            let amount = element.base + element.increase * (this.props.quality - 1);
            let item : IItem = {
                itemType: element.mineral,
                module: undefined,
                quantity: amount
            }
            key++;
            //@ts-ignore
            let enoughQuantity = this.props.resourceMap == undefined ? false : this.props.resourceMap.get(element.mineral) == undefined ? false : this.props.resourceMap.get(element.mineral) >= amount;
            resourceList.push(<CargoItem item={item} hoverHighLight={false} tooltipLeft={false} key={key} redTint={!enoughQuantity} enableDragAndDrop={false} index={0} selected={false} onClick={this.onClick} onEnter={this.onClick} onLeave={this.onClick}/>);
        });
        return resourceList;
    }
}