import { randomItemFromArray, randomLineRepeatedString } from "../utils";

const stream =
  "1.This is a template\n2.This is a template\n3.This is a template\n";

const template = {
  numCols: 40,
  get streams() {
    return [
      {
        get title() {
          delete this.title;
          const titles = ["template"];
          return (this.title = randomItemFromArray(titles));
        },

        get stream() {
          delete this.stream;
          return (this.stream = randomLineRepeatedString(stream));
        },

        get dt() {
          delete this.dt;
          return (this.dt = 21 * 3);
        },
      },
    ];
  },
};

export default template;
