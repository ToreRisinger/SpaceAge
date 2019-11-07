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
                            <pre>Thrust:                      {ship ? ship.stats[ObjectInterfaces.EShipStatType.thrust] : "N/A"} N</pre>
                            <pre>Acceleration:                {ship ? Math.round(ship.stats[ObjectInterfaces.EShipStatType.acceleration]) : "N/A"} m/s<sup>2</sup></pre>
                            <pre>Max speed:                   {ship ? ship.stats[ObjectInterfaces.EShipStatType.max_speed] : "N/A"} km/h</pre>
                            <pre>Mass:                        {ship ? ship.stats[ObjectInterfaces.EShipStatType.mass] : "N/A"} kg</pre>
                            
                            <hr></hr>
                            <pre>Power:                       {ship ? ship.stats[ObjectInterfaces.EShipStatType.power] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Shield:                      {ship ? ship.properties.currentShield + "/" + ship.stats[ObjectInterfaces.EShipStatType.shield] : "N/A"}</pre>
                            <pre>Armor:                       {ship ? ship.properties.currentArmor + "/" + ship.stats[ObjectInterfaces.EShipStatType.armor] : "N/A"}</pre>
                            <pre>Hull:                        {ship ? ship.properties.currentHull + "/" + ship.stats[ObjectInterfaces.EShipStatType.hull] : "N/A"}</pre>
                            <pre>Shield generation:           {ship ? ship.stats[ObjectInterfaces.EShipStatType.shield_generation] : "N/A"} p/s</pre>
                            <pre>Armor impact resistance:     {ship ? ship.stats[ObjectInterfaces.EShipStatType.armor_impact_resistance] : "N/A"} %</pre>
                            <pre>Armor heat resistance:       {ship ? ship.stats[ObjectInterfaces.EShipStatType.armor_heat_resistance] : "N/A"} %</pre>
                            <pre>Armor explosion resistance:  {ship ? ship.stats[ObjectInterfaces.EShipStatType.armor_explosion_resistance] : "N/A"} %</pre>
                            
                            <hr></hr>
                            <pre>Radar range:                 {ship ? ship.stats[ObjectInterfaces.EShipStatType.radar_range] : "N/A"} m</pre>
                            <pre>Radar signature reduction:   {ship ? ship.stats[ObjectInterfaces.EShipStatType.radar_signature_reduction] : "N/A"} %</pre>
                            
                            <hr></hr>
                            <pre>Dodge:                       {ship ? ship.stats[ObjectInterfaces.EShipStatType.dodge] : "N/A"} %</pre>
                            <pre>Target dodge reduction:      {ship ? ship.stats[ObjectInterfaces.EShipStatType.target_dodge_reduction] : "N/A"} %</pre>

                            <hr></hr>
                            <pre>Cargo hold:                  {ship ? ship.stats[ObjectInterfaces.EShipStatType.cargo_hold] : "N/A"} m<sup>2</sup></pre>
                            
                            <hr></hr>
                            <pre>Weapon range:                {ship ? ship.stats[ObjectInterfaces.EShipStatType.weapon_range] : "N/A"} m</pre>
                            <pre>Explosive damage:            {ship ? ship.stats[ObjectInterfaces.EShipStatType.explosive_dps] : "N/A"} damage per second</pre>
                            <pre>Impact damage:               {ship ? ship.stats[ObjectInterfaces.EShipStatType.impact_dps] : "N/A"} damage per second</pre>
                            <pre>Heat damage:                 {ship ? ship.stats[ObjectInterfaces.EShipStatType.heat_dps] : "N/A"} damage per second</pre>
                            <pre>Normal damage:               {ship ? ship.stats[ObjectInterfaces.EShipStatType.normal_dps] : "N/A"} damage per second</pre>
                            
                            <hr></hr>
                            <pre>Mining laser strength:       {ship ? ship.stats[ObjectInterfaces.EShipStatType.mining_laser_strength] : "N/A"}</pre>
                            <pre>Mining laser range:          {ship ? ship.stats[ObjectInterfaces.EShipStatType.mining_laser_range] : "N/A"} m</pre>
                            
                        </div> 
                        <div id="ship_window_right_section">

                        </div>  
                    </div>
                }
            </Fragment>
        );
    }
}