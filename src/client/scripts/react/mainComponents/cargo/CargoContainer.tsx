import React from "react";
import CargoSlot from "./CargoSlot";

export default class CargoContainer extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        let items = Array<number>();
        for(let i = 0; i < 40; i++) {
            items.push(i);
        }

        return (
            <div className="CargoContainer UIComponent">
                {items.map((object, i) => <CargoSlot item={object} key={i} />)}
            </div>
        );
   }
}