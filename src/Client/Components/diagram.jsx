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
                      <Node key={0} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "スポンジケーキ"
                        label = "購入"
                        ingredients={[]}/>
                      <Node key={1} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "ホイップクリーム"
                        label = "ホイップ"
                        ingredients={["生クリーム"]}/>
                      <Node key={9} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "生クリーム"
                        label = "購入"
                        ingredients={[]}/>
                      <Node key={2} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "ケーキ台"
                        label = "塗る"
                        ingredients={["クリーム", "スポンジケージ"]}/>
                      <Node key={3} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "チョコレートケーキ"
                        label = "トッピング"
                        ingredients={["ケーキ台", "いちご","チョコレート"]}/>
                      <Node key={4} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "いちご"
                        label = "洗う"
                        ingredients={["いちご"]}/>
                      <Node key={5} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "いちご"
                        label = "購入"
                        ingredients={[]}/>
                      <Node key={6} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "刻みチョコレート"
                        label = "刻む"
                        ingredients={["板チョコレート"]}/>
                      <Node key={7} api={{
                        createConnection : this.createConnection.bind(this),
                        registerPort:this.registerPort.bind(this),
                        hitTest: this.hitTest.bind(this),
                        lookupConnection: this.lookupConnection.bind(this),
                        registerConnection: this.registerConnection.bind(this),
                        removeConnection: this.removeConnection.bind(this),
                      }}
                        component = "板チョコレート"
                        label = "購入"
                        ingredients={[]}/>
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