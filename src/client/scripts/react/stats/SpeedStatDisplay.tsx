import React from "react";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../shared/colors/Colors";
import { CShip } from "../../game_objects/CShip";

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
        let percentage = value/maxValue * 100;
        if(percentage > 100) {
            percentage = 100;
        }
        const backgroundStyle = {
            width: percentage + "%",
            backgroundColor: Colors.RGB.GREY
        }

        return (
            <div className="StatDisplay">
                <div className="StatDisplayBarBackground" style={backgroundStyle}/>
                <img className="StatDisplayImage" src={"assets/sprite/stats/speed_stat_image.png"}/>
                <div className="StatDisplayBar">
                    {value + " m/s"}
                </div>
            </div>
        );
    }
}