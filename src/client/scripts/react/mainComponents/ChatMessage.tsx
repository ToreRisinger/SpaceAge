import React, { Fragment } from "react";
import { Colors } from "../../../../shared/colors/Colors";
import { GlobalDataService } from "../../modules/GlobalDataService";
import { IChatMessage } from "../../../../shared/data/IChatMessage";


export interface ChatMessageProps { chatMessage : IChatMessage; }

export default class ChatMessage extends React.Component<ChatMessageProps, {}> {

    constructor(props : ChatMessageProps) {
        super(props)
    }

    render() {
        const colorStyle = {
            color: this.props.chatMessage.sender == GlobalDataService.getInstance().getCharacterName() ? Colors.RGB.GREEN : Colors.RGB.LIGHT_BLUE
        }
        
        return (
            <div className="chat_message">
                    {this.props.chatMessage.sender == undefined ?
                        this.props.chatMessage.message
                    :
                        <Fragment>
                            <b style={colorStyle}>[{this.props.chatMessage.sender}]</b>: {this.props.chatMessage.message}
                        </Fragment>
                    }
            </div>
        );
    }
}