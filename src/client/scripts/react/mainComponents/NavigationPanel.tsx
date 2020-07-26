import React, { Fragment } from "react";
import { GameObjectHandler } from "./../../modules/GameObjectHandler"
import { GameObject } from "./../../game_objects/GameObject"
import { RadarDetectable } from "../../game_objects/RadarDetectable";
import  NavigationContainer  from "./NavigationContainer"
import { EventHandler } from "./../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";
import TargetPanel from "./TargetPanel";
import SelectionPanel from "./SelectionPanel";

export interface NavigationPanelState { gameObjects : Array<GameObject>, targetObject : GameObject | undefined; }

export default class NavigationPanel extends React.Component<{}, NavigationPanelState> {
  
   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
      super(props)
      this.state = {
         gameObjects : GameObjectHandler.getGameObjects(),
         targetObject : undefined
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
      this.setState({
         gameObjects: GameObjectHandler.getGameObjects()
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
            <div id="navigation_panel">
               <div id="navigation_panel_table_header" className="BodyText">
                  <div id="navigation_panel_table_header_icon" className=""></div>
                  <div id="navigation_panel_table_header_name" className="">Name</div>
                  <div id="navigation_panel_table_header_distance" className="">Distance</div>
               </div>
               <NavigationContainer itemsToList={radarDetectables}/>
            </div>
         </Fragment>
      );
   }
}