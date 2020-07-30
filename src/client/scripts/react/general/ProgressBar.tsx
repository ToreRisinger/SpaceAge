import React from "react";

export interface ProgressBarProps { currentProgress: number, totalProgress: number}

export default class ProgressBar extends React.Component<ProgressBarProps, {}> {

   constructor(props : ProgressBarProps) {
      super(props)
   }

   render() {
        let progressPercentage = this.props.currentProgress > this.props.totalProgress ? 100 : (this.props.currentProgress / this.props.totalProgress) * 100;
        return (
                <div className="ProgressBar">
                    <div className="ProgressBarBar" style={{width: progressPercentage + "%"}}></div>
                    <div className="ProgressBarText">
                        {this.props.currentProgress > this.props.totalProgress ?
                            "100%"
                            : this.props.currentProgress == 0 ?
                                "0%"
                                : Math.floor((this.props.currentProgress/this.props.totalProgress) * 100) + "%"
                        }
                    </div>
                </div>  
        );
   }
}