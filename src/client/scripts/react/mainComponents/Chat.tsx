import React from "react";

export default class Chat extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
        return (
            <div id="chat" className="UIComponent"></div>
        );
   }
}