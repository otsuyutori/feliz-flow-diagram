import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"
import { typographyVariant } from "@mui/system";
import Node from "./node.jsx"
import Connection from "./connection.jsx"

gsap.registerPlugin(Draggable);

class Diagram extends React.Component {
    constructor (props){
      super(props);
      this.key = props.$key;
      this.connections = [];
      this.nodes = ["1","2","3"];
      this.nodeMap = new Map();
      this.connectionMap = new Map();
      this.portMap = new Map();
      this.dpRef = React.createRef();
      this.connLayer = React.createRef();
      this.dragRef = null;
      this.state = {
        connections: [],
      };
    }
    testFunc(){
      console.log(this);
    }

    updateHandle(node){

    }

    assignPort(connection){

    }

    createConnection(from, to){
      const newConn = new Connection();
      this.setState({connections:[...this.state.connections, newConn]});
      return [newConn, newConn.init(from, to)];
    }

    resignPort(){

    }
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    render() {
      return (
        <>
          <div className="diagram-container" style={{overflow: 'hidden'}}>
            <div className="diagram-canvas">
              <div className="conatiner" drag-data="layer:container" style={{position:'absolute', left:0, top:0, zIndex:1, width:'100%', height:'100%'}}>
                {this.nodes.map((id) =>{
                    return(
                      <Node key={id} api={{createConnection : this.createConnection.bind(this)}}/>
                    )
                })}
              </div>
              <svg ref={this.connLayer} style={{position:'absolute', left:0, top:0, zIndex:0, width:'100%', height:'100%'}}>
                <g className="connections">
                {this.state.connections.map((conn) =>{
                  return conn.render()
                })}
                </g>
                <circle className="dragProxy" ref={this.dpRef} cx={0} cy={0} r={10} fill={'red'}></circle>
              </svg>
            </div>
          </div>
        </>
        );
    }
    _makeMap(fslist, map){
        this._getList(fslist, []).forEach(element => {
          //dep inj?
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