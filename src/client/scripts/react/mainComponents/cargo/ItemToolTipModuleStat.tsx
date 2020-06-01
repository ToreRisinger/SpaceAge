import React, { Fragment } from "react";
import { Items } from "../../../../../shared/scripts/Items";
import { ObjectInterfaces } from "../../../../../shared/scripts/ObjectInterfaces";

export interface ItemToolTipModuleStatProps { stat : Items.IModuleStat}

export default class ItemToolTipModuleStat extends React.Component<ItemToolTipModuleStatProps, {}> {

   constructor(props : ItemToolTipModuleStatProps) {
      super(props)
   }

   render() {
        return (
            <div className="ItemToolTipElement">
                {ObjectInterfaces.shipStatTypeToString(this.props.stat.property) + ": "}
                <span style={{color:'rgb(64, 233, 73)'}}>{ObjectInterfaces.shipStatModifierToString(this.props.stat.modifier) + this.props.stat.value}</span>
                {" " + ObjectInterfaces.shipStatTypeUnitToString(this.props.stat.property)}
            </div>   
        );
   }
}