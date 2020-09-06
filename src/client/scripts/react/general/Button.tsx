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
        let disabledClass = this.props.enabled ? "" : "ButtonDisabled"; 

        return (
                <div className={"Button " + disabledClass} onClick={this.onClick}>
                    {this.props.text}
                </div>  
        );
   }
}