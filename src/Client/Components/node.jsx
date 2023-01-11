import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { gsap } from "gsap";
import { Tween } from "gsap/gsap-core";
import { Draggable } from "gsap/Draggable";
import "./flowdiagram.css"

gsap.registerPlugin(Draggable);

class DRNode extends React.Component {
  constructor (props){
    super(props);
    this.id = props.$key;
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div className="dragcontainer" drag-data="node">
        <div className="is-flex-direction-column is-align-content-center" data-drag="aaa">
          <div className="draggable">
            <svg className="port">
              <g className="input-field" transform="translate(0, 0)">
                <g className="port">
                  <circle className="port-outer" cx="10" cy="10" r="7.5" />
                  <circle className="port-inner" cx="10" cy="10" r="5" />
                  <circle className="port-scrim" cx="10" cy="10" r="7.5" />
                </g>
                <text className="port-label" x="25" y="14">Input</text>
              </g>
            </svg>
            <svg className="port">
              <g className="outputs">
                <g className="output-field" transform="translate(0, 60)">
                  <g className="port">
                    <circle className="port-outer" cx="70" cy="10" r="7.5" />
                    <circle className="port-inner" cx="70" cy="10" r="5" />
                    <circle className="port-scrim" cx="70" cy="10" r="7.5" />
                  </g>
                  <text className="port-label" x="20" y="14">Output</text>
                </g>
              </g>
            </svg>
          </div>
          <div className="description">これは説明</div>
        </div>
      </div>
      );
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