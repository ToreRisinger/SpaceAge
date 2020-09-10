import React from "react";

export interface ProgressBarProps { currentProgress: () => number, totalProgress: number}

export interface ProgressBarState { currentProgress: number }

export default class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {

    private timerID : ReturnType<typeof setTimeout> | undefined;

    constructor(props : ProgressBarProps) {
        super(props)
        this.state = {
            currentProgress: 0
        }
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            16
        );
    }

    componentWillUnmount() {
        if(this.timerID != undefined) {
            clearInterval(this.timerID);
        }
    }

    tick() {
        this.setState({
            currentProgress: this.props.currentProgress()
        })
    }

    render() {
        let progressPercentage = this.state.currentProgress > this.props.totalProgress ? 100 : (this.state.currentProgress / this.props.totalProgress) * 100;
        return (
                <div className="ProgressBar">
                    <div className="ProgressBarBar" style={{width: progressPercentage + "%"}}></div>
                    <div className="ProgressBarText">
                        {this.state.currentProgress > this.props.totalProgress ?
                            "100%"
                            : this.state.currentProgress == 0 ?
                                "0%"
                                : Math.floor((this.state.currentProgress/this.props.totalProgress) * 100) + "%"
                        }
                    </div>
                </div>  
        );
    }
}