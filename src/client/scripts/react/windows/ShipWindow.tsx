import React, { Fragment }  from "react";
import WindowHeader from "./WindowHeader";
import ShipDisplay from "./ShipDisplay";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { CCharacter } from "../../game_objects/CCharacter";

export interface ShipWindowProps {
    window_open: boolean
}

export interface ShipWindowState { ship : CCharacter }

export default class ShipWindow extends React.Component<ShipWindowProps, ShipWindowState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ShipWindowProps) {
        super(props)
        this.state = {
            ship: GlobalDataService.getInstance().getPlayerShip()
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
            ship: GlobalDataService.getInstance().getPlayerShip()
        });
    }

    render() {
        let ship = this.state.ship;
        return (
            <Fragment>
                {this.props.window_open &&
                    <div id="ship_window" className="BodyText SidePanelWindow Unselectable">
                        <WindowHeader text="Ship"/>
                        <div id="ship_window_left_section">
                            <pre>Thrust:                      {ship.getStat(EStatType.thrust)} N</pre>
                            <pre>Acceleration:                {Math.round(ship.getStat(EStatType.acceleration))} m/s<sup>2</sup></pre>
                            <pre>Max speed:                   {ship.getStat(EStatType.max_speed)} m/s</pre>
                            <pre>Mass:                        {ship.getStat(EStatType.mass)} kg</pre>
                            
                            <hr></hr>
                            <pre>Power:                       {ship.getStat(EStatType.power)}</pre>
                            
                            <hr></hr>
                            <pre>Shield:                      {ship.getCurrentShield() + "/" +ship.getStat(EStatType.shield)}</pre>
                            <pre>Armor:                       {ship.getCurrentArmor() + "/" +ship.getStat(EStatType.armor)}</pre>
                            <pre>Hull:                        {ship.getCurrentHull() + "/" +ship.getStat(EStatType.hull)}</pre>
                            <pre>Shield generation:           {ship.getStat(EStatType.shield_generation)} p/s</pre>
                            
                            <hr></hr>
                            <pre>Radar range:                 {ship.getStat(EStatType.radar_range)} m</pre>
                            <pre>Radar signature reduction:   {ship.getStat(EStatType.radar_signature_reduction)}</pre>
                            
                            <hr></hr>
                            <pre>Dodge:                       { Math.round(ship.getStat(EStatType.dodge) * 100)} %</pre>
                            <pre>Target dodge reduction:      {ship.getStat(EStatType.target_dodge_reduction)}</pre>

                            <hr></hr>
                            <pre>Cargo hold:                  {ship.getStat(EStatType.cargo_hold)} m<sup>2</sup></pre>
                            
                            <hr></hr>
                            <pre>Weapon range:                {ship.getStat(EStatType.weapon_range)} m</pre>
                            <pre>Weapon damage:               {ship.getStat(EStatType.weapon_damage)} damage per second</pre>
        
                            <hr></hr>
                            <pre>Mining laser strength:       {ship.getStat(EStatType.mining_laser_strength)}</pre>
                            <pre>Mining laser range:          {ship.getStat(EStatType.mining_laser_range)} m</pre>    
                        </div> 
                        <div id="ship_window_right_section">
                            <ShipDisplay modules={ship.getModules()}/>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}