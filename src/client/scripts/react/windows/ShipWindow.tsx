import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import ShipDisplay from "./ShipDisplay";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { CCharacter } from "../../game_objects/CCharacter";
import StatList from "../mainComponents/stats/StatList";
import { IItem } from "../../../../shared/data/item/IItem";
import { IModuleStat } from "../../../../shared/data/item/IModuleStat";

export interface ShipWindowProps {
    window_open: boolean
}

export interface ShipWindowState { ship: CCharacter, }

export default class ShipWindow extends React.Component<ShipWindowProps, ShipWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;
    private highLightStats: Array<IModuleStat>;
    constructor(props : ShipWindowProps) {
        super(props)
        this.state = {
            ship: GlobalDataService.getInstance().getPlayerShip(),
        }
        this.highLightStats = new Array();
        this.timerID = undefined;
        this.onHoverItem = this.onHoverItem.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }
    
    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }
    
    tick() {
        this.setState({
            ship: GlobalDataService.getInstance().getPlayerShip()
        });
    }

    onHoverItem(item: IItem | undefined): void {
        if(item != undefined && item.module != undefined) {
            this.highLightStats = item.module.stats
        } else {
            this.highLightStats = new Array();
        }
    }

    render() {
        let ship = this.state.ship;
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="ship_window" className="BodyText SidePanelWindow Unselectable PanelBackgroundNoAlpha">
                        <WindowHeader text="Ship"/>
                        <div className="ShipWindowContent">
                            <div className="ShipWindowContentWrapper">
                                <StatList character={ship} highLightStats={this.highLightStats}/>
                                <ShipDisplay modules={ship.getModules()} onHover={this.onHoverItem}/>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}