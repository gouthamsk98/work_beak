import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.css";
import Main from "./componets/Main";
import DaySelect from "./componets/dailyChallenge/DaySelect";

function App() {
  return (
    <div className="App">
      <h1>Beak</h1>
      {/* <Main /> */}
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<DaySelect />} />
            <Route
              path="/simpleCircuit"
              element={
                <Main
                  beeper={true}
                  led={true}
                  tact={true}
                  type={"simpleCircuit"}
                />
              }
            />
            <Route
              path="/seriesCircuit"
              element={
                <Main
                  led={true}
                  tact={true}
                  beeper={true}
                  type={"seriesCircuit"}
                />
              }
            />
            <Route
              path="/parallelCircuit"
              element={
                <Main
                  junction={true}
                  led={true}
                  tact={true}
                  beeper={true}
                  type={"parallelCircuit"}
                />
              }
            />
            <Route
              path="/resistorCircuit"
              element={
                <Main
                  led={true}
                  junction={true}
                  res_100={true}
                  res_250={true}
                  tact={true}
                  type={"resistorCircuit"}
                />
              }
            />
            <Route
              path="/capacitorCircuit"
              element={
                <Main
                  beeper={true}
                  capacitor100={true}
                  capacitor1000={true}
                  tact={true}
                  junction={true}
                  type={"capacitorCircuit"}
                />
              }
            />
            <Route
              path="/voltageDividerCircuit"
              element={
                <Main
                  led={true}
                  pot={true}
                  tact={true}
                  junction={true}
                  type={"voltageDividerCircuit"}
                />
              }
            />
            <Route
              path="/semi-conductorDiodeCircuit"
              element={
                <Main
                  led={true}
                  diode={true}
                  tact={true}
                  type={"semi-conductorDiodeCircuit"}
                />
              }
            />
            <Route
              path="/transistorCircuit"
              element={
                <Main
                  led={true}
                  transistor={true}
                  tact={true}
                  ldr={true}
                  res_100={true}
                  junction={true}
                  type={"transistorCircuit"}
                />
              }
            />
            <Route
              path="/freedomCircuit"
              element={
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
                  // timer_ic={true}
                  transistor={true}
                  two_way_switch={true}
                  // power={true}
                  type={"freedomCircuit"}
                />
              }
            />
          </Routes>
        </Router>
      </DndProvider>
    </div>
  );
}

export default App;
