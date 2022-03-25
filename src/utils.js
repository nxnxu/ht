// Convert '#f00' or"#ff0000" like strings to 32 bit value.
// TODO: color space. This function creates 32 bit value in SBGR format
function stringTo32Bit(color) {
  color = color.slice(1);
  if (color.length === 3) {
    const r = color[0];
    const g = color[1];
    const b = color[2];
    color = r + r + g + g + b + b;
  }
  const rr = color.substr(0, 2);
  const gg = color.substr(2, 2);
  const bb = color.substr(4, 2);
  const hex = `0xff${bb}${gg}${rr}`;
  return Number(hex);
}

function RepeatedString(str, startIndex = 0) {
  const string = str;
  const length = str.length;

  return new Proxy(
    {},
    {
      get: function (target, property, receiver) {
        if (property === "length") return Infinity;
        const number = +property;
        if (isNaN(number) || number < 0 || !length) return undefined;
        return string[(startIndex + number) % length];
      },
    }
  );
}

function randomInteger(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItemFromArray(array) {
  if (array.length <= 0) return undefined;
  return array[randomInteger(0, array.length - 1)];
}

function randomLineRepeatedString(str) {
  const newLines = [];
  for (let i = 0; i < str.length; ++i) if (str[i] === "\n") newLines.push(i);
  newLines.length || newLines.push(-1);

  return RepeatedString(str, randomItemFromArray(newLines) + 1);
}

const Color = {
  stringTo32Bit,
};

export {
  RepeatedString,
  randomInteger,
  randomItemFromArray,
  Color,
  randomLineRepeatedString,
};
