// https://stackoverflow.com/a/7462767
function determineFontHeight(fontStyle, letter) {
  const cssFontStyle = "font: " + fontStyle + ";";
  const body = document.getElementsByTagName("body")[0];
  const dummy = document.createElement("div");
  const dummyText = document.createTextNode(letter);
  dummy.appendChild(dummyText);
  dummy.setAttribute("style", cssFontStyle);
  body.appendChild(dummy);
  const result = dummy.offsetHeight;
  body.removeChild(dummy);
  return result;
}

function getFontSize(fontStyle, letter) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = fontStyle;
  context.textBaseline = "middle";
  context.textAlign = "center";
  const fontWidth = parseInt(context.measureText(letter).width, 10);
  const fontHeight = parseInt(determineFontHeight(fontStyle), 10);
  return { fontWidth, fontHeight };
}

const fontFamily = "monospace";
const asciiLetters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ";

// Monospace FontMap for a language
// Example:
//      FontMap();            // fontmap of ascii characters
//      FontMap("私金魚煙草");  // fontmap of chinese chracters
//      FontMap("しキンギ")    // fontmap of japanese chracters
class FontMap {
  // Make sure the each letter has equal width using above getFontSize function.
  // For example: संस्कृतम् unicode is having more than 5 letters each with different width even though monospace
  constructor(letters = asciiLetters) {
    // Map
    // key = fontSize, scale, foreground, background
    // value = canvas
    this.fontmaps = [];
    this.letters = letters;
  }

  _generateFontMap(fontSize, scale, foreground, background) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const fontStyle = `${fontSize}px ${fontFamily}`;
    const { fontWidth, fontHeight } = getFontSize(fontStyle, this.letters[0]);
    const width = this.letters.length * fontWidth;
    const height = fontHeight;
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    context.scale(scale, scale);
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    context.font = fontStyle;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = foreground;
    for (let i = 0; i < this.letters.length; ++i) {
      const x = fontWidth * i + fontWidth / 2;
      const y = fontHeight / 2;
      context.fillText(this.letters[i], x, y);
    }

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = new Uint32Array(imageData.data.buffer);

    return {
      // key
      fontSize,
      scale,
      foreground,
      background,
      // value
      fontWidth: Math.floor(fontWidth * scale),
      fontHeight: Math.floor(fontHeight * scale),
      pixels: pixels,
      width: canvas.width,
      height: canvas.height,
      cache: {},
    };
  }

  _getFontMap(fontSize, scale, foreground, background) {
    for (let fontmap of this.fontmaps) {
      if (
        fontmap.fontSize === fontSize &&
        fontmap.scale === scale &&
        fontmap.foreground === foreground &&
        fontmap.background === background
      )
        return fontmap;
    }
    const fontmap = this._generateFontMap(
      fontSize,
      scale,
      foreground,
      background
    );
    this.fontmaps.push(fontmap);
    return fontmap;
  }

  _generateFontPixels(fontSize, scale, foreground, background, letter) {
    const fontmap = this._getFontMap(fontSize, scale, foreground, background);
    // Copy pixels of the letter to new array
    let index = this.letters.indexOf(letter) * fontmap.fontWidth;
    const pixels = new Uint32Array(fontmap.fontWidth * fontmap.fontHeight);
    for (let y = 0; y < fontmap.fontHeight; ++y) {
      for (let x = 0; x < fontmap.fontWidth; ++x) {
        pixels[y * fontmap.fontWidth + x] = fontmap.pixels[index + x];
      }
      index += fontmap.width;
    }
    // prepare for return
    const buffer = pixels.buffer;
    const fontWidth = fontmap.fontWidth;
    const fontHeight = fontmap.fontHeight;
    const uint32Array = new Uint32Array(buffer);
    const uint8ClampedArray = new Uint8ClampedArray(buffer);
    const imageData = new ImageData(uint8ClampedArray, fontWidth, fontHeight);

    return Object.freeze({
      fontWidth,
      fontHeight,
      uint32Array,
      uint8ClampedArray,
      imageData,
    });
  }

  // Public functions

  // Due to scale value begin float, rounding can cause artifacts.
  // So make sure scale is a resonable value.
  // Best values are integers.
  // Mostly scale in this project refers to window.devicePixelRatio,
  // so ceiling it is better.
  getFontPixels(fontSize, scale, foreground, background, letter) {
    const fontmap = this._getFontMap(fontSize, scale, foreground, background);
    if (fontmap.cache[letter] === undefined) {
      fontmap.cache[letter] = this._generateFontPixels(
        fontSize,
        scale,
        foreground,
        background,
        letter
      );
    }
    return fontmap.cache[letter];
  }

  getFontDimension(fontSize, scale) {
    const fontStyle = `${fontSize}px ${fontFamily}`;
    const dimension = getFontSize(fontStyle, this.letters[0]);
    dimension.fontWidth = Math.floor(dimension.fontWidth * scale);
    dimension.fontHeight = Math.floor(dimension.fontHeight * scale);
    return dimension;
  }

  getLetters() {
    return this.letters;
  }
}

export default FontMap;
