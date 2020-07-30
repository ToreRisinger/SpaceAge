import React from "react";
import CargoSlot from "./CargoSlot";
import CargoItem from "./CargoItem";
import { IItem } from "../../../../../shared/data/item/IItem";
import { DragAndDropHelper } from "../../../utils/DragAndDropHelper";

export interface LootContainerProps { items : Array<IItem>, onClick: (index: number) => void, selectedItems: Set<number> }

export default class LootContainer extends React.Component<LootContainerProps, {}> {


    private shouldClear: boolean;

    constructor(props : LootContainerProps) {
        super(props)
        this.shouldClear = false;
        this.onClick = this.onClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onClick(index: number) {
        this.props.onClick(index);
    }

    func(item: IItem, index: number) {

    }

    onDrop(item: DragAndDropHelper.DragAndDropObject | undefined) {

    }

    allowDrop(event: React.DragEvent<HTMLInputElement>) {

    }

    render() {
        let extraSlots = 40 + (4 - this.props.items.length % 4);
        let emptySlots = new Array<number>();
        for(let i = 0; i < extraSlots; i++) {
            emptySlots.push(i);
        }

        return (
            <div className="CargoContainer">
                {this.props.items.map((object, i) => <CargoItem enableDragAndDrop={false} item={object} key={i} hoverHighLight={true} index={i} selected={this.props.selectedItems.has(i)} onClick={this.onClick} onLeave={this.func} onEnter={this.func}/>)}
                {emptySlots.map((object, i) => <CargoSlot allowDrop={this.allowDrop} onDrop={this.onDrop} key={i} />)}
            </div>
        );
    }
}