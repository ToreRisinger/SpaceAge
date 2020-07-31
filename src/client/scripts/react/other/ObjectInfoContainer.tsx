import React, { Fragment } from "react";

export interface ObjectInfoContainerProps { title : string | undefined, fields : Array<string>, description : string | undefined, centerFields: boolean}

export default class ObjectInfoContainer extends React.Component<ObjectInfoContainerProps, {}> {

   constructor(props : ObjectInfoContainerProps) {
      super(props)
   }

   render() {
        const styles = this.props.centerFields ? 'center' : 'left';
        return (   
            <div id="object_info_container" className="Unselectable">
                {this.props.title &&
                    <Fragment>
                        <div id="object_info_container_title" className="TitleText">{this.props.title}</div>
                        <hr></hr>
                    </Fragment>
                }
                {this.props.fields.map((object, i) => <div id="object_info_container_field" className="BodyText" style={{textAlign:styles}} key={i}>{object}</div>)}
                {this.props.description &&
                    <Fragment>
                        <hr></hr>
                        <div id="object_info_container_description_field" className="DarkText">{this.props.description}</div>
                    </Fragment>
                }
            </div>
        );
    } 
}