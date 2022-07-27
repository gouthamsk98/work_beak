import React, { Component } from "react";
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

  componentDidMount() {
    let a = window.location.pathname;
    let currentUrl = a.slice(1, a.length);
    this.setState({ value: currentUrl });
    window.addEventListener("popstate", (event) => {
      this.setState({ value: "day0" });
    });
  }
  render() {
    const onClick = (e, val) => {
      // this.props.navigator, "byeeeeeeeeeeeeeee");
      // navigator(url);
      this.props.navigator(`${val}`);
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
    console.log(this.state.value, "hiihiihihihihihi");
    return (
      <>
        <div>
          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "simpleCircuit" ? (
            <button onClick={(value) => onClick(value, "simpleCircuit")}>
              Simple Circuit
            </button>
          ) : null}

          {this.state.value == "day0" ||
          this.state.value === "" ||
          this.state.value == "seriesCircuit" ? (
            <button onClick={(value) => onClick(value, "seriesCircuit")}>
              Series Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "parallelCircuit" ? (
            <button onClick={(value) => onClick(value, "parallelCircuit")}>
              Parallel Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "voltageDividerCircuit" ? (
            <button
              onClick={(value) => onClick(value, "voltageDividerCircuit")}
            >
              Voltage Divider Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "semi-conductorDiodeCircuit" ? (
            <button
              onClick={(value) => onClick(value, "semi-conductorDiodeCircuit")}
            >
              Semi-Conductor Diode Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "transistorCircuit" ? (
            <button onClick={(value) => onClick(value, "transistorCircuit")}>
              Transistor Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "freedomCircuit" ? (
            <button onClick={(value) => onClick(value, "freedomCircuit")}>
              Freedom Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "resistorCircuit" ? (
            <button onClick={(value) => onClick(value, "resistorCircuit")}>
              Resistor Circuit
            </button>
          ) : null}

          {this.state.value === "day0" ||
          this.state.value === "" ||
          this.state.value === "capacitorCircuit" ? (
            <button onClick={(value) => onClick(value, "capacitorCircuit")}>
              Capacitor Circuit
            </button>
          ) : null}
        </div>
        <DndProvider backend={HTML5Backend}>
          {mainRender(this.state.value)}
        </DndProvider>
      </>
    );
  }
}
export default DaySelect;
