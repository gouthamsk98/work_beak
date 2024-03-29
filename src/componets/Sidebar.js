import React, { useState, memo, useEffect } from "react";
import ReactFlow, { State, Controls, Handle } from "react-flow-renderer";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
let seriesCircuitLedCount = 0,
  seriesCircuitBeeperCount = 0,
  junctionCount = 0;

let nodes,
  edges,
  flagI = -1;
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
    id: elem.dataset.id,
  };
}
let globalpass = [],
  node_cor = [];
const current_node_cord = (ele) => {
  try {
    let element = document.getElementById("dragLayer" + ele);

    let han = element.childNodes;
    console.log("han 2", han);
    let handle = [];
    for (let j = 0; j < han.length; j++) {
      console.log("han", han[j]);
      if (
        han[j].className.includes("react-flow__handle") &&
        !han[j].className.includes("react-flow__handle-top")
      ) {
        let handle_elem = han[j];
        var box = handle_elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft =
          window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        let temp = {
          id: handle_elem.dataset.handleid,
          x: Math.round(left),
          y: Math.round(top),
        };
        handle.push(temp);
      }
    }
    return handle;
  } catch (e) {}
};
function getCoords2(elem) {
  // crossbrowser version
  let handle = [];
  for (let i = 0; i < elem.childNodes.length; i++) {
    if (
      elem.childNodes[i].className.includes("react-flow__handle") &&
      !elem.childNodes[i].className.includes("react-flow__handle-top")
    ) {
      console.log("eve", elem.childNodes[i].dataset.handleid);
      let handle_elem = elem.childNodes[i];
      var box = handle_elem.getBoundingClientRect();

      var body = document.body;
      var docEl = document.documentElement;

      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      let temp = {
        id: handle_elem.dataset.handleid,
        x: Math.round(left),
        y: Math.round(top),
      };
      handle.push(temp);
    }
    //if(ele.childNodes[i].class)
  }
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
    id: elem.dataset.id,
    handle: handle,
  };
}
sessionStorage.setItem(
  "seriesCircuitLedCount",
  JSON.parse(sessionStorage.getItem("seriesCircuitLedCount")) || 0
);

sessionStorage.setItem("seriesCircuitBeeperCount", 0);
sessionStorage.setItem("junctionCount", 10);
export default (props) => {
  let zoom;
  const onDragStart = async (event, nodeType) => {
    let global = document.getElementsByClassName("react-flow__nodes")[0];

    zoom = JSON.parse(sessionStorage.getItem("planeOffset")) || 1;
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    nodes = JSON.parse(sessionStorage.getItem("beak-nodes"));
    edges = JSON.parse(sessionStorage.getItem("beak-edges"));
    flagI = -1;
    sessionStorage.setItem("application/beak/connect", flagI);
    try {
      console.log("plaaa", global);
      global = global.childNodes;
      for (let i = 0; i < global.length; i++) {
        let temp = await getCoords(global[i]);
        let temp_freedom = await getCoords2(global[i]);
        console.log("pla", temp);
        let index = await nodes.findIndex((e) => e.id === temp.id);
        globalpass[index] = temp;
        node_cor[index] = temp_freedom;
      }
      console.log(globalpass, node_cor, "getCoords");
    } catch (e) {}
    globalpass.map((e) => {
      nodes.map((ele) => {
        if (ele.id === e.id) {
          ele.position.x = e.x + 405 - 265;
          ele.position.y = e.y - 3;

          return;
        }
      });
    });
  };
  let title, left, top;
  const [id, setId] = useState("nan");

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "yellow",
      item: { id, left, top, title },
      canDrag: true,
      collect: (monitor) => ({
        isDragging: monitor,
      }),
    }),
    [id, left, top, title]
  );

  let send = {
    beeper: props.send.beeper,
    capacitor100: props.send.capacitor100,
    capacitor1000: props.send.capacitor1000,
    junction: props.send.junction,
    diode: props.send.diode,
    ldr: props.send.ldr,
    led: props.send.led,
    pot: props.send.pot,
    power: props.send.power,
    res_100: props.send.res_100,
    res_250: props.send.res_250,
    tact: props.send.tact,
    timer_ic: props.send.timer_ic,
    transistor: props.send.transistor,
    two_way_switch: props.send.two_way_switch,
  };
  const eles = document.querySelectorAll("[data-type]");
  const onMouseEnter = async (event) => {
    setId(await event.target.attributes[2].nodeValue);
    console.log(id, "gskMouse");
  };
  console.time("nodeDrag");
  const onDrag = async (event, nodeType) => {
    console.time("render");
    let ele;
    eles.forEach((e) => {
      if (e.id == nodeType) {
        ele = e;
        return;
      }
    });

    switch (props.send.type) {
      case "simpleCircuit":
        if (nodeType == "beeper" || "led" || "tact") {
          if (ele.id === nodeType) ele.style.display = "none";
        }
        break;
      case "seriesCircuit":
      case "parallelCircuit":
        if (nodeType == "tact") {
          if (ele.id === nodeType) ele.style.display = "none";
        }
        if (
          nodeType === "led" &&
          JSON.parse(sessionStorage.getItem("seriesCircuitLedCount")) == 1
        ) {
          if (ele.id === nodeType) ele.style.display = "none";
          //sessionStorage.setItem("seriesCircuitLedCount", 1);
          //seriesCircuitLedCount = 0;
        }
        if (
          nodeType === "beeper" &&
          JSON.parse(sessionStorage.getItem("seriesCircuitBeeperCount")) === 1
        ) {
          if (ele.id === nodeType) ele.style.display = "none";

          seriesCircuitBeeperCount = 0;
        }
        if (
          nodeType === "junction" &&
          JSON.parse(sessionStorage.getItem("junctionCount")) === 1
        ) {
          if (ele.id === nodeType) ele.style.display = "none";
          //junctionCount = 0;
        }
        break;
      case "resistorCircuit":
        if (
          nodeType === "junction" &&
          JSON.parse(sessionStorage.getItem("junctionCount")) === 1
        ) {
          if (ele.id === nodeType) ele.style.display = "none";
          //junctionCount = 0;
        }
        if (
          nodeType === "tact" ||
          nodeType === "led" ||
          nodeType === "res_100" ||
          nodeType == "res_250"
        )
          if (ele.id === nodeType) ele.style.display = "none";

        break;
      case "capacitorCircuit":
        if (
          nodeType === "junction" &&
          JSON.parse(sessionStorage.getItem("junctionCount"))
        ) {
          if (ele.id === nodeType) ele.style.display = "none";
          // junctionCount = 0;
        }
        if (
          nodeType == "tact" ||
          nodeType == "beeper" ||
          nodeType == "capacitor100" ||
          nodeType == "capacitor1000"
        ) {
          if (ele.id === nodeType) ele.style.display = "none";
        }

        break;
      case "voltageDividerCircuit":
        if (nodeType == "tact" || "pot" || "led" || "junction")
          if (ele.id === nodeType) ele.style.display = "none";

        break;
      case "semi-conductorDiodeCircuit":
        if (nodeType == "tact" || "diode" || "led")
          if (ele.id === nodeType) ele.style.display = "none";

        break;
      case "transistorCircuit":
        if (
          nodeType === "tact" ||
          "led" ||
          "res_100" ||
          "transistor" ||
          "ldr" ||
          "junction"
        )
          if (ele.id === nodeType) ele.style.display = "none";
    }
    switch (props.send.type) {
    }
    switch (props.send.type) {
      case "simpleCircuit":
      case "parallelCircuit":
      case "seriesCircuit":
      case "resistorCircuit":
      case "freedomCircuit":
        let cur_cord = await current_node_cord(nodeType);
        node_cor.map(async (e) => {
          //console.log("event XX",e.handle[3].x,event.path[1])
          ///console.log("eve###################",node_cor[0].handle, current_node_cord(event))
          console.log("cur_cord", cur_cord);
          e.handle.map((cord) => {
            cur_cord.map(async (current) => {
              console.log("event cord XX", cord.x, current.x);
              if (
                cord.x - current.x >= -10 &&
                cord.x - current.x <= 10 &&
                cord.y - current.y >= -10 &&
                cord.y - current.y <= 10
              ) {
                console.log(
                  "eve%%%%%%%%",
                  "source=",
                  cord.id,
                  e.id,
                  "target",
                  current.id
                );

                let params = {
                  source: e.id,
                  sourceHandle: cord.id,
                  target: null,
                  targetHandle: current.id,
                };
                if (
                  params.sourceHandle.includes("l") ||
                  (params.source.includes("dndnode_0") &&
                    (params.sourceHandle.includes("r2") ||
                      params.sourceHandle.includes("r3")))
                ) {
                  params = {
                    source: null,
                    sourceHandle: current.id,
                    target: e.id,
                    targetHandle: cord.id,
                  };
                }
                let exitFlag = 0;
                // switch (props.send.type) {
                //   case "simpleCircuit":
                //     nodes.map(async (ele) => {
                //       if (ele.id == e.id) {
                //         if (
                //           ele.data.specificElType === "power" &&
                //           nodeType === "tact"
                //         ) {
                //           exitFlag = 1;
                //         } else if (
                //           (ele.data.specificElType === "tact" &&
                //             (nodeType === "led" || nodeType === "beeper")) ||
                //           ((ele.data.specificElType === "led" ||
                //             ele.data.specificElType === "beeper") &&
                //             nodeType === "tact")
                //         ) {
                //           exitFlag = 1;
                //         } else if (
                //           ele.data.specificElType === "power" &&
                //           (nodeType === "led" || nodeType === "beeper") &&
                //           current.id == "r"
                //         ) {
                //           exitFlag = 1;
                //         } else exitFlag = 0;
                //       }
                //     });
                //     break;
                // }
                //if (exitFlag === 0) return;
                sessionStorage.setItem(
                  "application/beak/connect",
                  JSON.stringify(params)
                );
                flagI = cord;
                // await onConnect(params);
                return;
              }
            });
            //   console.log(cord.x-cur_cord.x,"ele")
          });
        });
        break;
      default:
        nodes.map(async (e) => {
          switch (props.send.type) {
            case "simpleCircuit":
              console.log(nodeType);
              switch (nodeType) {
                case "beeper":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 323 - 5 &&
                      event.clientX - e.position.x < 323 + 5 &&
                      event.clientY - e.position.y >= 148 - 5 &&
                      event.clientY - e.position.y < 148 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r4`,

                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "power") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 49 - 5 &&
                      event.clientX - e.position.x < 49 + 5 &&
                      event.clientY - e.position.y >= 186 - 5 &&
                      event.clientY - e.position.y < 186 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `l`,

                        targetHandle: "r2",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
                case "led":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 69 - 5 &&
                      event.clientX - e.position.x < 69 + 5 &&
                      event.clientY - e.position.y >= 199 - 5 &&
                      event.clientY - e.position.y < 199 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `l`,

                        targetHandle: "r2",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
                case "tact":
                  if (e.data.specificElType === "power") {
                    console.log(
                      "get",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y,
                      "event=",
                      event.clientX,
                      "pos",
                      e.position.x
                    );
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  } else if (e.data.specificElType === "led") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -90 - 5 &&
                      event.clientX - e.position.x < -90 + 5 &&
                      event.clientY - e.position.y >= 161 - 5 &&
                      event.clientY - e.position.y < 161 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  } else if (e.data.specificElType === "beeper") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -113 - 5 &&
                      event.clientX - e.position.x < -113 + 5 &&
                      event.clientY - e.position.y >= 131 - 5 &&
                      event.clientY - e.position.y < 131 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: true,
                        sourceHandle: `l`,

                        targetHandle: "r",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
              }
              break;
            case "seriesCircuit":
              switch (nodeType) {
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  } else if (e.data.specificElType === "led") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -90 - 5 &&
                      event.clientX - e.position.x < -90 + 5 &&
                      event.clientY - e.position.y >= 161 - 5 &&
                      event.clientY - e.position.y < 161 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  } else if (e.data.specificElType === "beeper") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -113 - 5 &&
                      event.clientX - e.position.x < -113 + 5 &&
                      event.clientY - e.position.y >= 131 - 5 &&
                      event.clientY - e.position.y < 131 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
                case "led":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 69 - 5 &&
                      event.clientX - e.position.x < 69 + 5 &&
                      event.clientY - e.position.y >= 199 - 5 &&
                      event.clientY - e.position.y < 199 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `l`,

                        targetHandle: "r2",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "led") {
                    console.log(
                      "posChKKKK",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 288 - 5 &&
                      event.clientX - e.position.x < 288 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    } else if (
                      event.clientX - e.position.x >= -72 - 5 &&
                      event.clientX - e.position.x < -72 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
                case "beeper":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 323 - 5 &&
                      event.clientX - e.position.x < 323 + 5 &&
                      event.clientY - e.position.y >= 148 - 5 &&
                      event.clientY - e.position.y < 148 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r4`,

                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  if (e.data.specificElType === "beeper") {
                    console.log(
                      "posChKKKK",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 325 - 5 &&
                      event.clientX - e.position.x < 325 + 5 &&
                      event.clientY - e.position.y >= 118 - 5 &&
                      event.clientY - e.position.y < 118 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: "true",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    } else if (
                      event.clientX - e.position.x >= -115 - 5 &&
                      event.clientX - e.position.x < -115 + 5 &&
                      event.clientY - e.position.y >= 119 - 5 &&
                      event.clientY - e.position.y < 119 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "power") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 49 - 5 &&
                      event.clientX - e.position.x < 49 + 5 &&
                      event.clientY - e.position.y >= 186 - 5 &&
                      event.clientY - e.position.y < 186 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: "r",

                        targetHandle: `r2`,
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
              }
              break;
            case "parallelCircuit":
              switch (nodeType) {
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  //junction droped tact dragged
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    if (nodes[index1].id != e.id) return;
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -43 - 5 &&
                      event.clientX - e.position.x < -43 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 90 - 5 &&
                      event.clientX - e.position.x < 90 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }

                  return;
                case "junction":
                  //tact dropes junction dragged
                  if (e.data.specificElType === "tact" && junctionCount === 0) {
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 249 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 122 - 5 &&
                      event.clientX - e.position.x < 122 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    e.data.specificElType === "led" &&
                    junctionCount === 0
                  ) {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    e.data.specificElType === "led" &&
                    junctionCount === 1
                  ) {
                    {
                      console.log(
                        "posChkJunction",
                        event.clientX - e.position.x,
                        event.clientY - e.position.y
                      );
                      if (
                        event.clientX - e.position.x >= 249 - 5 &&
                        event.clientX - e.position.x < 249 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 122 - 5 &&
                        event.clientX - e.position.x < 122 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  } else if (
                    e.data.specificElType === "power" &&
                    junctionCount == 1
                  ) {
                    console.log(
                      "posChkJunctionPower",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 226 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l1.tdndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 95 - 5 &&
                      event.clientX - e.position.x < 95 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "led":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );
                    console.log(
                      "posChkJunctionLED!!!",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (nodes[index1].id === e.id) {
                      if (
                        event.clientX - e.position.x >= 142 - 5 &&
                        event.clientX - e.position.x < 142 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }

                          console.log(
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1,
                            "index1Xhk"
                          );
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1
                          )
                            return;

                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 272 - 5 &&
                        event.clientX - e.position.x < 272 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r1.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    } else if (nodes[index2].id === e.id) {
                      if (
                        event.clientX - e.position.x >= -43 - 5 &&
                        event.clientX - e.position.x < -43 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 90 - 5 &&
                        event.clientX - e.position.x < 90 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  return;
                case "beeper":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );
                    console.log(
                      "posChkJunctionBeeper!!!",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (nodes[index1].id === e.id) {
                      if (
                        event.clientX - e.position.x >= 162 - 5 &&
                        event.clientX - e.position.x < 162 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 142 - 5 &&
                          event.clientY - e.position.y < 142 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }

                          console.log(
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1,
                            "index1Xhk"
                          );
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1
                          )
                            return;

                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 160 - 5 &&
                          event.clientY - e.position.y < 160 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 178 - 5 &&
                          event.clientY - e.position.y < 178 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 196 - 5 &&
                          event.clientY - e.position.y < 196 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 293 - 5 &&
                        event.clientX - e.position.x < 293 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 142 - 5 &&
                          event.clientY - e.position.y < 142 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r1.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 160 - 5 &&
                          event.clientY - e.position.y < 160 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 178 - 5 &&
                          event.clientY - e.position.y < 178 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 196 - 5 &&
                          event.clientY - e.position.y < 196 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    } else if (nodes[index2].id === e.id) {
                      if (
                        event.clientX - e.position.x >= -43 - 5 &&
                        event.clientX - e.position.x < -43 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 90 - 5 &&
                        event.clientX - e.position.x < 90 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  return;
              }
              break;
            case "voltageDividerCircuit":
              switch (nodeType) {
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "pot") {
                    console.log(
                      "posChktactPot",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 125 - 5 &&
                      event.clientX - e.position.x < 125 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "r1",
                        flag: "pot",
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }

                  return;
                case "junction":
                  //tact dropes junction dragged
                  if (e.data.specificElType === "led") {
                    {
                      console.log(
                        "posChkJunction",
                        event.clientX - e.position.x,
                        event.clientY - e.position.y
                      );
                      if (
                        event.clientX - e.position.x >= 249 - 5 &&
                        event.clientX - e.position.x < 249 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l1.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }

                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l2.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l3.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l4.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 122 - 5 &&
                        event.clientX - e.position.x < 122 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r1.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r2.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r3.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r4.t`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 226 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l1.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 95 - 5 &&
                      event.clientX - e.position.x < 95 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "pot") {
                    console.log(
                      "posChkJunctionPot",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 279 - 5 &&
                      event.clientX - e.position.x < 279 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 212 - 5 &&
                        event.clientY - e.position.y < 212 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l1.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 175 - 5 &&
                        event.clientY - e.position.y < 175 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 156 - 5 &&
                        event.clientY - e.position.y < 156 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 144 - 5 &&
                      event.clientX - e.position.x < 144 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 212 - 5 &&
                        event.clientY - e.position.y < 212 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 175 - 5 &&
                        event.clientY - e.position.y < 175 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 156 - 5 &&
                        event.clientY - e.position.y < 156 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "pot":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 87 - 5 &&
                      event.clientX - e.position.x < 87 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      console.log("posChkPOTenter@@@@@@@@@@@@@@@@@@@@@@@@");
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "r1",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "led") {
                    if (
                      event.clientX - e.position.x >= 115 - 5 &&
                      event.clientX - e.position.x < 115 + 5 &&
                      event.clientY - e.position.y >= 138 - 5 &&
                      event.clientY - e.position.y < 138 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `l`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "junction") {
                    console.log(
                      "posChkPOTJUnction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -63 - 5 &&
                      event.clientX - e.position.x < -63 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 103 - 5 &&
                        event.clientY - e.position.y < 103 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l1.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 122 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l2.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 139 - 5 &&
                        event.clientY - e.position.y < 139 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l3.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 155 - 5 &&
                        event.clientY - e.position.y < 155 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l4.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 635 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 103 - 5 &&
                        event.clientY - e.position.y < 103 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `r1.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 122 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `r2.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 139 - 5 &&
                        event.clientY - e.position.y < 139 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `r3.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 155 - 5 &&
                        event.clientY - e.position.y < 155 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `r4.t`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "led":
                  if (e.data.specificElType === "pot") {
                    console.log(
                      "posChktPOTLEDDDD",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 93 - 5 &&
                      event.clientX - e.position.x < 93 + 5 &&
                      event.clientY - e.position.y >= 180 - 5 &&
                      event.clientY - e.position.y < 180 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `l`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: false,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "junction") {
                    console.log(
                      "posChktPOTLEDDDD",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -46 - 5 &&
                      event.clientX - e.position.x < -46 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        console.log(
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l1"
                          ) !== -1,
                          "index1Xhk"
                        );
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l1"
                          ) !== -1
                        )
                          return;

                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l2"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l3"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l4"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r1"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r2"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r3"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r4.t`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.target === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r4"
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
              }
              break;
            case "semi-conductorDiodeCircuit":
              switch (nodeType) {
                case "diode":
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 290 - 5 &&
                      event.clientX - e.position.x < 290 + 5 &&
                      event.clientY - e.position.y >= 146 - 5 &&
                      event.clientY - e.position.y < 146 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l1",
                        flag: true,
                      };
                      if (
                        edges.findIndex((ele) => ele.sourceHandle === "r2") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    } else if (
                      event.clientX - e.position.x >= 103 - 5 &&
                      event.clientX - e.position.x < 103 + 5 &&
                      event.clientY - e.position.y >= 146 - 5 &&
                      event.clientY - e.position.y < 146 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "r2",
                        flag: true,
                      };
                      if (
                        edges.findIndex((ele) => ele.sourceHandle === "r1") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  if (e.data.specificElType === "led") {
                    console.log(
                      "Tactdiode#####",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -84 - 5 &&
                      event.clientX - e.position.x < -84 + 5 &&
                      event.clientY - e.position.y >= 146 - 5 &&
                      event.clientY - e.position.y < 146 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r1`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: "pot",
                      };
                      if (
                        edges.findIndex((ele) => ele.targetHandle === "r2") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    } else if (
                      event.clientX - e.position.x >= 103 - 5 &&
                      event.clientX - e.position.x < 103 + 5 &&
                      event.clientY - e.position.y >= 146 - 5 &&
                      event.clientY - e.position.y < 146 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `l2`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: "pot",
                      };
                      if (
                        edges.findIndex((ele) => ele.targetHandle === "l1") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  return;
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "diode") {
                    if (
                      event.clientX - e.position.x >= -85 - 5 &&
                      event.clientX - e.position.x < -85 + 5 &&
                      event.clientY - e.position.y >= 167 - 5 &&
                      event.clientY - e.position.y < 167 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l1",
                        flag: "pot",
                      };
                      if (
                        edges.findIndex((ele) => ele.sourceHandle === "l2") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    } else if (
                      event.clientX - e.position.x >= 108 - 5 &&
                      event.clientX - e.position.x < 108 + 5 &&
                      event.clientY - e.position.y >= 167 - 5 &&
                      event.clientY - e.position.y < 167 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "r2",
                        flag: "pot",
                      };
                      if (
                        edges.findIndex((ele) => ele.sourceHandle === "r1") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "led":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 72 - 5 &&
                      event.clientX - e.position.x < 72 + 5 &&
                      event.clientY - e.position.y >= 201 - 5 &&
                      event.clientY - e.position.y < 201 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "r2",
                        flag: "pot",
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "diode") {
                    if (
                      event.clientX - e.position.x >= 296 - 5 &&
                      event.clientX - e.position.x < 296 + 5 &&
                      event.clientY - e.position.y >= 167 - 5 &&
                      event.clientY - e.position.y < 167 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r1`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      if (
                        edges.findIndex((ele) => ele.targetHandle === "r2") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    } else if (
                      event.clientX - e.position.x >= 108 - 5 &&
                      event.clientX - e.position.x < 108 + 5 &&
                      event.clientY - e.position.y >= 167 - 5 &&
                      event.clientY - e.position.y < 167 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `l2`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      if (
                        edges.findIndex((ele) => ele.targetHandle === "l1") !=
                        -1
                      )
                        return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
              }
              break;
            case "transistorCircuit":
              switch (nodeType) {
                case "junction":
                  if (e.data.specificElType === "power") {
                    console.log(
                      "posChkJunction%%%",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 223 - 5 &&
                      event.clientX - e.position.x < 223 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 94 - 5 &&
                      event.clientX - e.position.x < 94 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r4.t`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "res_100") {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "led") {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "ldr") {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: "pot",
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "led":
                  if (e.data.specificElType === "junction") {
                    if (
                      event.clientX - e.position.x >= 142 - 5 &&
                      event.clientX - e.position.x < 142 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l1.t"
                          ) !== -1
                        )
                          return;

                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r1.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "transistor") {
                    if (
                      event.clientX - e.position.x >= 103 - 5 &&
                      event.clientX - e.position.x < 103 + 5 &&
                      event.clientY - e.position.y >= 168 - 5 &&
                      event.clientY - e.position.y < 168 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "r.t",
                        flag: "pot",
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "tact":
                  if (e.data.specificElType === "transistor") {
                    if (
                      event.clientX - e.position.x >= -86 - 5 &&
                      event.clientX - e.position.x < -86 + 5 &&
                      event.clientY - e.position.y >= 184 - 5 &&
                      event.clientY - e.position.y < 184 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: "pot",
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "res_100") {
                    console.log(
                      "posChkJunctionLED!!!",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  return;
                case "ldr":
                  if (e.data.specificElType === "transistor") {
                    if (
                      event.clientX - e.position.x >= -86 - 5 &&
                      event.clientX - e.position.x < -86 + 5 &&
                      event.clientY - e.position.y >= 184 - 5 &&
                      event.clientY - e.position.y < 184 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: "pot",
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "junction") {
                    if (
                      event.clientX - e.position.x >= 142 - 5 &&
                      event.clientX - e.position.x < 142 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l1.t"
                          ) !== -1
                        )
                          return;

                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r1.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "res_100":
                  if (e.data.specificElType === "junction") {
                    if (
                      event.clientX - e.position.x >= 142 - 5 &&
                      event.clientX - e.position.x < 142 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l1.t"
                          ) !== -1
                        )
                          return;

                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r1.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r2.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r3.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r4.t"
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "tact") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -90 - 5 &&
                      event.clientX - e.position.x < -90 + 5 &&
                      event.clientY - e.position.y >= 161 - 5 &&
                      event.clientY - e.position.y < 161 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: true,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "transistor":
                  if (e.data.specificElType === "led") {
                    console.log(
                      event.clientX - e.position.x,
                      event.clientY - e.position.y,
                      "LED"
                    );
                    if (
                      event.clientX - e.position.x >= 104 - 5 &&
                      event.clientX - e.position.x < 104 + 5 &&
                      event.clientY - e.position.y >= 145 - 5 &&
                      event.clientY - e.position.y < 145 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "r.t",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (
                    e.data.specificElType === "tact" ||
                    e.data.specificElType === "ldr"
                  ) {
                    console.log(
                      event.clientX - e.position.x,
                      event.clientY - e.position.y,
                      "TACT"
                    );
                    if (
                      event.clientX - e.position.x >= 295 - 5 &&
                      event.clientX - e.position.x < 295 + 5 &&
                      event.clientY - e.position.y >= 130 - 5 &&
                      event.clientY - e.position.y < 130 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "power") {
                    console.log(
                      event.clientX - e.position.x,
                      event.clientY - e.position.y,
                      "power"
                    );
                    if (
                      event.clientX - e.position.x >= 73 - 5 &&
                      event.clientX - e.position.x < 73 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: true,
                        sourceHandle: `r`,

                        targetHandle: "r2",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
              }
              break;
            case "capacitorCircuit":
              switch (nodeType) {
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    if (nodes[index1].id != e.id) return;
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -43 - 5 &&
                      event.clientX - e.position.x < -43 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 90 - 5 &&
                      event.clientX - e.position.x < 90 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r1.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r2.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r3.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r4.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (e.data.specificElType === "beeper") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -113 - 5 &&
                      event.clientX - e.position.x < -113 + 5 &&
                      event.clientY - e.position.y >= 131 - 5 &&
                      event.clientY - e.position.y < 131 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "capacitor100":
                case "capacitor1000":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );
                    console.log(
                      "posChkJunctionLED!!!",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (nodes[index1].id === e.id) {
                      if (
                        event.clientX - e.position.x >= 142 - 5 &&
                        event.clientX - e.position.x < 142 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }

                          console.log(
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1,
                            "index1Xhk"
                          );
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1
                          )
                            return;

                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 272 - 5 &&
                        event.clientX - e.position.x < 272 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r1.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    } else if (nodes[index2].id === e.id) {
                      if (
                        event.clientX - e.position.x >= -43 - 5 &&
                        event.clientX - e.position.x < -43 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 90 - 5 &&
                        event.clientX - e.position.x < 90 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }

                  if (
                    e.data.specificElType === "capacitor100" ||
                    e.data.specificElType === "capacitor1000"
                  ) {
                    console.log(
                      "posChKKKK",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 288 - 5 &&
                      event.clientX - e.position.x < 288 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    } else if (
                      event.clientX - e.position.x >= -72 - 5 &&
                      event.clientX - e.position.x < -72 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: true,
                        sourceHandle: `l`,

                        targetHandle: "r",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "beeper":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );

                    if (nodes[index1].id === e.id) {
                      if (
                        event.clientX - e.position.x >= 162 - 5 &&
                        event.clientX - e.position.x < 162 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 142 - 5 &&
                          event.clientY - e.position.y < 142 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }

                          console.log(
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1,
                            "index1Xhk"
                          );
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1
                          )
                            return;

                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 160 - 5 &&
                          event.clientY - e.position.y < 160 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 178 - 5 &&
                          event.clientY - e.position.y < 178 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 196 - 5 &&
                          event.clientY - e.position.y < 196 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 293 - 5 &&
                        event.clientX - e.position.x < 293 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 142 - 5 &&
                          event.clientY - e.position.y < 142 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r1.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 160 - 5 &&
                          event.clientY - e.position.y < 160 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 178 - 5 &&
                          event.clientY - e.position.y < 178 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 196 - 5 &&
                          event.clientY - e.position.y < 196 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    } else if (nodes[index2].id === e.id) {
                      if (
                        event.clientX - e.position.x >= -43 - 5 &&
                        event.clientX - e.position.x < -43 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 90 - 5 &&
                        event.clientX - e.position.x < 90 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 323 - 5 &&
                      event.clientX - e.position.x < 323 + 5 &&
                      event.clientY - e.position.y >= 148 - 5 &&
                      event.clientY - e.position.y < 148 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r4`,

                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  if (e.data.specificElType === "power") {
                    console.log(
                      "posChk",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 49 - 5 &&
                      event.clientX - e.position.x < 49 + 5 &&
                      event.clientY - e.position.y >= 186 - 5 &&
                      event.clientY - e.position.y < 186 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: "r",

                        targetHandle: `r2`,
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "junction":
                  if (e.data.specificElType === "tact" && junctionCount === 0) {
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 249 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 122 - 5 &&
                      event.clientX - e.position.x < 122 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    e.data.specificElType === "capacitor100" &&
                    junctionCount === 0
                  ) {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    e.data.specificElType === "capacitor1000" &&
                    junctionCount === 1
                  ) {
                    {
                      console.log(
                        "posChkJunction",
                        event.clientX - e.position.x,
                        event.clientY - e.position.y
                      );
                      if (
                        event.clientX - e.position.x >= 249 - 5 &&
                        event.clientX - e.position.x < 249 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 122 - 5 &&
                        event.clientX - e.position.x < 122 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  } else if (
                    e.data.specificElType === "power" &&
                    junctionCount == 1
                  ) {
                    console.log(
                      "posChkJunctionPower",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 226 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l1.tdndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 95 - 5 &&
                      event.clientX - e.position.x < 95 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    e.data.specificElType === "power" &&
                    junctionCount == 0
                  ) {
                    console.log(
                      "posChkJunctionPower@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 226 - 5 &&
                      event.clientX - e.position.x < 226 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 156 - 5 &&
                        event.clientY - e.position.y < 156 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l1dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l2dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l3dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l4dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 95 - 5 &&
                      event.clientX - e.position.x < 95 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 203 - 5 &&
                        event.clientY - e.position.y < 203 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `r1dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 186 - 5 &&
                        event.clientY - e.position.y < 186 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `r2dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 167 - 5 &&
                        event.clientY - e.position.y < 167 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `r3dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 150 - 5 &&
                        event.clientY - e.position.y < 150 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: "r4",
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) =>
                              ele.targetHandle ===
                              `l4dndnode_${Object.keys(nodes).length}`
                          ) !== -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
              }
              break;
            case "resistorCircuit":
              switch (nodeType) {
                case "junction":
                  //tact dropes junction dragged
                  if (e.data.specificElType === "tact" && junctionCount === 0) {
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 249 - 5 &&
                      event.clientX - e.position.x < 249 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 122 - 5 &&
                      event.clientX - e.position.x < 122 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r1.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r2.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r3.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `r4.tdndnode_${
                            Object.keys(nodes).length
                          }`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    (e.data.specificElType === "res_100" ||
                      e.data.specificElType === "res_250") &&
                    junctionCount === 0
                  ) {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  } else if (
                    (e.data.specificElType === "res_100" ||
                      e.data.specificElType === "res_250") &&
                    junctionCount === 1
                  ) {
                    {
                      console.log(
                        "posChkJunction",
                        event.clientX - e.position.x,
                        event.clientY - e.position.y
                      );
                      if (
                        event.clientX - e.position.x >= 249 - 5 &&
                        event.clientX - e.position.x < 249 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 122 - 5 &&
                        event.clientX - e.position.x < 122 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r1.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 141 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r2.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 122 - 5 &&
                          event.clientY - e.position.y < 141 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r3.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 105 - 5 &&
                          event.clientY - e.position.y < 105 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `r4.tdndnode_${
                              Object.keys(nodes).length
                            }`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) => ele.target === send.index
                            );
                          }
                          if (index1 != -1) return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  if (e.data.specificElType === "led" && junctionCount === 1) {
                    console.log(
                      "posChkJunctionLed",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 65 - 5 &&
                      event.clientX - e.position.x < 65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= -65 - 5 &&
                      event.clientX - e.position.x < -65 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 141 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 122 - 5 &&
                        event.clientY - e.position.y < 141 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 105 - 5 &&
                        event.clientY - e.position.y < 105 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4dndnode_${
                            Object.keys(nodes).length
                          }`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) => ele.target === send.index
                          );
                        }
                        if (index1 != -1) return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  return;
                case "tact":
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 266 - 5 &&
                      event.clientX - e.position.x < 266 + 5 &&
                      event.clientY - e.position.y >= 154 - 5 &&
                      event.clientY - e.position.y < 154 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r4`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  //junction droped tact dragged
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    if (nodes[index1].id != e.id) return;
                    console.log(
                      "posChkJunction",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= -43 - 5 &&
                      event.clientX - e.position.x < -43 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `l4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "l4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 90 - 5 &&
                      event.clientX - e.position.x < 90 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r1.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r1" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r2.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r2" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r3.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r3" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r`,
                          source: `${e.id}`,
                          revert: true,
                          targetHandle: `r4.t${e.id}`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.targetHandle === send.targetHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.sourceHandle === "r4" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (
                    e.data.specificElType === "res_100" ||
                    e.data.specificElType === "res_250"
                  ) {
                    console.log(
                      "posChKKKK",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 288 - 5 &&
                      event.clientX - e.position.x < 288 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    } else if (
                      event.clientX - e.position.x >= -72 - 5 &&
                      event.clientX - e.position.x < -72 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "res_250":
                case "res_100":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );
                    console.log(
                      "posChkJunctionLED!!!",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (nodes[index1].id === e.id) {
                      if (
                        event.clientX - e.position.x >= 142 - 5 &&
                        event.clientX - e.position.x < 142 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }

                          console.log(
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1,
                            "index1Xhk"
                          );
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l1.t" + e.id
                            ) !== -1
                          )
                            return;

                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `l4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "l4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 272 - 5 &&
                        event.clientX - e.position.x < 272 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r1${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r1.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r2${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r2.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r3${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r3.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r4${e.id}`,
                            source: `${e.id}`,
                            revert: false,
                            targetHandle: `l`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index ||
                              ele.sourceHandle === send.sourceHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.sourceHandle === send.sourceHandle
                            );
                          }
                          if (
                            index1 != -1 &&
                            edges.findIndex(
                              (ele) => ele.targetHandle === "r4.t" + e.id
                            ) != -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    } else if (nodes[index2].id === e.id) {
                      if (
                        event.clientX - e.position.x >= -43 - 5 &&
                        event.clientX - e.position.x < -43 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `l4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `l4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      } else if (
                        event.clientX - e.position.x >= 90 - 5 &&
                        event.clientX - e.position.x < 90 + 5
                      ) {
                        if (
                          event.clientY - e.position.y >= 158 - 5 &&
                          event.clientY - e.position.y < 158 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r1.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r1${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 174 - 5 &&
                          event.clientY - e.position.y < 174 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r2.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r2${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 193 - 5 &&
                          event.clientY - e.position.y < 193 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r3.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r3${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        } else if (
                          event.clientY - e.position.y >= 208 - 5 &&
                          event.clientY - e.position.y < 208 + 5
                        ) {
                          let send = {
                            index: `${e.id}`,
                            sourceHandle: `r`,
                            source: `${e.id}`,
                            revert: true,
                            targetHandle: `r4.t${e.id}`,
                            flag: true,
                          };
                          let index1 = edges.findIndex(
                            (ele) =>
                              ele.source === send.index &&
                              ele.targetHandle === send.targetHandle
                          );
                          if (send.revert) {
                            index1 = edges.findIndex(
                              (ele) =>
                                ele.target === send.index &&
                                ele.targetHandle === send.targetHandle
                            );
                          }
                          if (
                            index1 != -1 ||
                            edges.findIndex(
                              (ele) => ele.sourceHandle === `r4${e.id}`
                            ) !== -1
                          )
                            return;
                          sessionStorage.setItem(
                            "application/beak/connect",
                            JSON.stringify(send)
                          );
                          flagI = await nodes.findIndex(
                            (ele) => ele.id === send.index
                          );
                        }
                      }
                    }
                  }
                  if (e.data.specificElType === "tact") {
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  if (
                    e.data.specificElType === "res_100" ||
                    e.data.specificElType === "res_250" ||
                    e.data.specificElType === "led"
                  ) {
                    console.log(
                      "posChKKKK",
                      event.clientX - e.position.x,
                      event.clientY - e.position.y
                    );
                    if (
                      event.clientX - e.position.x >= 288 - 5 &&
                      event.clientX - e.position.x < 288 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    } else if (
                      event.clientX - e.position.x >= -72 - 5 &&
                      event.clientX - e.position.x < -72 + 5 &&
                      event.clientY - e.position.y >= 156 - 5 &&
                      event.clientY - e.position.y < 156 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `r`,

                        targetHandle: "l",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
                case "led":
                  if (e.data.specificElType === "junction") {
                    let index1 = nodes.findIndex(
                      (ele) => ele.data.specificElType === "junction"
                    );
                    let index2 = nodes.findIndex(
                      (ele) =>
                        ele.data.specificElType === "junction" &&
                        nodes[index1].id != ele.id
                    );
                    if (index2 == -1) return;
                    if (nodes[index2].id !== e.id) return;
                    if (
                      event.clientX - e.position.x >= 142 - 5 &&
                      event.clientX - e.position.x < 142 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l1${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }

                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === `l1.t${e.id}`
                          ) !== -1
                        )
                          return;

                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l2${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l2.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l3${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l3.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `l4${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "l4.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    } else if (
                      event.clientX - e.position.x >= 272 - 5 &&
                      event.clientX - e.position.x < 272 + 5
                    ) {
                      if (
                        event.clientY - e.position.y >= 158 - 5 &&
                        event.clientY - e.position.y < 158 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r1${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index &&
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 ||
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r1.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 174 - 5 &&
                        event.clientY - e.position.y < 174 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r2${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r2.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 193 - 5 &&
                        event.clientY - e.position.y < 193 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r3${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r3.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      } else if (
                        event.clientY - e.position.y >= 208 - 5 &&
                        event.clientY - e.position.y < 208 + 5
                      ) {
                        let send = {
                          index: `${e.id}`,
                          sourceHandle: `r4${e.id}`,
                          source: `${e.id}`,
                          revert: false,
                          targetHandle: `l`,
                          flag: true,
                        };
                        let index1 = edges.findIndex(
                          (ele) =>
                            ele.source === send.index ||
                            ele.sourceHandle === send.sourceHandle
                        );
                        if (send.revert) {
                          index1 = edges.findIndex(
                            (ele) =>
                              ele.target === send.index &&
                              ele.sourceHandle === send.sourceHandle
                          );
                        }
                        if (
                          index1 != -1 &&
                          edges.findIndex(
                            (ele) => ele.targetHandle === "r4.t" + e.id
                          ) != -1
                        )
                          return;
                        sessionStorage.setItem(
                          "application/beak/connect",
                          JSON.stringify(send)
                        );
                        flagI = await nodes.findIndex(
                          (ele) => ele.id === send.index
                        );
                      }
                    }
                  }
                  if (
                    e.data.specificElType === "res_250" ||
                    e.data.specificElType === "res_100"
                  ) {
                    if (
                      event.clientX - e.position.x >= 302 - 5 &&
                      event.clientX - e.position.x < 302 + 5 &&
                      event.clientY - e.position.y >= 160 - 5 &&
                      event.clientY - e.position.y < 160 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        sourceHandle: `r`,
                        source: `${e.id}`,
                        revert: false,
                        targetHandle: "l",
                        flag: true,
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.source === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );
                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                    }
                  }
                  if (e.data.specificElType === "power") {
                    if (
                      event.clientX - e.position.x >= 69 - 5 &&
                      event.clientX - e.position.x < 69 + 5 &&
                      event.clientY - e.position.y >= 199 - 5 &&
                      event.clientY - e.position.y < 199 + 5
                    ) {
                      let send = {
                        index: `${e.id}`,
                        source: `${e.id}`,
                        revert: false,
                        sourceHandle: `l`,

                        targetHandle: "r2",
                        flag: "pot",
                      };
                      let index1 = edges.findIndex(
                        (ele) => ele.target === send.index
                      );
                      if (send.revert) {
                        index1 = edges.findIndex(
                          (ele) => ele.target === send.index
                        );
                      }
                      if (index1 != -1) return;
                      sessionStorage.setItem(
                        "application/beak/connect",
                        JSON.stringify(send)
                      );

                      flagI = await nodes.findIndex(
                        (ele) => ele.id === send.index
                      );
                      console.log("pla", flagI);
                    }
                  }
                  return;
              }
              break;
            case "freedomCircuit":
              break;
          }
        });
    }

    let screenOffsetX = 0,
      screenOffsetY = 0;
    if (window.screen.width != 1920 && window.screen.height != 1080) {
      screenOffsetX = 0;
      screenOffsetY = -27;
    } else {
      screenOffsetX = 0;
      screenOffsetY = 0;
    }
    let xOffset = 0,
      yOffset = 0;

    try {
      console.log("planeOffset", flagI, globalpass, flagI);
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");

      if (flagI != -1) {
        if (
          props.send.type != "simpleCircuit" &&
          props.send.type != "parallelCircuit" &&
          props.send.type != "seriesCircuit" &&
          props.send.type != "seriesCresistorCircuitircuit" &&
          props.send.type != "freedomCircuit"
        ) {
          flagI = flagI[0];
        }
        let mx = 0,
          my = 0;
        // flagI.x = flagI.x - 350;
        // flagI.y = flagI.y - 90;
        ctx.beginPath();
        ctx.moveTo(flagI.x + 50, flagI.y + 10);

        if (event.clientX == 0 || event.clientY == 0) return;
        let cx = Math.abs(event.clientX - (flagI.x + xOffset)) / 2;
        let cy =
          Math.abs(event.clientY - screenOffsetY - (flagI.y + yOffset)) / 2;
        if (event.clientX - 144 < flagI.x + 60) cx = cx + event.clientX;
        else cx = cx + flagI.x + xOffset;
        if (event.clientY - 105 < flagI.y) cy = cy + event.clientY;
        else cy = cy + flagI.y + yOffset;
        ctx.quadraticCurveTo(
          cx,
          cy,
          event.clientX + 60,
          event.clientY + 25 + 13 - screenOffsetY
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = " #09B8A7";
        ctx.clearRect(0, 0, 1775, 884);
        ctx.stroke();
      }
    } catch (e) {
      ctx.clearRect(0, 0, 1775, 884);
      console.log(e);
    }
    console.timeEnd("render");
  };
  console.timeEnd("nodeDrag");
  const onDragEnd = (event, nodeType) => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    console.log("tact", nodeType, ctx);

    ctx.clearRect(0, 0, 1500, 800);

    let beeper = JSON.parse(sessionStorage.getItem("seriesCircuitBeeperCount"));
    let junction = JSON.parse(sessionStorage.getItem("junctionCount"));

    if (nodeType === "led") {
      seriesCircuitLedCount = 1;
      sessionStorage.setItem(
        "seriesCircuitLedCount",
        JSON.parse(sessionStorage.getItem("seriesCircuitLedCount")) + 1
      );
    }
    if (nodeType === "beeper") {
      seriesCircuitBeeperCount = 1;
      sessionStorage.setItem(
        "seriesCircuitBeeperCount",
        JSON.parse(sessionStorage.getItem("seriesCircuitBeeperCount")) + 1
      );
    }
    if (nodeType === "junction") {
      junctionCount = 1;
      sessionStorage.setItem(
        "junctionCount",
        JSON.parse(sessionStorage.getItem("junctionCount")) + 1
      );
    }
    let send = { index: -1, sourceHandle: undefined, flag: false };
    sessionStorage.setItem(
      "application/reactflow/connect",
      JSON.stringify(send)
    );
    flagI = -1;
  };
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <aside>
      <div className="side" ref={drag}>
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>

        <div
          className={"dndnode_beeper" + send.beeper}
          value="beeper"
          data-type="beeper"
          draggable
          id="beeper"
          style={{}}
          onDragStart={(event) => onDragStart(event, "beeper")}
          onDrag={(event) => onDrag(event, "beeper")}
          onDragEnd={(event) => onDragEnd(event, "beeper")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          className={"dndnode_capacitor100" + send.capacitor100}
          draggable
          data-type="capacitor100"
          id="capacitor100"
          style={{}}
          onDragStart={(event) => onDragStart(event, "capacitor100")}
          onDragEnd={(event) => onDragEnd(event, "capacitor100")}
          onDrag={(event) => onDrag(event, "capacitor100")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "capacitor1000")}
          className={"dndnode_capacitor1000" + send.capacitor1000}
          draggable
          data-type="capacitor1000"
          id="capacitor1000"
          onDragStart={(event) => onDragStart(event, "capacitor1000")}
          onDragEnd={(event) => onDragEnd(event, "capacitor1000")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "junction")}
          className={"dndnode_junction" + send.junction}
          draggable
          data-type="junction"
          id="junction"
          onDragStart={(event) => onDragStart(event, "junction")}
          onDragEnd={(event) => onDragEnd(event, "junction")}
          onMouseEnter={onMouseEnter}
        ></div>

        <div
          style={{}}
          onDrag={(event) => onDrag(event, "diode")}
          className={"dndnode_diode" + send.diode}
          draggable
          data-type="diode"
          id="diode"
          onDragStart={(event) => onDragStart(event, "diode")}
          onDragEnd={(event) => onDragEnd(event, "diode")}
          onMouseEnter={onMouseEnter}
        ></div>

        <div
          style={{}}
          onDrag={(event) => onDrag(event, "ldr")}
          className={"dndnode_ldr" + send.ldr}
          draggable
          data-type="ldr"
          id="ldr"
          onDragStart={(event) => onDragStart(event, "ldr")}
          onDragEnd={(event) => onDragEnd(event, "ldr")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "led")}
          onDragEnd={(event) => onDragEnd(event, "led")}
          className={"dndnode_led" + send.led}
          draggable
          data-type="led"
          id="led"
          onDragStart={(event) => onDragStart(event, "led")}
          onMouseEnter={onMouseEnter}
        ></div>

        <div
          style={{}}
          onDrag={(event) => onDrag(event, "power")}
          className={"dndnode_power" + send.power}
          draggable
          data-type="power"
          id="power"
          onDragStart={(event) => onDragStart(event, "power")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "res_100")}
          className={"dndnode_res_100" + send.res_100}
          draggable
          data-type="res_100"
          id="res_100"
          onDragStart={(event) => onDragStart(event, "res_100")}
          onDragEnd={(event) => onDragEnd(event, "res_100")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "res_250")}
          className={"dndnode_res_250" + send.res_250}
          draggable
          data-type="res_250"
          id="res_250"
          onDragStart={(event) => onDragStart(event, "res_250")}
          onDragEnd={(event) => onDragEnd(event, "res_250")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "tact")}
          className={"dndnode_tact" + send.tact}
          draggable
          data-type="tact"
          id="tact"
          onDragStart={(event) => onDragStart(event, "tact")}
          onMouseEnter={onMouseEnter}
          onDragEnd={(event) => onDragEnd(event, "tact")}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "timer_ic")}
          className={"dndnode_timer_ic" + send.timer_ic}
          draggable
          data-type="timer_ic"
          id="timer_ic"
          onDragStart={(event) => onDragStart(event, "timer")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "transistor")}
          className={"dndnode_transistor" + send.transistor}
          draggable
          data-type="transistor"
          id="transistor"
          onDragStart={(event) => onDragStart(event, "transistor")}
          onDragEnd={(event) => onDragEnd(event, "transistor")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "two_way_switch")}
          className={"dndnode_two_way_switch" + send.two_way_switch}
          draggable
          data-type="two_way_switch"
          id="two_way_switch"
          onDragStart={(event) => onDragStart(event, "two_way_switch")}
          onMouseEnter={onMouseEnter}
        ></div>
        <div
          style={{}}
          onDrag={(event) => onDrag(event, "pot")}
          className={"dndnode_pot" + send.pot}
          draggable
          data-type="pot"
          id="pot"
          onDragStart={(event) => onDragStart(event, "pot")}
          onDragEnd={(event) => onDragEnd(event, "pot")}
          onMouseEnter={onMouseEnter}
        ></div>
      </div>
    </aside>
  );
};
