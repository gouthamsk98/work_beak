import React, { useState, useLayoutEffect, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Handle,
  getOutgoers,
} from "react-flow-renderer";
import { v4 } from "uuid";
import Sidebar from "./Sidebar";
import "./dnd.css";
import beeper from "../Assets/beeper.png";
import capasitor100 from "../Assets/capasitor100.png";
import capasitor1000 from "../Assets/capasitor1000.png";
import diode from "../Assets/diode.png";
import dip from "../Assets/dip.png";
import junction from "../Assets/junction.png";
import ldr from "../Assets/ldr.png";
import pot from "../Assets/led.png";
import power from "../Assets/Power.png";
import res_100 from "../Assets/res_100_ohm.png";
import res_250 from "../Assets/res_250_ohm.png";
import tact from "../Assets/tact.png";
import timer from "../Assets/timer_ic.png";
import transistor from "../Assets/transistor.png";
import two_way_switch from "../Assets/two_way_switch.png";

let id = 0;
const getId = () => `${id++}`;
const text = (type, _id) => {
  if (type == "beeper") {
    // console.log("start");

    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${beeper})`,
            bottom: "38px",
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "capasitor100") {
    // console.log("if");
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${capasitor100})`,
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
        <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
        <Handle
          type="source"
          position="left"
          style={{ left: 140, top: 30 }}
          id="rNo"
        />
      </>
    );
  }
  if (type == "capasitor1000") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${capasitor1000})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle position="bottom" style={{ left: 90, top: 35 }} id="b" />
      </>
    );
  }
  if (type == "diode") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${diode})`,
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
      </>
    );
  }
  if (type == "dip") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${dip})`,
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
  if (type == "junction") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${junction})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "ldr") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${ldr})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "pot") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${pot})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "power") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${power})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "res_100") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${res_100})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "res_250") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${res_250})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "tact") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${tact})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "timer") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${timer})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "transistor") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${transistor})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "two_way_switch") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${two_way_switch})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
};
let prevElement = [
  {
    id: "0",

    position: { x: 500, y: 65 },
    type: `input`,
    data: {
      label: text(`beeper`, 0),
      elType: "node",
    },
  },
];
const DnDFlow = (props) => {
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const [elements, setElements] = useState([prevElement]);
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDrop = async (event) => {
    // console.log("event", event);
    try {
      event.preventDefault();

      if (reactFlowInstance) {
        const type = event.dataTransfer.getData("application/reactflow");

        if (type == null || type == "") return;
        const position = reactFlowInstance.project({
          x: event.clientX - 230,
          y: event.clientY - 110,
        });

        let nodeType = "output";

        let newNode;

        newNode = await {
          id: `${getId()}`,

          position,
          type: `${nodeType}`,
          data: {
            label: text(`${type}`, id),
            elType: "node",
            specificElType: `${type}`,
          },
        };

        await setElements([...elements, newNode]);
      }
    } catch (e) {}
  };
  return (
    <>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper">
            <ReactFlow
              elements={elements}
              onDrop={onDrop}
              className="react-flow-screen"
              style={{ height: "88.3vh", width: "inherit" }}
              id="reactFlow"
            >
              <canvas
                id="myCanvas"
                width="1775"
                height="884"
                class="react-flow__edges"
              ></canvas>
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;
