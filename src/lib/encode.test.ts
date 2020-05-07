import { encode } from "./encode";
import { params } from "./params";

describe("encode", () => {
  it("produces a new querystring given a new set of params", () => {
    const options = {
      visible: true,
      message: [
        ["hello world", 1],
        ["goodbye world", 1],
      ],
    };

    const querystring = encode(options);

    expect(querystring).toEqual(
      "visible=true&message%5B0%5D%5B0%5D=hello%20world&message%5B0%5D%5B1%5D=1&message%5B1%5D%5B0%5D=goodbye%20world&message%5B1%5D%5B1%5D=1"
    );

    expect(params({}, querystring)).toEqual(options);
  });
});
