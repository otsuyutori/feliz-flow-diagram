import React from "react";
import "./flowdiagram.css";

class InPort extends React.Component {
  constructor (props){
    super(props);
    this.ref=props._ref;
    this.ingredient = props.ingredient;
    this.api = props.api;
    this.parentNode = props.parentnode;
    this.index = props.index;
    this.portId = props.portId;
  }
  componentDidMount() {
    this.api.registerPort(this.portId ,{
      parentNode: this.parentNode,
      element: this.ref.current.parentElement,
    });
  }
  render() {
    return (
    <>
      <div className="node-row-ingredient">
        <div className="node-ingredient">{this.ingredient}</div>
        <svg className="port-container">
          <g className="output-field" transform="translate(0, 0)">
            <g className="port" drag-data={'inPort:' + this.portId.toString()}>
              <circle className="port-outer" cx="8" cy="7" r="7.5"/>
              <circle className="port-inner" cx="8" cy="7" r="5"/>
              <circle className="port-scrim" cx="8" cy="7" r="7.5" ref={this.ref}/>
            </g>
          </g>
        </svg>
      </div>
    </>
    );
  }
}

export default InPort
