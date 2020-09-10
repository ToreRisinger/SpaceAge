import React, { ReactNode }  from "react";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";
import CargoItem from "../cargo/CargoItem";
import { IItem } from "../../../../shared/data/item/IItem";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import ProgressBar from "../general/ProgressBar";
import { ERefinedMineralItemType } from "../../../../shared/data/item/ERefinedMineralItemType";
import { IManufacturingType } from "../../../../shared/data/IManufacturingState";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import Button from "../general/Button";
import { GameConstants } from "../../../../shared/constants/GameConstants";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { EStatType } from "../../../../shared/data/stats/EStatType";

export interface ManufacturingEntryProps {
    quality: number, 
    moduleType: EModuleItemType,
    moduleInfo: ShipModuleInfo.IShipModuleInfo, 
    resourceMap: Map<ERefinedMineralItemType, number>
    manufacturingType: IManufacturingType | undefined,
    isManufacturing: boolean
}

export default class ManufacturingEntry extends React.Component<ManufacturingEntryProps, {}> {

    constructor(props : ManufacturingEntryProps) {
        super(props)
        this.getResources = this.getResources.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBuild = this.onBuild.bind(this);
        this.haveEnoughQuantity = this.haveEnoughQuantity.bind(this);
        this.getCurrentProgress = this.getCurrentProgress.bind(this);
    }

    onClick() { }

    onBuild() {
        if(!this.props.isManufacturing) {
            let event : Events.BUILD_MODULE_START = {
                eventId : Events.EEventType.BUILD_MODULE_START,
                data : { 
                    moduleType: this.props.moduleType,
                    quality: this.props.quality
                }
            }
            EventHandler.pushEvent(event);
        }
    }

    getCurrentProgress() {
        return  Date.now() - GlobalDataService.getInstance().getPlayerShip().getManufacturingStartTime();
    }

    render() {
        let moduleName = ItemInfo.getItemInfo(this.props.moduleType).name;
        let enabled: boolean = true;
        this.props.moduleInfo.minerals.forEach(element => {
            let amount = element.base + element.increase * (this.props.quality - 1);
            let enoughQuantityTmp = this.haveEnoughQuantity(element.mineral, amount);
            if(!enoughQuantityTmp) {
                enabled = false;
            }
        });

        if(this.props.isManufacturing) {
            enabled = false;
        }

        let playerShip = GlobalDataService.getInstance().getPlayerShip();
        let isManufacturingThisModule: boolean = this.props.isManufacturing && this.props.manufacturingType != undefined && this.props.manufacturingType.moduleType == this.props.moduleType && this.props.manufacturingType.quality == this.props.quality;
        let totalProgess = GameConstants.MANUFACURING_BASE_TIME * (1 - playerShip.getStat(EStatType.manufactoring_speed)) * 1000;

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
                            {isManufacturingThisModule ? 
                                    <ProgressBar currentProgress={this.getCurrentProgress} totalProgress={totalProgess}/>
                                :
                                    <Button enabled={enabled} onClick={this.onBuild} text={"Build"}/>
                            }
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
            let enoughQuantity = this.haveEnoughQuantity(element.mineral, amount);
            resourceList.push(<CargoItem item={item} hoverHighLight={false} tooltipLeft={false} key={key} redTint={!enoughQuantity} enableDragAndDrop={false} index={0} selected={false} onClick={this.onClick} onEnter={this.onClick} onLeave={this.onClick}/>);
        });
        return resourceList;
    }

    haveEnoughQuantity(mineral: ERefinedMineralItemType, amount: number) {
        //@ts-ignore
        return this.props.resourceMap == undefined ? false : this.props.resourceMap.get(mineral) == undefined ? false : this.props.resourceMap.get(mineral) >= amount;
    }
}