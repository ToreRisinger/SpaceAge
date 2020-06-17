import React from "react";
import ShipStatsBottomPanel from "./ShipStatsBottomPanel";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";

export interface BottomPanelState { character : ICharacter; }

export default class BottomPanel extends React.Component<{}, BottomPanelState> {

   private timerID : ReturnType<typeof setTimeout> | undefined;

   constructor(props : {}) {
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
      let globalData = GlobalDataService.getInstance();
      this.setState({
         character: globalData.getCharacter()
      });
    }

   render() {
      return (
         <div id="bottom_panel" className="PanelBackground Unselectable HasBorder">
            <ShipStatsBottomPanel character={this.state.character}/>
         </div>
      );
   }
}