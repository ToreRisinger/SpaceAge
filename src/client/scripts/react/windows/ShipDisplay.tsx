import React from "react";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import CargoItem from "../mainComponents/cargo/CargoItem";
import CargoSlot from "../mainComponents/cargo/CargoSlot";
import { Items } from "../../../../shared/scripts/Items";

export interface ShipDisplayProps { modules : Array<ObjectInterfaces.IShipModuleInstance>}

export default class ShipDisplay extends React.Component<ShipDisplayProps, {}> {

    constructor(props : ShipDisplayProps) {
      super(props)
    }

    render() {
        let lowestX = 0;
        let lowestY = 0;
        let highestX = 0;
        let highestY = 0;
        let coordToModuleMap : Map<String, Items.IItem> = new Map<String, Items.IItem>();

        for(let i = 0; i < this.props.modules.length; i++) {
            let module = this.props.modules[i];
            if(module.x < lowestX) {
                lowestX = module.x;
            }
            if(module.x > highestX) {
                highestX = module.x;
            }
            if(module.y < lowestY) {
                lowestY = module.y;
            }
            if(module.y > highestY) {
                highestY = module.y;
            }
        }

        highestX = highestX + (-lowestX);
        highestY = highestY + (-lowestY);

        for(let i = 0; i < this.props.modules.length; i++) {
            let module = this.props.modules[i];
            coordToModuleMap.set((module.x + (-lowestX)) + "," + (module.y + (-lowestY)), this.props.modules[i].moduleItem);
        }

        const styles = {
            gridTemplateColumns: 'repeat(' + (highestX + 1) + ', 70px)',
            gridTemplateRows: 'repeat(' + (highestY + 1) + ', 70px)',
        }

        const items = []

        let id = 0;
        for (let y = 0; y <= highestY; y++) {
            for (let x = 0; x <= highestX; x++) {
                id++;
                let module = coordToModuleMap.get(x + "," + y);
                if(module != undefined) {
                    items.push(<CargoItem item={module} key={id} />);
                } else {
                    items.push(<CargoSlot key={id} />);
                }
            }
        }

        return (
            <div id="ship_display_container" style={styles}>
                {items}
            </div>
        );
    }
}