import React, { Component } from "react";
import Main from "../../componets/Main";
class DaySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "day0",
    };
  }
  render() {
    const onClick = (e, val) => {
      console.log(val);
      this.setState({ value: val });
    };
    const mainRender = (e) => {
      if (e === "day0") return <></>;
      else return <Main beeper={true} led={true} />;
    };
    return (
      <>
        <div>
          <button onClick={(value) => onClick(value, "simpleCircuit")}>
            Simple Circuit
          </button>
          <button onClick={(value) => onClick(value, "seriesCircuit")}>
            Series Circuit
          </button>
          <button onClick={(value) => onClick(value, "parallelCircuit")}>
            Parallel Circuit
          </button>
          <button onClick={(value) => onClick(value, "resistorCircuit")}>
            Resistor Circuit
          </button>
          <button onClick={(value) => onClick(value, "capacitorCircuit")}>
            Capacitor Circuit
          </button>
          <button onClick={(value) => onClick(value, "voltageDividerCircuit")}>
            Voltage Divider Circuit
          </button>
          <button onClick={(value) => onClick(value, "day7")}>
            Semi-Conductor Diode Circuit
          </button>
          <button onClick={(value) => onClick(value, "day8")}>
            Transistor Circuit
          </button>
        </div>
        {mainRender(this.state.value)}
      </>
    );
  }
}
export default DaySelect;
