import React, { Fragment } from "react";
import { EStatType } from "../../../../../shared/data/stats/EStatType";
import { Colors } from "../../../../../shared/colors/Colors";

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
                    <div className="WarpingNotificationContainer BodyText">
                        Warping
                    </div>
                    :
                    ""
                }
            </Fragment>
            
        );
    }
}