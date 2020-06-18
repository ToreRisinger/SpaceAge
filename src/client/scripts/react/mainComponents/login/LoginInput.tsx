import React from "react";
import { EventHandler } from "../../../modules/EventHandler";
import { Events } from "../../../../../shared/util/Events";

export default class LoginInput extends React.Component<{}, {}> {

    private password : String = "";
    private username : String = "";

    constructor(props : {}) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePasswordInputValue = this.updatePasswordInputValue.bind(this);
        this.updateUsernameInputValue = this.updateUsernameInputValue.bind(this);
    }

    handleSubmit() {
        let event : Events.CLIENT_LOGIN_REQ = {
            eventId : Events.EEventType.CLIENT_LOGIN_REQ,
            data : {
                password : this.password,
                username : this.username
            }
        }
        EventHandler.pushEvent(event);
    }

    updatePasswordInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        this.password = event.currentTarget.value;
    }

    updateUsernameInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        this.username = event.currentTarget.value;
    }

    render() {
        return (
            <div id="login_input_form_container">
                <div id="login_input_container">
                    <label htmlFor="username_input" id="username_input_label">Username:</label>
                    <input type="text" placeholder="Enter Username" id="username_input" name="username_input" onChange={this.updateUsernameInputValue}></input>
                    <label htmlFor="password_input" id="password_input_label">Password:</label>
                    <input type="password" placeholder="Enter Password" id="password_input" name="password_input" onChange={this.updatePasswordInputValue}></input>
                    <button id="login_submit_button" type="submit" onClick={this.handleSubmit}>Login</button>
                </div>
            </div>
        );
    }
}