import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"

gsap.registerPlugin(Draggable);

class Connection extends React.Component {
  constructor (){
    super();
    this.ref = React.createRef();
    this.inputHandle = React.createRef();
    this.outputHandle = React.createRef();
    this.path = React.createRef();
    this.pathOut = React.createRef();
    this.bezierWeight = 0.68;
  }
  
  updatePath() {
    const input = this.inputHandle.current;
    const output = this.outputHandle.current;

    const x1 = input.getAttribute('cx');
    const y1 = input.getAttribute('cy');
    
    const x4 = output.getAttribute('cx');
    const y4 = output.getAttribute('cy');
    
    const dx = Math.abs(x1 - x4) * this.bezierWeight;
    
    const p1x = x1;
    const p1y = y1;
    
    const p2x = x1 - dx;
    const p2y = y1;
        
    const p4x = x4;
    const p4y = y4;
    
    const p3x = x4 + dx;
    const p3y = y4;
    
    const data = `M${p1x} ${p1y} C ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;
    
    this.path.current.setAttribute("d", data);
    this.pathOut.current.setAttribute("d", data);
  }

  init(element){
    const x = element.getAttribute('x') ?? 0;
    const y = element.getAttribute('y') ?? 0;
    const input = this.inputHandle.current;
    const output = this.outputHandle.current;
    input.setAttribute('cx', x);
    input.setAttribute('cy', y);
    output.setAttribute('cx', x);
    output.setAttribute('cy', y);
    this.updatePath();
  }
  
  render(){
    console.log("now rendering...");
    return (
      <>
        <g className="connection" ref={this.ref} drag-data="connection">
          <path className="connector-path-outline" ref={this.pathOut} />
          <path className="connector-path" ref={this.path}/>
          <circle className="connector-handle input-handle" cx="0" cy="0" r="4" ref={this.inputHandle} drag-data="inputHandle"/>
          <circle className="connector-handle output-handle" cx="0" cy="0" r="4" ref={this.outputHandle} drag-data="outputHandle"/>
        </g>
      </>
      );
  }
}

export default Connection;
