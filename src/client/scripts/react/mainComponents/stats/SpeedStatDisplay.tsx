import React from "react";
import { EStatType } from "../../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../../shared/colors/Colors";
import { CShip } from "../../../game_objects/CShip";

export interface SpeedStatDisplayProps {
    ship : CShip
}

export default class SpeedStatDisplay extends React.Component<SpeedStatDisplayProps, {}> {

    constructor(props : SpeedStatDisplayProps) {
        super(props)
    }

    render() {
        //@ts-ignore
        let maxValue = this.props.ship.getStat(EStatType.max_speed);
        let value = Math.round(this.props.ship.getMetersPerSecond());
        const backgroundStyle = {
            width: value/maxValue * 100 + "%",
            backgroundColor: Colors.RGB.GREY
        }

        return (
            <div className="StatDisplay">
                <div className="StatDisplayBarBackground" style={backgroundStyle}/>
                <img className="StatDisplayImage" src={"assets/sprite/stats/speed_stat_image.png"}/>
                <div className="StatDisplayBar">
                    {value + " / " + maxValue}
                </div>
            </div>
        );
    }
}