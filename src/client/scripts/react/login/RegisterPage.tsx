import React from "react";
import { EventHandler } from "../../modules/EventHandler";
import { Events } from "../../../../shared/util/Events";

export interface RegisterPageState { errorMessage: string, isLoading: boolean }

export default class RegisterPage extends React.Component<{}, RegisterPageState> {

    private password: string = "";
    private username: string = "";

    constructor(props : {}) {
        super(props)
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onRegisterFail = this.onRegisterFail.bind(this);
        this.updatePasswordInputValue = this.updatePasswordInputValue.bind(this);
        this.updateUsernameInputValue = this.updateUsernameInputValue.bind(this);
        EventHandler.on(Events.EEventType.SERVER_REGISTER_FAIL, this.onRegisterFail);
        
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
       
        let event : Events.CLIENT_REGISTER_REQ = {
            eventId : Events.EEventType.CLIENT_REGISTER_REQ,
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

    onRegisterFail(event: Events.SERVER_REGISTER_FAIL) {
        this.setState({
            errorMessage: event.data.message,
            isLoading: false
        });
    }

    render() {
        return (
            <div className="RegisterPageState Unselectable">
                <div className="InputFormContainer">
                    <div className="LoginRegisterErrorMessageContainer BodyText">
                        {this.state.errorMessage}
                    </div>
                    <label htmlFor="username_input" id="username_input_label">Username:</label>
                    <input autoComplete="off" type="text" placeholder="Enter Username" id="username_input" name="username_input" onChange={this.updateUsernameInputValue}></input>
                    <label htmlFor="password_input" id="password_input_label">Password:</label>
                    <input autoComplete="off" type="password" placeholder="Enter Password" id="password_input" name="password_input" onChange={this.updatePasswordInputValue}></input>
                    {!this.state.isLoading ?
                        <div className="LoginRegisterButton BodyText" onClick={this.onClickLogin}>Register</div>
                        :
                        <div className="LoginRegisterLoadingText BodyText" onClick={this.onClickLogin}>Loading...</div>
                    }
                </div>
            </div>
        );
    }
}