import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import CargoItem from "../cargo/CargoItem";
import { IItem } from "../../../../shared/data/item/IItem";
import CargoSlot from "../cargo/CargoSlot";
import { DragAndDropHelper } from "../../utils/DragAndDropHelper";
import { EMineralItemType } from "../../../../shared/data/item/EMineralItemType";
import { RefineryHandler } from "../../modules/RefineryHandler";
import { GlobalDataService } from "../../modules/GlobalDataService";
import ProgressBar from "../general/ProgressBar";
import { GameConstants } from "../../../../shared/constants/GameConstants";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { MineralInfo } from "../../../../shared/data/item/MineralInfo";

export interface RefineryWindowProps {
    window_open: boolean
}

export interface RefineryWindowState { item : IItem | undefined}

export default class RefineryWindow extends React.Component<RefineryWindowProps, RefineryWindowState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : RefineryWindowProps) {
        super(props)
        this.state = {
            item: RefineryHandler.getItem()
        }
        this.onDrop = this.onDrop.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.onStop = this.onStop.bind(this);
        this.tick = this.tick.bind(this);
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
           item: GlobalDataService.getInstance().getPlayerShip().getProcessingOreItem()
        });
     }

    onClick() {

    }

    onDrop(object: DragAndDropHelper.DragAndDropObject | undefined) {
        if(object != undefined) {
            RefineryHandler.startRefine(object.item, object.index);
        }
    }

    allowDrop(event: React.DragEvent<HTMLInputElement>) {
        let obj: DragAndDropHelper.DragAndDropObject | undefined = DragAndDropHelper.getSelection();
        if(obj != undefined && obj.item.itemType in EMineralItemType) {
            //TODO add skill check
            event.preventDefault();
        }
    }

    onStop() {
        RefineryHandler.stopRefine();
    }

    render() {
        let player = GlobalDataService.getInstance().getPlayerShip();
        let totalProgess = GameConstants.ORE_PROCESSING_BASE_TIME * (1 - player.getStat(EStatType.ore_processing_speed)) * 1000;
        let currentProgress = Date.now() - GlobalDataService.getInstance().getPlayerShip().getProcessingOreStartTime();
        
        let quantityNeeded = 0;
        let enoughQuantity = true;
        if(this.state.item != undefined) {
            //@ts-ignore
            quantityNeeded = MineralInfo.getMineralInfo(this.state.item.itemType).refineQuantity;
            enoughQuantity = quantityNeeded <= this.state.item.quantity;
        }
        
        return (
            <Fragment>
                {this.props.window_open &&
                    <div className="RefineryWindow BodyText SidePanelWindow HasBorder PanelBackgroundNoAlpha Unselectable">
                        <WindowHeader text="Refinery"/>
                        <div className="OreItemContainer">
                            {this.state.item == undefined ? 
                                <CargoSlot onDrop={this.onDrop} allowDrop={this.allowDrop}/>
                            :
                                <Fragment>
                                    <CargoItem item={this.state.item} hoverHighLight={false} tooltipLeft={false} redTint={!enoughQuantity} enableDragAndDrop={false} index={0} selected={false} onClick={this.onClick} onEnter={this.onClick} onLeave={this.onClick}/>
                                    <div className="RefineProgress"></div>
                                    <div className="StopRefineButton" onClick={this.onStop}>Stop</div>
                                    {enoughQuantity ?
                                        <ProgressBar currentProgress={currentProgress} totalProgress={totalProgess}/>
                                        :
                                        <div>{quantityNeeded} needed.</div>
                                    }
                                </Fragment>
                            }
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}