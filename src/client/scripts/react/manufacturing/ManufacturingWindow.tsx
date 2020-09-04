import React, { Fragment }  from "react";
import WindowHeader from "../windows/WindowHeader";
import ManufacturingEntry from "./ManufacturingEntry";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { ShipModuleInfo } from "../../../../shared/data/shipmodule/ShipModuleInfo";
import { GlobalDataService } from "../../modules/GlobalDataService";

export interface ManufacturingWindowProps {
    window_open: boolean
}

export interface ManufacturingWindowState {
    filterModuleType: EModuleItemType
}

interface ManufacturingEntryObject {
    quality: number,
    moduleInfo: ShipModuleInfo.IShipModuleInfo
}

export default class ManufacturingWindow extends React.Component<ManufacturingWindowProps, ManufacturingWindowState> {

    constructor(props : ManufacturingWindowProps) {
        super(props)
        this.state = {
            filterModuleType: EModuleItemType.ARMOR_MODULE
        }
    }

    render() {
        let entries = new Array<ManufacturingEntryObject>();
        let moduleInfo = ShipModuleInfo.getModuleInfo(this.state.filterModuleType);
        let maxQuality = GlobalDataService.getInstance().getPlayerShip().getStat(moduleInfo.requireStat);
    
        for(let i = 1; i <= maxQuality; i++) {
            entries.push({quality: i, moduleInfo});
        }

        return (
            
            <Fragment>
                {this.props.window_open &&
                    <div className="ManufacturingWindow BodyText SidePanelWindow HasBorder PanelBackgroundNoAlpha Unselectable">
                        <WindowHeader text="Manufacturing"/>
                        <div className="ManufacturingFilter"></div>
                        <div className="ManufacturingList">
                            {entries.map((obj, i) => <ManufacturingEntry moduleType={this.state.filterModuleType} moduleInfo={obj.moduleInfo} quality={obj.quality} key={i}/>)}
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}