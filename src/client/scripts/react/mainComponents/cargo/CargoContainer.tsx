import React from "react";
import CargoSlot from "./CargoSlot";
import CargoItem from "./CargoItem";
import { IItem } from "../../../../../shared/data/item/IItem";

export interface CargoContainerProps { items : Array<IItem>}

export default class CargoContainer extends React.Component<CargoContainerProps, {}> {

   constructor(props : CargoContainerProps) {
      super(props)
   }

   func(item: IItem, index: number) {

   }

   onClick() {

   }
   
   render() {
        let extraSlots = 40 + (4 - this.props.items.length % 4);
        let emptySlots = new Array<number>();
        for(let i = 0; i < extraSlots; i++) {
            emptySlots.push(i);
        }

        return (
            <div className="CargoContainer">
                {this.props.items.map((object, i) => <CargoItem item={object} key={i} hoverHighLight={false} index={i} selected={false} onClick={this.onClick} onEnter={this.func} onLeave={this.func}/>)}
                {emptySlots.map((object, i) => <CargoSlot key={i} />)}
            </div>
        );
   }
}