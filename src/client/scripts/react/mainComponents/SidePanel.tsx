import React, {Fragment}  from "react";
import ShipWindow from "../windows/ShipWindow";
import MapWindow from "../windows/MapWindow";
import SkillsWindow from "./Skills/SkillsWindow";

export interface SidePanelState {
     ship_window_open : boolean,
     map_window_open : boolean,
     skills_window_open : boolean;
 }

export default class SidePanel extends React.Component<{}, SidePanelState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            ship_window_open : false,
            map_window_open : false,
            skills_window_open : false
        }
        this.onShipWindowButtonClicked = this.onShipWindowButtonClicked.bind(this);
        this.onMapWindowButtonClicked = this.onMapWindowButtonClicked.bind(this);
        this.onSkillsWindowButtonClicked = this.onSkillsWindowButtonClicked.bind(this);
     }

    render() {
        var borderStyle = '5px solid rgb(255, 94, 0)';
        var ship_window_button_style = {
            borderRight: this.state.ship_window_open ? borderStyle : 'none'
        };
        var map_window_button_style = {
            borderRight: this.state.map_window_open ? borderStyle : 'none'
        };
        var skills_window_button_style = {
            borderRight: this.state.skills_window_open ? borderStyle : 'none'
        };
        return (
            <Fragment>
                <div id="side_panel" className="HasBorder Unselectable PanelBackground">
                    <div id="ship_window_button" className="SidePanelElement HasTooltip PanelBackgroundOnHover" style={ship_window_button_style}>
                        <img id="ship_window_button_icon" src="assets/image/ship_icon.png" onClick={this.onShipWindowButtonClicked}></img>
                        <span className="TooltipText">Ship</span>
                    </div>
                    <div id="map_window_button" className="SidePanelElement HasTooltip PanelBackgroundOnHover" style={map_window_button_style}>
                        <img id="map_window_button_icon" src="assets/image/map_icon.png" onClick={this.onMapWindowButtonClicked}></img>
                        <span className="TooltipText">Map</span>
                    </div>
                    <div id="skills_window_button" className="SidePanelElement HasTooltip PanelBackgroundOnHover" style={skills_window_button_style}>
                        <img id="skills_window_button_icon" src="assets/image/skills_icon.png" onClick={this.onSkillsWindowButtonClicked}></img>
                        <span className="TooltipText">Skills</span>
                    </div>
                </div>
                <ShipWindow window_open={this.state.ship_window_open} />
                <MapWindow window_open={this.state.map_window_open} />
                <SkillsWindow window_open={this.state.skills_window_open} />
            </Fragment>
        );
    }

    onShipWindowButtonClicked() {
        this.setState({
            ship_window_open : !this.state.ship_window_open,
            map_window_open : false,
            skills_window_open : false
        })
    }

    onMapWindowButtonClicked() {
        this.setState({
            ship_window_open : false,
            map_window_open : !this.state.map_window_open,
            skills_window_open : false
        })
    }

    onSkillsWindowButtonClicked() {
        this.setState({
            ship_window_open : false,
            map_window_open : false,
            skills_window_open : !this.state.skills_window_open
        })
    }
}