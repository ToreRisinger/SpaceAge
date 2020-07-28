import React from "react";
import CargoSlot from "./CargoSlot";
import CargoItem from "./CargoItem";
import { IItem } from "../../../../../shared/data/item/IItem";
import { GlobalDataService } from "../../../modules/GlobalDataService";
import { EStatType } from "../../../../../shared/data/stats/EStatType";

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
        
        return (
            <div className="CargoContainer">
                {this.props.items.map((object, i) => <CargoItem item={object} key={i} hoverHighLight={false} index={i} selected={false} onClick={this.onClick} onEnter={this.func} onLeave={this.func}/>)}
            </div>
        );
   }
}