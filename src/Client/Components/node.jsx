import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"
import InPort from "./inPort.jsx";
import { typographyVariant } from "@mui/system";
import { Hidden } from "@mui/material";


gsap.registerPlugin(Draggable);

class Node extends React.Component {
  constructor (props){
    super(props);
    this.ref = React.createRef();
    this.id = props.$key;
    this.api = props.api;
    this.draggable = null;
    this.outPort = React.createRef();
    this.inPortRefs = [];
    this.outPortId = props.compoPortId;
    this.ingredients = props.ingredients;
    this.component = props.component;
    this.label = props.label;
    this.proxy = React.createRef();
    this.currentConnection = null;
    this.connections = {
      in:[],
      out:[],
    };
    this.ingredients.forEach(item=>{
      this.inPortRefs[item.portId] = React.createRef();
    });
  }
  componentDidMount() {
    this._createDraggable();
    this.api.registerPort(this.outPortId ,{
      parentNode: this,
      element: this.outPort.current.parentElement,
    });
  }
  componentDidUpdate() {
//    this._createDraggable();
  }
  update(){

  }
  render() {
    return (
    <>
      <div className="container" drag-data="base" style={{width : 'fit-content', height: 'fit-content'}} ref={this.ref}> 
        <div className="is-flex-direction-column is-align-content-center" style={{width : 'fit-content', height: 'fit-content'}}>
          <div className="description">
            {this.label}
          </div>
          <div className="draggable">
            <div className="node-row-component">
              <svg className="port-container">
                <g className="input-field" transform="translate(0, 0)">
                  <g className="port" drag-data={'outPort:' + this.outPortId.toString()}>
                    <circle className="port-outer" cx="8" cy="7" r="7.5"/>
                    <circle className="port-inner" cx="8" cy="7" r="5"/>
                    <circle className="port-scrim" cx="8" cy="7" r="7.5" ref={this.outPort}/>
                  </g>
                </g>
              </svg>
              <div className="node-component">{this.component}</div>
            </div>
            {this.ingredients.map((ingredient, index)=>{
              return(
                <>
                  <InPort _ref={this.inPortRefs[ingredient.portId]} ingredient={ingredient.label} api={{registerPort:this.api.registerPort}} parentnode={this} index={index} portId={ingredient.portId}></InPort>
                </>
              );
            })}
          </div>
          <svg style={{height:1, width:1}}>
            <g>
              <circle cx={0} cy={0} r={10} ref={this.proxy}></circle>
            </g>
          </svg>
        </div>
      </div>
    </>
    );
  }

  prepareTarget(e){
    let target = e.target;
    let dragData = null
    while(!(dragData = target.getAttribute('drag-data'))){
      target = target.parentElement;
    }
    const [type, id] = dragData.split(":");
    this.target = {
      object  : null,
      element : target,
      type    : type,
      id      : id,
    }

    if(this.target.type === 'outPort'){
      [this.target.object, this.target.element] = this.api.createConnection(this.outPort.current, null);
      this.api.registerConnectionByHandle(this.target.element, this.target.object);
    }
    if(this.target.type === 'inPort'){
      [this.target.object, this.target.element] = this.api.createConnection(null, this.inPortRefs[this.target.id].current);
      this.api.registerConnectionByHandle(this.target.element, this.target.object);
    }
  }

  dragTarget(){
    if(this.target.type === 'base'){
      Tween.set(this.target.element, {
        x: `+=${this.draggable.deltaX}`,
        y: `+=${this.draggable.deltaY}`,
      });
      this.connections.out.forEach((conn) => {
        Tween.set(conn.inputHandle.current, {
          cx: `+=${this.draggable.deltaX}`,
          cy: `+=${this.draggable.deltaY}`,
        });
        conn.update();
      })
      this.connections.in.forEach((conn) => {
        Tween.set(conn.outputHandle.current, {
          cx: `+=${this.draggable.deltaX}`,
          cy: `+=${this.draggable.deltaY}`,
        });
        conn.update();
      })
    }
    if(this.target.type === 'inPort' || this.target.type === 'outPort'){
      console.log(this.target.type);
      Tween.set(this.target.element, {
        cx: `+=${this.draggable.deltaX}`,
        cy: `+=${this.draggable.deltaY}`,
      });
    }
    this.target.object?.update();
  }

  stopDragging(){
    let port = null;
    if(this.target.type === 'inPort' || this.target.type === 'outPort'){
      port = this.api.hitTest(this.target.element);
      if(port && this !== port.parentNode){
        const [data, portId] = port.element.getAttribute('drag-data')?.split(":")
        if(this.target.type === 'inPort' && data === 'outPort'){
          this.connections.in.push(this.target.object);
          port.parentNode.attachConnection(this.target.object, this.target.element);
          this.api.poolConnection({
            from:{
              nodeId:port.parentNode.id,
              portId:this.target.id,
            },
            to: {
              nodeId:this.id,
              portId:portId,
            },
            conn:this.target.object,
          });
          return;
        }
        if(this.target.type === 'outPort' && data === 'inPort'){
          this.connections.out.push(this.target.object);
          port.parentNode.attachConnection(this.target.object, this.target.element);
          this.api.poolConnection({
            from:{
              nodeId:this.id,
              portId:portId,
            },
            to: {
              nodeId:port.parentNode.id,
              portId:this.target.id,
            },
            conn:this.target.object,
          });
          return;
        }
      }
    }
    this.api.removeConnection(this.target.element);
  }

  registerConnToOut(conn){
    this.connections.out.push(conn);
  }

  registerConnToIn(conn){
    this.connections.in.push(conn);
  }

  attachConnection(conn, handle){
    const[type, _] = handle.getAttribute("drag-data")?.split(":");
    if(type === "inputHandle"){
      conn.attach(handle, null);
      this.registerConnToOut(conn);
    }
    if(type === "outputHandle"){
      conn.attach(null, handle);
      this.registerConnToIn(conn);
    }
  }

  _createDraggable(){
    this.prepareTarget = this.prepareTarget.bind(this);
    this.dragTarget = this.dragTarget.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.draggable = new Draggable(this.proxy.current, {
      allowContextMenu: true,
      trigger: [this.ref.current ,...(Object.values(this.inPortRefs).map(item => item.current)), this.outPort.current],
      onPress: this.prepareTarget,
      onDrag: this.dragTarget,
      onDragEnd: this.stopDragging,
    });
  }
}

export default Node
