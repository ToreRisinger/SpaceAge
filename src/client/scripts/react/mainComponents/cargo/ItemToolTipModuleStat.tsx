import React, { Fragment } from "react";
import { Items } from "../../../../../shared/scripts/Items";
import { Stats } from "../../../../../shared/stats/Stats";

export interface ItemToolTipModuleStatProps { stat : Items.IModuleStat}

export default class ItemToolTipModuleStat extends React.Component<ItemToolTipModuleStatProps, {}> {

   constructor(props : ItemToolTipModuleStatProps) {
      super(props)
   }

   render() {
        return (
            <div className="ItemToolTipElement">
                {Stats.statTypeToString(this.props.stat.property) + ": "}
                <span style={{color:'rgb(64, 233, 73)'}}>{Stats.statModifierToString(this.props.stat.modifier) + this.props.stat.value}</span>
                {" " + Stats.statTypeUnitToString(this.props.stat.property)}
            </div>   
        );
   }
}