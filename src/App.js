import "./App.css";
import Main from "./componets/Main";
import DaySelect from "./componets/dailyChallenge/DaySelect";
import { useNavigate } from "react-router-dom";
function App(props) {
  const navigator = useNavigate();
  console.log(props, "props porps ");
  return (
    <div className="App">
      <h1>Beak</h1>
      {/* <Main /> */}

      <DaySelect navigator={navigator} />
    </div>
  );
}

export default App;
