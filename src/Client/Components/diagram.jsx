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
      this.ports = [];
      this.nodes = [];
      this.nodeMap = new Map();
      this.connectionMap = new Map();
      this.portMap = new Map();
      this.dpRef = React.createRef();
      this.connLayer = React.createRef();
      this.dragRef = null;
      this.state = {
        connections: [],
      };
      this.bfsNodes(props.product);
    }

    bfsNodes(product){
      let tier = [];
      tier = [product];
      for(;;){
        this.nodes.push([]);
        let tempTier = [];
        let prod = null;
        while(prod = tier.pop()){
          for(let ingre of this._getList(prod.node.ingre, [])){
            tempTier.push(ingre.link);
          }
          this.nodes[this.nodes.length-1].push(prod.node);
        }
        tier = tempTier;
        if(tier.length === 0){
          break;
        }
      }
    }

    lookupConnection(key){
      return this.connectionMap.get(key);
    }

    registerConnection(key, conn){
      this.connectionMap.set(key, conn);
    }

    removeConnection(key){
      const conn = this.lookupConnection(key);
      const victim = this.state.connections.indexOf(conn);
      this.setState({
        connections: this.state.connections.filter((_, index) => (index !== victim)),
      });
      this.connectionMap.delete(key);
    }

    registerPort(obj){
      this.ports.push(obj);
    }

    createConnection(from, to){
      const newConn = new Connection();
      this.setState({connections:[...this.state.connections, newConn]});
      return [newConn, newConn.init(from, to)];
    }

    hitTest(element){
      for(let port of this.ports){
        if(Draggable.hitTest(element, port.element)){
          return port;
        }
      }
      return null;
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
                {
                  this.nodes.map(column=>{
                    return (
                      <div className="container-column">
                        {
                          column.map(node=>{
                            return (
                              <Node key={node.node_id} api={{
                                createConnection : this.createConnection.bind(this),
                                registerPort:this.registerPort.bind(this),
                                hitTest: this.hitTest.bind(this),
                                lookupConnection: this.lookupConnection.bind(this),
                                registerConnection: this.registerConnection.bind(this),
                                removeConnection: this.removeConnection.bind(this),
                              }}
                                component = {node.compo.label}
                                label = {node.proc.label}
                                ingredients={[...(this._getList(node.ingre, []).map(item=>{return item.label;}))]}/>
                            )
                          })
                        }
                      </div> 
                    );
                  }
                )}
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