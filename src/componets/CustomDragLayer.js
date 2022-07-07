import { useDragLayer } from "react-dnd";
import renderImage from "./renderImageWithDots";
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
              205,
              65,
              "beeper"
            )}
          ></div>
        );
      case "tact":
        return (
          <div
            style={getItemStyles(initialOffset, currentOffset, 205, 65, "tact")}
          ></div>
        );
      case "led":
        return (
          <div
            style={getItemStyles(initialOffset, currentOffset, 205, 65, "led")}
          ></div>
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
