import React, { Fragment } from "react";

export interface ObjectInfoContainerProps { title : string, fields : Array<string>, description : string | undefined }

export default class ObjectInfoContainer extends React.Component<ObjectInfoContainerProps, {}> {

   constructor(props : ObjectInfoContainerProps) {
      super(props)
   }

   render() {
        return (   
            <div id="object_info_container" className="Unselectable">
                <div id="object_info_container_title">{this.props.title}</div>
                <hr></hr>
                {this.props.fields.map((object, i) => <div id="object_info_container_field" key={i}>{object}</div>)}
                {this.props.description &&
                    <Fragment>
                        <hr></hr>
                        <div id="object_info_container_description_field">{this.props.description}</div>
                    </Fragment>
                }
            </div>
        );
    } 
}