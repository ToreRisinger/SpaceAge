import React from "react";
import CargoItem from "../cargo/CargoItem";
import CargoSlot from "../cargo/CargoSlot";
import { IShipModuleInstance } from "../../../../shared/data/shipmodule/IShipModuleInstance";
import { IItem } from "../../../../shared/data/item/IItem";
import { DragAndDropHelper } from "../../utils/DragAndDropHelper";

export interface ShipDisplayProps { modules : Array<IShipModuleInstance>, onHover: (item: IItem | undefined) => void}

export default class ShipDisplay extends React.Component<ShipDisplayProps, {}> {

    private selectedItem: IItem | undefined;
    private selectedIndex: number;

    constructor(props : ShipDisplayProps) {
      super(props)
      this.onEnter = this.onEnter.bind(this);
      this.onLeave = this.onLeave.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.selectedItem = undefined;
      this.selectedIndex = -1;
    }

    onClick(index: number): void {

    }

    onEnter(item: IItem, index: number) {
        this.selectedItem = item;
        this.selectedIndex = index;
        this.props.onHover(this.selectedItem);
    }

    onLeave(item: IItem, index: number) {
        if(this.selectedIndex == index) {
            this.selectedItem = undefined;
            this.selectedIndex = -1;
            this.props.onHover(this.selectedItem);
        }
    }

    onDrop(item: DragAndDropHelper.DragAndDropObject | undefined) {

    }

    allowDrop(event: React.DragEvent<HTMLInputElement>) {

    }

    render() {
        let lowestX = 0;
        let lowestY = 0;
        let highestX = 0;
        let highestY = 0;
        let coordToModuleMap : Map<String, IItem> = new Map<String, IItem>();

        for(let i = 0; i < this.props.modules.length; i++) {
            let module = this.props.modules[i];
            if(module.x < lowestX) {
                lowestX = module.x;
            }
            if(module.x > highestX) {
                highestX = module.x;
            }
            if(module.y < lowestY) {
                lowestY = module.y;
            }
            if(module.y > highestY) {
                highestY = module.y;
            }
        }

        highestX = highestX + (-lowestX);
        highestY = highestY + (-lowestY);

        for(let i = 0; i < this.props.modules.length; i++) {
            let module = this.props.modules[i];
            coordToModuleMap.set((module.x + (-lowestX)) + "," + (module.y + (-lowestY)), this.props.modules[i].moduleItem);
        }

        const styles = {
            gridTemplateColumns: 'repeat(' + (highestX + 1) + ', 70px)',
            gridTemplateRows: 'repeat(' + (highestY + 1) + ', 70px)',
        }

        const items = []

        let id = 0;
        for (let y = 0; y <= highestY; y++) {
            for (let x = 0; x <= highestX; x++) {
                id++;
                let module = coordToModuleMap.get(x + "," + y);
                if(module != undefined) {
                    items.push(<CargoItem enableDragAndDrop={false} item={module} key={id} tooltipLeft={true} redTint={false} hoverHighLight={false} selected={false} index={0} onClick={this.onClick} onEnter={this.onEnter} onLeave={this.onLeave}/>);
                } else {
                    items.push(<CargoSlot onDrop={this.onDrop} allowDrop={this.allowDrop} key={id} />);
                }
            }
        }

        return (
            <div className="ShipDisplay" style={styles}>
                {items}
            </div>
        );
    }
}