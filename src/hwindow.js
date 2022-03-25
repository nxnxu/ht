import { useRef, useEffect } from "react";

function useHWindow(props) {
  const canvasRef = useRef(null);
  const titleDivRef = useRef(null);

  const top = props.top ?? 0;
  const left = props.left ?? 0;
  const width = props.width;
  const height = props.height;
  const scale = props.scale;
  const titleBar = props.titleBar ?? false;
  const title = props.title ?? "Window";
  const titleColor = props.titleColor ?? "#0f0";
  const background = props.background ?? "#000";
  const borderColor = props.borderColor ?? "#0f0";
  const borderSize = 1;
  const paddingSize = 5;
  const fontSize = props.fontSize ?? 14;
  const zIndex = props.zIndex ?? 0;

  const mainDivStyle = {
    border: `${borderSize}px solid ${borderColor}`,
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${width + borderSize * 2 + paddingSize * 2}px`,
    background,
    zIndex,
  };

  const titleDivStyle = {
    font: `${fontSize}px monospace`,
    color: titleColor,
    padding: `${paddingSize}px`,
    paddingLeft: "10px",
  };

  const contentDivStyle = {
    padding: `${paddingSize}px`,
  };

  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
    display: "block",
  };

  const jsx = (
    <div style={mainDivStyle}>
      {titleBar && (
        <div ref={titleDivRef} style={titleDivStyle}>
          {title}
        </div>
      )}
      <div style={contentDivStyle}>
        <canvas style={canvasStyle} ref={canvasRef} />
      </div>
    </div>
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.scale(scale, scale);
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }, [width, height, scale, background]);

  const getCanvasContext = () => canvasRef.current?.getContext("2d");

  const putImageData = (dx, dy, data) => {
    const context = getCanvasContext();
    if (context) {
      dx = -data.dirtyX + dx;
      dy = -data.dirtyY + dy;
      context.putImageData(
        data.imageData,
        dx,
        dy,
        data.dirtyX,
        data.dirtyY,
        data.dirtyWidth,
        data.dirtyHeight
      );
    }
  };

  return Object.freeze({
    jsx,
    getCanvasContext,
    width: width,
    height: height,
    scale: scale,
    putImageData,
  });
}

export default useHWindow;
