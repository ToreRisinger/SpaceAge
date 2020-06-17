import React from "react";
import ObjectInfoContainer from "./ObjectInfoContainer";
import { GlobalDataService } from "../../modules/GlobalDataService";

export interface LocationInfoPanelState { location: string, sectorName: string, x: number, y: number}

export default class LocationInfoPanel extends React.Component<{}, LocationInfoPanelState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
      super(props)
      let globalData = GlobalDataService.getInstance();
      this.state = {
          location: globalData.getCharacter().location,
          sectorName: globalData.getSector().getDisplayName(),
          x: globalData.getPlayerShip().getGameObjectData().x,
          y: globalData.getPlayerShip().getGameObjectData().y
      }
      this.timerID = undefined;
      this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
     }
    
     componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
     }
    
     tick() {
        let globalData = GlobalDataService.getInstance();
        this.setState({
            location: globalData.getCharacter().location,
            sectorName: globalData.getSector().getDisplayName(),
            x: globalData.getPlayerShip().getGameObjectData().x,
            y: globalData.getPlayerShip().getGameObjectData().y
        });
     }

    render() {
        let fields : Array<string> = new Array();
        fields.push(this.state.location);
        fields.push("[" + this.state.sectorName + "]");
        fields.push("[X: " + Math.round(this.state.x) + "]");
        fields.push("[y: " + Math.round(this.state.y) + "]");

        return (
            <div id="location_info_panel">
               <ObjectInfoContainer title={undefined} fields={fields} description={undefined} centerFields={true}/>
            </div>
        );
    }
}