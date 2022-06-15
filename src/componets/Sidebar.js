import React, { useState, memo, useEffect } from "react";

const Sidebar = memo(function Sidebar(props) {
  const onDragStart = async (event, nodeType) => {
    console.log("gsk drag start", nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      <aside id="sidebar">
        <div className="description">
          <div
            className="dndnode_beeper"
            draggable
            id="beeper"
            onDragStart={(event) => onDragStart(event, "beeper")}
          ></div>
          <div
            className="dndnode_capasitor100"
            draggable
            id="capasitor100"
          ></div>
          <div
            className="dndnode_capasitor1000"
            draggable
            id="capasitor1000"
          ></div>
          <div className="dndnode_junction" draggable id="junction"></div>

          <div className="dndnode_diode" draggable id="diode"></div>
          <div className="dndnode_dip" draggable id="dip"></div>
          <div className="dndnode_ldr" draggable id="ldr"></div>
          <div className="dndnode_led" draggable id="led"></div>
          <div className="dndnode_pot" draggable id="pot"></div>
          <div className="dndnode_power" draggable id="power"></div>
          <div className="dndnode_res_100" draggable id="res_100"></div>
          <div className="dndnode_res_250" draggable id="res_250"></div>
          <div className="dndnode_tact" draggable id="tact"></div>
          <div className="dndnode_timer_ic" draggable id="timer_ic"></div>
          <div className="dndnode_transistor" draggable id="transistor"></div>
          <div
            className="dndnode_two_way_switch"
            draggable
            id="two_way_switch"
          ></div>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
