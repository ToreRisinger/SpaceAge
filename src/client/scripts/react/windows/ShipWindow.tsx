import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import { GlobalData } from "./../../modules/GlobalData";
import { ObjectInterfaces } from "./../../../../shared/scripts/ObjectInterfaces";

export interface ShipWindowProps {
    window_open: boolean
}


export interface ShipWindowState { ship : ObjectInterfaces.IShip | undefined; }

export default class ShipWindow extends React.Component<ShipWindowProps, ShipWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ShipWindowProps) {
        super(props)
        this.state = {
            ship: GlobalData.getPlayerShipData()
          }
          this.timerID = undefined;
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          100
        );
    }
    
    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }
    
    tick() {
        this.setState({
            ship: GlobalData.getPlayerShipData()
        });
    }

    render() {
        let ship : ObjectInterfaces.IShip | undefined = this.state.ship;
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="ship_window" className="UIComponent SidePanelWindow Unselectable">
                        <WindowHeader text="Ship"/>
                        <div id="ship_window_left_section">
                            <pre>Shield:                      {ship ? ship.properties.currentShield + "/" + ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield] : "N/A"}</pre>
                            <pre>Armor:                       {ship ? ship.properties.currentArmor + "/" + ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor] : "N/A"}</pre>
                            <pre>Hull:                        {ship ? ship.properties.currentHull + "/" + ship.stats[ObjectInterfaces.ShipStatTypeEnum.hull] : "N/A"}</pre>
                            <hr></hr>
                            <pre>Thrust:                      {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.thrust] : "N/A"} N</pre>
                            <pre>Acceleration:                {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.acceleration] : "N/A"} m/s<sup>2</sup></pre>
                            <pre>Max speed:                   {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.max_speed] : "N/A"} km/h</pre>
                            <hr></hr>
                            <pre>Weight:                      {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.weight] : "N/A"} kg</pre>
                            <pre>Energy grid:                 {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.energy_grid] : "N/A"}</pre>
                            <pre>Cargo hold:                  {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.cargo_hold] : "N/A"} m<sup>2</sup></pre>
                            <hr></hr>
                            <pre>Proximity radar:             {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.proximity_radar_range] : "N/A"} m</pre>
                            <pre>Gravity radar:               {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.gravity_radar_range] : "N/A"} m</pre>
                            <hr></hr>
                            <pre>Targeting system:            {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.targeting_systems] : "N/A"}</pre>
                            <pre>avoidance_systems:           {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.avoidance_systems] : "N/A"}</pre>
                            <hr></hr>
                            <pre>Shield generation:           {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield_generation] : "N/A"} p/s</pre>
                            <pre>Shield impact resistance:    {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield_impact_resistance] : "N/A"} %</pre>
                            <pre>Shield heat resistance:      {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield_heat_resistance] : "N/A"} %</pre>
                            <pre>Shield explosion resistance: {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.shield_explosion_resistance] : "N/A"} %</pre>
                            <hr></hr>
                            <pre>Armor repair:                {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_repair] : "N/A"} p/s</pre>
                            <pre>Armor impact resistance:     {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_impact_resistance] : "N/A"} %</pre>
                            <pre>Armor heat resistance:       {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_heat_resistance] : "N/A"} %</pre>
                            <pre>Armor explosion resistance:  {ship ? ship.stats[ObjectInterfaces.ShipStatTypeEnum.armor_explosion_resistance] : "N/A"} %</pre>
                        </div> 
                        <div id="ship_window_right_section">

                        </div>  
                    </div>
                }
            </Fragment>
        );
    }
    /*

            [ShipStatTypeEnum.armor_repair] : number,
            [ShipStatTypeEnum.armor_impact_resistance] : number,
            [ShipStatTypeEnum.armor_heat_resistance] : number,
            [ShipStatTypeEnum.armor_explosion_resistance] : number,
*/
}