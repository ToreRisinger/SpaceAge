import React, { Fragment } from "react";
import { Items } from "../../../../../shared/scripts/Items";
import ItemToolTipModuleStat from "./ItemToolTipModuleStat";

export interface ItemToolTipModuleAttributesProps { module : Items.IModule | undefined}

export default class ItemToolTipModuleAttributes extends React.Component<ItemToolTipModuleAttributesProps, {}> {

   constructor(props : ItemToolTipModuleAttributesProps) {
      super(props)
   }

   render() {
        return (
            this.props.module != undefined &&
                <Fragment>
                    <hr></hr>
                    <div className="ItemToolTipElement" style={{color: Items.getItemQualityColor(this.props.module.quality)}}>Quality: {this.props.module.quality}</div>
                    {this.props.module.stats.map((object, i) => <ItemToolTipModuleStat stat={object} key={i}/>)}  
                </Fragment>   
            
        );
   }
}