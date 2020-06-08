import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import { ObjectInterfaces } from "./../../../../shared/scripts/ObjectInterfaces";
import ShipDisplay from "./ShipDisplay";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { Stats } from "../../../../shared/stats/Stats";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";

export interface ShipWindowProps {
    window_open: boolean
}

export interface ShipWindowState { character : ICharacter | undefined; }

export default class ShipWindow extends React.Component<ShipWindowProps, ShipWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ShipWindowProps) {
        super(props)
        this.state = {
            character: GlobalDataService.getInstance().getCharacter()
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
            character: GlobalDataService.getInstance().getCharacter()
        });
    }

    render() {
        let character : ICharacter | undefined = this.state.character;
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="ship_window" className="UIComponent SidePanelWindow Unselectable">
                        <WindowHeader text="Ship"/>
                        <div id="ship_window_left_section">
                            <pre>Thrust:                      {character ? character.stats[Stats.EStatType.thrust] : "N/A"} N</pre>
                            <pre>Acceleration:                {character ? Math.round(character.stats[Stats.EStatType.acceleration]) : "N/A"} m/s<sup>2</sup></pre>
                            <pre>Max speed:                   {character ? character.stats[Stats.EStatType.max_speed] : "N/A"} m/s</pre>
                            <pre>Mass:                        {character ? character.stats[Stats.EStatType.mass] : "N/A"} kg</pre>
                            
                            <hr></hr>
                            <pre>Power:                       {character ? character.stats[Stats.EStatType.power] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Shield:                      {character ? character.properties.currentShield + "/" + character.stats[Stats.EStatType.shield] : "N/A"}</pre>
                            <pre>Armor:                       {character ? character.properties.currentArmor + "/" + character.stats[Stats.EStatType.armor] : "N/A"}</pre>
                            <pre>Hull:                        {character ? character.properties.currentHull + "/" + character.stats[Stats.EStatType.hull] : "N/A"}</pre>
                            <pre>Shield generation:           {character ? character.stats[Stats.EStatType.shield_generation] : "N/A"} p/s</pre>
                            <pre>Armor impact resistance:     {character ? character.stats[Stats.EStatType.armor_impact_resistance] : "N/A"}</pre>
                            <pre>Armor heat resistance:       {character ? character.stats[Stats.EStatType.armor_heat_resistance] : "N/A"}</pre>
                            <pre>Armor explosion resistance:  {character ? character.stats[Stats.EStatType.armor_explosion_resistance] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Radar range:                 {character ? character.stats[Stats.EStatType.radar_range] : "N/A"} m</pre>
                            <pre>Radar signature reduction:   {character ? character.stats[Stats.EStatType.radar_signature_reduction] : "N/A"}</pre>
                            
                            <hr></hr>
                            <pre>Dodge:                       {character ? Math.round(character.stats[Stats.EStatType.dodge] * 100) : "N/A"} %</pre>
                            <pre>Target dodge reduction:      {character ? character.stats[Stats.EStatType.target_dodge_reduction] : "N/A"}</pre>

                            <hr></hr>
                            <pre>Cargo hold:                  {character ? character.stats[Stats.EStatType.cargo_hold] : "N/A"} m<sup>2</sup></pre>
                            
                            <hr></hr>
                            <pre>Weapon range:                {character ? character.stats[Stats.EStatType.weapon_range] : "N/A"} m</pre>
                            <pre>Explosive damage:            {character ? character.stats[Stats.EStatType.explosive_dps] : "N/A"} damage per second</pre>
                            <pre>Impact damage:               {character ? character.stats[Stats.EStatType.impact_dps] : "N/A"} damage per second</pre>
                            <pre>Heat damage:                 {character ? character.stats[Stats.EStatType.heat_dps] : "N/A"} damage per second</pre>
                            <pre>Normal damage:               {character ? character.stats[Stats.EStatType.normal_dps] : "N/A"} damage per second</pre>
                            
                            <hr></hr>
                            <pre>Mining laser strength:       {character ? character.stats[Stats.EStatType.mining_laser_strength] : "N/A"}</pre>
                            <pre>Mining laser range:          {character ? character.stats[Stats.EStatType.mining_laser_range] : "N/A"} m</pre>    
                        </div> 
                        {character ?
                            <div id="ship_window_right_section">
                                <ShipDisplay modules={character.modules}/>
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