import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
  getOutgoers,
  getIncomers,
} from "react-flow-renderer";
import renderImage from "./renderImage";
import Sidebar from "./Sidebar";
import { v4 } from "uuid";
import "./dnd.css";
import { CustomDragLayer } from "./CustomDragLayer.js";
import { useDrop } from "react-dnd";
//return image to drop

let id = 1;
const getId = () => `dndnode_${id++}`;
let edge, node;
let mouseDownChk = false,
  circuitClosed,
  mouseDownChknodeId,
  nodeDetail,
  index1Count = 0,
  index2Count = 0,
  index3Count = 0;
let eleLed1;
const DnDFlow = (props) => {
  const text = (type, _id) => {
    switch (props.type) {
      //parallelCircuit 2way connection on r1 and r2
      case "capacitorCircuit":
      case "parallelCircuit":
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
              <div id={"beeperdndnode_" + _id} style={{}}></div>
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
        if (type === "capacitor100") {
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
        if (type === "capacitor1000") {
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
                id="l1"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r1"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: " 0.3vw", top: " 4.6vh" }}
                id="l2"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r2"
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
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 3.99vh" }}
                id={"l1" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 5.79vh" }}
                id={"l2" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 7.5vh" }}
                id={"l3" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 9.3vh" }}
                id={"l4" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 3.99vh" }}
                id={"l1.t" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 5.79vh" }}
                id={"l2.t" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 7.5vh" }}
                id={"l3.t" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 9.3vh" }}
                id={"l4.t" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 3.99vh" }}
                id={"r1" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 5.79vh" }}
                id={"r2" + "dndnode_" + _id}
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 7.5vh" }}
                id={"r3" + "dndnode_" + _id}
              />{" "}
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 9.3vh" }}
                id={"r4" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 3.99vh" }}
                id={"r1.t" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 5.79vh" }}
                id={"r2.t" + "dndnode_" + _id}
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 7.5vh" }}
                id={"r3.t" + "dndnode_" + _id}
              />{" "}
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 9.3vh" }}
                id={"r4.t" + "dndnode_" + _id}
              />
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
              <div
                class="slidecontainer"
                style={{ top: "2vh", left: "2vw", position: "relative" }}
              >
                <input
                  type="range"
                  min="1"
                  max="100"
                  class="slider"
                  onInput={(e) => {
                    console.log(e.target.value);
                    setRangeVal(e.target.value);
                  }}
                  onChange={sliderOnChange}
                  id={"myRangedndnode_" + _id}
                  onMouseEnter={(e) => {
                    console.log(e.target.value, "e.target.value@@@@@@@@@@@@");
                    setNodesDraggable(false);
                  }}
                  onMouseLeave={(e) => {
                    setNodesDraggable(true);
                  }}
                />
              </div>
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
              <div id={"leddndnode_" + _id} style={{}}></div>
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
              <div
                class="slidecontainer"
                style={{ top: "2vh", left: "2vw", position: "relative" }}
              >
                <input
                  type="range"
                  min="1"
                  max="100"
                  class="slider"
                  onInput={(e) => {
                    console.log(e.target.value);
                    setRangeVal(e.target.value);
                  }}
                  id={"myRangedndnode_" + _id}
                  onMouseEnter={(e) => {
                    console.log(e.target.value, "e.target.value@@@@@@@@@@@@");
                    setNodesDraggable(false);
                  }}
                  onMouseLeave={(e) => {
                    setNodesDraggable(true);
                  }}
                />
              </div>
              <Handle
                type="source"
                position="bottom"
                style={{ left: " -0.2vw", top: " 6.6vh" }}
                id="l"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "11.3vw", top: " 4.1vh" }}
                id="r1"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "11.3vw", top: " 9.9vh" }}
                id="r2"
              />
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
                type="target"
                position="left"
                style={{ left: "8.5vw", top: " 8.9vh" }}
                id="r2"
              />
              <Handle
                type="target"
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
                style={{ left: " 0.4vw", top: " 6.7vh" }}
                id="l"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "10.1vw", top: " 5.7vh" }}
                id="r.t"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.1vw", top: " 8.5vh" }}
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
              <Handle
                type="target"
                position="bottom"
                style={{ left: " 0.4vw", top: " 7.2vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 5.533vh" }}
                id="r"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 9.9vh" }}
                id="r"
              />
            </>
          );
        }
        break;
      case "resistorCircuit":
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
              <div id={"beeperdndnode_" + _id} style={{}}></div>
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
        if (type === "capacitor100") {
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
        if (type === "capacitor1000") {
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
          console.log("ledId", _id);
          switch (props.type) {
            case "simpleCircuit":
          }
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
              <div id={"leddndnode_" + _id} style={{}}></div>
              <Handle
                type="target"
                position="bottom"
                style={{ left: " 0.3vw", top: " 4.6vh" }}
                id="l1"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: " 0.3vw", top: " 4.6vh" }}
                id="l2"
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
              <Handle
                type="target"
                position="bottom"
                style={{ left: " -0.2vw", top: " 6.6vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.3vw", top: " 4.1vh" }}
                id="r"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.3vw", top: " 9.9vh" }}
                id="r"
              />
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
                style={{ left: "8.5vw", top: " 4.2vh" }}
                id="r4"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "8.5vw", top: " 8.9vh" }}
                id="r2"
              />

              <Handle
                type="target"
                position="bottom"
                style={{ left: "8.7vw", top: " 10.4vh" }}
                id="r3"
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
          //parallelCircuit 2way connection on r1 and r2

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
                id="r1"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r2"
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
                style={{ left: " 0.4vw", top: " 6.7vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.1vw", top: " 5.7vh" }}
                id="r"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.1vw", top: " 8.5vh" }}
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
              <Handle
                type="target"
                position="bottom"
                style={{ left: " 0.4vw", top: " 7.2vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 5.533vh" }}
                id="r"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 9.9vh" }}
                id="r"
              />
            </>
          );
        }
        break;
      default:
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
              <div id={"beeperdndnode_" + _id} style={{}}></div>
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
        if (type === "capacitor100") {
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
        if (type === "capacitor1000") {
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
                id="l1"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r1"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: " 0.3vw", top: " 4.6vh" }}
                id="l2"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r2"
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
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 3.99vh" }}
                id="l1"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 5.79vh" }}
                id="l2"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 7.5vh" }}
                id="l3"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "2.5vw", top: " 9.3vh" }}
                id="l4"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 3.99vh" }}
                id="l1.t"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 5.79vh" }}
                id="l2.t"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 7.5vh" }}
                id="l3.t"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "2.5vw", top: " 9.3vh" }}
                id="l4.t"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 3.99vh" }}
                id="r1"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 5.79vh" }}
                id="r2"
              />
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 7.5vh" }}
                id="r3"
              />{" "}
              <Handle
                type="source"
                position="bottom"
                style={{ left: "9.28vw", top: " 9.3vh" }}
                id="r4"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 3.99vh" }}
                id="r1.t"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 5.79vh" }}
                id="r2.t"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 7.5vh" }}
                id="r3.t"
              />{" "}
              <Handle
                type="target"
                position="bottom"
                style={{ left: "9.28vw", top: " 9.3vh" }}
                id="r4.t"
              />
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
              <div
                class="slidecontainer"
                style={{ top: "2vh", left: "2vw", position: "relative" }}
              >
                <input
                  type="range"
                  min="1"
                  max="100"
                  class="slider"
                  onInput={(e) => {
                    console.log(e.target.value);
                    setRangeVal(e.target.value);
                  }}
                  onChange={sliderOnChange}
                  id={"myRangedndnode_" + _id}
                  onMouseEnter={(e) => {
                    console.log(e.target.value, "e.target.value@@@@@@@@@@@@");
                    setNodesDraggable(false);
                  }}
                  onMouseLeave={(e) => {
                    setNodesDraggable(true);
                  }}
                />
              </div>
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
              <div id={"leddndnode_" + _id} style={{}}></div>
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
              <div
                class="slidecontainer"
                style={{ top: "2vh", left: "2vw", position: "relative" }}
              >
                <input
                  type="range"
                  min="1"
                  max="100"
                  class="slider"
                  onInput={(e) => {
                    console.log(e.target.value);
                    setRangeVal(e.target.value);
                  }}
                  id={"myRangedndnode_" + _id}
                  onMouseEnter={(e) => {
                    console.log(e.target.value, "e.target.value@@@@@@@@@@@@");
                    setNodesDraggable(false);
                  }}
                  onMouseLeave={(e) => {
                    setNodesDraggable(true);
                  }}
                />
              </div>
              <Handle
                type="source"
                position="bottom"
                style={{ left: " -0.2vw", top: " 6.6vh" }}
                id="l"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "11.3vw", top: " 4.1vh" }}
                id="r1"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "11.3vw", top: " 9.9vh" }}
                id="r2"
              />
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
                type="target"
                position="left"
                style={{ left: "8.5vw", top: " 8.9vh" }}
                id="r2"
              />
              <Handle
                type="target"
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
                style={{ left: " 0.4vw", top: " 6.7vh" }}
                id="l"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "10.1vw", top: " 5.7vh" }}
                id="r.t"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "10.1vw", top: " 8.5vh" }}
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
              <Handle
                type="target"
                position="bottom"
                style={{ left: " 0.4vw", top: " 7.2vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 5.533vh" }}
                id="r"
              />
              <Handle
                type="source"
                position="left"
                style={{ left: "11.6vw", top: " 9.9vh" }}
                id="r"
              />
            </>
          );
        }
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
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodesDraggable, setNodesDraggable] = useState(true);
  const [rangeVal, setRangeVal] = useState(50);
  useEffect(() => {
    console.log(edges, "edges use effect");
    edge = edges;
    console.log("range", Object.keys(edges).length);

    circuitClosed = closedChk(nodes, edges);
    if (props.type === "transistorCircuit" && Object.keys(edges).length < 6) {
      console.log("range$$%&^&^^^&*^&*", Object.keys(edges).length, eleLed1);

      if (eleLed1 !== undefined) eleLed1.classList.remove("led-light");
    }
  }, [edges]);
  useEffect(() => {
    node = nodes;
  }, [nodes]);

  useEffect(() => {
    return async () => {
      if ((await circuitClosed) === 1 && props.type === "transistorCircuit") {
        let flag = false;
        let nodeDetail1 = await getOutgoers(nodes[0], nodes, edges);
        nodeDetail1 = nodeDetail1[0];
        let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
        if (nodeDetail2.length === 2) {
          if (nodeDetail2[0].data.specificElType === "ldr") flag = true;
          else if (nodeDetail2[1].data.specificElType === "ldr") flag = true;
          if (nodeDetail2[0].data.specificElType === "led")
            nodeDetail2 = nodeDetail2[0];
          else if (nodeDetail2[1].data.specificElType === "led")
            nodeDetail2 = nodeDetail2[1];
        }

        if (nodeDetail2.data.specificElType === "led" && flag) {
          eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
          eleLed1.classList.add("led-light");
          eleLed1.style.opacity = `${rangeVal / 100 + 0.1}`;
        }
      }
    };
  }, [rangeVal]);
  const onConnect = async (params) => {
    console.log(params);
    var index1 = await edge.findIndex(
      (e) =>
        e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    var index2 = await edge.findIndex(
      (e) =>
        e.target === params.target && e.targetHandle === params.targetHandle
    );
    switch (props.type) {
      default:
        if (index1 != -1) return;
        if (index2 != -1) return;
        await setEdges((eds) => addEdge(params, eds));
    }

    return;
  };

  //to check the circuit is completed
  const closedChk = async (n, e) => {
    let start = getOutgoers(n[0], n, e);
    chkCount = 1;
    if (start.length !== 0) return await closedChkRec(start[0], n, e);
    else return false;
  };
  let chkCount;
  const closedChkRec = async (ele, n, e) => {
    switch (props.type) {
      case "voltageDividerCircuit":
        if (ele.id === nodes[0].id) return true;
        if (ele.data.specificElType === "pot" && chkCount > 4) return true;

        break;
      default:
        if (ele.id === nodes[0].id) return true;
    }

    let start = await getOutgoers(ele, n, e);
    chkCount++;
    console.log({ start }, { ele });
    if (start.length === 1) return await closedChkRec(start[0], n, e);
    else if (start.length >= 1) {
      let y = 1;
      for (let i = 0; i < start.length; i++) {
        y = y * (await closedChkRec(start[i], n, e));
      }
      // let y = await closedChkRec(start[0], n, e);
      // let x = await closedChkRec(start[1], n, e);
      return y;
    } else if (start.length === 0) return false;
    return false;
  };
  //delete the edge
  const onEdgeDoubleClick = async (e, toDeleteEdge) => {
    var index = await edges.findIndex((e) => e.id === toDeleteEdge.id);
    if (index != -1) {
      //edge is double clicked
      setEdges(edges.filter((node) => node.id !== toDeleteEdge.id));
      index1Count = 0;
      index2Count = 0;
      index3Count = 0;
    }
  };

  //get cordinate while zooming
  function getCoords(elem) {
    // crossbrowser version

    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      x: Math.round(left) - 145,
      y: Math.round(top) - 96,
      id: parseInt(elem.dataset.id),
    };
  }
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
          label: text(`${type}`, id - 1),
          specificElType: `${type}`,
        },
      };
      console.log(newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeDrag = async (event, node) => {
    switch (props.type) {
      case "voltageDividerCircuit":
        break;
    }
    nodes.map(async (e) => {
      if (e.id !== node.id) {
        let offsetX = 0,
          offsetY = 0;
        let params = {
          source: "",
          sourceHandle: "",
          target: "dndnode_1",
          targetHandle: "",
        };

        switch (e.data.specificElType) {
          case "beeper":
            switch (node.data.specificElType) {
              case "beeper":
                offsetX = 18;
                offsetY = 28;
                break;
              case "capacitor100":
              case "diode":
              case "ldr":
              case "led":
              case "res_100":
              case "res_250":
              case "capacitor1000":
              case "led":
                offsetX = 0;
                offsetY = 0;
                break;
              case "transistor":
                offsetX = -3;
                offsetY = -21;
                break;
            }

            switch (props.type) {
              case "parallelCircuit":
                let offsetX = 0,
                  offsetY = 0;
                if (e.data.specificElType === "beeper") {
                  offsetX = -34;
                  offsetY = -0;
                } else {
                  offsetX = 0;
                  offsetY = 0;
                }
                console.log(
                  "paramsBeeper",
                  node.position.x - e.position.x,
                  node.position.y - e.position.y
                );
                let index3 = nodes.find(
                  (n) => n.data.specificElType === "junction"
                );
                let index1 = nodes.find(
                  (n) =>
                    n.data.specificElType === "junction" && n.id != index3.id
                );
                if (index3.id == node.id) {
                  console.log("paramsBeeper");
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `l`,
                    target: `${e.id}`,
                    targetHandle: "l",
                  };

                  if (
                    node.position.x - e.position.x >= -63 - 5 &&
                    node.position.x - e.position.x <= -63 + 5
                  ) {
                    params = {
                      source: `${node.id}`,
                      sourceHandle: `l`,
                      target: `${e.id}`,
                      targetHandle: "l",
                    };
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.sourceHandle = "l1" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l1.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.sourceHandle = "l2" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l2.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.sourceHandle = "l3" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l3.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.sourceHandle = "l4" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l4.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= -193 - 5 &&
                    node.position.x - e.position.x <= -193 + 5
                  ) {
                    params = {
                      source: `${node.id}`,
                      sourceHandle: `l`,
                      target: `${e.id}`,
                      targetHandle: "l",
                    };
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.sourceHandle = "r1" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r1.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.sourceHandle = "r2" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r2.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.sourceHandle = "r3" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r3.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.sourceHandle = "r4" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r4.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  }
                } else {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  if (
                    node.position.x - e.position.x >= 179 - 5 &&
                    node.position.x - e.position.x <= 179 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.targetHandle = "l1.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l1" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.targetHandle = "l2.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l2" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.targetHandle = "l3.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l3" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.targetHandle = "l4.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l4" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= 48 - 5 &&
                    node.position.x - e.position.x <= 48 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.targetHandle = "r1.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r1" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.targetHandle = "r2.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r2" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.targetHandle = "r3.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r3" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.targetHandle = "r4.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r4" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  }
                }

                break;
              case "capacitorCircuit": {
                if (node.data.specificElType === "tact") {
                  console.log(
                    "gsk",
                    node.position.x - e.position.x,
                    node.position.y - e.position.y
                  );
                  if (
                    node.position.x - e.position.x >= -221 - 5 &&
                    node.position.x - e.position.x < -221 + 5 &&
                    node.position.y - e.position.y >= -30 - 5 &&
                    node.position.y - e.position.y < -30 + 5
                  ) {
                  }
                }
                if (
                  node.position.x - e.position.x >= -221 - 5 &&
                  node.position.x - e.position.x < -221 + 5 &&
                  node.position.y - e.position.y >= -30 - 5 &&
                  node.position.y - e.position.y < -30 + 5
                ) {
                  console.log("paramsBeeperENTERTTTTTTTt");
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "l",
                  };
                  if (
                    node.data.specificElType === "capacitor100" ||
                    (node.data.specificElType === "capacitor1000" &&
                      e.data.specificElType === "beeper")
                  )
                    await onConnect(params);
                  if (node.data.specificElType == "tact")
                    await onConnect(params);
                }
                let offsetX = 0,
                  offsetY = 0;
                if (e.data.specificElType === "beeper") {
                  offsetX = -34;
                  offsetY = -0;
                } else {
                  offsetX = 0;
                  offsetY = 0;
                }

                let index3 = nodes.find(
                  (n) => n.data.specificElType === "junction"
                );
                let index1 = nodes.find(
                  (n) =>
                    n.data.specificElType === "junction" && n.id != index3.id
                );
                if (index3.id == node.id) {
                  console.log("paramsBeeper");
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `l`,
                    target: `${e.id}`,
                    targetHandle: "l",
                  };

                  if (
                    node.position.x - e.position.x >= -63 - 5 &&
                    node.position.x - e.position.x <= -63 + 5
                  ) {
                    params = {
                      source: `${node.id}`,
                      sourceHandle: `l`,
                      target: `${e.id}`,
                      targetHandle: "l",
                    };
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.sourceHandle = "l1" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l1.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.sourceHandle = "l2" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l2.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.sourceHandle = "l3" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l3.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.sourceHandle = "l4" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "l4.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= -193 - 5 &&
                    node.position.x - e.position.x <= -193 + 5
                  ) {
                    params = {
                      source: `${node.id}`,
                      sourceHandle: `l`,
                      target: `${e.id}`,
                      targetHandle: "l",
                    };
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.sourceHandle = "r1" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r1.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.sourceHandle = "r2" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r2.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.sourceHandle = "r3" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r3.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.sourceHandle = "r4" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.targetHandle === "r4.t" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  }
                } else {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  if (
                    node.position.x - e.position.x >= 179 - 5 &&
                    node.position.x - e.position.x <= 179 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.targetHandle = "l1.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l1" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.targetHandle = "l2.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l2" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.targetHandle = "l3.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l3" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.targetHandle = "l4.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "l4" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= 48 - 5 &&
                    node.position.x - e.position.x <= 48 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= -21 - 5 &&
                      node.position.y - e.position.y <= -21 + 5
                    ) {
                      params.targetHandle = "r1.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r1" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -40 - 5 &&
                      node.position.y - e.position.y <= -40 + 5
                    ) {
                      params.targetHandle = "r2.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r2" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -57 - 5 &&
                      node.position.y - e.position.y <= -57 + 5
                    ) {
                      params.targetHandle = "r3.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r3" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -75 - 5 &&
                      node.position.y - e.position.y <= -75 + 5
                    ) {
                      params.targetHandle = "r4.t" + node.id;
                      if (
                        edge.findIndex(
                          (e) => e.sourceHandle === "r4" + node.id
                        ) === -1
                      )
                        await onConnect(params);
                    }
                  }
                }

                break;
              }
              default:
                if (
                  node.position.x - e.position.x >= 221 - 5 + offsetX &&
                  node.position.x - e.position.x < 221 + 5 + offsetX &&
                  node.position.y - e.position.y >= -28 - 5 + offsetY &&
                  node.position.y - e.position.y < -28 + 5 + offsetY
                ) {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  switch (props.type) {
                    case "simpleCircuit":
                      if (node.data.specificElType === "power")
                        await onConnect(params);
                    case "seriesCircuit":
                      if (
                        e.data.specificElType === "tact" &&
                        node.data.specificElType == "beeper"
                      )
                        await onConnect(params);
                      if (
                        e.data.specificElType === "beeper" &&
                        node.data.specificElType == "beeper"
                      )
                        await onConnect(params);
                  }

                  return;
                } else if (
                  node.position.x - e.position.x >= -221 - 5 + offsetX &&
                  node.position.x - e.position.x < -221 + 5 + offsetX &&
                  node.position.y - e.position.y >= -28 - 5 + offsetY &&
                  node.position.y - e.position.y < -28 + 5 + offsetY
                ) {
                  switch (props.type) {
                    case "simpleCircuit":
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (node.data.specificElType === "tact")
                        await onConnect(params);
                      break;
                    case "seriesCircuit":
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        (node.data.specificElType === "tact" &&
                          e.data.specificElType === "beeper") ||
                        (node.data.specificElType === "beeper" &&
                          e.data.specificElType === "beeper")
                      )
                        await onConnect(params);
                      break;
                  }
                } else if (
                  node.position.x - e.position.x >= -258 - 5 + offsetX &&
                  node.position.x - e.position.x < -258 + 5 + offsetX &&
                  node.position.y - e.position.y >= -28 - 5 + offsetY &&
                  node.position.y - e.position.y < -28 + 5 + offsetY
                ) {
                  switch (props.type) {
                    case "seriesCircuit":
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        node.data.specificElType === "beeper" &&
                        e.data.specificElType === "beeper"
                      )
                        await onConnect(params);
                      break;
                  }
                }
            }

            break;
          case "led":
          case "ldr":
          case "res_100":
          case "res_250":
          case "tact":
          case "capacitor100":
          case "capacitor1000":
            switch (node.data.specificElType) {
              case "beeper":
                offsetX = 0;
                offsetY = 0;
                break;
              case "capacitor100":
              case "diode":
              case "ldr":
              case "led":
              case "res_100":
              case "res_250":
              case "tact":
              case "capacitor1000":
                offsetX = -20;
                offsetY = -30;
                break;
              case "transistor":
                offsetX = -21;
                offsetY = -48;
                break;
              case "two_way_switch":
                offsetX = 0;
                offsetY = 0;
                break;
              case "pot":
                offsetX = -238;
                offsetY = -21;
                break;

              default:
                offsetX = 0;
                offsetY = 0;
                break;
            }

            switch (node.data.specificElType) {
              case "junction":
                params = {
                  source: `${e.id}`,
                  sourceHandle: `r`,
                  target: `${node.id}`,
                  targetHandle: "r1",
                };
                switch (props.type) {
                  case "simpleCircuit":
                    break;
                  case "seriesCircuit":
                    break;
                  case "parallelCircuit":
                    console.log(
                      node.position.x - e.position.x,
                      node.position.y - e.position.y,
                      "parallel"
                    );
                    break;
                  case "resistorCircuit":
                    break;
                  case "capacitorCircuit":
                    break;
                  case "voltageDividerCircuit":
                    if (
                      e.data.specificElType === "tact" &&
                      node.data.specificElType === "junction"
                    )
                      return;
                    break;
                }
                if (props.type === "transistorCircuit") {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "l",
                  };

                  if (
                    node.position.x - e.position.x >= -40 - 5 &&
                    node.position.x - e.position.x <= -40 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= 7 - 5 &&
                      node.position.y - e.position.y <= 7 + 5
                    ) {
                      params.sourceHandle = "l1";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l1.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -9 - 5 &&
                      node.position.y - e.position.y <= -9 + 5
                    ) {
                      params.sourceHandle = "l2";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l2.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -27 - 5 &&
                      node.position.y - e.position.y <= -27 + 5
                    ) {
                      params.sourceHandle = "l3";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l3.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -44 - 5 &&
                      node.position.y - e.position.y <= -44 + 5
                    ) {
                      params.sourceHandle = "l4";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l4.t") === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= -177 - 5 &&
                    node.position.x - e.position.x <= -177 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= 7 - 5 &&
                      node.position.y - e.position.y <= 7 + 5
                    ) {
                      params.sourceHandle = "r1";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r1.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -9 - 5 &&
                      node.position.y - e.position.y <= -9 + 5
                    ) {
                      params.sourceHandle = "r2";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r2.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -27 - 5 &&
                      node.position.y - e.position.y <= -27 + 5
                    ) {
                      params.sourceHandle = "r3";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r3.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -44 - 5 &&
                      node.position.y - e.position.y <= -44 + 5
                    ) {
                      params.sourceHandle = "r4";
                      if (edge.findIndex((e) => e.targetHandle === "r4") === -1)
                        await onConnect(params);
                    }
                  }
                } else if (props.type === "parallelCircuit") {
                  let index1 = nodes.find(
                    (n) => n.data.specificElType === "junction"
                  );
                  if (index1.id === node.id) {
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "r1",
                    };
                    console.log(
                      "paramsBeeper@",
                      node.position.x - e.position.x,
                      node.position.y - e.position.y
                    );
                    let offsetX = 0,
                      offsetY = 0;
                    if (e.data.specificElType === "beeper") {
                      offsetX = -34;
                      offsetY = -0;
                    } else {
                      offsetX = 0;
                      offsetY = 0;
                    }
                    if (
                      node.position.x - e.position.x >= 159 - 5 &&
                      node.position.x - e.position.x <= 159 + 5 &&
                      e.data.specificElType === "tact"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "l1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "l2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "l3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "l4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= 30 - 5 &&
                      node.position.x - e.position.x <= 30 + 5 &&
                      e.data.specificElType === "tact"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "r1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "r2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "r3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "r4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      (node.position.x - e.position.x >= -43 - 5 + offsetX &&
                        node.position.x - e.position.x <= -43 + 5 + offsetX &&
                        e.data.specificElType === "led") ||
                      e.data.specificElType === "beeper"
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `l`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.sourceHandle = "l1" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l1.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.sourceHandle = "l2" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l2.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.sourceHandle = "l3" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l3.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.sourceHandle = "l4" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l4.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      (node.position.x - e.position.x >= -174 - 5 + offsetX &&
                        node.position.x - e.position.x <= -174 + 5 + offsetX &&
                        e.data.specificElType === "led") ||
                      e.data.specificElType === "beeper"
                    ) {
                      console.log("paramsBeeper@Enter");
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `l`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.sourceHandle = "r1" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r1.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.sourceHandle = "r2" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r2.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.sourceHandle = "r3" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r3.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.sourceHandle = "r4" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r4.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  } else {
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "r1",
                    };
                    if (
                      node.position.x - e.position.x >= 159 - 5 &&
                      node.position.x - e.position.x <= 159 + 5 &&
                      e.data.specificElType === "led"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "l1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "l2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "l3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "l4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= 30 - 5 &&
                      node.position.x - e.position.x <= 30 + 5 &&
                      e.data.specificElType === "led"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "r1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "r2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "r3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "r4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  }
                } else if (props.type == "capacitorCircuit") {
                  let index1 = nodes.find(
                    (n) => n.data.specificElType === "junction"
                  );
                  if (index1.id === node.id) {
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "r1",
                    };
                    console.log(
                      "paramscap@",
                      node.position.x - e.position.x,
                      node.position.y - e.position.y
                    );
                    let offsetX = 0,
                      offsetY = 0;
                    if (e.data.specificElType === "beeper") {
                      offsetX = -34;
                      offsetY = -0;
                    } else {
                      offsetX = 0;
                      offsetY = 0;
                    }
                    if (
                      node.position.x - e.position.x >= 159 - 5 &&
                      node.position.x - e.position.x <= 159 + 5 &&
                      e.data.specificElType === "tact"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "l1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "l2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "l3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "l4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= 30 - 5 &&
                      node.position.x - e.position.x <= 30 + 5 &&
                      e.data.specificElType === "tact"
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "r1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "r2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "r3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "r4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -43 - 5 + offsetX &&
                      node.position.x - e.position.x <= -43 + 5 + offsetX &&
                      (e.data.specificElType === "capacitor100" ||
                        e.data.specificElType === "capacitor1000")
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `l`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.sourceHandle = "l1" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l1.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.sourceHandle = "l2" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l2.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.sourceHandle = "l3" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l3.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.sourceHandle = "l4" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l4.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -174 - 5 + offsetX &&
                      node.position.x - e.position.x <= -174 + 5 + offsetX &&
                      (e.data.specificElType === "capacitor100" ||
                        e.data.specificElType === "capacitor1000")
                    ) {
                      console.log("paramsBeeper@Enter");
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `l`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.sourceHandle = "r1" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r1.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.sourceHandle = "r2" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r2.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.sourceHandle = "r3" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r3.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.sourceHandle = "r4" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r4.t" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  } else {
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "r1",
                    };
                    if (
                      node.position.x - e.position.x >= 159 - 5 &&
                      node.position.x - e.position.x <= 159 + 5 &&
                      (e.data.specificElType === "capacitor100" ||
                        e.data.specificElType === "capacitor1000")
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "l1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "l2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "l3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "l4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= 30 - 5 &&
                      node.position.x - e.position.x <= 30 + 5 &&
                      (e.data.specificElType === "capacitor100" ||
                        e.data.specificElType === "capacitor1000")
                    ) {
                      if (
                        node.position.y - e.position.y >= 7 - 5 &&
                        node.position.y - e.position.y <= 7 + 5
                      ) {
                        params.targetHandle = "r1.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -9 - 5 &&
                        node.position.y - e.position.y <= -9 + 5
                      ) {
                        params.targetHandle = "r2.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r2" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -27 - 5 &&
                        node.position.y - e.position.y <= -27 + 5
                      ) {
                        params.targetHandle = "r3.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r3" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -44 - 5 &&
                        node.position.y - e.position.y <= -44 + 5
                      ) {
                        params.targetHandle = "r4.t" + node.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r4" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  }
                }

                break;
              case "diode":
                console.log(
                  "diode665674675________",
                  node.position.x - e.position.x,
                  node.position.y - e.position.y
                );
                params = {
                  source: `${e.id}`,
                  sourceHandle: `r`,
                  target: `${node.id}`,
                  targetHandle: "l1",
                };
                if (
                  node.position.x - e.position.x >= 202 - 5 &&
                  node.position.x - e.position.x <= 202 + 5 &&
                  node.position.y - e.position.y >= 2 - 5 &&
                  node.position.y - e.position.y <= 2 + 5 &&
                  e.data.specificElType !== "led"
                ) {
                  let index1 = edge.findIndex((e) => e.sourceHandle === "l2");

                  if (index1 == -1) await onConnect(params);
                } else if (
                  node.position.x - e.position.x >= -1 - 5 &&
                  node.position.x - e.position.x <= -1 + 5 &&
                  node.position.y - e.position.y >= 1 - 5 &&
                  node.position.y - e.position.y <= 1 + 5
                ) {
                  params.targetHandle = "r2";
                  let index1 = edge.findIndex((e) => e.sourceHandle === "r1");

                  if (e.data.specificElType !== "led" && index1 == -1)
                    await onConnect(params);
                  else if (e.data.specificElType === "led") {
                    params = {
                      source: `${node.id}`,
                      sourceHandle: `l2`,
                      target: `${e.id}`,
                      targetHandle: "l",
                    };
                    let index1 = edge.findIndex((e) => e.targetHandle === "l1");
                    if (index1 == -1) await onConnect(params);
                  }
                } else if (
                  node.position.x - e.position.x >= -202 - 5 &&
                  node.position.x - e.position.x <= -202 + 5 &&
                  node.position.y - e.position.y >= -2 - 5 &&
                  node.position.y - e.position.y <= -2 + 5 &&
                  e.data.specificElType === "led"
                ) {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r1`,
                    target: `${e.id}`,
                    targetHandle: "l",
                  };
                  let index1 = edge.findIndex((e) => e.targetHandle === "r2");

                  if (index1 === -1) await onConnect(params);
                }
                break;
              case "transistor":
                if (
                  e.data.specificElType === "tact" ||
                  e.data.specificElType === "ldr"
                ) {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  if (
                    node.position.x - e.position.x >= 200 - 5 &&
                    node.position.x - e.position.x <= 200 + 5 &&
                    node.position.y - e.position.y >= -20 - 5 &&
                    node.position.y - e.position.y <= -20 + 5
                  ) {
                    await onConnect(params);
                  }
                } else if (e.data.specificElType === "led") {
                  if (
                    node.position.x - e.position.x >= 9 - 5 &&
                    node.position.x - e.position.x <= 9 + 5 &&
                    node.position.y - e.position.y >= -5 - 5 &&
                    node.position.y - e.position.y <= -5 + 5
                  ) {
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "r.t",
                    };
                    await onConnect(params);
                  }
                } else if (e.data.specificElType === "power") {
                }
                break;
              default:
                if (
                  node.position.x - e.position.x >= 221 - 5 + offsetX &&
                  node.position.x - e.position.x < 221 + 5 + offsetX &&
                  node.position.y - e.position.y >= 31 - 5 + offsetY &&
                  node.position.y - e.position.y < 31 + 5 + offsetY
                ) {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  switch (props.type) {
                    case "simpleCircuit":
                      if (
                        e.data.specificElType === "tact" &&
                        (node.data.specificElType == "beeper" ||
                          node.data.specificElType == "led")
                      )
                        await onConnect(params);
                      else if (node.data.specificElType === "tact") {
                        console.log("en$$$$$$$$$tered@@@@55658");
                        // params = {
                        //   source: `${node.id}`,
                        //   sourceHandle: `r`,
                        //   target: `${e.id}`,
                        //   targetHandle: "l",
                        // };
                        // await onConnect(params);
                      }
                      break;
                    case "seriesCircuit":
                      if (
                        e.data.specificElType === "tact" &&
                        (node.data.specificElType == "beeper" ||
                          node.data.specificElType == "led")
                      )
                        await onConnect(params);
                      if (
                        e.data.specificElType === "led" &&
                        node.data.specificElType == "led"
                      )
                        await onConnect(params);
                      break;

                    case "resistorCircuit":
                      if (
                        e.data.specificElType == "tact" &&
                        (node.data.specificElType === "res_100" ||
                          node.data.specificElType === "res_250")
                      ) {
                        if (index1Count === 0) params.sourceHandle = "r1";
                        else if (index1Count === 1) params.sourceHandle = "r2";

                        await onConnect(params);
                        index1Count = 1;
                      } else if (
                        (e.data.specificElType === "res_100" ||
                          e.data.specificElType === "res_250") &&
                        node.data.specificElType === "led"
                      ) {
                        if (index2Count === 0) params.targetHandle = "l1";
                        else if (index2Count === 1) params.targetHandle = "l2";
                        await onConnect(params);

                        index2Count = 1;
                      } else if (
                        (e.data.specificElType === "res_100" ||
                          e.data.specificElType === "res_250") &&
                        (node.data.specificElType === "res_100" ||
                          node.data.specificElType === "res_250")
                      ) {
                        await onConnect(params);
                      }
                      break;
                    case "capacitorCircuit":
                      if (
                        e.data.specificElType === "tact" &&
                        (node.data.specificElType === "capacitor100" ||
                          node.data.specificElType === "capacitor1000")
                      ) {
                        await onConnect(params);
                      } else if (
                        e.data.specificElType === "capacitor100" ||
                        (e.data.specificElType === "capacitor1000" &&
                          (node.data.specificElType === "capacitor100" ||
                            node.data.specificElType === "capacitor1000"))
                      ) {
                        await onConnect(params);
                      } else if (
                        e.data.specificElType === "capacitor100" ||
                        (e.data.specificElType === "capacitor1000" &&
                          node.data.specificElType === "beeper")
                      ) {
                        params = {
                          source: `${e.id}`,
                          sourceHandle: `r`,
                          target: `${node.id}`,
                          targetHandle: "l",
                        };
                        console.log("entered@@@@55658GSKKKKKKKKKK", params);
                        await onConnect(params);
                      } else if (
                        node.data.specificElType === "beeper" &&
                        e.data.specificElType === "tact"
                      ) {
                        params = {
                          source: `${e.id}`,
                          sourceHandle: `r`,
                          target: `${node.id}`,
                          targetHandle: "l",
                        };
                        console.log("entered@@@@55658GSKKKKKKKKKK", params);
                        await onConnect(params);
                      }
                      break;
                    case "voltageDividerCircuit":
                      if (
                        e.data.specificElType === "tact" &&
                        node.data.specificElType === "pot"
                      ) {
                        params.targetHandle = "r1";
                        await onConnect(params);
                      }
                      break;
                    case "transistorCircuit":
                      if (
                        e.data.specificElType === "res_100" &&
                        node.data.specificElType === "tact"
                      )
                        await onConnect(params);

                      break;
                  }
                  return;
                } else if (
                  node.position.x - e.position.x >= -189 - 5 + offsetX &&
                  node.position.x - e.position.x < -189 + 5 + offsetX &&
                  node.position.y - e.position.y >= 31 - 5 + offsetY &&
                  node.position.y - e.position.y < 31 + 5 + offsetY
                ) {
                  switch (props.type) {
                    case "simpleCircuit":
                      if (
                        (node.data.specificElType === "tact" &&
                          e.data.specificElType === "beeper") ||
                        e.data.specificElType === "led"
                      ) {
                        params = {
                          source: `${node.id}`,
                          sourceHandle: `r`,
                          target: `${e.id}`,
                          targetHandle: "l",
                        };
                        await onConnect(params);
                      }
                      break;
                    case "seriesCircuit":
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        (node.data.specificElType === "tact" &&
                          e.data.specificElType === "led") ||
                        (node.data.specificElType === "led" &&
                          e.data.specificElType === "led")
                      )
                        await onConnect(params);
                      break;
                    case "capacitorCircuit":
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "l",
                      };
                      if (
                        (node.data.specificElType === "tact" &&
                          e.data.specificElType === "capacitor100") ||
                        e.data.specificElType === "capacitor1000"
                      )
                        await onConnect(params);
                      else if (
                        node.data.specificElType === "capacitor100" ||
                        (node.data.specificElType === "capacitor1000" &&
                          e.data.specificElType === "capacitor100") ||
                        e.data.specificElType === "capacitor1000"
                      )
                        await onConnect(params);
                      break;
                  }
                }
            }

            break;
          case "power":
            switch (node.data.specificElType) {
              case "beeper":
                offsetX = 0;
                offsetY = 0;
                break;
              case "capacitor100":
              case "diode":
              case "ldr":
              case "led":
              case "res_100":
              case "res_250":
              case "capacitor1000":
              case "tact":
                offsetX = -20;
                offsetY = -27;
                break;
              case "transistor":
                offsetX = -21;
                offsetY = -48;
                break;
              case "two_way_switch":
                offsetX = 0;
                offsetY = 0;
                break;
              default:
                offsetX = 0;
                offsetY = 0;
                break;
            }

            switch (node.data.specificElType) {
              case "junction":
                if (props.type === "voltageDividerCircuit") {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "r2",
                  };
                  if (
                    node.position.x - e.position.x >= 120 - 5 &&
                    node.position.x - e.position.x <= 120 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= 45 - 5 &&
                      node.position.y - e.position.y <= 45 + 5
                    ) {
                      params.sourceHandle = "l1";
                      if (
                        edge.findIndex((e) => e.tragetHandle === "l1.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 28 - 5 &&
                      node.position.y - e.position.y <= 28 + 5
                    ) {
                      params.sourceHandle = "l2";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l2.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 10 - 5 &&
                      node.position.y - e.position.y <= 10 + 5
                    ) {
                      params.sourceHandle = "l3";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l3.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -6 - 5 &&
                      node.position.y - e.position.y <= -6 + 5
                    ) {
                      params.sourceHandle = "l4";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l4.t") === -1
                      )
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= -13 - 5 &&
                    node.position.x - e.position.x <= -13 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= 45 - 5 &&
                      node.position.y - e.position.y <= 45 + 5
                    ) {
                      params.sourceHandle = "r1";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r1.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 28 - 5 &&
                      node.position.y - e.position.y <= 28 + 5
                    ) {
                      params.sourceHandle = "r2";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r2.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 10 - 5 &&
                      node.position.y - e.position.y <= 10 + 5
                    ) {
                      params.sourceHandle = "r3";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r3.t") === -1
                      )
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -6 - 5 &&
                      node.position.y - e.position.y <= -6 + 5
                    ) {
                      params.sourceHandle = "r4";
                      if (
                        edge.findIndex((e) => e.targetHandle === "r4.t") === -1
                      )
                        await onConnect(params);
                    }
                  }
                } else if (props.type === "transistorCircuit") {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r4`,
                    target: `${node.id}`,
                    targetHandle: "r3",
                  };
                  if (
                    node.position.x - e.position.x >= 120 - 5 &&
                    node.position.x - e.position.x <= 120 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= 1 - 5 &&
                      node.position.y - e.position.y <= 1 + 5
                    ) {
                      params.targetHandle = "l1.t";
                      if (edge.findIndex((e) => e.sourceHandle === "l1") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 16 - 5 &&
                      node.position.y - e.position.y <= 16 + 5
                    ) {
                      params.targetHandle = "l2.t";
                      if (edge.findIndex((e) => e.sourceHandle === "l2") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 44 - 5 &&
                      node.position.y - e.position.y <= 44 + 5
                    ) {
                      params.targetHandle = "l3.t";
                      if (edge.findIndex((e) => e.sourceHandle === "l3") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= 64 - 5 &&
                      node.position.y - e.position.y <= 64 + 5
                    ) {
                      params.targetHandle = "l4.t";
                      if (edge.findIndex((e) => e.sourceHandle === "l4") === -1)
                        await onConnect(params);
                    }
                  } else if (
                    node.position.x - e.position.x >= -13 - 5 &&
                    node.position.x - e.position.x <= -13 + 5
                  ) {
                    if (
                      node.position.y - e.position.y >= -1 - 5 &&
                      node.position.y - e.position.y <= -1 + 5
                    ) {
                      params.targetHandle = "r1.t";
                      if (edge.findIndex((e) => e.sourceHandle === "r1") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -16 - 5 &&
                      node.position.y - e.position.y <= -16 + 5
                    ) {
                      params.targetHandle = "r2.t";
                      if (edge.findIndex((e) => e.sourceHandle === "r2") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -44 - 5 &&
                      node.position.y - e.position.y <= -44 + 5
                    ) {
                      params.targetHandle = "r3.t";
                      if (edge.findIndex((e) => e.sourceHandle === "r3") === -1)
                        await onConnect(params);
                    } else if (
                      node.position.y - e.position.y >= -64 - 5 &&
                      node.position.y - e.position.y <= -64 + 5
                    ) {
                      params.targetHandle = "r4.t";
                      if (edge.findIndex((e) => e.sourceHandle === "r4") === -1)
                        await onConnect(params);
                    }
                  }
                } else if (props.type === "parallelCircuit") {
                  let index3 = nodes.find(
                    (n) => n.data.specificElType === "junction"
                  );
                  let index1 = nodes.find(
                    (n) =>
                      n.data.specificElType === "junction" && n.id != index3.id
                  );
                  console.log(
                    "junction end",
                    node.position.x - e.position.x,
                    node.position.y - e.position.y
                  );
                  if (index1.id === node.id) {
                    if (
                      node.position.x - e.position.x >= 122 - 5 &&
                      node.position.x - e.position.x <= 122 + 5
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "l4" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l4.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "l3" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l3.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "l2" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l2.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "l1" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l1.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -14 - 5 &&
                      node.position.x - e.position.x <= -14 + 5
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "r4" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r4.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "lr" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r3.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "r2" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r2.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "r1" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r1.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  }
                } else if (props.type === "capacitorCircuit") {
                  let index3 = nodes.find(
                    (n) => n.data.specificElType === "junction"
                  );
                  let index1 = nodes.find(
                    (n) =>
                      n.data.specificElType === "junction" && n.id != index3.id
                  );
                  if (index1 == undefined) {
                    index1 = { id: null };
                  }
                  console.log(
                    "junction end",
                    node.position.x - e.position.x,
                    node.position.y - e.position.y
                  );

                  if (index1.id === node.id) {
                    if (
                      node.position.x - e.position.x >= 122 - 5 &&
                      node.position.x - e.position.x <= 122 + 5
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "l4" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l4.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "l3" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l3.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "l2" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l2.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "l1" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "l1.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -14 - 5 &&
                      node.position.x - e.position.x <= -14 + 5
                    ) {
                      params = {
                        source: `${node.id}`,
                        sourceHandle: `r`,
                        target: `${e.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "r4" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r4.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "lr" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r3.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "r2" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r2.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "r1" + index1.id;
                        if (
                          edge.findIndex(
                            (e) => e.targetHandle === "r1.t" + index1.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  } else {
                    if (
                      node.position.x - e.position.x >= 122 - 5 &&
                      node.position.x - e.position.x <= 122 + 5
                    ) {
                      // console.log("junction end Enter enter enter enter enter");
                      params = {
                        source: `${e.id}`,
                        sourceHandle: `r4`,
                        target: `${node.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -54 - 5 &&
                        node.position.y - e.position.y <= -54 + 5
                      ) {
                        params.targetHandle = "l4.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l4" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -35 - 5 &&
                        node.position.y - e.position.y <= -35 + 5
                      ) {
                        params.targetHandle = "l3.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l3" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -19 - 5 &&
                        node.position.y - e.position.y <= -19 + 5
                      ) {
                        params.targetHandle = "l2.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l2" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -1 - 5 &&
                        node.position.y - e.position.y <= -1 + 5
                      ) {
                        params.targetHandle = "l1.t" + node.id;
                        console.log(
                          "junction end Enter enter enter enter enter",
                          params
                        );
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "l1" + node.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -14 - 5 &&
                      node.position.x - e.position.x <= -14 + 5
                    ) {
                      params = {
                        source: `${e.id}`,
                        sourceHandle: `r4`,
                        target: `${node.id}`,
                        targetHandle: "r2",
                      };
                      if (
                        node.position.y - e.position.y >= -54 - 5 &&
                        node.position.y - e.position.y <= -54 + 5
                      ) {
                        params.targetHandle = "r4.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r4" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -35 - 5 &&
                        node.position.y - e.position.y <= -35 + 5
                      ) {
                        params.targetHandle = "r3.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r3" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -19 - 5 &&
                        node.position.y - e.position.y <= -19 + 5
                      ) {
                        params.targetHandle = "r2.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r2" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= -1 - 5 &&
                        node.position.y - e.position.y <= -1 + 5
                      ) {
                        params.targetHandle = "r1.t" + index3.id;
                        if (
                          edge.findIndex(
                            (e) => e.sourceHandle === "r1" + index3.id
                          ) === -1
                        )
                          await onConnect(params);
                      }
                    }
                  }
                }
                break;
              case "transistor":
                console.log(
                  "trans^^^^^^^",
                  node.position.x - e.position.x,
                  node.position.y - e.position.y
                );
                if (
                  node.position.x - e.position.x >= -35 - 5 &&
                  node.position.x - e.position.x <= -35 + 5 &&
                  node.position.y - e.position.y >= 4 - 5 &&
                  node.position.y - e.position.y < 4 + 5
                ) {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "r2",
                  };
                  await onConnect(params);
                } else if (
                  node.position.x - e.position.x >= -35 - 5 &&
                  node.position.x - e.position.x <= -35 + 5 &&
                  node.position.y - e.position.y >= 20 - 5 &&
                  node.position.y - e.position.y < 20 + 5
                ) {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "r3",
                  };
                  await onConnect(params);
                }
                break;
              default:
                if (
                  node.position.x - e.position.x >= 181 - 5 + offsetX &&
                  node.position.x - e.position.x < 181 + 5 + offsetX &&
                  node.position.y - e.position.y >= 20 - 5 + offsetY &&
                  node.position.y - e.position.y < 20 + 5 + offsetY
                ) {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r4`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };
                  console.log(
                    "props@@@@@",
                    props.type,
                    node.data.specificElType
                  );
                  switch (props.type) {
                    case "simpleCircuit":
                    case "seriesCircuit":
                    case "parallelCircuit":
                    case "resistorCircuit":
                    case "capacitorCircuit":
                    case "voltageDividerCircuit":
                    case "semi-conductorDiodeCircuit":
                      if (node.data.specificElType === "tact")
                        await onConnect(params);
                  }

                  return;
                } else if (
                  node.position.x - e.position.x >= 181 - 5 + offsetX &&
                  node.position.x - e.position.x < 181 + 5 + offsetX &&
                  node.position.y - e.position.y >= 38 - 5 + offsetY &&
                  node.position.y - e.position.y < 38 + 5 + offsetY
                ) {
                  params = {
                    source: `${e.id}`,
                    sourceHandle: `r1`,
                    target: `${node.id}`,
                    targetHandle: "l",
                  };

                  switch (props.type) {
                    case "simpleCircuit":
                    case "seriesCircuit":
                    case "parallelCircuit":
                    case "resistorCircuit":
                    case "capacitorCircuit":
                    case "semi-conductorDiodeCircuit":
                      if (node.data.specificElType === "tact")
                        await onConnect(params);
                  }
                } else if (
                  node.position.x - e.position.x >= -59 - 5 - offsetX &&
                  node.position.x - e.position.x < -59 + 5 - offsetX &&
                  node.position.y - e.position.y >= 67 - 5 + offsetY &&
                  node.position.y - e.position.y < 67 + 5 + offsetY
                ) {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "r2",
                  };
                  switch (props.type) {
                    case "simpleCircuit":
                    case "seriesCircuit":
                    case "resistorCircuit":
                    case "semi-conductorDiodeCircuit":
                      if (
                        node.data.specificElType === "led" ||
                        node.data.specificElType === "beeper"
                      )
                        await onConnect(params);
                      break;
                    case "parallelCircuit":
                      if (
                        node.data.specificElType === "led" ||
                        node.data.specificElType === "beeper"
                      )
                        if (index2Count === 0) params.targetHandle = "r2.0";
                        else if (index2Count === 1)
                          params.targetHandle = "r2.1";
                      await onConnect(params);
                      index2Count = 1;
                      break;
                    case "capacitorCircuit":
                      if (node.data.specificElType === "beeper") {
                        await onConnect(params);
                      }
                      break;
                  }
                  return;
                } else if (
                  node.position.x - e.position.x >= -59 - 5 - offsetX &&
                  node.position.x - e.position.x < -59 + 5 - offsetX &&
                  node.position.y - e.position.y >= 86 - 5 + offsetY &&
                  node.position.y - e.position.y < 86 + 5 + offsetY
                ) {
                  params = {
                    source: `${node.id}`,
                    sourceHandle: `r`,
                    target: `${e.id}`,
                    targetHandle: "r3",
                  };
                  switch (props.type) {
                    case "simpleCircuit":
                    case "seriesCircuit":
                    case "resistorCircuit":
                    case "semi-conductorDiodeCircuit":
                      if (
                        node.data.specificElType === "led" ||
                        node.data.specificElType === "beeper"
                      )
                        await onConnect(params);
                      break;
                    case "parallelCircuit":
                      if (
                        node.data.specificElType === "led" ||
                        node.data.specificElType === "beeper"
                      )
                        if (index2Count === 0) params.targetHandle = "r3.0";
                        else if (index2Count === 1)
                          params.targetHandle = "r3.1";
                      await onConnect(params);
                      index2Count = 1;

                      break;
                    case "capacitorCircuit":
                      if (node.data.specificElType === "beeper") {
                        await onConnect(params);
                      }
                      break;
                  }
                  return;
                }
            }

            break;
          case "pot":
            switch (node.data.specificElType) {
              case "junction":
                params = {
                  source: `${node.id}`,
                  sourceHandle: `l1`,
                  target: `${e.id}`,
                  targetHandle: "r1",
                };
                let index1 = edge.findIndex(
                  (e) =>
                    e.target === params.target && params.targetHandle == "r1"
                );
                let y = node.position.y - e.position.y;

                if (index1 != -1) {
                  params.targetHandle = "r2";
                }
                if (
                  node.position.x - e.position.x >= 176 - 5 &&
                  node.position.x - e.position.x <= 176 + 5
                ) {
                  //l1.t or l1
                  if (y)
                    if (y >= -3 - 5 && y <= -3 + 5) {
                      params.sourceHandle = "l1";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l1.t") === -1
                      )
                        await onConnect(params);
                    }
                    //l2.t or l2
                    else if (y >= -22 - 5 && y <= -22 + 5) {
                      params.sourceHandle = "l2";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l2.t") === -1
                      )
                        await onConnect(params);
                    }
                    //l3.t or l3
                    else if (y >= -38 - 5 && y <= -38 + 5) {
                      params.sourceHandle = "l3";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l3.t") === -1
                      )
                        await onConnect(params);
                    }
                    //l4.t or l4
                    else if (y >= -56 - 5 && y <= -56 + 5) {
                      params.sourceHandle = "l4";
                      if (
                        edge.findIndex((e) => e.targetHandle === "l4.t") === -1
                      )
                        await onConnect(params);
                    }
                } else if (
                  node.position.x - e.position.x >= 40 - 5 &&
                  node.position.x - e.position.x <= 40 + 5
                ) {
                  //r1.t or r1
                  if (y >= -3 - 5 && y <= -3 + 5) {
                    params.sourceHandle = "r1";
                    if (edge.findIndex((e) => e.targetHandle === "r1.t") === -1)
                      await onConnect(params);
                  }
                  //r2.t or r2
                  else if (y >= -22 - 5 && y <= -22 + 5) {
                    params.sourceHandle = "r2";
                    if (edge.findIndex((e) => e.targetHandle === "r2.t") === -1)
                      await onConnect(params);
                  }
                  //r3.t or r3
                  else if (y >= -38 - 5 && y <= -38 + 5) {
                    params.sourceHandle = "r3";
                    if (edge.findIndex((e) => e.targetHandle === "r3.t") === -1)
                      await onConnect(params);
                  }
                  //r4.t or r4
                  else if (y >= -56 - 5 && y <= -56 + 5) {
                    params.sourceHandle = "r4";
                    if (edge.findIndex((e) => e.targetHandle === "r4.t") === -1)
                      await onConnect(params);
                  }
                }

                break;
              case "tact":
                console.log(
                  "tact#####^^^^^^^^^^####",
                  node.position.x - e.position.x,
                  node.position.y - e.position.y
                );
                params = {
                  source: `${node.id}`,
                  sourceHandle: `r`,
                  target: `${e.id}`,
                  targetHandle: "r1",
                };
                if (
                  node.position.x - e.position.x >= 14 - 5 &&
                  node.position.x - e.position.x <= 14 + 5 &&
                  node.position.y - e.position.y >= -10 - 5 &&
                  node.position.y - e.position.y <= -10 + 5
                ) {
                  params.targetHandle = "r1";
                  await onConnect(params);
                } else if (
                  node.position.x - e.position.x >= 14 - 5 &&
                  node.position.x - e.position.x <= 14 + 5 &&
                  node.position.y - e.position.y >= 47 - 5 &&
                  node.position.y - e.position.y <= 47 + 5
                ) {
                  params.targetHandle = "r2";
                  await onConnect(params);
                }
                break;

              case "led":
                params = {
                  source: `${e.id}`,
                  sourceHandle: `l`,
                  target: `${node.id}`,
                  targetHandle: "l",
                };
                if (
                  node.position.x - e.position.x >= -9 - 5 &&
                  node.position.x - e.position.x <= -9 + 5 &&
                  node.position.y - e.position.y >= 21 - 5 &&
                  node.position.y - e.position.y <= 21 + 5
                ) {
                  await onConnect(params);
                }
                break;
            }
            break;
          case "junction":
            params = {
              source: `${node.id}`,
              sourceHandle: `r`,
              target: `${e.id}`,
              targetHandle: "r1",
            };
            switch (props.type) {
              case "voltageDividerCircuit":
                switch (node.data.specificElType) {
                  case "led":
                    if (
                      node.position.x - e.position.x >= -159 - 5 &&
                      node.position.x - e.position.x <= -159 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.targetHandle = "l1.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "l1") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.targetHandle = "l2.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "l2") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.targetHandle = "l3.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "l3") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.targetHandle = "l4.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "l4") === -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -30 - 5 &&
                      node.position.x - e.position.x <= -30 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.targetHandle = "r1.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "r1") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.targetHandle = "r2.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "r2") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.targetHandle = "r3.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "r3") === -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.targetHandle = "r4.t";
                        if (
                          edge.findIndex((e) => e.sourceHandle === "r4") === -1
                        )
                          await onConnect(params);
                      }
                    }
                    break;
                  case "pot":
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `l1`,
                      target: `${node.id}`,
                      targetHandle: "r1",
                    };
                    console.log(
                      "potttTTTTTTTTTTTT",
                      node.position.x - e.position.x,
                      node.position.y - e.position.y
                    );
                    let index1 = edge.findIndex(
                      (e) =>
                        e.target === params.target &&
                        params.targetHandle == "r1"
                    );
                    let y = node.position.y - e.position.y;

                    if (index1 != -1) {
                      params.targetHandle = "r2";
                    }
                    if (
                      node.position.x - e.position.x >= -176 - 5 &&
                      node.position.x - e.position.x <= -176 + 5
                    ) {
                      //l1.t or l1
                      if (y)
                        if (y >= 3 - 5 && y <= 3 + 5) {
                          params.sourceHandle = "l1";
                          if (
                            edge.findIndex((e) => e.targetHandle === "l1.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //l2.t or l2
                        else if (y >= 22 - 5 && y <= 22 + 5) {
                          params.sourceHandle = "l2";
                          if (
                            edge.findIndex((e) => e.targetHandle === "l2.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //l3.t or l3
                        else if (y >= 38 - 5 && y <= 38 + 5) {
                          params.sourceHandle = "l3";
                          if (
                            edge.findIndex((e) => e.targetHandle === "l3.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //l4.t or l4
                        else if (y >= 56 - 5 && y <= 56 + 5) {
                          params.sourceHandle = "l4";
                          if (
                            edge.findIndex((e) => e.targetHandle === "l4.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                    } else if (
                      node.position.x - e.position.x >= -40 - 5 &&
                      node.position.x - e.position.x <= -40 + 5
                    ) {
                      //r1.t or r1
                      if (y >= 3 - 5 && y <= 3 + 5) {
                        params.sourceHandle = "r1";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r1.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                      //r2.t or r2
                      else if (y >= 22 - 5 && y <= 22 + 5) {
                        params.sourceHandle = "r2";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r2.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                      //r3.t or r3
                      else if (y >= 38 - 5 && y <= 38 + 5) {
                        params.sourceHandle = "r3";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r3.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                      //r4.t or r4
                      else if (y >= 56 - 5 && y <= 56 + 5) {
                        params.sourceHandle = "r4";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r4.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                    }

                    break;
                }
                break;
              case "transistorCircuit":
                switch (node.data.specificElType) {
                  case "led":
                  case "res_100":
                  case "ldr":
                    params = {
                      source: `${e.id}`,
                      sourceHandle: `r`,
                      target: `${node.id}`,
                      targetHandle: "l",
                    };
                    if (
                      node.position.x - e.position.x >= 43 - 5 &&
                      node.position.x - e.position.x <= 43 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "l1";
                        if (
                          edge.findIndex((e) => e.targetHandle === "l1.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "l2";
                        if (
                          edge.findIndex((e) => e.targetHandle === "l2.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "l3";
                        if (
                          edge.findIndex((e) => e.targetHandle === "l3.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "l4";
                        if (
                          edge.findIndex((e) => e.targetHandle === "l4.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= 173 - 5 &&
                      node.position.x - e.position.x <= 173 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.sourceHandle = "r1";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r1.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.sourceHandle = "r2";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r2.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.sourceHandle = "r3";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r3.t") ===
                          -1
                        )
                          await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.sourceHandle = "r4";
                        if (
                          edge.findIndex((e) => e.targetHandle === "r4.t") ===
                          -1
                        )
                          await onConnect(params);
                      }
                    }
                    break;
                }
                break;
              case "parallelCircuit":
                let index1 = nodes.find(
                  (n) => n.data.specificElType === "junction"
                );
                let offsetx = 0,
                  offsetY = 0;
                if (index1.id === e.id)
                  switch (node.data.specificElType) {
                    //add offset for beeper

                    case "tact":
                    case "led":
                    case "beeper":
                      params = {
                        source: `${e.id}`,
                        sourceHandle: `r`,
                        target: `${node.id}`,
                        targetHandle: "l",
                      };

                      if (node.data.specificElType === "beeper") {
                        offsetX = 20;
                        offsetY = 30;
                      } else {
                        offsetX = 0;
                        offsetY = 0;
                      }

                      if (
                        node.position.x - e.position.x >= 43 - 5 + offsetX &&
                        node.position.x - e.position.x <= 43 + 5 + offsetX &&
                        node.data.specificElType != "tact"
                      ) {
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5 + offsetY
                        ) {
                          params.sourceHandle = "l1" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "l1.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.sourceHandle = "l2" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "l2.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.sourceHandle = "l3" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "l3.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.sourceHandle = "l4" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "l4.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      } else if (
                        node.position.x - e.position.x >= 173 - 5 + offsetX &&
                        node.position.x - e.position.x <= 173 + 5 + offsetX &&
                        node.data.specificElType != "tact"
                      ) {
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5 + offsetY
                        ) {
                          params.sourceHandle = "r1" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "r1.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.sourceHandle = "r2" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "r2.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.sourceHandle = "r3" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "r3.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.sourceHandle = "r4" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.targetHandle === "r4.t" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      } else if (
                        node.position.x - e.position.x >= -160 - 5 + offsetX &&
                        node.position.x - e.position.x <= -160 + 5 + offsetX &&
                        node.data.specificElType === "tact"
                      ) {
                        console.log(
                          "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ conecting..........."
                        );
                        params = {
                          source: `${node.id}`,
                          sourceHandle: `r`,
                          target: `${e.id}`,
                          targetHandle: "l",
                        };
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5 + offsetY
                        ) {
                          params.targetHandle = "l1.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l1" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.targetHandle = "l2.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l2" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.targetHandle = "l3.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l3" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.targetHandle = "l4.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l4" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      } else if (
                        node.position.x - e.position.x >= -30 - 5 + offsetX &&
                        node.position.x - e.position.x <= -30 + 5 + offsetX &&
                        node.data.specificElType === "tact"
                      ) {
                        params = {
                          source: `${node.id}`,
                          sourceHandle: `r`,
                          target: `${e.id}`,
                          targetHandle: "l",
                        };
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5 + offsetY
                        ) {
                          params.targetHandle = "r1.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r1" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.targetHandle = "r2.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r2" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.targetHandle = "r3.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r3" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.targetHandle = "r4.t" + index1.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r4" + index1.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      }
                      break;
                  }
                else
                  switch (node.data.specificElType) {
                    case "led":
                    case "beeper":
                      let index3 = nodes.find(
                        (n) => n.data.specificElType === "junction"
                      );
                      let index2 = nodes.find(
                        (n) =>
                          n.data.specificElType === "junction" &&
                          n.id != index3.id
                      );

                      if (node.data.specificElType === "beeper") {
                        offsetX = -20;
                        offsetY = 30;
                      } else {
                        offsetX = 0;
                        offsetY = 0;
                      }
                      console.log(
                        "paramsbeep",
                        node.position.x - e.position.x,
                        node.position.y - e.position.y,
                        "after",
                        node.position.x - e.position.x - offsetX,
                        node.position.y - e.position.y - offsetY
                      );
                      if (
                        node.position.x - e.position.x >= -159 - 5 + offsetX &&
                        node.position.x - e.position.x <= -159 + 5 + offsetX
                      ) {
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5 + offsetY
                        ) {
                          params.targetHandle = "l1.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l1" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.targetHandle = "l2.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l2" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.targetHandle = "l3.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l3" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.targetHandle = "l4.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "l4" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      } else if (
                        node.position.x - e.position.x >= -30 - 5 + offsetX &&
                        node.position.x - e.position.x <= -30 + 5 + offsetX
                      ) {
                        if (
                          node.position.y - e.position.y >= -7 - 5 + offsetY &&
                          node.position.y - e.position.y <= -7 + 5
                        ) {
                          params.targetHandle = "r1.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r1" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 9 - 5 + offsetY &&
                          node.position.y - e.position.y <= 9 + 5 + offsetY
                        ) {
                          params.targetHandle = "r2.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r2" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 27 - 5 + offsetY &&
                          node.position.y - e.position.y <= 27 + 5 + offsetY
                        ) {
                          params.targetHandle = "r3.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r3" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        } else if (
                          node.position.y - e.position.y >= 44 - 5 + offsetY &&
                          node.position.y - e.position.y <= 44 + 5 + offsetY
                        ) {
                          params.targetHandle = "r4.t" + index2.id;
                          if (
                            edge.findIndex(
                              (e) => e.sourceHandle === "r4" + index2.id
                            ) === -1
                          )
                            await onConnect(params);
                        }
                      }
                      break;
                    case "pot":
                      params = {
                        source: `${e.id}`,
                        sourceHandle: `l1`,
                        target: `${node.id}`,
                        targetHandle: "r1",
                      };
                      console.log(
                        "potttTTTTTTTTTTTT",
                        node.position.x - e.position.x,
                        node.position.y - e.position.y
                      );
                      let index1 = edge.findIndex(
                        (e) =>
                          e.target === params.target &&
                          params.targetHandle == "r1"
                      );
                      let y = node.position.y - e.position.y;

                      if (index1 != -1) {
                        params.targetHandle = "r2";
                      }
                      if (
                        node.position.x - e.position.x >= -176 - 5 &&
                        node.position.x - e.position.x <= -176 + 5
                      ) {
                        //l1.t or l1
                        if (y)
                          if (y >= 3 - 5 && y <= 3 + 5) {
                            params.sourceHandle = "l1";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l1.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //l2.t or l2
                          else if (y >= 22 - 5 && y <= 22 + 5) {
                            params.sourceHandle = "l2";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l2.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //l3.t or l3
                          else if (y >= 38 - 5 && y <= 38 + 5) {
                            params.sourceHandle = "l3";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l3.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //l4.t or l4
                          else if (y >= 56 - 5 && y <= 56 + 5) {
                            params.sourceHandle = "l4";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l4.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                      } else if (
                        node.position.x - e.position.x >= -40 - 5 &&
                        node.position.x - e.position.x <= -40 + 5
                      ) {
                        //r1.t or r1
                        if (y >= 3 - 5 && y <= 3 + 5) {
                          params.sourceHandle = "r1";
                          if (
                            edge.findIndex((e) => e.targetHandle === "r1.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //r2.t or r2
                        else if (y >= 22 - 5 && y <= 22 + 5) {
                          params.sourceHandle = "r2";
                          if (
                            edge.findIndex((e) => e.targetHandle === "r2.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //r3.t or r3
                        else if (y >= 38 - 5 && y <= 38 + 5) {
                          params.sourceHandle = "r3";
                          if (
                            edge.findIndex((e) => e.targetHandle === "r3.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                        //r4.t or r4
                        else if (y >= 56 - 5 && y <= 56 + 5) {
                          params.sourceHandle = "r4";
                          if (
                            edge.findIndex((e) => e.targetHandle === "r4.t") ===
                            -1
                          )
                            await onConnect(params);
                        }
                      }

                      break;
                  }
                break;
              case "capacitorCircuit":
                {
                  let index1 = nodes.find(
                    (n) => n.data.specificElType === "junction"
                  );
                  let offsetx = 0,
                    offsetY = 0;
                  if (index1.id === e.id)
                    switch (node.data.specificElType) {
                      //add offset for beeper
                      case "tact":
                      case "capacitor100":
                      case "capacitor1000":
                      case "beeper":
                        console.log(
                          "tact",
                          node.position.x - e.position.x,
                          node.position.y - e.position.y
                        );

                        params = {
                          source: `${e.id}`,
                          sourceHandle: `r`,
                          target: `${node.id}`,
                          targetHandle: "l",
                        };

                        if (node.data.specificElType === "beeper") {
                          offsetX = 20;
                          offsetY = 30;
                        } else {
                          offsetX = 0;
                          offsetY = 0;
                        }

                        if (
                          node.position.x - e.position.x >= 43 - 5 + offsetX &&
                          node.position.x - e.position.x <= 43 + 5 + offsetX &&
                          node.data.specificElType != "tact"
                        ) {
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l1" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l1.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l2" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l2.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l3" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l3.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l4" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l4.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >= 173 - 5 + offsetX &&
                          node.position.x - e.position.x <= 173 + 5 + offsetX &&
                          node.data.specificElType != "tact"
                        ) {
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r1" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r1.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r2" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r2.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r3" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r3.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r4" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r4.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >=
                            -160 - 5 + offsetX &&
                          node.position.x - e.position.x <=
                            -160 + 5 + offsetX &&
                          node.data.specificElType === "tact"
                        ) {
                          console.log(
                            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ conecting..........."
                          );
                          params = {
                            source: `${node.id}`,
                            sourceHandle: `r`,
                            target: `${e.id}`,
                            targetHandle: "l",
                          };
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.targetHandle = "l1.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l1" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.targetHandle = "l2.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l2" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.targetHandle = "l3.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l3" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.targetHandle = "l4.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l4" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >= -30 - 5 + offsetX &&
                          node.position.x - e.position.x <= -30 + 5 + offsetX &&
                          node.data.specificElType === "tact"
                        ) {
                          params = {
                            source: `${node.id}`,
                            sourceHandle: `r`,
                            target: `${e.id}`,
                            targetHandle: "l",
                          };
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.targetHandle = "r1.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r1" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.targetHandle = "r2.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r2" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.targetHandle = "r3.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r3" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.targetHandle = "r4.t" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r4" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >= 42 - 5 + offsetX &&
                          node.position.x - e.position.x <= 42 + 5 + offsetX &&
                          node.data.specificElType === "tact"
                        ) {
                          console.log(
                            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ conecting..........."
                          );
                          params = {
                            source: `${e.id}`,
                            sourceHandle: `r`,
                            target: `${node.id}`,
                            targetHandle: "l",
                          };
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l1" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l1.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l2" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l2.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l3" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l3.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.sourceHandle = "l4" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "l4.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >= 172 - 5 + offsetX &&
                          node.position.x - e.position.x <= 172 + 5 + offsetX &&
                          node.data.specificElType === "tact"
                        ) {
                          params = {
                            source: `${e.id}`,
                            sourceHandle: `r`,
                            target: `${node.id}`,
                            targetHandle: "l",
                          };
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r1" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r1.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r2" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r2.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r3" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r3.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.sourceHandle = "r4" + index1.id;
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r4.t" + index1.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        }
                        break;
                    }
                  else
                    switch (node.data.specificElType) {
                      case "capacitor100":
                      case "capacitor1000":
                      case "beeper":
                        let index3 = nodes.find(
                          (n) => n.data.specificElType === "junction"
                        );
                        let index2 = nodes.find(
                          (n) =>
                            n.data.specificElType === "junction" &&
                            n.id != index3.id
                        );

                        if (node.data.specificElType === "beeper") {
                          offsetX = -20;
                          offsetY = 30;
                        } else {
                          offsetX = 0;
                          offsetY = 0;
                        }
                        console.log(
                          "paramsbeep",
                          node.position.x - e.position.x,
                          node.position.y - e.position.y,
                          "after",
                          node.position.x - e.position.x - offsetX,
                          node.position.y - e.position.y - offsetY
                        );
                        if (
                          node.position.x - e.position.x >=
                            -159 - 5 + offsetX &&
                          node.position.x - e.position.x <= -159 + 5 + offsetX
                        ) {
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5 + offsetY
                          ) {
                            params.targetHandle = "l1.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l1" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.targetHandle = "l2.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l2" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.targetHandle = "l3.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l3" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.targetHandle = "l4.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "l4" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        } else if (
                          node.position.x - e.position.x >= -30 - 5 + offsetX &&
                          node.position.x - e.position.x <= -30 + 5 + offsetX
                        ) {
                          if (
                            node.position.y - e.position.y >=
                              -7 - 5 + offsetY &&
                            node.position.y - e.position.y <= -7 + 5
                          ) {
                            params.targetHandle = "r1.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r1" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >= 9 - 5 + offsetY &&
                            node.position.y - e.position.y <= 9 + 5 + offsetY
                          ) {
                            params.targetHandle = "r2.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r2" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              27 - 5 + offsetY &&
                            node.position.y - e.position.y <= 27 + 5 + offsetY
                          ) {
                            params.targetHandle = "r3.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r3" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          } else if (
                            node.position.y - e.position.y >=
                              44 - 5 + offsetY &&
                            node.position.y - e.position.y <= 44 + 5 + offsetY
                          ) {
                            params.targetHandle = "r4.t" + index2.id;
                            if (
                              edge.findIndex(
                                (e) => e.sourceHandle === "r4" + index2.id
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        }
                        break;
                      case "pot":
                        params = {
                          source: `${e.id}`,
                          sourceHandle: `l1`,
                          target: `${node.id}`,
                          targetHandle: "r1",
                        };
                        console.log(
                          "potttTTTTTTTTTTTT",
                          node.position.x - e.position.x,
                          node.position.y - e.position.y
                        );
                        let index1 = edge.findIndex(
                          (e) =>
                            e.target === params.target &&
                            params.targetHandle == "r1"
                        );
                        let y = node.position.y - e.position.y;

                        if (index1 != -1) {
                          params.targetHandle = "r2";
                        }
                        if (
                          node.position.x - e.position.x >= -176 - 5 &&
                          node.position.x - e.position.x <= -176 + 5
                        ) {
                          //l1.t or l1
                          if (y)
                            if (y >= 3 - 5 && y <= 3 + 5) {
                              params.sourceHandle = "l1";
                              if (
                                edge.findIndex(
                                  (e) => e.targetHandle === "l1.t"
                                ) === -1
                              )
                                await onConnect(params);
                            }
                            //l2.t or l2
                            else if (y >= 22 - 5 && y <= 22 + 5) {
                              params.sourceHandle = "l2";
                              if (
                                edge.findIndex(
                                  (e) => e.targetHandle === "l2.t"
                                ) === -1
                              )
                                await onConnect(params);
                            }
                            //l3.t or l3
                            else if (y >= 38 - 5 && y <= 38 + 5) {
                              params.sourceHandle = "l3";
                              if (
                                edge.findIndex(
                                  (e) => e.targetHandle === "l3.t"
                                ) === -1
                              )
                                await onConnect(params);
                            }
                            //l4.t or l4
                            else if (y >= 56 - 5 && y <= 56 + 5) {
                              params.sourceHandle = "l4";
                              if (
                                edge.findIndex(
                                  (e) => e.targetHandle === "l4.t"
                                ) === -1
                              )
                                await onConnect(params);
                            }
                        } else if (
                          node.position.x - e.position.x >= -40 - 5 &&
                          node.position.x - e.position.x <= -40 + 5
                        ) {
                          //r1.t or r1
                          if (y >= 3 - 5 && y <= 3 + 5) {
                            params.sourceHandle = "r1";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r1.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //r2.t or r2
                          else if (y >= 22 - 5 && y <= 22 + 5) {
                            params.sourceHandle = "r2";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r2.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //r3.t or r3
                          else if (y >= 38 - 5 && y <= 38 + 5) {
                            params.sourceHandle = "r3";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r3.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                          //r4.t or r4
                          else if (y >= 56 - 5 && y <= 56 + 5) {
                            params.sourceHandle = "r4";
                            if (
                              edge.findIndex(
                                (e) => e.targetHandle === "r4.t"
                              ) === -1
                            )
                              await onConnect(params);
                          }
                        }

                        break;
                    }
                }
                break;
              default:
                switch (node.data.specificElType) {
                  case "capacitor100":
                  case "capacitor1000":
                  case "tact":
                  case "led":
                    console.log(
                      "led#####^^^^^^^^^^####",
                      node.position.x - e.position.x,
                      node.position.y - e.position.y
                    );
                    if (
                      node.position.x - e.position.x >= -159 - 5 &&
                      node.position.x - e.position.x <= -159 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.targetHandle = "l1.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.targetHandle = "l2.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.targetHandle = "l3.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.targetHandle = "l4.t";
                        await onConnect(params);
                      }
                    } else if (
                      node.position.x - e.position.x >= -30 - 5 &&
                      node.position.x - e.position.x <= -30 + 5
                    ) {
                      if (
                        node.position.y - e.position.y >= -7 - 5 &&
                        node.position.y - e.position.y <= -7 + 5
                      ) {
                        params.targetHandle = "r1.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 9 - 5 &&
                        node.position.y - e.position.y <= 9 + 5
                      ) {
                        params.targetHandle = "r2.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 27 - 5 &&
                        node.position.y - e.position.y <= 27 + 5
                      ) {
                        params.targetHandle = "r3.t";
                        await onConnect(params);
                      } else if (
                        node.position.y - e.position.y >= 44 - 5 &&
                        node.position.y - e.position.y <= 44 + 5
                      ) {
                        params.targetHandle = "r4.t";
                        await onConnect(params);
                      }
                    }
                    break;
                }
            }
            break;
          case "diode":
            params = {
              source: `${node.id}`,
              sourceHandle: `r`,
              target: `${e.id}`,
              targetHandle: "l1",
            };
            if (
              node.position.x - e.position.x >= -200 - 5 &&
              node.position.x - e.position.x <= -200 + 5 &&
              node.position.y - e.position.y >= -2 - 5 &&
              node.position.y - e.position.y <= -2 + 5
            ) {
              let index1 = edge.findIndex((e) => e.targetHandle === "r1");
              if (index1 === -1) await onConnect(params);
            } else if (
              node.position.x - e.position.x >= 200 - 5 &&
              node.position.x - e.position.x <= 200 + 5 &&
              node.position.y - e.position.y >= 2 - 5 &&
              node.position.y - e.position.y <= 2 + 5
            ) {
              params = {
                source: `${e.id}`,
                sourceHandle: `r1`,
                target: `${node.id}`,
                targetHandle: "l",
              };
              let index1 = edge.findIndex((e) => e.sourceHandle === "l1");
              if (index1 === -1) await onConnect(params);
              await onConnect(params);
            }
            break;
          case "transistor":
            if (
              node.data.specificElType === "tact" ||
              node.data.specificElType === "ldr"
            ) {
              params = {
                source: `${node.id}`,
                sourceHandle: `r`,
                target: `${e.id}`,
                targetHandle: "l",
              };
              if (
                node.position.x - e.position.x >= -200 - 5 &&
                node.position.x - e.position.x <= -200 + 5 &&
                node.position.y - e.position.y >= 20 - 5 &&
                node.position.y - e.position.y <= 20 + 5
              ) {
                await onConnect(params);
              }
            } else if (node.data.specificElType === "led") {
              if (
                node.position.x - e.position.x >= -9 - 5 &&
                node.position.x - e.position.x <= -9 + 5 &&
                node.position.y - e.position.y >= 5 - 5 &&
                node.position.y - e.position.y <= 5 + 5
              ) {
                params = {
                  source: `${node.id}`,
                  sourceHandle: `r`,
                  target: `${e.id}`,
                  targetHandle: "r.t",
                };
                await onConnect(params);
              }
            }
            break;
        }
      }
    });
  };

  const onNodeClick = async (event, node) => {
    console.log(node);
    switch (props.type) {
      case "simpleCircuit":
        if (node.data.specificElType === "tact") {
          if (nodeDetail.data.specificElType == "led") {
            const ele = document.getElementById(`led${nodeDetail.id}`);
            console.log(ele);
            ele.classList.remove("led-light");
          } else if (nodeDetail.data.specificElType == "beeper") {
            const ele2 = document.getElementById(`beeper${nodeDetail.id}`);

            ele2.classList.remove("beeper");
          }
        }
        break;
      case "seriesCircuit":
        if (node.data.specificElType === "tact") {
          {
            let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
            nodeDetail2 = nodeDetail2[0];
            if (
              nodeDetail.data.specificElType == "led" &&
              nodeDetail2.data.specificElType == "led"
            ) {
              const eleLed1 = document.getElementById(`led${nodeDetail.id}`);

              const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);

              eleLed1.classList.remove("led-light");
              eleLed2.classList.remove("led-light");
            } else if (
              nodeDetail.data.specificElType == "beeper" &&
              nodeDetail2.data.specificElType == "beeper"
            ) {
              const eleLed1 = document.getElementById(`beeper${nodeDetail.id}`);

              const eleLed2 = document.getElementById(
                `beeper${nodeDetail2.id}`
              );

              eleLed1.classList.remove("beeper");
              eleLed2.classList.remove("beeper");
            }
          }
        }
        break;
      case "parallelCircuit":
        if ((await circuitClosed) === 1) {
          let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
          nodeDetail2 = await getOutgoers(nodeDetail2[0], nodes, edges);
          let nodeDetail1 = nodeDetail2[0];
          nodeDetail2 = nodeDetail2[1];
          if (
            nodeDetail1.data.specificElType === "led" &&
            nodeDetail2.data.specificElType === "led"
          ) {
            const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
            const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);

            eleLed1.classList.remove("led-light");
            eleLed2.classList.remove("led-light");
          } else if (
            nodeDetail1.data.specificElType == "beeper" &&
            nodeDetail2.data.specificElType == "beeper"
          ) {
            const eleLed1 = document.getElementById(`beeper${nodeDetail1.id}`);

            const eleLed2 = document.getElementById(`beeper${nodeDetail2.id}`);

            eleLed1.classList.remove("beeper");
            eleLed2.classList.remove("beeper");
          }
        }
        break;
      case "resistorCircuit":
        if ((await circuitClosed) === true) {
          let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
          nodeDetail1 = nodeDetail1[0];
          let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
          nodeDetail2 = nodeDetail2[0];
          if (nodeDetail2.data.specificElType === "led") {
            const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
            eleLed1.classList.remove("led-light");
          } else if (
            nodeDetail2.data.specificElType === "res_100" ||
            nodeDetail2.data.specificElType === "res_250"
          ) {
            let nodeDetail3 = await getOutgoers(nodeDetail2, nodes, edges);
            nodeDetail3 = nodeDetail3[0];
            const eleLed1 = document.getElementById(`led${nodeDetail3.id}`);
            eleLed1.classList.remove("led-light");
          }
        } else if ((await circuitClosed) === 1) {
          let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
          if (nodeDetail1.length === 2) {
            let nodeDetail2 = nodeDetail1[1];
            nodeDetail1 = nodeDetail1[0];
            let nodeDetail3 = await getOutgoers(nodeDetail2, nodes, edges);
            nodeDetail3 = nodeDetail3[0];

            const eleLed1 = document.getElementById(`led${nodeDetail3.id}`);
            eleLed1.classList.remove("led-light");
          }
        }
        break;
      case "voltageDividerCircuit":
        if ((await circuitClosed) === 1) {
          let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
          let nodeDetail2 = await getOutgoers(nodeDetail1[0], nodes, edges);
          nodeDetail2 = nodeDetail2[0];
          nodeDetail1 = nodeDetail1[0];
          if (nodeDetail2.data.specificElType === "led") {
            const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
            eleLed1.classList.remove("led-light");
          }
        }
        break;
      case "semi-conductorDiodeCircuit":
        if (await circuitClosed) {
          let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);

          nodeDetail1 = nodeDetail1[0];

          if (nodeDetail1.data.specificElType === "led") {
            const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);
            eleLed1.classList.remove("led-light");
          }
        }
        break;
      case "transistorCircuit":
        {
          if ((await circuitClosed) === 1) {
            let flag;
            let nodeDetail1 = await getOutgoers(nodes[0], nodes, edges);
            nodeDetail1 = nodeDetail1[0];
            let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
            if (nodeDetail2.length === 2) {
              if (nodeDetail2[0].data.specificElType === "ldr") flag = true;
              else if (nodeDetail2[1].data.specificElType === "ldr")
                flag = true;
              if (nodeDetail2[0].data.specificElType === "led") {
                nodeDetail2 = nodeDetail2[0];
              } else if (nodeDetail2[1].data.specificElType === "led") {
                nodeDetail2 = nodeDetail2[1];
              }
            }

            if (nodeDetail2.data.specificElType === "led" && !flag) {
              const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
              eleLed1.classList.remove("led-light");
            }
          }
        }
        break;
      case "capacitorCircuit":
        if ((await circuitClosed) === 1) {
          let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges),
            nodeDetail2;

          if (nodeDetail1[0].data.specificElType === "junction") {
            nodeDetail2 = await getOutgoers(nodeDetail1[0], nodes, edges);
          } else if (nodeDetail1[0].data.specificElType === "beeper") {
            nodeDetail2 = nodeDetail1;
          }
          if (nodeDetail2.length === 2) {
            if (nodeDetail2[0].data.specificElType === "beeper") {
              if (nodeDetail2[1].data.specificElType === "capacitor100") {
                const ele2 = document.getElementById(
                  `beeper${nodeDetail2[0].id}`
                );
                ele2.classList.remove("beeper");
              } else if (
                nodeDetail2[1].data.specificElType === "capacitor1000"
              ) {
                const ele2 = document.getElementById(
                  `beeper${nodeDetail2[0].id}`
                );
                ele2.classList.remove("beeper");
              }
            } else if (nodeDetail2[1].data.specificElType === "beeper") {
              if (nodeDetail2[0].data.specificElType === "capacitor100") {
                const ele2 = document.getElementById(
                  `beeper${nodeDetail2[1].id}`
                );
                ele2.classList.remove("beeper");
              } else if (
                nodeDetail2[0].data.specificElType === "capacitor1000"
              ) {
                const ele2 = document.getElementById(
                  `beeper${nodeDetail2[1].id}`
                );
                ele2.classList.remove("beeper");
              }
            }
          } else if (nodeDetail2.length === 3) {
            if (nodeDetail2[0].data.specificElType === "beeper") {
              const ele = document.getElementById(`beeper${nodeDetail2[0].id}`);
              ele.classList.remove("beeper");
            } else if (nodeDetail2[1].data.specificElType === "beeper") {
              const ele = document.getElementById(`beeper${nodeDetail2[1].id}`);
              ele.classList.remove("beeper");
            } else if (nodeDetail2[2].data.specificElType === "beeper") {
              const ele = document.getElementById(`beeper${nodeDetail2[2].id}`);
              ele.classList.remove("beeper");
            }
          } else if (nodeDetail2.length === 1) {
            let nodeDetail3 = await getIncomers(nodeDetail, nodes, edges);

            if (nodeDetail3[0].data.specificElType === "junction") {
              nodeDetail3 = await getOutgoers(nodeDetail3[0], nodes, edges);

              if (nodeDetail3.length === 2) {
                if (nodeDetail3[0].data.specificElType === "capacitor100") {
                  const ele2 = document.getElementById(
                    `beeper${nodeDetail2[0].id}`
                  );

                  ele2.classList.remove("beeper");
                } else if (
                  nodeDetail3[0].data.specificElType === "capacitor1000"
                ) {
                  const ele2 = document.getElementById(
                    `beeper${nodeDetail1[0].id}`
                  );

                  ele2.classList.remove("beeper");
                } else if (
                  nodeDetail3[1].data.specificElType === "capacitor100"
                ) {
                  const ele2 = document.getElementById(
                    `beeper${nodeDetail1[0].id}`
                  );

                  ele2.classList.remove("beeper");
                } else if (
                  nodeDetail3[1].data.specificElType === "capacitor1000"
                ) {
                  const ele2 = document.getElementById(
                    `beeper${nodeDetail1[0].id}`
                  );
                  console.log("gsk", nodeDetail3[1], ele2);
                  ele2.classList.remove("beeper");
                }
              }
            }
          }
        }
        break;
    }
  };
  const onMouseDownCapture = async (e) => {
    console.log(await circuitClosed, "closedC");

    if (mouseDownChk && (await circuitClosed)) {
      let global = document.getElementsByClassName("react-flow__nodes")[0];
      global = global.childNodes;
      let cord;
      for (let i = 0; i < global.length; i++) {
        if (mouseDownChknodeId === global[i].dataset.id) {
          cord = await getCoords(global[i]);
          break;
        }
      }
      console.log({ cord });
      if (
        e.clientX - cord.x >= 250 - 10 &&
        e.clientX - cord.x < 250 + 10 &&
        e.clientY - cord.y >= 142 - 10 &&
        e.clientY - cord.y < 142 + 10
      ) {
        switch (props.type) {
          case "simpleCircuit":
            const ele = document.getElementById(`led${nodeDetail.id}`);
            const ele2 = document.getElementById(`beeper${nodeDetail.id}`);
            if (nodeDetail.data.specificElType === "led")
              ele.classList.add("led-light");
            else if (nodeDetail.data.specificElType === "beeper")
              ele2.classList.add("beeper");
            break;
          case "seriesCircuit":
            //  const ele2 = document.getElementById("beeper");
            let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
            nodeDetail2 = nodeDetail2[0];
            if (
              nodeDetail.data.specificElType === "led" &&
              nodeDetail2.data.specificElType === "led"
            ) {
              const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
              const eleLed1 = document.getElementById(`led${nodeDetail.id}`);

              eleLed1.classList.add("led-light");
              eleLed2.classList.add("led-light");
            } else if (
              nodeDetail.data.specificElType === "beeper" &&
              nodeDetail2.data.specificElType === "beeper"
            ) {
              const eleLed2 = document.getElementById(
                `beeper${nodeDetail2.id}`
              );
              const eleLed1 = document.getElementById(`beeper${nodeDetail.id}`);

              eleLed1.classList.add("beeper");
              eleLed2.classList.add("beeper");
            }

            break;
          case "parallelCircuit":
            if ((await circuitClosed) === 1) {
              let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
              nodeDetail2 = await getOutgoers(nodeDetail2[0], nodes, edges);
              console.log(nodeDetail2, "nodeDetail2");
              let nodeDetail1 = nodeDetail2[0];
              nodeDetail2 = nodeDetail2[1];
              if (
                nodeDetail1.data.specificElType === "led" &&
                nodeDetail2.data.specificElType === "led"
              ) {
                const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
                const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);

                eleLed1.classList.add("led-light");
                eleLed2.classList.add("led-light");
              } else if (
                nodeDetail1.data.specificElType === "beeper" &&
                nodeDetail2.data.specificElType === "beeper"
              ) {
                const eleLed2 = document.getElementById(
                  `beeper${nodeDetail2.id}`
                );
                const eleLed1 = document.getElementById(
                  `beeper${nodeDetail1.id}`
                );

                eleLed1.classList.add("beeper");
                eleLed2.classList.add("beeper");
              }
            }
            break;
          case "resistorCircuit":
            if ((await circuitClosed) === true) {
              let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
              nodeDetail1 = nodeDetail1[0];
              let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
              nodeDetail2 = nodeDetail2[0];
              if (nodeDetail2.data.specificElType === "led") {
                const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
                eleLed1.classList.add("led-light");
                if (nodeDetail1.data.specificElType === "res_100")
                  eleLed1.style.opacity = ".65";
                else if (nodeDetail1.data.specificElType === "res_250")
                  eleLed1.style.opacity = ".5";
              } else if (
                nodeDetail2.data.specificElType === "res_100" ||
                nodeDetail2.data.specificElType === "res_250"
              ) {
                let nodeDetail3 = await getOutgoers(nodeDetail2, nodes, edges);
                nodeDetail3 = nodeDetail3[0];
                const eleLed1 = document.getElementById(`led${nodeDetail3.id}`);
                eleLed1.classList.add("led-light");
                eleLed1.style.opacity = ".4";
              }
            } else if ((await circuitClosed) === 1) {
              let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
              if (nodeDetail1.length === 2) {
                let nodeDetail2 = nodeDetail1[1];
                nodeDetail1 = nodeDetail1[0];
                let nodeDetail3 = await getOutgoers(nodeDetail2, nodes, edges);
                nodeDetail3 = nodeDetail3[0];

                const eleLed1 = document.getElementById(`led${nodeDetail3.id}`);
                eleLed1.classList.add("led-light");
                eleLed1.style.opacity = ".7";
              }
            }
            break;
          case "capacitorCircuit":
            if ((await circuitClosed) === 1) {
              let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges),
                nodeDetail2;

              if (nodeDetail1[0].data.specificElType === "junction") {
                nodeDetail2 = await getOutgoers(nodeDetail1[0], nodes, edges);
              } else if (nodeDetail1[0].data.specificElType === "beeper") {
                nodeDetail2 = nodeDetail1;
              }
              if (nodeDetail2.length === 2) {
                if (nodeDetail2[0].data.specificElType === "beeper") {
                  if (nodeDetail2[1].data.specificElType === "capacitor100") {
                    const ele2 = document.getElementById(
                      `beeper${nodeDetail2[0].id}`
                    );
                    ele2.classList.add("beeper");
                    ele2.style.opacity = ".4";
                  } else if (
                    nodeDetail2[1].data.specificElType === "capacitor1000"
                  ) {
                    const ele2 = document.getElementById(
                      `beeper${nodeDetail2[0].id}`
                    );
                    ele2.classList.add("beeper");
                    ele2.style.opacity = ".65";
                  }
                } else if (nodeDetail2[1].data.specificElType === "beeper") {
                  if (nodeDetail2[0].data.specificElType === "capacitor100") {
                    const ele2 = document.getElementById(
                      `beeper${nodeDetail2[1].id}`
                    );
                    ele2.classList.add("beeper");
                    ele2.style.opacity = ".4";
                  } else if (
                    nodeDetail2[0].data.specificElType === "capacitor1000"
                  ) {
                    const ele2 = document.getElementById(
                      `beeper${nodeDetail2[1].id}`
                    );
                    ele2.classList.add("beeper");
                    ele2.style.opacity = ".65";
                  }
                }
              } else if (nodeDetail2.length === 3) {
                if (nodeDetail2[0].data.specificElType === "beeper") {
                  const ele = document.getElementById(
                    `beeper${nodeDetail2[0].id}`
                  );
                  ele.classList.add("beeper");
                  ele.style.opacity = ".8";
                } else if (nodeDetail2[1].data.specificElType === "beeper") {
                  const ele = document.getElementById(
                    `beeper${nodeDetail2[1].id}`
                  );
                  ele.classList.add("beeper");
                  ele.style.opacity = ".8";
                } else if (nodeDetail2[2].data.specificElType === "beeper") {
                  const ele = document.getElementById(
                    `beeper${nodeDetail2[2].id}`
                  );
                  ele.classList.add("beeper");
                  ele.style.opacity = ".8";
                }
              } else if (nodeDetail2.length === 1) {
                let nodeDetail3 = await getIncomers(nodeDetail, nodes, edges);

                if (nodeDetail3[0].data.specificElType === "junction") {
                  nodeDetail3 = await getOutgoers(nodeDetail3[0], nodes, edges);

                  if (nodeDetail3.length === 2) {
                    if (nodeDetail3[0].data.specificElType === "capacitor100") {
                      const ele2 = document.getElementById(
                        `beeper${nodeDetail2[0].id}`
                      );

                      ele2.classList.add("beeper");
                      ele2.style.opacity = ".4";
                    } else if (
                      nodeDetail3[0].data.specificElType === "capacitor1000"
                    ) {
                      const ele2 = document.getElementById(
                        `beeper${nodeDetail1[0].id}`
                      );

                      ele2.classList.add("beeper");
                      ele2.style.opacity = ".65";
                    } else if (
                      nodeDetail3[1].data.specificElType === "capacitor100"
                    ) {
                      const ele2 = document.getElementById(
                        `beeper${nodeDetail1[0].id}`
                      );

                      ele2.classList.add("beeper");
                      ele2.style.opacity = ".4";
                    } else if (
                      nodeDetail3[1].data.specificElType === "capacitor1000"
                    ) {
                      const ele2 = document.getElementById(
                        `beeper${nodeDetail1[0].id}`
                      );
                      console.log("gsk", nodeDetail3[1], ele2);
                      ele2.classList.add("beeper");
                      ele2.style.opacity = ".65";
                    }
                  }
                }
              }
            }
          case "resistorCircuit":
            if ((await circuitClosed) === true) {
            } else if ((await circuitClosed) === 1) {
            }
            break;
          case "voltageDividerCircuit":
            if ((await circuitClosed) === 1) {
              let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
              let nodeDetail2 = await getOutgoers(nodeDetail1[0], nodes, edges);
              nodeDetail2 = nodeDetail2[0];
              nodeDetail1 = nodeDetail1[0];
              if (nodeDetail2.data.specificElType === "led") {
                const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
                eleLed1.classList.add("led-light");
                // const eleLed2 = document.getElementById(
                //   `myRange${nodeDetail1.id}`
                // );
                // console.log("traget@@", eleLed2);
                eleLed1.style.opacity = `${rangeVal / 100 + 0.1}`;
              }
            }
            break;
          case "semi-conductorDiodeCircuit":
            if (await circuitClosed) {
              let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);

              nodeDetail1 = nodeDetail1[0];
              let index1 = edge.findIndex(
                (e) => e.targetHandle === "l1" && e.sourceHandle === "r"
              );
              console.log("nodeDE", index1);
              if (nodeDetail1.data.specificElType === "led" && index1 != -1) {
                const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);
                eleLed1.classList.add("led-light");
              }
            }
            break;
          case "transistorCircuit": {
            if ((await circuitClosed) === 1) {
              let flag = false;
              let nodeDetail1 = await getOutgoers(nodes[0], nodes, edges);
              nodeDetail1 = nodeDetail1[0];
              let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
              if (nodeDetail2.length === 2) {
                if (nodeDetail2[0].data.specificElType === "ldr") flag = true;
                else if (nodeDetail2[1].data.specificElType === "ldr")
                  flag = true;
                if (nodeDetail2[0].data.specificElType === "led")
                  nodeDetail2 = nodeDetail2[0];
                else if (nodeDetail2[1].data.specificElType === "led")
                  nodeDetail2 = nodeDetail2[1];
              }

              if (nodeDetail2.data.specificElType === "led") {
                const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
                eleLed1.classList.add("led-light");
                if (flag) eleLed1.style.opacity = `${rangeVal / 100 + 0.1}`;
              }
            }
          }
        }
      }
    }
    console.log(e);
  };
  const sliderOnChange = async () => {};
  const onNodeMouseEnter = async (e, node) => {
    console.log("node moyse enter", node);
    if (node.data.specificElType === "tact") {
      mouseDownChk = true;
      mouseDownChknodeId = node.id;
      if (
        props.type === "parallelCircuit" ||
        props.type === "resistorCircuit" ||
        props.type === "capacitorCircuit" ||
        props.type === "voltageDividerCircuit" ||
        props.typr === "semi-conductorDiodeCircuit" ||
        props.type === "capacitorCircuit"
      ) {
        nodeDetail = node;
      } else {
        nodeDetail = await getOutgoers(node, nodes, edges);
        nodeDetail = nodeDetail[0];
      }
    } else mouseDownChk = false;
  };
  const onNodeDragEnd = async (e, node) => {
    if (await circuitClosed)
      switch (props.type) {
        case "simpleCircuit":
          if (nodeDetail.data.specificElType === "led") {
            const ele = document.getElementById(`led${nodeDetail.id}`);
            ele.classList.remove("led-light");
          } else if (nodeDetail.data.specificElType === "beeper") {
            const ele2 = document.getElementById(`beeper${nodeDetail.id}`);
            ele2.classList.remove("beeper");
          }
          break;
        case "seriesCircuit":
          let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
          nodeDetail2 = nodeDetail2[0];
          if (
            nodeDetail.data.specificElType == "led" &&
            nodeDetail2.data.specificElType == "led"
          ) {
            const eleLed1 = document.getElementById(`led${nodeDetail.id}`);

            const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);

            eleLed1.classList.remove("led-light");
            eleLed2.classList.remove("led-light");
          } else if (
            nodeDetail.data.specificElType == "beeper" &&
            nodeDetail2.data.specificElType == "beeper"
          ) {
            const eleLed1 = document.getElementById(`beeper${nodeDetail.id}`);

            const eleLed2 = document.getElementById(`beeper${nodeDetail2.id}`);

            eleLed1.classList.remove("beeper");
            eleLed2.classList.remove("beeper");
          }
          // ele2.classList.remove("beeper");
          break;
        case "parallelCircuit":
          if ((await circuitClosed) === 1) {
            let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
            nodeDetail2 = await getOutgoers(nodeDetail2[0], nodes, edges);
            let nodeDetail1 = nodeDetail2[0];
            nodeDetail2 = nodeDetail2[1];
            if (
              nodeDetail1.data.specificElType === "led" &&
              nodeDetail2.data.specificElType === "led"
            ) {
              const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
              const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);

              eleLed1.classList.remove("led-light");
              eleLed2.classList.remove("led-light");
            } else if (
              nodeDetail1.data.specificElType == "beeper" &&
              nodeDetail2.data.specificElType == "beeper"
            ) {
              const eleLed1 = document.getElementById(
                `beeper${nodeDetail1.id}`
              );

              const eleLed2 = document.getElementById(
                `beeper${nodeDetail2.id}`
              );

              eleLed1.classList.remove("beeper");
              eleLed2.classList.remove("beeper");
            }
          }
          break;
        case "voltageDividerCircuit":
          if ((await circuitClosed) === 1) {
            let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);
            let nodeDetail2 = await getOutgoers(nodeDetail1[0], nodes, edges);
            nodeDetail2 = nodeDetail2[0];
            nodeDetail1 = nodeDetail1[0];
            if (nodeDetail2.data.specificElType === "led") {
              const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
              eleLed1.classList.remove("led-light");
            }
          }
          break;
        case "semi-conductorDiodeCircuit":
          if (await circuitClosed) {
            let nodeDetail1 = await getOutgoers(nodeDetail, nodes, edges);

            nodeDetail1 = nodeDetail1[0];

            if (nodeDetail1.data.specificElType === "led") {
              const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);
              eleLed1.classList.remove("led-light");
            }
          }
          break;
        case "transistorCircuit":
          {
            if ((await circuitClosed) === 1) {
              let flag = false;

              let nodeDetail1 = await getOutgoers(nodes[0], nodes, edges);
              nodeDetail1 = nodeDetail1[0];
              let nodeDetail2 = await getOutgoers(nodeDetail1, nodes, edges);
              if (nodeDetail2.length === 2) {
                if (nodeDetail2[0].data.specificElType === "ldr") flag = true;
                else if (nodeDetail2[1].data.specificElType === "ldr")
                  flag = true;
                if (nodeDetail2[0].data.specificElType === "led") {
                  nodeDetail2 = nodeDetail2[0];
                } else if (nodeDetail2[1].data.specificElType === "led") {
                  nodeDetail2 = nodeDetail2[1];
                }
              }
              if (nodeDetail2.data.specificElType === "led" && flag) {
                eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
                eleLed1.classList.add("led-light");
                eleLed1.style.opacity = `${rangeVal / 100 + 0.1}`;
              } else if (nodeDetail2.data.specificElType === "led") {
                const eleLed1 = document.getElementById(`led${nodeDetail2.id}`);
                eleLed1.classList.remove("led-light");
              }
            }
          }
          break;
      }
  };
  const [{}, drop] = useDrop(
    () => ({
      accept: "yellow",
      drop(_item, monitor) {
        console.log("GSKDND", monitor.isDragging);
        onDrop(monitor.getItemType());
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType(),
      }),
    }),
    [onDrop]
  );
  // var slider = document.getElementById("myRange");
  // var output = document.getElementById("demo");
  // output.innerHTML = slider.value;

  // slider.oninput = function () {
  //   output.innerHTML = this.value;
  // };

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
            onEdgeDoubleClick={onEdgeDoubleClick}
            onNodeClick={onNodeClick}
            zoomOnDoubleClick={false}
            onMouseDownCapture={onMouseDownCapture}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeDragStop={onNodeDragEnd}
            nodesDraggable={nodesDraggable}
            ref={drop}
            // onElementClick={onElementClick}
          >
            <Controls />
            <canvas
              id="myCanvas"
              width="inherit"
              height="884"
              className="react-flow__edges"
            ></canvas>
          </ReactFlow>
        </div>
        <Sidebar send={props} />
        <CustomDragLayer />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
