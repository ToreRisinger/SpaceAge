import React, { Fragment } from "react";
import { GameObjectHandler } from "./../../modules/GameObjectHandler"
import { GameObject } from "./../../game_objects/GameObject"
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import  NavigationContainer  from "./NavigationContainer"
import  SelectionPanel  from "./SelectionPanel"
import { EventHandler } from "./../../modules/EventHandler";
import { Events } from "../../../../shared/scripts/Events";

export interface NavigationPanelState { gameObjects : Array<GameObject>, selectedObject : GameObject | undefined; }

export default class NavigationPanel extends React.Component<{}, NavigationPanelState> {
  
   private timerID : ReturnType<typeof setTimeout> | undefined;
   private eventHandlerWaitTimer : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         gameObjects : GameObjectHandler.getGameObjects(),
         selectedObject : undefined
     }
     this.timerID = undefined;
     this.eventHandlerWaitTimer = undefined;
     this.tick = this.tick.bind(this);
     this.onNewSelection = this.onNewSelection.bind(this);
   }

   componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      this.eventHandlerWaitTimer = setInterval(
         () => this.eventHandlerRegistration(),
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
         gameObjects: GameObjectHandler.getGameObjects()
      });
   }

   eventHandlerRegistration() {
      if(EventHandler.isInitialized()) {
         EventHandler.on(Events.EEventType.SELECTION_CHANGED_EVENT, this.onNewSelection)
         if(this.eventHandlerWaitTimer != undefined) {
            clearInterval(this.eventHandlerWaitTimer);
        }
      }
   }

   onNewSelection(event: Events.SELECTION_CHANGED_EVENT_CONFIG) {
      this.setState({
         selectedObject: event.data.object 
      });
   }

   render() {
      let radarDetectables = new Array<RadarDetectable>();

      for(let i = 0; i < this.state.gameObjects.length; i++) {
         let object : GameObject = this.state.gameObjects[i];
         if(object instanceof RadarDetectable && !object.isThisPlayerShip()) {
            radarDetectables.push(object);
         }
      }

      radarDetectables.sort(function(a,b) { return a.getDistanceToPlayerShip() - b.getDistanceToPlayerShip()});

      return (
         <Fragment>
            <SelectionPanel selectedObject={this.state.selectedObject} />
            <div id="navigation_panel" className="UIComponent">
               <div id="navigation_panel_title" className="Unselectable">Navigation</div>
               <div id="navigation_panel_table_header">
                  <div id="navigation_panel_table_header_icon" className="Unselectable"></div>
                  <div id="navigation_panel_table_header_name" className="Unselectable">Name</div>
                  <div id="navigation_panel_table_header_distance" className="Unselectable">Distance</div>
               </div>
               <NavigationContainer itemsToList={radarDetectables}/>
            </div>
         </Fragment>
      );
   }
}