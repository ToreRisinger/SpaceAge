import React, { Fragment }  from "react";
import WindowHeader from "../windows/WindowHeader";
import ManufacturingEntry from "./ManufacturingEntry";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { ERefinedMineralItemType } from "../../../../shared/data/item/ERefinedMineralItemType";
import { CCharacter } from "../../game_objects/CCharacter";
import { IManufacturingType } from "../../../../shared/data/IManufacturingState";
import ManufacturingFilter from "./ManufacturingFilter";

export interface ManufacturingWindowProps {
    window_open: boolean
}

export interface ManufacturingWindowState {
    filterModuleType: EModuleItemType,
    resourceMap: Map<ERefinedMineralItemType, number>
    manufacturingType: IManufacturingType | undefined,
    isManufacturing: boolean

}

interface ManufacturingEntryObject {
    quality: number,
    moduleInfo: ShipModuleInfo.IShipModuleInfo
}

export default class ManufacturingWindow extends React.Component<ManufacturingWindowProps, ManufacturingWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ManufacturingWindowProps) {
        super(props)
        this.state = {
            filterModuleType: EModuleItemType.ARMOR_MODULE,
            resourceMap: new Map(),
            manufacturingType: GlobalDataService.getInstance().getPlayerShip().getManufacturingType(),
            isManufacturing: GlobalDataService.getInstance().getPlayerShip().isManufacturing()
        }
        this.tick = this.tick.bind(this);
        this.onFilterChanged = this.onFilterChanged.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }

    tick() {
        this.state.resourceMap.set(ERefinedMineralItemType.REFINED_GOLD, 0);
        this.state.resourceMap.set(ERefinedMineralItemType.REFINED_IRON, 0);
        this.state.resourceMap.set(ERefinedMineralItemType.REFINED_PLATINUM, 0);
        this.state.resourceMap.set(ERefinedMineralItemType.REFINED_SILVER, 0);
        GlobalDataService.getInstance().getPlayerShip().getCargo().items.forEach(item => {
            switch(item.itemType) {
                case ERefinedMineralItemType.REFINED_GOLD:
                    //@ts-ignore
                    this.state.resourceMap.set(ERefinedMineralItemType.REFINED_GOLD, this.state.resourceMap.get(ERefinedMineralItemType.REFINED_GOLD) + item.quantity);
                    break;
                case ERefinedMineralItemType.REFINED_IRON:
                    //@ts-ignore
                    this.state.resourceMap.set(ERefinedMineralItemType.REFINED_IRON, this.state.resourceMap.get(ERefinedMineralItemType.REFINED_IRON) + item.quantity);
                    break;
                case ERefinedMineralItemType.REFINED_PLATINUM:
                    //@ts-ignore
                    this.state.resourceMap.set(ERefinedMineralItemType.REFINED_PLATINUM, this.state.resourceMap.get(ERefinedMineralItemType.REFINED_PLATINUM) + item.quantity);
                    break;
                case ERefinedMineralItemType.REFINED_SILVER:
                    //@ts-ignore
                    this.state.resourceMap.set(ERefinedMineralItemType.REFINED_SILVER, this.state.resourceMap.get(ERefinedMineralItemType.REFINED_SILVER) + item.quantity);
                    break;
                default:
                    break;
            }
        });

        let playerShip : CCharacter = GlobalDataService.getInstance().getPlayerShip();
        this.setState({
            manufacturingType: playerShip.getManufacturingType(),
            isManufacturing: playerShip.isManufacturing()
        })
    }

    onFilterChanged(moduleType: EModuleItemType) {

    }

    render() {
        let playerShip : CCharacter = GlobalDataService.getInstance().getPlayerShip();
        let entries = new Array<ManufacturingEntryObject>();
        let moduleInfo = ShipModuleInfo.getModuleInfo(this.state.filterModuleType);
        let maxQuality = playerShip.getStat(moduleInfo.requireStat);
    
        for(let i = 1; i <= maxQuality; i++) {
            entries.push({quality: i, moduleInfo});
        }

        return (
            
            <Fragment>
                {this.props.window_open &&
                    <div className="ManufacturingWindow BodyText HasBorder PanelBackgroundNoAlpha Unselectable">
                        <WindowHeader text="Manufacturing"/>
                        <ManufacturingFilter onFilterChanged={this.onFilterChanged}/>
                        <div className="ManufacturingList">
                            {entries.map((obj, i) => <ManufacturingEntry isManufacturing={this.state.isManufacturing} manufacturingType={this.state.manufacturingType} moduleType={this.state.filterModuleType} moduleInfo={obj.moduleInfo} quality={obj.quality} resourceMap={this.state.resourceMap} key={i}/>)}
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}