import React from "react";

export default class LoadingPage extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
         return (
            <div className="LoadingPage BodyText Unselectable">
               <div className="LoadingPageTextContainer">
                  LOADING
               </div>
            </div>
         );
   }
}