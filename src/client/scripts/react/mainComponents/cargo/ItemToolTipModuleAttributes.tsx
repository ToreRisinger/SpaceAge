import React, { Fragment } from "react";
import { ItemInfo } from "../../../../../shared/data/item/ItemInfo";
import ItemToolTipModuleStat from "./ItemToolTipModuleStat";
import { IModule } from "../../../../../shared/data/item/IModule";

export interface ItemToolTipModuleAttributesProps { module : IModule | undefined}

export default class ItemToolTipModuleAttributes extends React.Component<ItemToolTipModuleAttributesProps, {}> {

   constructor(props : ItemToolTipModuleAttributesProps) {
      super(props)
   }

   render() {
        return (
            this.props.module != undefined &&
                <Fragment>
                    <hr></hr>
                    <div className="ItemToolTipElement" style={{color: ItemInfo.getItemQualityColor(this.props.module.quality)}}>Quality: {this.props.module.quality}</div>
                    {this.props.module.stats.map((object, i) => <ItemToolTipModuleStat stat={object} key={i}/>)}  
                </Fragment>   
            
        );
   }
}