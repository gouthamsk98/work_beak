import React from "react";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="side">
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>

        <div
          className="dndnode_beeper"
          value="beeper"
          draggable
          id="beeper"
          onDragStart={(event) => onDragStart(event, "beeper")}
        ></div>
        <div
          className="dndnode_capasitor100"
          draggable
          id="capasitor100"
          onDragStart={(event) => onDragStart(event, "capasitor100")}
        ></div>
        <div
          className="dndnode_capasitor1000"
          draggable
          id="capasitor1000"
          onDragStart={(event) => onDragStart(event, "capasitor1000")}
        ></div>
        <div
          className="dndnode_junction"
          draggable
          id="junction"
          onDragStart={(event) => onDragStart(event, "junction")}
        ></div>

        <div
          className="dndnode_diode"
          draggable
          id="diode"
          onDragStart={(event) => onDragStart(event, "diode")}
        ></div>

        <div
          className="dndnode_ldr"
          draggable
          id="ldr"
          onDragStart={(event) => onDragStart(event, "ldr")}
        ></div>
        <div
          className="dndnode_led"
          draggable
          id="led"
          onDragStart={(event) => onDragStart(event, "led")}
        ></div>
        <div
          className="dndnode_pot"
          draggable
          id="pot"
          onDragStart={(event) => onDragStart(event, "pot")}
        ></div>
        <div
          className="dndnode_power"
          draggable
          id="power"
          onDragStart={(event) => onDragStart(event, "power")}
        ></div>
        <div
          className="dndnode_res_100"
          draggable
          id="res_100"
          onDragStart={(event) => onDragStart(event, "res_100")}
        ></div>
        <div
          className="dndnode_res_250"
          draggable
          id="res_250"
          onDragStart={(event) => onDragStart(event, "res_250")}
        ></div>
        <div
          className="dndnode_tact"
          draggable
          id="tact"
          onDragStart={(event) => onDragStart(event, "tact")}
        ></div>
        <div
          className="dndnode_timer_ic"
          draggable
          id="timer_ic"
          onDragStart={(event) => onDragStart(event, "timer")}
        ></div>
        <div
          className="dndnode_transistor"
          draggable
          id="transistor"
          onDragStart={(event) => onDragStart(event, "transistor")}
        ></div>
        <div
          className="dndnode_two_way_switch"
          draggable
          id="two_way_switch"
          onDragStart={(event) => onDragStart(event, "two_way_switch")}
        ></div>
      </div>
    </aside>
  );
};
