import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
  getOutgoers,
} from "react-flow-renderer";
import renderImage from "./renderImage";
import Sidebar from "./Sidebar";
import { v4 } from "uuid";
import "./dnd.css";
//return image to drop

let id = 1;
const getId = () => `dndnode_${id++}`;
let edge, node;
let mouseDownChk = false,
  circuitClosed,
  mouseDownChknodeId,
  nodeDetail,
  index1Count = 0,
  index2Count = 0;
const DnDFlow = (props) => {
  const text = (type, _id) => {
    switch (props.type) {
      //parallelCircuit 2way connection on r1 and r2
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
                id="r2.0"
              />
              <Handle
                type="target"
                position="left"
                style={{ left: "8.5vw", top: " 8.9vh" }}
                id="r2.1"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "8.7vw", top: " 10.4vh" }}
                id="r3.0"
              />
              <Handle
                type="target"
                position="bottom"
                style={{ left: "8.7vw", top: " 10.4vh" }}
                id="r3.1"
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

  useEffect(() => {
    console.log(edges, "edges use effect");
    edge = edges;

    circuitClosed = closedChk(nodes, edges);
  }, [edges]);
  useEffect(() => {
    node = nodes;
  }, [nodes]);
  const onConnect = async (params) => {
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
    if (start.length !== 0) return await closedChkRec(start[0], n, e);
    else return false;
  };
  const closedChkRec = async (ele, n, e) => {
    if (ele.id === nodes[0].id) {
      return true;
    }
    let start = await getOutgoers(ele, n, e);
    console.log({ start }, { ele });
    if (start.length === 1) return await closedChkRec(start[0], n, e);
    else if(start.length === 2){
      let y= await closedChkRec(start[0],n,e)
      let x = await closedChkRec(start[1],n,e)
      return y*x
    }
    else if (start.length === 0) return false;
  };
  //delete the edge
  const onEdgeDoubleClick = async (e, toDeleteEdge) => {
    var index = await edges.findIndex((e) => e.id === toDeleteEdge.id);
    if (index != -1) {
      //edge is double clicked
      setEdges(edges.filter((node) => node.id !== toDeleteEdge.id));
      index1Count=0
      index2Count=0
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
            }

            break;
          case "led":
          case "ldr":
          case "diode":
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
              default:
                offsetX = 0;
                offsetY = 0;
                break;
            }
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
                case "parallelCircuit":
                  if (index1Count === 0) params.sourceHandle = "r1";
                  else if (index1Count === 1) params.sourceHandle = "r2";
                  if (
                    e.data.specificElType === "tact" &&
                    (node.data.specificElType == "beeper" ||
                      node.data.specificElType == "led")
                  ) {
                    await onConnect(params);
                    index1Count = 1;
                  }

                  break;
              }
              return;
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
              console.log("props@@@@@", props.type, node.data.specificElType);
              switch (props.type) {
                case "simpleCircuit":
                case "seriesCircuit":
                case "parallelCircuit":
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
                    else if (index2Count === 1) params.targetHandle = "r2.1";
                  await onConnect(params);
                  index2Count = 1;
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
                case "parallelCircuit":
                  if (
                    node.data.specificElType === "led" ||
                    node.data.specificElType === "beeper"
                  )
                    if (index2Count === 0) params.targetHandle = "r3.0";
                    else if (index2Count === 1) params.targetHandle = "r3.1";
                  await onConnect(params);
                  index2Count = 1;

                  break;
              }
              return;
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
          if(await circuitClosed === 1 ){
            let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
            let nodeDetail1 = nodeDetail2[0];
            nodeDetail2 = nodeDetail2[1]
            if (
              nodeDetail1.data.specificElType === "led" &&
              nodeDetail2.data.specificElType === "led"
            ) {
              const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
              const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);

              eleLed1.classList.remove("led-light");
              eleLed2.classList.remove("led-light");
            }  else if (
              nodeDetail1.data.specificElType == "beeper" &&
              nodeDetail2.data.specificElType == "beeper"
            ) {
              const eleLed1 = document.getElementById(`beeper${nodeDetail1.id}`);

              const eleLed2 = document.getElementById(
                `beeper${nodeDetail2.id}`
              );

              eleLed1.classList.remove("beeper");
              eleLed2.classList.remove("beeper");
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
            if(await circuitClosed === 1 ){
              let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
              let nodeDetail1 = nodeDetail2[0];
              nodeDetail2 = nodeDetail2[1]
              if (
                nodeDetail1.data.specificElType === "led" &&
                nodeDetail2.data.specificElType === "led"
              ) {
                const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
                const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);
  
                eleLed1.classList.add("led-light");
                eleLed2.classList.add("led-light");
              } 
              else if (
                nodeDetail1.data.specificElType === "beeper" &&
                nodeDetail2.data.specificElType === "beeper"
              ) {
                const eleLed2 = document.getElementById(
                  `beeper${nodeDetail2.id}`
                );
                const eleLed1 = document.getElementById(`beeper${nodeDetail1.id}`);
  
                eleLed1.classList.add("beeper");
                eleLed2.classList.add("beeper");
              }
            }
            break;
        }
      }
    }
    console.log(e);
  };

  const onNodeMouseEnter = async (e, node) => {
    console.log("node moyse enter", node);
    if (node.data.specificElType === "tact") {
      mouseDownChk = true;
      mouseDownChknodeId = node.id;
      if(props.type==="parallelCircuit")
     { nodeDetail=node}
      else
     { nodeDetail = await getOutgoers(node, nodes, edges);
      nodeDetail = nodeDetail[0];}
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
            if(await circuitClosed === 1 ){
              let nodeDetail2 = await getOutgoers(nodeDetail, nodes, edges);
              let nodeDetail1 = nodeDetail2[0];
              nodeDetail2 = nodeDetail2[1]
              if (
                nodeDetail1.data.specificElType === "led" &&
                nodeDetail2.data.specificElType === "led"
              ) {
                const eleLed2 = document.getElementById(`led${nodeDetail2.id}`);
                const eleLed1 = document.getElementById(`led${nodeDetail1.id}`);
  
                eleLed1.classList.remove("led-light");
                eleLed2.classList.remove("led-light");
              } 
              else if (
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
      }
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
            onEdgeDoubleClick={onEdgeDoubleClick}
            onNodeClick={onNodeClick}
            zoomOnDoubleClick={false}
            onMouseDownCapture={onMouseDownCapture}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeDragStop={onNodeDragEnd}
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
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
