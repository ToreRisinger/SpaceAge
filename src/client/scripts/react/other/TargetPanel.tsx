import React from "react";
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import ObjectInfoPanel from "./ObjectInfoPanel";
import { TargetHandler } from "../../modules/TargetHandler";
import { Events } from "../../../../shared/util/Events";
import { EventHandler } from "../../modules/EventHandler";

export interface TargetPanelState { object: RadarDetectable | undefined }

export default class TargetPanel extends React.Component<{}, TargetPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         object: TargetHandler.getTarget()
      }
      this.onNewTarget = this.onNewTarget.bind(this);
      EventHandler.on(Events.EEventType.TARGET_CHANGED_EVENT, this.onNewTarget)
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
         object: TargetHandler.getTarget()
      });
   }

   onNewTarget(event: Events.TARGET_CHANGED_EVENT_CONFIG) {
      this.setState({
         object: event.data.object 
      });
   }

   render() {
         return (
            <div id="target_panel" style={{visibility: this.state.object != undefined ? 'visible' : 'hidden' }}>
               <ObjectInfoPanel object={this.state.object} ></ObjectInfoPanel>
               
            </div>
         );
   }
}