import React, { Fragment } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export interface HomePageState { pageState: EHomePageState }

enum EHomePageState {
    LOGIN,
    REGISTER
}

export class HomePage extends React.Component<{}, HomePageState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            pageState: EHomePageState.LOGIN
        }
        this.getElements = this.getElements.bind(this);
        this.onPressLogin = this.onPressLogin.bind(this);
        this.onPressRegister = this.onPressRegister.bind(this);
    }

    onPressLogin() {
        this.setState({
            pageState: EHomePageState.LOGIN
        })
    }

    onPressRegister() {
        this.setState({
            pageState: EHomePageState.REGISTER
        })
    }

    getElements() {
        switch(this.state.pageState) { 
            case EHomePageState.LOGIN: {
                return (
                    <Fragment>
                        <LoginPage/>
                    </Fragment>
                )
            }
            case EHomePageState.REGISTER : {
                return (
                    <Fragment>
                        <RegisterPage/>
                    </Fragment>
                )
            }
            default: { 
               break; 
            } 
        } 
    }


    render() {
        const homePageLoginButtonClass = this.state.pageState == EHomePageState.LOGIN ? " SelectedText" : ""
        const homePageRegisterButtonClass = this.state.pageState == EHomePageState.REGISTER ? " SelectedText" : ""

        return (
            <div className="HomePage Unselectable BodyText">
                <div className="HomePageButtonsContainer">
                    <div className={"HomePageButton" + homePageLoginButtonClass} onClick={this.onPressLogin}>Login</div>
                    <div className={"HomePageButton" + homePageRegisterButtonClass} onClick={this.onPressRegister}>Register</div>
                </div>
                {this.getElements()}
            </div>
        );
    }
}