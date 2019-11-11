import React from "react";
import CargoSlot from "./CargoSlot";
import { Items } from "../../../../../shared/scripts/Items";
import CargoItem from "./CargoItem";

export interface CargoContainerProps { items : Array<Items.IItem>}

export default class CargoContainer extends React.Component<CargoContainerProps, {}> {

   constructor(props : CargoContainerProps) {
      super(props)
   }

   render() {
        let extraSlots = 40 + (4 - this.props.items.length % 4);
        let emptySlots = new Array<number>();
        for(let i = 0; i < extraSlots; i++) {
            emptySlots.push(i);
        }

        return (
            <div className="CargoContainer UIComponent">
                {this.props.items.map((object, i) => <CargoItem item={object} key={i} />)}
                {emptySlots.map((object, i) => <CargoSlot key={i} />)}
            </div>
        );
   }
}