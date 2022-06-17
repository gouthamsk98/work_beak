import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
} from "react-flow-renderer";
import renderImage from "./renderImage";
import Sidebar from "./Sidebar";
import { v4 } from "uuid";
import "./dnd.css";
//return image to drop
const text = (type, _id) => {
  if (type === "beeper") {
    // console.log("start");

    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("beeper")})`,
            bottom: "38px",
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " -0.7vw", top: " 1.8vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "11.5vw", top: " 2.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "capasitor100") {
    // console.log("if");
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("capasitor100")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "capasitor1000") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("capasitor1000")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "diode") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("diode")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "dip") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("dip")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="d"
        />
        <Handle
          type="source"
          position="right"
          style={{ left: 140, top: 20 }}
          id="r"
        />
      </>
    );
  }
  if (type === "junction") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("junction")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type === "ldr") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("ldr")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "led") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("led")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "pot") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("pot")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type === "power") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("power")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: "8.7vw", top: " 5.5vh" }}
          id="r1"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "8.5vw", top: " 8.9vh" }}
          id="r2"
        />
        <Handle
          type="source"
          position="bottom"
          style={{ left: "8.7vw", top: " 10.4vh" }}
          id="r3"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "8.5vw", top: " 4.2vh" }}
          id="r4"
        />
      </>
    );
  }
  if (type === "res_100") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("res_100")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "res_250") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("res_250")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "tact") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("tact")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "timer") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("timer")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type === "transistor") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("transistor")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="target"
          position="bottom"
          style={{ left: " 0.3vw", top: " 4.6vh" }}
          id="l"
        />
        <Handle
          type="source"
          position="left"
          style={{ left: "10.5vw", top: " 5.2vh" }}
          id="r"
        />
      </>
    );
  }
  if (type === "two_way_switch") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${renderImage("two_way_switch")})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
};
const initialNodes = [
  {
    id: " 0",

    type: `output`,
    position: { x: 120, y: 120 },
    data: {
      label: text(`power`, 0),
      specificElType: `power`,
    },
  },
];

let id = 1;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      let nodeType = "output";
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),

        type: `${nodeType}`,
        position,
        data: {
          label: text(`${type}`, id),
          specificElType: `${type}`,
        },
      };
      console.log(newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onNodeDrag = async (event, node) => {
    console.log(node);
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeDrag={onNodeDrag}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
