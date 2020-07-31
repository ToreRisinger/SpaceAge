import React from "react";
import { IModuleStat } from "../../../../shared/data/item/IModuleStat";
import { StatInfo } from "../../../../shared/data/stats/StatInfo";

export interface ItemToolTipModuleStatProps { stat : IModuleStat}

export default class ItemToolTipModuleStat extends React.Component<ItemToolTipModuleStatProps, {}> {

   constructor(props : ItemToolTipModuleStatProps) {
      super(props)
   }

   render() {
        let unitType: string = " " + StatInfo.statTypeUnitToString(this.props.stat.property);
        return (
            <div className="ItemToolTipElement">
                {StatInfo.statTypeToString(this.props.stat.property) + ": "}
                <span style={{color: StatInfo.statModifierColor(this.props.stat.modifier)}}>{StatInfo.statModifierToString(this.props.stat.modifier) + this.props.stat.value}</span>
                <span dangerouslySetInnerHTML={{__html: unitType}}></span>
            </div>   
        );
   }
}