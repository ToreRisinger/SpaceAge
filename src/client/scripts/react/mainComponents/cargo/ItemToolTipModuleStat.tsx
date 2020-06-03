import React, { Fragment } from "react";
import { Items } from "../../../../../shared/scripts/Items";
import { Stats } from "../../../../../shared/stats/Stats";

export interface ItemToolTipModuleStatProps { stat : Items.IModuleStat}

export default class ItemToolTipModuleStat extends React.Component<ItemToolTipModuleStatProps, {}> {

   constructor(props : ItemToolTipModuleStatProps) {
      super(props)
   }

   render() {
        let unitType: string = " " + Stats.statTypeUnitToString(this.props.stat.property);
        return (
            <div className="ItemToolTipElement">
                {Stats.statTypeToString(this.props.stat.property) + ": "}
                <span style={{color: Stats.statModifierColor(this.props.stat.modifier)}}>{Stats.statModifierToString(this.props.stat.modifier) + this.props.stat.value}</span>
                <span dangerouslySetInnerHTML={{__html: unitType}}></span>
            </div>   
        );
   }
}