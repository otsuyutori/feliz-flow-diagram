import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"

gsap.registerPlugin(Draggable);

class Diagram extends React.Component {
    constructor (props){
      super(props);
      this.nodes = props.nodes;
      this.connections = props.connections;
      this.nodeMap = new Map();
      this.connectionMap = new Map();
      this._makeMap(this.nodes, this.nodeMap);
      this._makeMap(this.connections, this.connectionMap);
      this.dpRef = React.createRef();
      this.connLayer = React.createRef();
    }
    prepareTarget(e){
      const dragTypes = {
        divcont: 'div',
        node: 'svg',
        connection: 'svg',
      }
      let target = e.target;
      let dragData = null
      while(!(dragData = target.getAttribute('drag-data'))){
        target = target.parentElement;
      }
      this.target = {
        element  : target,
        type : dragTypes[dragData],
      }
    }
    dragTarget(){
      if(this.target.type === 'div'){
        Tween.set(this.target.element, {
          left: `+=${this.draggable.deltaX}`,
          top: `+=${this.draggable.deltaY}`,
        }); 
        Tween.set(this.connLayer.current, {
          left: `+=${this.draggable.deltaX}`,
          top: `+=${this.draggable.deltaY}`,
        });
      }else{
        Tween.set(this.target.element, {
          x: `+=${this.draggable.deltaX}`,
          y: `+=${this.draggable.deltaY}`,
        });
      }
    }
    stopDragging(){
      //this.target = null;
    }
    _createDraggable(){
      const canvas = document.querySelector('.diagram-canvas');
      this.prepareTarget = this.prepareTarget.bind(this);
      this.dragTarget = this.dragTarget.bind(this);
      this.stopDragging = this.stopDragging.bind(this);
      this.draggable = new Draggable(this.dpRef.current, {
        allowContextMenu: true,
        trigger: canvas,
        onPress: this.prepareTarget,
        onDrag: this.dragTarget,
        onDragEnd: this.stopDragging,
      });
    }
    componentDidMount(){
      this._createDraggable();
    }
    componentDidUpdate(){
      this._createDraggable();
    }
    render() {
      return (
        <>
          <div className="diagram-container" style={{overflow: 'hidden'}}>
            <div className="diagram-canvas">
              <svg ref={this.connLayer} style={{position:'absolute', left:0, top:0, zIndex:0, width:'100%', height:'100%'}}>
                <g className="connections"></g>
                <circle className="dragProxy" ref={this.dpRef} cx={0} cy={0} r={10} fill={'red'}></circle>
              </svg>
              <div className="conatiner" drag-data="divcont" style={{position:'absolute', left:0, top:0, zIndex:1, width:'100%', height:'100%'}}>
                {this.nodes}
              </div>
            </div>
          </div>
        </>
        );
    }
    _makeMap(fslist, map){
        this._getList(fslist, []).forEach(element => {
            map.set(element.key, element.props._ref.current);
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