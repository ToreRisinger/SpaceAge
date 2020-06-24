import React from "react";
import CargoSlot from "./CargoSlot";
import CargoItem from "./CargoItem";
import { IItem } from "../../../../../shared/data/item/IItem";

export interface LootContainerProps { items : Array<IItem>, onClick: (index: number) => void, selectedItems: Set<number> }

export default class LootContainer extends React.Component<LootContainerProps, {}> {


    private shouldClear: boolean;

    constructor(props : LootContainerProps) {
        super(props)
        this.shouldClear = false;
        this.onClick = this.onClick.bind(this);
    }

    onClick(index: number) {
        this.props.onClick(index);
    }

    render() {
        let extraSlots = 40 + (4 - this.props.items.length % 4);
        let emptySlots = new Array<number>();
        for(let i = 0; i < extraSlots; i++) {
            emptySlots.push(i);
        }

        return (
            <div className="CargoContainer">
                {this.props.items.map((object, i) => <CargoItem item={object} key={i} hoverHighLight={true} index={i} selected={this.props.selectedItems.has(i)} onClick={this.onClick}/>)}
                {emptySlots.map((object, i) => <CargoSlot key={i} />)}
            </div>
        );
    }
}