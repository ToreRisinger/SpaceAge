import React from "react";
import { EStatType } from "../../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../../shared/colors/Colors";
import { CShip } from "../../../game_objects/CShip";

export interface ShieldStatDisplayProps {
    ship : CShip
}

export default class ShieldStatDisplay extends React.Component<ShieldStatDisplayProps, {}> {

    constructor(props : ShieldStatDisplayProps) {
        super(props)
    }

    render() {
        let maxValue = this.props.ship.getStat(EStatType.shield);
        let value = this.props.ship.getCurrentShield();
        const backgroundStyle = {
            width: value/maxValue * 100 + "%",
            backgroundColor: Colors.RGB.GREY
        }
        return (
            <div className="StatDisplay">
                <div className="StatDisplayBarBackground" style={backgroundStyle}/>
                <img className="StatDisplayImage" src={"assets/sprite/stats/shield_stat_image.png"}/>
                <div className="StatDisplayBar">
                    {value + " / " + maxValue}
                </div>
            </div>
        );
    }
}