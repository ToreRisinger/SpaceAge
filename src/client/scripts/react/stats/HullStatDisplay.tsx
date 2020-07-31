import React from "react";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../shared/colors/Colors";
import { CShip } from "../../game_objects/CShip";

export interface HullStatDisplayProps {
    ship : CShip
}

export default class HullStatDisplay extends React.Component<HullStatDisplayProps, {}> {

    constructor(props : HullStatDisplayProps) {
        super(props)
    }

    render() {
        let maxValue = this.props.ship.getStat(EStatType.hull)
        let value = this.props.ship.getCurrentHull()
        const backgroundStyle = {
            width: value/maxValue * 100 + "%",
            backgroundColor: Colors.RGB.GREY
        }
        return (
            <div className="StatDisplay">
                <div className="StatDisplayBarBackground" style={backgroundStyle}/>
                <img className="StatDisplayImage" src={"assets/sprite/stats/hull_stat_image.png"}/>
                <div className="StatDisplayBar">
                    {value + " / " + maxValue}
                </div>
            </div>
        );
    }
}