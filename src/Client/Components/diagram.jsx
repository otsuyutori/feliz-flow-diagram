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
    prepareTarget(e){
      let target = e.target;
      let dragData = null
      while(!(dragData = target.getAttribute('drag-data'))){
        target = target.parentElement;
      }
      const dragType = dragData.split(':')[0];
      const dragId = dragData.split(':')[1];

      switch(dragType){
        case 'node':
          this.dragRef = this.nodeMap.get(dragId);
          break;
        case 'connection':
          this.dragRef = this.connectionMap.get(dragId);
          break;
        default:
          break;
      }

      this.target = {
        element  : target,
        type     : dragType,
      }
    }
    dragTarget(){
      if(this.target.type === 'layer'){
        Tween.set(this.target.element, {
          left: `+=${this.draggable.deltaX}`,
          top: `+=${this.draggable.deltaY}`,
        }); 
        Tween.set(this.connLayer.current, {
          left: `+=${this.draggable.deltaX}`,
          top: `+=${this.draggable.deltaY}`,
        });
      }else{
        this.dragRef.update();
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
      this._makeMap(this.nodes, this.nodeMap);
      this._makeMap(this.connections, this.connectionMap);
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
            map.set(element.key, element.props._ref);
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