import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import { ObjectInterfaces } from "./../../../../shared/scripts/ObjectInterfaces";
import ShipDisplay from "./ShipDisplay";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { Stats } from "../../../../shared/stats/Stats";

export interface ShipWindowProps {
    window_open: boolean
}

export interface ShipWindowState { ship : ObjectInterfaces.IShip | undefined; }

export default class ShipWindow extends React.Component<ShipWindowProps, ShipWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ShipWindowProps) {
        super(props)
        this.state = {
            ship: GlobalDataService.getInstance().getPlayerShip().getShipData()
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
            ship: GlobalDataService.getInstance().getPlayerShip().getShipData()
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
                            <pre>Thrust:                      {ship ? ship.stats[Stats.EStatType.thrust] : "N/A"} N</pre>
                            <pre>Acceleration:                {ship ? Math.round(ship.stats[Stats.EStatType.acceleration]) : "N/A"} m/s<sup>2</sup></pre>
                            <pre>Max speed:                   {ship ? ship.stats[Stats.EStatType.max_speed] : "N/A"} m/s</pre>
                            <pre>Mass:                        {ship ? ship.stats[Stats.EStatType.mass] : "N/A"} kg</pre>
                            
                            <hr></hr>
                            <pre>Power:                       {ship ? ship.stats[Stats.EStatType.power] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Shield:                      {ship ? ship.properties.currentShield + "/" + ship.stats[Stats.EStatType.shield] : "N/A"}</pre>
                            <pre>Armor:                       {ship ? ship.properties.currentArmor + "/" + ship.stats[Stats.EStatType.armor] : "N/A"}</pre>
                            <pre>Hull:                        {ship ? ship.properties.currentHull + "/" + ship.stats[Stats.EStatType.hull] : "N/A"}</pre>
                            <pre>Shield generation:           {ship ? ship.stats[Stats.EStatType.shield_generation] : "N/A"} p/s</pre>
                            <pre>Armor impact resistance:     {ship ? ship.stats[Stats.EStatType.armor_impact_resistance] : "N/A"}</pre>
                            <pre>Armor heat resistance:       {ship ? ship.stats[Stats.EStatType.armor_heat_resistance] : "N/A"}</pre>
                            <pre>Armor explosion resistance:  {ship ? ship.stats[Stats.EStatType.armor_explosion_resistance] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Radar range:                 {ship ? ship.stats[Stats.EStatType.radar_range] : "N/A"} m</pre>
                            <pre>Radar signature reduction:   {ship ? ship.stats[Stats.EStatType.radar_signature_reduction] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Dodge:                       {ship ? ship.stats[Stats.EStatType.dodge] : "N/A"}</pre>
                            <pre>Target dodge reduction:      {ship ? ship.stats[Stats.EStatType.target_dodge_reduction] : "N/A"}</pre>

                            <hr></hr>
                            <pre>Cargo hold:                  {ship ? ship.stats[Stats.EStatType.cargo_hold] : "N/A"} m<sup>2</sup></pre>
                            
                            <hr></hr>
                            <pre>Weapon range:                {ship ? ship.stats[Stats.EStatType.weapon_range] : "N/A"} m</pre>
                            <pre>Explosive damage:            {ship ? ship.stats[Stats.EStatType.explosive_dps] : "N/A"} damage per second</pre>
                            <pre>Impact damage:               {ship ? ship.stats[Stats.EStatType.impact_dps] : "N/A"} damage per second</pre>
                            <pre>Heat damage:                 {ship ? ship.stats[Stats.EStatType.heat_dps] : "N/A"} damage per second</pre>
                            <pre>Normal damage:               {ship ? ship.stats[Stats.EStatType.normal_dps] : "N/A"} damage per second</pre>
                            
                            <hr></hr>
                            <pre>Mining laser strength:       {ship ? ship.stats[Stats.EStatType.mining_laser_strength] : "N/A"}</pre>
                            <pre>Mining laser range:          {ship ? ship.stats[Stats.EStatType.mining_laser_range] : "N/A"} m</pre>    
                        </div> 
                        {ship ?
                            <div id="ship_window_right_section">
                                <ShipDisplay modules={ship.modules}/>
                            </div>  
                            :
                            <div id="ship_window_right_section"></div> 
                        }
                        
                    </div>
                }
            </Fragment>
        );
    }
}