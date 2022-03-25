import React, { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";
import FontMap from "./fontmap";
import StreamViewer from "./StreamViewer";
import streams from "./textstreams/streams";
import { randomInteger, randomItemFromArray } from "./utils";
import Settings from "./Settings";

function App() {
  const tickTime = 100;
  const titleColor = "#999";
  const borderColor = "#666";
  const interactiveKeyDelay = 100;

  const defaultSettings = {
    numTerminals: 4,
    minAge: 2000,
    maxAge: 4000,
    interactive: false,
    fontBackground: "#000000",
    fontForeground: "#00ff00",
  };

  const [scale, setScale] = useState(window.devicePixelRatio);
  const [terminals, setTerminals] = useState([]);
  const keyIdRef = useRef(0);
  const fontmap = useRef(new FontMap());
  const mainDivRef = useRef(null);
  const fontSize = 18;
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const lastKeyEventTimeRef = useRef(null);

  const randomTerminal = useCallback(() => {
    // Select a random stream and calculate terminal dimensions
    // such that it is within the visible viewport.
    const st = randomItemFromArray(streams);
    const dim = mainDivRef.current.getBoundingClientRect();
    const vw = dim.width - 24; // -24 for padding and border (hwindow.js, body padding)
    const vh = dim.height - 50; // minus for title bar div. TODO change 50.
    const { fontWidth, fontHeight } = fontmap.current.getFontDimension(
      fontSize,
      1
    );
    const minNumRows = 5;
    const maxNumRows = Math.max(minNumRows, Math.floor(vh / fontHeight));
    const width = st.numCols * fontWidth;
    const height = fontHeight * randomInteger(minNumRows, maxNumRows);
    const top = Math.max(0, randomInteger(0, vh - height));
    const left = Math.max(0, randomInteger(0, vw - width));
    // Calculate the amount of time the terminal should be running.
    const runningMs = randomInteger(settings.minAge, settings.maxAge);
    const maxNumTicks = Math.floor(runningMs / tickTime);
    // For react key property
    const key = keyIdRef.current++;
    // zindex
    const zIndex = st.zIndex ?? 0;
    // Text foreground and background color
    const fontForeground = st.fontForeground ?? settings.fontForeground;
    const fontBackground = st.fontBackground ?? settings.fontBackground;
    return {
      width,
      height,
      top,
      left,
      key,
      streams: st.streams,
      tickTime,
      maxNumTicks,
      titleColor,
      background: fontBackground,
      borderColor,
      fontSize,
      fontmap: fontmap.current,
      id: key,
      zIndex,
      fontForeground,
      fontBackground,
    };
  }, [settings]);

  // Keep track of window.devicePixelRatio
  // Saw Bug, Full zomming in/out continuously past limit's sometime
  // causes the scale to be not updated.
  useEffect(() => {
    matchMedia(`(resolution: ${scale}dppx)`).addEventListener(
      "change",
      () => setScale(window.devicePixelRatio),
      { once: true }
    );
  }, [scale]);

  // Keep track of key press timestamp
  useEffect(() => {
    const type = "keydown";
    const listener = () => {
      lastKeyEventTimeRef.current = Date.now();
    };
    document.addEventListener(type, listener);
    return () => document.removeEventListener(type, listener);
  }, []);

  // launch numTerminals terminals
  useEffect(() => {
    const ts = [];
    for (let i = 0; i < settings.numTerminals; ++i) ts.push(randomTerminal());
    setTerminals(ts);
  }, [settings, randomTerminal]);

  // Should a terminal perform a tick.
  const shouldTick = useCallback(() => {
    const curr = Date.now();
    const prev = lastKeyEventTimeRef.current ?? 0;
    const diff = curr - prev;
    return (
      showSettings === false &&
      (!settings.interactive || diff < interactiveKeyDelay)
    );
  }, [showSettings, settings]);

  // Remove a terminal with matching key and also launch a new terminal
  // to maintain numTerminals on screen.
  const quit = useCallback(
    (key) => {
      setTerminals((ts) => {
        if (ts.find((t) => t.key === key)) {
          ts = ts.filter((t) => t.key !== key);
          ts.push(randomTerminal());
        }
        return ts;
      });
    },
    [randomTerminal]
  );

  // Update settings received from settings popup
  const submitSettings = (s) => {
    setSettings(s);
    setShowSettings(false);
  };

  return (
    <div className="main">
      <div>
        <span
          className="setting-button"
          onClick={() => setShowSettings(!showSettings)}
        ></span>
      </div>
      <div className="main-content" ref={mainDivRef}>
        {showSettings && (
          <Settings settings={settings} onSubmit={submitSettings} />
        )}
        {terminals.map((t) => (
          <StreamViewer
            {...t}
            scale={Math.ceil(scale)}
            shouldTick={shouldTick}
            quit={quit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
