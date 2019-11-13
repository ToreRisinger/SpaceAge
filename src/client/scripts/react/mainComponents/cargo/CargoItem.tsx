import React, { Fragment } from "react";
import { Items } from "../../../../../shared/scripts/Items";
import ItemToolTipModuleAttributes from "./ItemToolTipModuleAttributes";

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

                {itemInfo.canStack &&
                    <div className="CargoItemStockLabelWrapper">
                        <div className="CargoItemStockLabel">{this.props.item.quantity}</div>
                    </div>     
                }
                <div className="ItemToolTipWrapper">
                    <span className="ItemToolTipContainer Unselectable">
                        <div className="ItemToolTipTitle">{itemInfo.name}</div>
                        <hr></hr>
                        <div className="ItemToolTipElement">Quantity: {this.props.item.quantity}</div>
                        <div className="ItemToolTipElement">Size per unit: {itemInfo.size} m<sup>2</sup></div>
                        <div className="ItemToolTipElement">Total size: {this.props.item.quantity * itemInfo.size} m<sup>2</sup></div>
                        <ItemToolTipModuleAttributes module={this.props.item.module}/>
                        <hr></hr>
                        <div className="ItemToolTipDescription">{itemInfo.description}</div>
                    </span>
                </div>
            </div> 
        );
   }
}