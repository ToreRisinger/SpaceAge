import React from "react";

export interface CargoSlotProps { item : number }

export default class CargoSlot extends React.Component<CargoSlotProps, {}> {

   constructor(props : CargoSlotProps) {
      super(props)
   }

   render() {
        return (
            <div className="CargoSlot">
                <img className="CargoSlotImage" src="assets/image/items/empty_item_image.png"/>
            </div> 
        );
   }
}