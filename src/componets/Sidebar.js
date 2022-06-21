import React from "react";

export default (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

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

  return (
    <aside>
      <div className="side">
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>

        <div
          className={"dndnode_beeper" + send.beeper}
          value="beeper"
          draggable
          id="beeper"
          onDragStart={(event) => onDragStart(event, "beeper")}
        ></div>
        <div
          className={"dndnode_capacitor100" + send.capacitor100}
          draggable
          id="capacitor100"
          onDragStart={(event) => onDragStart(event, "capacitor100")}
        ></div>
        <div
          className={"dndnode_capacitor1000" + send.capacitor1000}
          draggable
          id="capacitor1000"
          onDragStart={(event) => onDragStart(event, "capacitor1000")}
        ></div>
        <div
          className={"dndnode_junction" + send.junction}
          draggable
          id="junction"
          onDragStart={(event) => onDragStart(event, "junction")}
        ></div>

        <div
          className={"dndnode_diode" + send.diode}
          draggable
          id="diode"
          onDragStart={(event) => onDragStart(event, "diode")}
        ></div>

        <div
          className={"dndnode_ldr" + send.ldr}
          draggable
          id="ldr"
          onDragStart={(event) => onDragStart(event, "ldr")}
        ></div>
        <div
          className={"dndnode_led" + send.led}
          draggable
          id="led"
          onDragStart={(event) => onDragStart(event, "led")}
        ></div>

        <div
          className={"dndnode_power" + send.power}
          draggable
          id="power"
          onDragStart={(event) => onDragStart(event, "power")}
        ></div>
        <div
          className={"dndnode_res_100" + send.res_100}
          draggable
          id="res_100"
          onDragStart={(event) => onDragStart(event, "res_100")}
        ></div>
        <div
          className={"dndnode_res_250" + send.res_250}
          draggable
          id="res_250"
          onDragStart={(event) => onDragStart(event, "res_250")}
        ></div>
        <div
          className={"dndnode_tact" + send.tact}
          draggable
          id="tact"
          onDragStart={(event) => onDragStart(event, "tact")}
        ></div>
        <div
          className={"dndnode_timer_ic" + send.timer_ic}
          draggable
          id="timer_ic"
          onDragStart={(event) => onDragStart(event, "timer")}
        ></div>
        <div
          className={"dndnode_transistor" + send.transistor}
          draggable
          id="transistor"
          onDragStart={(event) => onDragStart(event, "transistor")}
        ></div>
        <div
          className={"dndnode_two_way_switch" + send.two_way_switch}
          draggable
          id="two_way_switch"
          onDragStart={(event) => onDragStart(event, "two_way_switch")}
        ></div>
        <div
          className={"dndnode_pot" + send.pot}
          draggable
          id="pot"
          onDragStart={(event) => onDragStart(event, "pot")}
        ></div>
      </div>
    </aside>
  );
};
