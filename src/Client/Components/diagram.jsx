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
      this.connectionPool = [];
      this.connectionMapByHandle = new Map();
      this.portMap = new Map();
      this.dpRef = React.createRef();
      this.connLayer = React.createRef();
      this.dragRef = null;
      this.state = {
        connections: [],
      };
      this.bfsNodes(props.product);
      this.api = {
        createConnection : this.createConnection.bind(this),
        registerPort:this.registerPort.bind(this),
        hitTest: this.hitTest.bind(this),
        lookupConnectionByHandle: this.lookupConnectionByHandle.bind(this),
        registerConnectionByHandle: this.registerConnectionByHandle.bind(this),
        removeConnection: this.removeConnection.bind(this),
        poolConnection: this.poolConnection.bind(this),
      }
      this.updateCalled = false;
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
            if(ingre.link === undefined){
              continue;
            }
            tempTier.push(ingre.link);
            this.connectionPool.push({
              from:{
                nodeId:ingre.link.node.node_id,
                portId:ingre.link.node.compo.port_id,
              },
              to: {
                nodeId:prod.node.node_id,
                portId:ingre.port_id,
              },
              conn:null,
            });
          }
          this.nodeMap.set(prod.node.node_id, React.createRef());
          this.nodes[this.nodes.length-1].push(prod.node);
        }
        tier = tempTier;
        if(tier.length === 0){
          break;
        }
      }
    }

    initCreateConnections(){
      for(let conn of this.connectionPool){
        const fromElement = this.lookupPort(conn.from.portId)?.element;
        const toElement = this.lookupPort(conn.to.portId)?.element;
        this.createConnection(fromElement, toElement);
      }
    }

    poolConnection(connObj){
      this.connectionPool.push(connObj);
    }

    lookupConnectionByHandle(key){
      return this.connectionMapByHandle.get(key);
    }

    registerConnectionByHandle(key, conn){
      this.connectionMapByHandle.set(key, conn);
    }

    removeConnection(key){
      const conn = this.lookupConnectionByHandle(key);
      const victim = this.state.connections.indexOf(conn);
      this.setState({
        connections: this.state.connections.filter((_, index) => (index !== victim)),
      });
      this.connectionMapByHandle.delete(key);
    }

    registerPort(key ,obj){
      this.ports.push(obj);
      this.portMap.set(key, obj);
    }

    lookupPort(key){
      return this.portMap.get(key);
    }

    registerNode(key, obj){
      this.nodeMap.set(key, obj);
    }

    lookupNode(key){
      return this.nodeMap.get(key);
    }

    initCreateConnections(){
      this.connectionPool.forEach(item=>{
        item.conn = new Connection();
      })
      this.setState({connections:this.connectionPool.map(item=>{return item.conn;})});
    }

    initUpdateConnections(){
      if(!this.updateCalled){
        this.connectionPool.forEach(item=>{
          const inNode = this.lookupNode(item.to.nodeId).current;
          inNode.registerConnToIn(item.conn);
          const outNode = this.lookupNode(item.from.nodeId).current;
          outNode.registerConnToOut(item.conn);
        });
      }
      this.connectionPool.forEach(item=>{
        item.conn.init(this.lookupPort(item.from.portId)?.element, this.lookupPort(item.to.portId)?.element);
      });
      this.updateCalled=true;
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
      this.initCreateConnections();
    }
    componentDidUpdate(){
      this.initUpdateConnections();
    }
    render() {
      return (
        <>
          <div className="diagram-container" style={{overflow: 'hidden'}}>
            <div className="diagram-canvas">
              <div className="node-container" drag-data="layer:container" style={{position:'absolute', left:0, top:50, zIndex:1, width:'1024px', height:'1024px'}}>
                {
                  this.nodes.map(column=>{
                    return (
                      <div className="node-container-column">
                        {
                          column.map(node=>{
                            return (
                              <Node 
                                key = {node.node_id}
                                ref = {this.nodeMap.get(node.node_id)}
                                api = {this.api}
                                component = {node.compo.label}
                                compoPortId = {node.compo.port_id}
                                label = {node.proc.label}
                                ingredients={[...(this._getList(node.ingre, []).map(ingre=>{return {label:ingre.label, portId:ingre.port_id};}))]}/>
                            )
                          })
                        }
                      </div> 
                    );
                  }
                )}
              </div>
              <svg ref={this.connLayer} style={{position:'absolute', left:0, top:0, zIndex:0, width:'1024px', height:'1024px'}}>
                <g className="connections">
                {this.state.connections.map((conn) =>{
                  return conn.render()
                })}
                </g>
                <circle className="dragProxy" ref={this.dpRef} cx={0} cy={0} r={10} fill={'none'}></circle>
              </svg>
            </div>
          </div>
        </>
        );
    }
    _makeMap(fslist, map){
        this._getList(fslist, []).forEach(element => {
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