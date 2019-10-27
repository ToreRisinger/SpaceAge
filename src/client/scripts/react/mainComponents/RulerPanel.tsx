import React from "react";

export default class RulerPanel extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        return (
            <div id="ruler_panel">
                <img id="ruler_image" src="assets/image/ruler.png"/>
            </div>
        );
   }
}