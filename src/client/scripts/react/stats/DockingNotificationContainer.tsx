import React, { Fragment } from "react";

export interface DockingNotificationContainerProps {
    isDocking : boolean
}

export default class DockingNotificationContainer extends React.Component<DockingNotificationContainerProps, {}> {

    constructor(props : DockingNotificationContainerProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                {this.props.isDocking ?
                    <div className="NotificationContainer BodyText">
                        Docking
                    </div>
                    :
                    ""
                }
            </Fragment>
            
        );
    }
}