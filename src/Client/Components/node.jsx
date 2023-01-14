import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"
import Connection from "./connection.jsx"

gsap.registerPlugin(Draggable);

class DRNode extends React.Component {
  constructor (props){
    super(props);
    this.id = props.$key;
    this.ref = props._ref;
    this.updateHandle = props.updateHandle;
    this.createConnection = props.createConnection;
    this.draggable = null;
    this.outPort = React.createRef();
    this.inPort = React.createRef();
    this.proxy = React.createRef();
    this.state = {
      connections: [],
      aaa:["こんにちは"]
    };
  }
  componentDidMount() {
    this._createDraggable();
  }
  componentDidUpdate() {
  }
  update(){

  }
  render() {
    return (
    <>
      <div className="container" drag-data="base" style={{width : 'fit-content', height: 'fit-content'}} ref={this.ref}> 
        <div className="is-flex-direction-column is-align-content-center" style={{width : 'fit-content', height: 'fit-content'}}>
          <div className="draggable">
            <svg className="port">
              <g className="input-field" transform="translate(0, 0)" ref={this.inPort} drag-data="inPort">
                <g className="port">
                  <circle className="port-outer" cx="10" cy="10" r="7.5" />
                  <circle className="port-inner" cx="10" cy="10" r="5" />
                  <circle className="port-scrim" cx="10" cy="10" r="7.5" />
                </g>
                <text className="port-label" x="25" y="14">Input</text>
              </g>
              <g className="output-field" transform="translate(0, 60)" drag-data="outPort">
                <g className="port">
                  <circle className="port-outer" cx="70" cy="10" r="7.5" />
                  <circle className="port-inner" cx="70" cy="10" r="5" />
                  <circle className="port-scrim" cx="70" cy="10" r="7.5" />
                </g>
                <text className="port-label" x="20" y="14">Output</text>
              </g>
            </svg>
            <svg>
            {this.state.connections.map((conn) =>{
              return conn.render()
            })}
            </svg>
          </div>
          <div className="description">
            これは説明
          </div>
        </div>
      </div>
      <svg>
        <g>
          <circle cx={0} cy={0} r={10} ref={this.proxy}></circle>
        </g>
      </svg>
    </>
    );
  }

  prepareTarget(e){
    let target = e.target;
    let dragData = null
    while(!(dragData = target.getAttribute('drag-data'))){
      target = target.parentElement;
    }
    this.target = {
      element  : target,
      type     : dragData,
    }

    if(this.target.type === 'outPort'){
      const newConn = new Connection();
      this.setState({connections:[...this.state.connections, newConn]});
      newConn.init(this.outPort.current);
      this.target = newConn.inputHandle.current;
    }
    if(this.target.type === 'inPort'){
      const newConn = new Connection();
      this.setState({connections:[...this.state.connections, newConn]})
      newConn.init(this.inPort.current);
      this.target = newConn.outputHandle.current;
    }
  }

  dragTarget(){
    if(this.target.type === 'base'){
      Tween.set(this.target.element, {
        x: `+=${this.draggable.deltaX}`,
        y: `+=${this.draggable.deltaY}`,
      });
    }else{
    }
    console.log(this.target.type);
  }

  stopDragging(){
    //this.target = null;
  }

  _createDraggable(){
    const node = this.ref.current;
    this.prepareTarget = this.prepareTarget.bind(this);
    this.dragTarget = this.dragTarget.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.draggable = new Draggable(this.proxy.current, {
      allowContextMenu: true,
      trigger: node,
      onPress: this.prepareTarget,
      onDrag: this.dragTarget,
      onDragEnd: this.stopDragging,
    });
  }
}

export default DRNode

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