import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"


gsap.registerPlugin(Draggable);

class Node extends React.Component {
  constructor (props){
    super(props);
    this.ref = React.createRef();
    this.id = props.$key;
    this.api = props.api;
    this.draggable = null;
    this.outPort = React.createRef();
    this.inPort = React.createRef();
    this.proxy = React.createRef();
    this.currentConnection = null;
    this.state = {
      connections: [],
    };
  }
  componentDidMount() {
    this._createDraggable();
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
          <svg style={{position:'absolute'}}>
            {this.state.connections.map((conn) =>{
              return conn.render()
            })}
          </svg>
          <svg className="port" style={{position:'absolute'}}>
            <g className="input-field" transform="translate(0, 0)" drag-data="inPort">
              <g className="port">
                <circle className="port-outer" cx="5" cy="10" r="7.5"/>
                <circle className="port-inner" cx="5" cy="10" r="5"/>
                <circle className="port-scrim" cx="5" cy="10" r="7.5" ref={this.inPort}/>
              </g>
              <text className="port-label" x="25" y="14">Input</text>
            </g>
            <g className="output-field" transform="translate(0, 0)" drag-data="outPort"  >
              <g className="port">
                <circle className="port-outer" cx="105" cy="10" r="7.5"/>
                <circle className="port-inner" cx="105" cy="10" r="5"/>
                <circle className="port-scrim" cx="105" cy="10" r="7.5" ref={this.outPort}/>
              </g>
              <text className="port-label" x="20" y="14">Output</text>
            </g>
            <g>
              <circle cx={0} cy={0} r={10} ref={this.proxy}></circle>
            </g>
          </svg>
          <div className="draggable">
          </div>
          <div className="description">
            これは説明
          </div>
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
      object : null,
      element  : target,
      type     : type,
      id: id,
    }

    if(this.target.type === 'outPort'){
      [this.target.object, this.target.element] = this.api.createConnection(null ,this.outPort.current);
    }
    if(this.target.type === 'inPort'){
      [this.target.object, this.target.element] = this.api.createConnection(this.inPort.current,null);
    }
  }

  dragTarget(){
    if(this.target.type === 'base'){
      Tween.set(this.target.element, {
        x: `+=${this.draggable.deltaX}`,
        y: `+=${this.draggable.deltaY}`,
      });
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
    //this.target = null;
  }

  _createDraggable(){
    this.prepareTarget = this.prepareTarget.bind(this);
    this.dragTarget = this.dragTarget.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.draggable = new Draggable(this.proxy.current, {
      allowContextMenu: true,
      trigger: [this.ref.current ,this.inPort.current, this.outPort.current],
      onPress: this.prepareTarget,
      onDrag: this.dragTarget,
      onDragEnd: this.stopDragging,
    });
  }
}

export default Node

// export const DRNode = () => {
//   const dragTarget = useRef(null);
//   this.abc = 1;

//   useEffect(() => {
//     Draggable.create(dragTarget.current, {
//       onDragEnd() {
//       }
//     });
//   }, []);

//   return (
//   <div className="dragProxy" ref={dragTarget}>
//     <div className="is-flex-direction-column is-align-content-center" data-drag="aaa">
//       <div className="draggable">
//         <svg className="port">
//           <g className="input-field" transform="translate(0, 0)">
//             <g className="port">
//               <circle className="port-outer" cx="10" cy="10" r="7.5" />
//               <circle className="port-inner" cx="10" cy="10" r="5" />
//               <circle className="port-scrim" cx="10" cy="10" r="7.5" />
//             </g>
//             <text className="port-label" x="25" y="14">Input</text>
//           </g>
//         </svg>
//         <svg className="port">
//           <g className="outputs">
//             <g className="output-field" transform="translate(0, 60)">
//               <g className="port">
//                 <circle className="port-outer" cx="70" cy="10" r="7.5" />
//                 <circle className="port-inner" cx="70" cy="10" r="5" />
//                 <circle className="port-scrim" cx="70" cy="10" r="7.5" />
//               </g>
//               <text className="port-label" x="20" y="14">Output</text>
//             </g>
//           </g>
//         </svg>
//       </div>
//       <div className="description">これは説明</div>
//     </div>
//   </div>
//   );
// };