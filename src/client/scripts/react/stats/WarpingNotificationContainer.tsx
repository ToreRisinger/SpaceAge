import React, { Fragment } from "react";

export interface WarpingNotificationContainerProps {
    isWarping : boolean
}

export default class WarpingNotificationContainer extends React.Component<WarpingNotificationContainerProps, {}> {

    constructor(props : WarpingNotificationContainerProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                {this.props.isWarping ?
                    <div className="NotificationContainer BodyText">
                        Warping
                    </div>
                    :
                    ""
                }
            </Fragment>
            
        );
    }
}