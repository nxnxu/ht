import { useEffect, useRef } from "react";

class TextRenderer {
  constructor(rows, cols, fontSize, scale, fontmap, background) {
    const dimensions = fontmap.getFontDimension(fontSize, scale);
    this.layers = 2;
    this.fontWidth = dimensions.fontWidth;
    this.fontHeight = dimensions.fontHeight;
    this.frameStart = 0;
    this.frontWidth = cols;
    this.frontHeight = rows;
    this.backWidth = cols;
    this.backHeight = rows * this.layers;
    this.width = this.backWidth * this.fontWidth;
    this.height = this.backHeight * this.fontHeight;
    this.imageData = new ImageData(this.width, this.height);
    this.pixels = new Uint32Array(this.imageData.data.buffer);
    this.cursorX = 0;
    this.cursorY = 0;
    this.fontForeground = "#0f0";
    this.fontBackground = "#000";
    this.background = background;
    this.fontmap = fontmap;
    this.fontSize = fontSize;
    this.scale = scale;

    // Set pixels to background
    for (let i = 0; i < this.pixels.length; ++i) {
      this.pixels[i] = this.background;
    }
  }

  data() {
    return {
      dirtyX: 0,
      dirtyY: this.frameStart * this.fontHeight,
      dirtyWidth: this.frontWidth * this.fontWidth,
      dirtyHeight: this.frontHeight * this.fontHeight,
      imageData: this.imageData,
    };
  }

  setColor(fontForeground, fontBackground) {
    this.fontForeground = fontForeground;
    this.fontBackground = fontBackground;
  }

  // TODO: OPTIMIZE: Render only required letters.
  renderStream(stream) {
    for (let i = 0; i < stream.length; ++i) {
      let letter = stream[i];
      // '\x1bforeground;backgroundm'
      // '\x1b#100;#000m'
      if (letter === "\x1b") {
        let fontForeground = "";
        let fontBackground = "";
        while (stream[++i] !== ";" && stream[i] !== "m")
          fontForeground += stream[i];
        while (stream[i] !== "m") fontBackground += stream[++i];
        if (fontBackground.length)
          fontBackground = fontBackground.substr(0, fontBackground.length - 1);
        else fontBackground = this.fontBackground;
        this.fontForeground = fontForeground;
        this.fontBackground = fontBackground;
      } else if (letter === "\n") {
        this.cursorX = 0;
        this.cursorY += 1;
        this._adjustCursorY();
      } else {
        this._renderLetter(this.cursorX, this.cursorY, letter);
        this.cursorX += 1;
        if (this.cursorX >= this.backWidth) {
          this.cursorX = 0;
          this.cursorY += 1;
          this._adjustCursorY();
        }
      }
    }
  }

  renderLetter(frontX, frontY, letter) {
    console.log(...arguments);
    this._renderLetter(frontX, this.frameStart + frontY, letter);
  }

  _renderLetter(backX, backY, letter) {
    const dstX = backX * this.fontWidth;
    const dstY = backY * this.fontHeight;
    const srcPixels = this.fontmap.getFontPixels(
      this.fontSize,
      this.scale,
      this.fontForeground,
      this.fontBackground,
      letter
    ).uint32Array;
    const dstPixels = this.pixels;
    let srcIndex = 0;
    let dstIndex = dstY * this.width + dstX;
    for (let y = 0; y < this.fontHeight; ++y) {
      for (let x = 0; x < this.fontWidth; ++x) {
        dstPixels[dstIndex + x] = srcPixels[srcIndex + x];
      }
      dstIndex += this.width;
      srcIndex += this.fontWidth;
    }
  }

  _adjustCursorY() {
    // TODO: Clean up
    if (this.cursorY >= this.backHeight) {
      // Apply scroll
      // Copy last frontHeight - 1 rows to top
      // Set remaining pixels to background
      // TODO: Optimize
      let dstIndex = 0;
      let srcIndex = (this.frameStart + 1) * this.fontHeight * this.width;
      let len1 = (this.frontHeight - 1) * this.fontHeight * this.width;
      let len2 =
        (this.backHeight - (this.frontHeight - 1)) *
        this.fontHeight *
        this.width;
      for (let i = 0; i < len1; ++i) {
        this.pixels[dstIndex] = this.pixels[srcIndex];
        dstIndex++;
        srcIndex++;
      }
      for (let i = 0; i < len2; ++i) {
        this.pixels[dstIndex] = this.background;
        dstIndex++;
      }
      this.cursorY = this.frontHeight - 1;
      this.frameStart = 0;
    } else if (this.cursorY >= this.frontHeight) {
      this.frameStart = this.cursorY - this.frontHeight + 1;
    }
  }
}

function calculateRowsCols(width, height, fontSize, scale, fontmap) {
  const { fontWidth, fontHeight } = fontmap.getFontDimension(fontSize, scale);
  const rows = Math.floor((height * scale) / fontHeight);
  const cols = Math.floor((width * scale) / fontWidth);
  return { rows, cols };
}

// BUG/WHY: When zomming, some times there are transparent lines below
// each row. Are font glyps having bottom pixels as transparent ?
// Some Fix: We can fix this by
// setting the background of whatever is behind the canvas to same background
// used for the text renderer.
function useTextRenderer(
  rows,
  cols,
  fontSize,
  scale,
  fontmap,
  background,
  shouldCalculateRowCols = false
) {
  const textRendererRef = useRef(null);

  useEffect(() => {
    let numRows = rows;
    let numCols = cols;
    if (shouldCalculateRowCols === true) {
      const rc = calculateRowsCols(rows, cols, fontSize, scale, fontmap);
      numRows = rc.rows;
      numCols = rc.cols;
    }
    const textRenderer = new TextRenderer(
      numRows,
      numCols,
      fontSize,
      scale,
      fontmap,
      background
    );
    // TODO
    // Keep cache of rendered stream and render them when props changes.
    textRendererRef.current = textRenderer;
  }, [
    rows,
    cols,
    fontSize,
    scale,
    fontmap,
    background,
    shouldCalculateRowCols,
  ]);

  const renderLetter = (frontX, frontY, letter) => {
    const textRenderer = textRendererRef.current;
    textRenderer.renderLetter(frontX, frontY, letter);
  };

  const renderStream = (stream) => {
    const textRenderer = textRendererRef.current;
    textRenderer.renderStream(stream);
  };

  const setFontColor = (fontForeground, fontBackground) => {
    const textRenderer = textRendererRef.current;
    textRenderer.setColor(fontForeground, fontBackground);
  };

  const data = () => {
    const textRenderer = textRendererRef.current;
    return textRenderer.data();
  };

  return Object.freeze({
    renderLetter,
    renderStream,
    setFontColor,
    data,
  });
}

export default useTextRenderer;
