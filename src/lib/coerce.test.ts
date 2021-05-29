import { coerce } from "../../src/lib/coerce";

describe("coerce", () => {
  it("coerces booleans", () => {
    expect(coerce({ foo: "true" })).toEqual({ foo: true });
    expect(coerce({ foo: true })).toEqual({ foo: true });
    expect(coerce({ foo: "false" })).toEqual({ foo: false });
    expect(coerce({ foo: false })).toEqual({ foo: false });
  });

  it("coerces numbers", () => {
    expect(coerce({ foo: "1" })).toEqual({ foo: 1 });
    expect(coerce({ foo: "0" })).toEqual({ foo: 0 });
    expect(coerce({ foo: "1.5" })).toEqual({ foo: 1.5 });
    expect(coerce({ foo: 1 })).toEqual({ foo: 1 });
  });

  it("coerces nulls", () => {
    expect(coerce({ foo: "null" })).toEqual({ foo: null });
    expect(coerce({ foo: null })).toEqual({ foo: null });
  });

  it("leaves strings alone", () => {
    expect(coerce({ foo: "hello" })).toEqual({ foo: "hello" });
  });

  it("coerces arrays of values", () => {
    expect(
      coerce({
        foo: ["1", "1.5", "hello", "null", "true", false, 1],
      })
    ).toEqual({ foo: [1, 1.5, "hello", null, true, false, 1] });
  });

  it("coerces arrays with a single value", () => {
    expect(coerce({ foo: ["1"] })).toEqual({ foo: [1] });
  });

  it("coerces nested arrays", () => {
    expect(
      coerce(
        {
          foo: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["a", "b", "c"],
          ],
        },
        {
          // Ignores hints
          foo: [
            ["a", "b", "c"],
            [1, 2],
          ],
        }
      )
    ).toEqual({
      foo: [
        [1, 2, 3],
        [4, 5, 6],
        ["a", "b", "c"],
      ],
    });
  });

  it("allows strict arrays to be enforced", () => {
    expect(
      coerce(
        {
          foo: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["a", "b", "c"],
          ],
        },
        {
          // Ignores hints
          foo: [
            ["a", "b", "c"],
            [1, 2],
          ],
        },
        { strictArrays: true }
      )
    ).toEqual({
      foo: [["1", "2", "3"], [4, 5, null], null],
    });
  });
});
