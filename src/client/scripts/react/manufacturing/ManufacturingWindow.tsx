import React, { Fragment }  from "react";
import WindowHeader from "../windows/WindowHeader";
import ManufacturingEntry from "./ManufacturingEntry";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";

export interface ManufacturingWindowProps {
    window_open: boolean
}

export interface ManufacturingWindowState {
    filterQuality: number,
    filterModuleType: EModuleItemType | undefined
}

interface ManufacturingEntryObject {
    quality: number,
    moduleType: EModuleItemType
}

export default class ManufacturingWindow extends React.Component<ManufacturingWindowProps, ManufacturingWindowState> {

    constructor(props : ManufacturingWindowProps) {
        super(props)
        this.state = {
            filterQuality: 1,
            filterModuleType: EModuleItemType.ARMOR_MODULE
        }
    }

    render() {
        let entries = new Array<ManufacturingEntryObject>();
        for(let i = 1; i <= this.state.filterQuality; i++) {
            if(this.state.filterModuleType == undefined) {
                //TODO add for all types
            } else {
                entries.push({quality: i, moduleType: this.state.filterModuleType});
            }
        }

        return (
            <Fragment>
                {this.props.window_open &&
                    <div className="ManufacturingWindow BodyText SidePanelWindow HasBorder PanelBackgroundNoAlpha Unselectable">
                        <WindowHeader text="Manufacturing"/>
                        <div className="ManufacturingFilter"></div>
                        <div className="ManufacturingList">
                            {entries.map((obj, i) => <ManufacturingEntry moduleType={obj.moduleType} quality={obj.quality} key={i}/>)}
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}