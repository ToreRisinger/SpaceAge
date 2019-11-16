import React, { Fragment } from "react";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";
import { GlobalData } from "../../modules/GlobalData";
import { Utils } from "../../../../shared/scripts/Utils";

export interface RulerPanelState { zoom : number }

export default class RulerPanel extends React.Component<{}, RulerPanelState> {
    
    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : {}) {
        super(props)
        this.state = {
            zoom : 1
        }
        this.onZoomChange = this.onZoomChange.bind(this);
        
    }

    componentDidMount() {
        this.timerID = setInterval(
        () => this.tick(),
            1000
        )
    }

    tick() {
        if(EventHandler.isInitialized()) {
            EventHandler.on(Events.EEventType.ZOOM_CHANGED_EVENT, this.onZoomChange);
            if(this.timerID != undefined) {
                clearInterval(this.timerID);
            }
        } 
    }

    onZoomChange() {
        this.setState({
            zoom : GlobalData.cameraZoom
        })
    }


   render() {
        let zoomString = Utils.formatMeters(this.state.zoom * 100);
        return (
            <div id="ruler_panel">
                <div id="ruler_zoom_text">{zoomString}</div>
                <img id="ruler_image" src="assets/image/ruler.png"/>
            </div>
        );
   }
}