import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"
import { typographyVariant } from "@mui/system";

gsap.registerPlugin(Draggable);

class Diagram extends React.Component {
    constructor (props){
      super(props);
      this.nodes = props.nodes;
      this.connections = props.connections;
      this.nodeMap = new Map();
      this.connectionMap = new Map();
      this.dpRef = React.createRef();
      this.connLayer = React.createRef();
      this.dragRef = null;
    }
    testFunc(){
      console.log(this);
    }

    updateHandle(node){

    }

    assignPort(connection){

    }

    resignPort(){

    }
    componentDidMount(){
      this._makeMap(this.nodes, this.nodeMap);
      this._makeMap(this.connections, this.connectionMap);
    }
    componentDidUpdate(){
    }
    render() {
      return (
        <>
          <div className="diagram-container" style={{overflow: 'hidden'}}>
            <div className="diagram-canvas">
              <svg ref={this.connLayer} style={{position:'absolute', left:0, top:0, zIndex:0, width:'100%', height:'100%'}}>
                <g className="connections">
                </g>
                <circle className="dragProxy" ref={this.dpRef} cx={0} cy={0} r={10} fill={'red'}></circle>
              </svg>
              <div className="conatiner" drag-data="layer:container" style={{position:'absolute', left:0, top:0, zIndex:1, width:'100%', height:'100%'}}>
                {this.nodes}
              </div>
            </div>
          </div>
        </>
        );
    }
    _makeMap(fslist, map){
        this._getList(fslist, []).forEach(element => {
          //dep inj?
            const newElem = React.cloneElement(element, {...element.props,
              updateHandle: this.updateHandle.bind(this),
              assignPort: this.assignPort.bind(this),
              resignPort: this.resignPort.bind(this),
            });
            map.set(newElem.key, newElem.props._ref);
        });
    }
    _getList(node, carry){
        if(!node.head){
            return carry;
        }
        else
        {
            carry.push(node.head);
            return this._getList(node.tail, carry);
        }
    }
  }
  
  export default Diagram