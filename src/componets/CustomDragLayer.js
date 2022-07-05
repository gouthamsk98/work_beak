import { useDragLayer } from "react-dnd";
import renderImage from "./renderImage";
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
  else if (type == "if") Background = renderImage("beeper");
  else if (type == "output") Background = renderImage("beeper");
  else if (type == "loop") Background = renderImage("beeper");
  else if (type == "repeat") Background = renderImage("beeper");
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let zoom = JSON.parse(sessionStorage.getItem("planeOffset")) || 1;

  if (zoom != 1) zoom = zoom.zoom;
  //now edit
  zoom = 2;
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
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              158,
              35,
              "beeper"
            )}
            id="if_dot"
          ></div>
        );
      case "loop":
        return (
          <div
            className="dndnode_loop_dot"
            style={getItemStyles(initialOffset, currentOffset, 158, 35, "loop")}
          ></div>
        );
      case "wait":
        return (
          <div
            className="dndnode_wait_dot"
            style={getItemStyles(initialOffset, currentOffset, 158, 35, "wait")}
          ></div>
        );
      case "output":
        return (
          <div
            className="dndnode_output_dot"
            style={getItemStyles(
              initialOffset,
              currentOffset,
              158,
              35,
              "output"
            )}
          ></div>
        );
      case "end/repeat":
        return (
          <div
            className="dndnode_end/repeat"
            style={getItemStyles(
              initialOffset,
              currentOffset,
              158,
              35,
              "repeat"
            )}
          ></div>
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
