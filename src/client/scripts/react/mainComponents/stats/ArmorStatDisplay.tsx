import React from "react";
import { EStatType } from "../../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../../shared/colors/Colors";
import { CShip } from "../../../game_objects/CShip";

export interface ArmorStatDisplayProps {
    ship : CShip
}

export default class ArmorStatDisplay extends React.Component<ArmorStatDisplayProps, {}> {

    constructor(props : ArmorStatDisplayProps) {
        super(props)
    }

    render() {
        let maxValue = this.props.ship.getStat(EStatType.armor);
        let value = this.props.ship.getCurrentArmor();
        const backgroundStyle = {
            width: value/maxValue * 100 + "%",
            backgroundColor: Colors.RGB.GREY
        }
        return (
            <div className="StatDisplay">
                <div className="StatDisplayBarBackground" style={backgroundStyle}/>
                <img className="StatDisplayImage" src={"assets/sprite/stats/armor_stat_image.png"}/>
                <div className="StatDisplayBar">
                    {value + " / " + maxValue}
                </div>
            </div>
        );
    }
}