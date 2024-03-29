import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";

import Main from "../../componets/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
class DaySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "day0",
    };
  }
  render() {
    sessionStorage.clear();

    const onClick = (e, val) => {
      console.log(val);
      this.setState({ value: val });
    };
    const mainRender = (e) => {
      if (e === "day0") return <></>;
      else if (e === "simpleCircuit")
        return <Main beeper={true} led={true} tact={true} type={e} />;
      else if (e === "seriesCircuit")
        return <Main led={true} tact={true} type={e} beeper={true} />;
      else if (e === "parallelCircuit")
        return (
          <Main junction={true} led={true} tact={true} beeper={true} type={e} />
        );
      else if (e === "resistorCircuit")
        return (
          <Main
            led={true}
            junction={true}
            res_100={true}
            res_250={true}
            tact={true}
            type={e}
          />
        );
      else if (e === "capacitorCircuit")
        return (
          <Main
            beeper={true}
            capacitor100={true}
            capacitor1000={true}
            tact={true}
            junction={true}
            type={e}
          />
        );
      else if (e === "voltageDividerCircuit")
        return (
          <Main led={true} pot={true} tact={true} junction={true} type={e} />
        );
      else if (e === "semi-conductorDiodeCircuit")
        return <Main led={true} diode={true} tact={true} type={e} />;
      else if (e === "transistorCircuit")
        return (
          <Main
            led={true}
            transistor={true}
            tact={true}
            ldr={true}
            res_100={true}
            junction={true}
            type={e}
          />
        );
      else if (e === "freedomCircuit")
        return (
          <Main
            beeper={true}
            capacitor100={true}
            capacitor1000={true}
            diode={true}
            dip={true}
            junction={true}
            ldr={true}
            led={true}
            pot={true}
            res_100={true}
            res_250={true}
            tact={true}
            timer_ic={true}
            transistor={true}
            two_way_switch={true}
            power={true}
            type={e}
          />
        );
    };
    return (
      <>
        {/* <div>
          <button onClick={(value) => onClick(value, "simpleCircuit")}>
            Simple Circuit
          </button>
          <button onClick={(value) => onClick(value, "seriesCircuit")}>
            Series Circuit
          </button>
          <button onClick={(value) => onClick(value, "parallelCircuit")}>
            Parallel Circuit
          </button>

          <button onClick={(value) => onClick(value, "voltageDividerCircuit")}>
            Voltage Divider Circuit
          </button>
          <button
            onClick={(value) => onClick(value, "semi-conductorDiodeCircuit")}
          >
            Semi-Conductor Diode Circuit
          </button>
          <button onClick={(value) => onClick(value, "transistorCircuit")}>
            Transistor Circuit
          </button>
          <button onClick={(value) => onClick(value, "freedomCircuit")}>
            Freedom Circuit
          </button>
          <button onClick={(value) => onClick(value, "resistorCircuit")}>
            Resistor Circuit
          </button>
          <button onClick={(value) => onClick(value, "capacitorCircuit")}>
            Capacitor Circuit
          </button>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
            
          </nav>
        </div>
        <DndProvider backend={HTML5Backend}>
          {mainRender(this.state.value)}
        </DndProvider> */}
        <Link to="/simpleCircuit">simpleCircuit</Link> <br />
        <br />
        <br />
        <Link to="/seriesCircuit">seriesCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/parallelCircuit">parallelCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/resistorCircuit">resistorCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/capacitorCircuit">capacitorCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/voltageDividerCircuit">voltageDividerCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/semi-conductorDiodeCircuit">semi-conductorDiodeCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/transistorCircuit">transistorCircuit</Link>
        <br />
        <br />
        <br />
        <Link to="/freedomCircuit">freedomCircuit</Link>
      </>
    );
  }
}
export default DaySelect;
