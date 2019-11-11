import React from "react";
import { Items } from "../../../../../shared/scripts/Items";

export interface CargoItemProps { item : Items.IItem }

export default class CargoItem extends React.Component<CargoItemProps, {}> {

   constructor(props : CargoItemProps) {
      super(props)
   }

   render() {
        let itemInfo : Items.IItemInfo = Items.getItemInfo(this.props.item.itemType);
        return (
            <div className="CargoItem Unselectable">
                <img className="CargoItemImage" src={itemInfo.image}/>
                <div className="ItemToolTipWrapper">
                    <span className="ItemToolTipContainer Unselectable">
                        <div className="ItemToolTipTitle">{itemInfo.name}</div>
                        <hr></hr>
                        <div className="ItemToolTipElement">{itemInfo.description}</div>
                    </span>
                </div>
            </div> 
        );
   }
}