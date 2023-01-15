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
    this.state ={
      vbx: 0,
      vby: 0,
    }
  }
  
  update() {
    const input = this.inputHandle.current;
    const output = this.outputHandle.current;
    const igsx = parseFloat(gsap.getProperty(input, 'cx'));
    const igsy = parseFloat(gsap.getProperty(input, 'cy'));
    const x1 = igsx;
    const y1 = igsy;

    const ogsx = parseFloat(gsap.getProperty(output, 'cx'));
    const ogsy = parseFloat(gsap.getProperty(output, 'cy'));
    const x4 = ogsx;
    const y4 = ogsy;
  
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

  init(fromElement, toElement){
    const input = this.inputHandle.current;
    const output = this.outputHandle.current;
    if(fromElement === null && toElement === null){
      throw new Error("'from' 'to' both are null");
    }
    let r = 0;
    let rect = null;
    if(fromElement && toElement){
      r = parseFloat(fromElement.getAttribute('r') ?? 0)
      
      input.setAttribute('cx', fromElement.getBoundingClientRect().x + r);
      input.setAttribute('cy', fromElement.getBoundingClientRect().y + r);
      output.setAttribute('cx', toElement.getBoundingClientRect().x + r);
      output.setAttribute('cy', toElement.getBoundingClientRect().y + r);
      this.update();
      return null;
    }

    let x = 0;
    let y = 0;
    let res = null;
    
    if(fromElement){
      r = parseFloat(fromElement.getAttribute('r') ?? 0)
      x = fromElement.getBoundingClientRect().x + r;
      y = fromElement.getBoundingClientRect().y + r;
      res = this.outputHandle.current;
    }
    if(toElement){
      r = parseFloat(toElement.getAttribute('r') ?? 0)
      x = toElement.getBoundingClientRect().x + r;
      y = toElement.getBoundingClientRect().y + r;
      res = this.inputHandle.current;
    }
    input.setAttribute('cx', x);
    input.setAttribute('cy', y);
    output.setAttribute('cx', x);
    output.setAttribute('cy', y);
    this.update();
    return res;
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
