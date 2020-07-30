import React from "react";
import { IItem } from "../../../../../shared/data/item/IItem";
import { DragAndDropHelper } from "../../../utils/DragAndDropHelper";

export interface CargoSlotProps { onDrop: (item: DragAndDropHelper.DragAndDropObject | undefined) => void | undefined, allowDrop: (event: React.DragEvent<HTMLInputElement>) => void | undefined }

export default class CargoSlot extends React.Component<CargoSlotProps, {}> {

   constructor(props : CargoSlotProps) {
      super(props)
      this.onDrop = this.onDrop.bind(this);
      this.allowDrop = this.allowDrop.bind(this);
   }

   onDrop() {
      if(this.props.onDrop != undefined) {
         this.props.onDrop(DragAndDropHelper.getSelection());
      }
   }

   allowDrop(event: React.DragEvent<HTMLInputElement>) {
      if(this.props.allowDrop != undefined) {
         this.props.allowDrop(event);
      }
      
   }

   render() {
         return (
            <div className="CargoItem Unselectable" onDragOver={this.allowDrop} onDrop={this.onDrop}>
            </div> 
         );
   }
}