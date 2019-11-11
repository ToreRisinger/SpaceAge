import React from "react";
import { Items } from "../../../../../shared/scripts/Items";

export interface CargoItemProps { item : Items.IItem }

export default class CargoItem extends React.Component<CargoItemProps, {}> {

   constructor(props : CargoItemProps) {
      super(props)
   }

   render() {
        return (
            <div className="CargoItem Unselectable">
                <img className="CargoItemImage" src={Items.getItemInfo(this.props.item.itemType).image}/>
            </div> 
        );
   }
}