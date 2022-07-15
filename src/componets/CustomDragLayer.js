import { useDragLayer } from "react-dnd";
import renderImage from "./renderImageWithDots";
import ReactFlow, { State, Controls, Handle } from "react-flow-renderer";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 100,
  top: 10,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset, currentOffset, xOffset, yOffset, type) {
  let Background;
  if (type == "beeper") Background = renderImage("beeper");
  else if (type == "led") Background = renderImage("led");
  else if (type == "tact") Background = renderImage("tact");
  else if (type == "loop") Background = renderImage("beeper");
  else if (type == "repeat") Background = renderImage("beeper");
  else if (type == "junction") Background = renderImage("junction");
  else if (type == "pot") Background = renderImage("pot");
  else if (type == "diode") Background = renderImage("diode");
  else if (type == "ldr") Background = renderImage("ldr");
  else if (type == "res_100") Background = renderImage("res_100");
  else if (type == "res_250") Background = renderImage("res_250");
  else if (type == "transistor") Background = renderImage("transistor");
  else if (type == "capacitor100") Background = renderImage("capacitor100");
  else if (type == "capacitor1000") Background = renderImage("capacitor1000");

  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let zoom = JSON.parse(sessionStorage.getItem("planeOffset")) || 1;

  if (zoom != 1) zoom = zoom.zoom;
  //now edit
  zoom = 1;
  let height = 12,
    width = 11;

  let { x, y } = currentOffset;
  x = x - xOffset;
  y = y - yOffset;

  const transform = `translate(${x}px, ${y}px) scale(${zoom})`;
  return {
    backgroundImage: `url(${Background}) `,
    height: `${height}vh`,
    width: `${width}vw`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",

    transform,
    WebkitTransform: transform,
  };
}
export const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, delta } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
      delta: monitor.getDifferenceFromInitialOffset(),
    }));
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
  };
  function renderItem() {
    console.log("GSKITEM", item.id, initialOffset, currentOffset);
    switch (item.id) {
      case "beeper":
        return (
          <>
            <div
              style={getItemStyles(
                initialOffset,
                currentOffset,
                205,
                65,
                "beeper"
              )}
              id="dragLayerbeeper"
            >
              <Handle
                type="target"
                position="left"
                style={{ left: " -0.7vw", top: " 1.8vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="right"
                style={{ left: "11.5vw", top: " 2.2vh" }}
                id="r"
              />
            </div>
          </>
        );
      case "tact":
        return (
          <>
            <div
              style={getItemStyles(
                initialOffset,
                currentOffset,
                205,
                65,
                "tact"
              )}
              id="dragLayertact"
            >
              <Handle
                type="target"
                position="left"
                style={{ left: " 0.3vw", top: " 4.6vh" }}
                id="l"
              />
              <Handle
                type="source"
                position="right"
                style={{ left: "10.5vw", top: " 5.2vh" }}
                id="r"
              />
            </div>
          </>
        );
      case "led":
        return (
          <div
            style={getItemStyles(initialOffset, currentOffset, 205, 65, "led")}
            id="dragLayerled"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      case "junction":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "junction"
            )}
            id="dragLayerjunction"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: "2.5vw", top: " 3.99vh" }}
              id="l1"
            />
            <Handle
              type="target"
              position="left"
              style={{ left: "2.5vw", top: " 5.79vh" }}
              id="l2"
            />
            <Handle
              type="target"
              position="left"
              style={{ left: "2.5vw", top: " 7.5vh" }}
              id="l3"
            />
            <Handle
              type="target"
              position="left"
              style={{ left: "2.5vw", top: " 9.3vh" }}
              id="l4"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "9.28vw", top: " 3.99vh" }}
              id="r1"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "9.28vw", top: " 5.79vh" }}
              id="r2"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "9.28vw", top: " 7.5vh" }}
              id="r3"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "9.28vw", top: " 9.3vh" }}
              id="r4"
            />
          </div>
        );
      case "pot":
        return (
          <div
            style={getItemStyles(initialOffset, currentOffset, 205, 65, "pot")}
            id="dragLayerpot"
          >
            <Handle
              type="source"
              position="left"
              style={{ left: " -0.2vw", top: " 6.6vh" }}
              id="l"
            />
            <Handle
              type="target"
              position="right"
              style={{ left: "11.3vw", top: " 4.1vh" }}
              id="r1"
            />
            <Handle
              type="target"
              position="right"
              style={{ left: "11.3vw", top: " 9.9vh" }}
              id="r2"
            />
          </div>
        );
      case "diode":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "diode"
            )}
            id="dragdiode"
          >
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="d"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: 140, top: 20 }}
              id="r"
            />
          </div>
        );
      case "res_100":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "res_100"
            )}
            id="dragLayerres_100"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      case "res_250":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "res_250"
            )}
            id="dragLayerres_250"
          >
            {" "}
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      case "ldr":
        return (
          <div
            style={getItemStyles(initialOffset, currentOffset, 205, 65, "ldr")}
            id="dragLayerldr"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      case "transistor":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "transistor"
            )}
            id="dragLayertransistor"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.4vw", top: " 6.7vh" }}
              id="l"
            />
            <Handle
              type="target"
              position="right"
              style={{ left: "10.1vw", top: " 5.7vh" }}
              id="r.t"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.1vw", top: " 8.5vh" }}
              id="r"
            />
          </div>
        );
      case "capacitor100":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "capacitor100"
            )}
            id="dragLayercapacitor100"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      case "capacitor1000":
        return (
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              205,
              65,
              "capacitor1000"
            )}
            id="dragLayercapacitor1000"
          >
            <Handle
              type="target"
              position="left"
              style={{ left: " 0.3vw", top: " 4.6vh" }}
              id="l"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: "10.5vw", top: " 5.2vh" }}
              id="r"
            />
          </div>
        );
      default:
        return <h1>hello</h1>;
    }
  }
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div>{renderItem()}</div>
    </div>
  );
};
