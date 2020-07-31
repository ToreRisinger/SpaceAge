import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ObjectInfoPanel from "./ObjectInfoPanel";
import { Events } from "../../../../shared/util/Events";
import { SelectionHandler } from "../../modules/SelectionHandler";
import { EventHandler } from "../../modules/EventHandler";

export interface SelectionPanelState { object: RadarDetectable | undefined }

export default class SelectionPanel extends React.Component<{}, SelectionPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         object: SelectionHandler.getSelection()
      }
      this.onNewSelection = this.onNewSelection.bind(this);
      EventHandler.on(Events.EEventType.SELECTION_CHANGED_EVENT, this.onNewSelection)
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
      this.setState({
         object: SelectionHandler.getSelection()
      });
   }

   onNewSelection(event: Events.SELECTION_CHANGED_EVENT_CONFIG) {
      this.setState({
         object: event.data.object 
      });
   }

   render() {
      return (
         <div id="selection_panel" className="PanelBackground HasBorder" style={{visibility: this.state.object != undefined ? 'visible' : 'hidden' }}>
            <ObjectInfoPanel object={this.state.object} ></ObjectInfoPanel>
         </div>
      );
   }
}