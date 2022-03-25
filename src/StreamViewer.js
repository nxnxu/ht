import { useEffect, memo, useRef, useState } from "react";
import useHWindow from "./hwindow";
import useTextRenderer from "./textrenderer";
import { Color } from "./utils";

class Streamer {
  constructor(streams) {
    this.streams = streams;
    this.index = 0;
    this.streamIndex = 0;
    this.elaspedTime = 0;
    this.charsWritten = 0;
  }

  tick(elapsedTime, setTitle) {
    if (this.index >= this.streams.length) return false;

    setTitle(this.streams[this.index].title);

    this.elaspedTime += elapsedTime;
    let numChars = this.streams[this.index].dt * (this.elaspedTime / 1000);
    numChars = Math.floor(numChars);

    const stream = this.streams[this.index].stream;
    let i = this.streamIndex;
    let text = "";

    while (this.charsWritten < numChars && i < stream.length) {
      if (stream[i] === "\x1b") {
        while (stream[i] !== "m") text += stream[i++];
      } else ++this.charsWritten;
      text += stream[i++];
    }

    if (i >= stream.length) {
      this.index++;
      this.streamIndex = 0;
      this.elaspedTime = 0;
      this.charsWritten = 0;
    } else {
      this.streamIndex = i;
    }

    return text;
  }

  quit() {
    return this.index >= this.streams.length;
  }
}

function StreamViewer(props) {
  const [title, setTitle] = useState("NULL");
  const hwindow = useHWindow({ ...props, title, titleBar: true });

  const streamerRef = useRef(null);
  const numTicksRef = useRef(null);
  const renderIdRef = useRef(null);

  const textRenderer = useTextRenderer(
    props.width,
    props.height,
    props.fontSize,
    props.scale,
    props.fontmap,
    Color.stringTo32Bit(props.background),
    true
  );

  const render = () => {
    hwindow.putImageData(0, 0, textRenderer.data());
  };

  const tick = () => {
    if (!props.shouldTick()) return;
    if (numTicksRef.current >= props.maxNumTicks) {
      props.quit(props.id);
      return;
    } else {
      const streamer = streamerRef.current;
      const stream = streamer.tick(props.tickTime, setTitle, textRenderer);
      if (stream.length) {
        textRenderer.setFontColor(props.fontForeground, props.fontBackground);
        textRenderer.renderStream(stream);
        renderIdRef.current = window.requestAnimationFrame(render);
      }
    }
    numTicksRef.current += 1;
  };

  useEffect(() => {
    streamerRef.current = new Streamer(props.streams);
  }, [props.streams, props.scale]);

  useEffect(() => {
    numTicksRef.current = 0;
  }, [props.tickTime, props.maxNumTicks]);

  useEffect(() => {
    const id = setInterval(tick, props.tickTime);
    return () => {
      clearInterval(id);
      window.cancelAnimationFrame(renderIdRef.current);
    };
  });

  return hwindow.jsx;
}

const MemoStreamViewer = memo(StreamViewer);

export default MemoStreamViewer;
