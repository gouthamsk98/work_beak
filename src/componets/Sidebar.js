import React, { useState, memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
let seriesCircuitLedCount = 0,
  seriesCircuitBeeperCount = 0,
  junctionCount = 0;
export default (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
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
  const onDrag = (event, nodeType) => {
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
        if (nodeType === "led" && seriesCircuitLedCount === 1) {
          if (ele.id === nodeType) ele.style.display = "none";
          seriesCircuitLedCount = 0;
        }
        if (nodeType === "beeper" && seriesCircuitBeeperCount === 1) {
          if (ele.id === nodeType) ele.style.display = "none";
          seriesCircuitBeeperCount = 0;
        }
        if (nodeType === "junction" && junctionCount === 1) {
          if (ele.id === nodeType) ele.style.display = "none";
          junctionCount = 0;
        }
        break;
      case "resistorCircuit":
        if (nodeType == "tact" || "led" || "res_100" || "res_250")
          if (ele.id === nodeType) ele.style.display = "none";

        break;
      case "capacitorCircuit":
        if (nodeType === "junction" && junctionCount === 1) {
          if (ele.id === nodeType) ele.style.display = "none";
          junctionCount = 0;
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
  };
  const onDragEnd = (event, nodeType) => {
    if (nodeType === "led") seriesCircuitLedCount = 1;
    if (nodeType === "beeper") seriesCircuitBeeperCount = 1;
    if (nodeType === "junction") junctionCount = 1;
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
          onMouseEnter={onMouseEnter}
        ></div>
      </div>
    </aside>
  );
};
