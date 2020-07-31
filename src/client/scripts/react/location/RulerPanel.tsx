import React, { Fragment } from "react";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import { Utils } from "../../../../shared/util/Utils";
import { GlobalDataService } from "../../modules/GlobalDataService";

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
        let cameraZoom = GlobalDataService.getInstance().getCameraZoom();
        this.setState({
            zoom : cameraZoom
        })
    }


   render() {
        let zoomString = Utils.formatMeters(this.state.zoom * 100);
        return (
            <div id="ruler_panel" className="Unselectable">
                <div id="ruler_zoom_text" className="BodyText">{zoomString}</div>
                <img id="ruler_image" src="assets/image/ruler.png"/>
            </div>
        );
   }
}