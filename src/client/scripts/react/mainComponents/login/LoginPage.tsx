import React from "react";
import LoginInput from "./LoginInput";

export default class LoginPage extends React.Component<{}, {}> {

   constructor(props : {}) {
      super(props)
   }

   render() {
         return (
            <div id="login_page">
               <LoginInput/>
            </div>
         );
   }
}