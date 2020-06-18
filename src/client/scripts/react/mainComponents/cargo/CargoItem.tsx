import React, { Fragment, MouseEvent } from "react";
import { ItemInfo } from "../../../../../shared/data/item/ItemInfo";
import ItemToolTipModuleAttributes from "./ItemToolTipModuleAttributes";
import { IItem } from "../../../../../shared/data/item/IItem";

export interface CargoItemProps { item : IItem }
export interface CargoItemState { mouseX : number, mouseY : number }

export default class CargoItem extends React.Component<CargoItemProps, CargoItemState> {

    constructor(props : CargoItemProps) {
      super(props)
      this.state = {
        mouseX : 0,
        mouseY : 0
      }
      this.onMouseMove = this.onMouseMove.bind(this);
    }

    private onMouseMove: { (event: MouseEvent): void } = (event: MouseEvent) => {
        this.setState({mouseX: event.pageX - event.nativeEvent.offsetX, mouseY: event.pageY - event.nativeEvent.offsetY});
    }

    render() {
        const styles = {
            top : this.state.mouseY - 50,
            left : this.state.mouseX - 320
        }
        
        let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(this.props.item.itemType);
        return (
            <div className="CargoItem Unselectable" onMouseMove={this.onMouseMove}>
                <img className="CargoItemImage" src={itemInfo.image}/>

                {itemInfo.canStack &&
                    <div className="CargoItemStockLabelWrapper">
                        <div className="CargoItemStockLabel">{this.props.item.quantity}</div>
                    </div>     
                }
                <div className="ItemToolTipWrapper" style={styles}>
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