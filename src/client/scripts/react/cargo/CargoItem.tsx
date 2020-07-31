import React, { MouseEvent } from "react";
import { ItemInfo } from "../../../../shared/data/item/ItemInfo";
import ItemToolTipModuleAttributes from "./ItemToolTipModuleAttributes";
import { IItem } from "../../../../shared/data/item/IItem";
import { DragAndDropHelper } from "../../utils/DragAndDropHelper";

export interface CargoItemProps { 
    item : IItem, 
    hoverHighLight: boolean, 
    selected: boolean, 
    index: number,
    enableDragAndDrop: boolean,
    onClick: (index: number) => void, 
    onEnter: (item: IItem, index: number) => void, 
    onLeave: (item: IItem, index: number) => void }

export interface CargoItemState { mouseX : number, mouseY : number }

export default class CargoItem extends React.Component<CargoItemProps, CargoItemState> {

    constructor(props : CargoItemProps) {
      super(props)
      this.state = {
        mouseX : 0,
        mouseY : 0
      }
      this.onClick = this.onClick.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onDragStart = this.onDragStart.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
    }

    onMouseMove: { (event: MouseEvent): void } = (event: MouseEvent) => {
        this.setState({mouseX: event.pageX - event.nativeEvent.offsetX, mouseY: event.pageY - event.nativeEvent.offsetY});
    }

    onMouseEnter() {
        this.props.onEnter(this.props.item, this.props.index);
    }

    onMouseLeave() {
        this.props.onLeave(this.props.item, this.props.index);
    }

    onClick() {
        this.props.onClick(this.props.index);
    }

    onDragStart() {
        DragAndDropHelper.setSelection({item: this.props.item, index: this.props.index});
    }

    onDragEnd() {
        DragAndDropHelper.setSelection(undefined);
    }

    render() {
        const styles = {
            top : this.state.mouseY - 50,
            left : this.state.mouseX - 320
        }

        let cargoItemClass = "CargoItem Unselectable" + (this.props.hoverHighLight ? " BackgroundHoverHighlight" : "") + (this.props.selected ? " Selected" : "");
        let itemInfo : ItemInfo.IItemInfo = ItemInfo.getItemInfo(this.props.item.itemType);

        return (
            <div className={cargoItemClass} draggable={this.props.enableDragAndDrop} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
                <img className="CargoItemImage" src={itemInfo.image}/>

                {itemInfo.canStack &&
                    <div className="CargoItemStockLabelWrapper">
                        <div className="CargoItemStockLabel">{this.props.item.quantity}</div>
                    </div>
                }
                <div className="ItemToolTipWrapper PanelBackgroundNoAlpha" style={styles}>
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