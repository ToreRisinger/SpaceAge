import React from "react";

export interface ButtonProps { enabled: boolean, text: string, onClick: () => void }

export default class Button extends React.Component<ButtonProps, {}> {

    constructor(props : ButtonProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

   onClick() {
        if(this.props.enabled) {
            this.props.onClick();
        }
   }

   render() {
        let className = this.props.enabled ? "Button" : "ButtonDisabled"; 

        return (
                <div className={"" + className} onClick={this.onClick}>
                    {this.props.text}
                </div>  
        );
   }
}