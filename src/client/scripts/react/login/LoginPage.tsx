import React from "react";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";

export interface LoginPageState { errorMessage: string, isLoading: boolean }

export default class LoginPage extends React.Component<{}, LoginPageState> {

    private password: string = "";
    private username: string = "";

    constructor(props : {}) {
        super(props)
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
        this.updatePasswordInputValue = this.updatePasswordInputValue.bind(this);
        this.updateUsernameInputValue = this.updateUsernameInputValue.bind(this);
        EventHandler.on(Events.EEventType.SERVER_LOGIN_FAIL, this.onLoginFail);
        
        this.state = {
            errorMessage: "",
            isLoading: false
        }
    }

    componentWillReceiveProps() {
        this.setState({
            errorMessage: "",
            isLoading: false
        })
    }

    onClickLogin() {
        if(this.state.isLoading) {
            return;
        }
        this.setState({
            isLoading: true
        })
       
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

    onLoginFail(event: Events.SERVER_LOGIN_FAIL) {
        this.setState({
            errorMessage: event.data.message,
            isLoading: false
        });
    }

    render() {
        return (
            <div className="LoginPage Unselectable">
                <div className="InputFormContainer">
                    <div className="LoginRegisterErrorMessageContainer BodyText">
                        {this.state.errorMessage}
                    </div>
                    <label htmlFor="username_input" id="username_input_label">Username:</label>
                    <input autoComplete="off" type="text" placeholder="Enter Username" id="username_input" name="username_input" onChange={this.updateUsernameInputValue}></input>
                    <label htmlFor="password_input" id="password_input_label">Password:</label>
                    <input autoComplete="off" type="password" placeholder="Enter Password" id="password_input" name="password_input" onChange={this.updatePasswordInputValue}></input>
                    {!this.state.isLoading ?
                        <div className="LoginRegisterButton BodyText" onClick={this.onClickLogin}>Login</div>
                        :
                        <div className="LoginRegisterLoadingText BodyText" onClick={this.onClickLogin}>Loading...</div>
                    }
                </div>
            </div>
        );
    }
}