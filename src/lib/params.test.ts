import { params } from "./params";

describe("params", () => {
  it("works", () => {
    const exampleDefaults = {
      foo: "bar",
      bar: 1,
      baz: true,
      what: ["ok", "then"],
    };

    const parameters = params(exampleDefaults, "wow=what&bar=2&foo=2");

    expect(parameters).toEqual({
      foo: "2",
      bar: 2,
      baz: true,
      what: ["ok", "then"],
      wow: "what",
    });
  });

  it("coerces based on the defaults (number should be string)", () => {
    const exampleDefaults = { foo: "bar" };
    const { foo } = params(exampleDefaults, "foo=1");
    expect(foo).toEqual("1");
  });

  it("coerces based on the defaults (boolean should be string)", () => {
    const exampleDefaults = { foo: "bar" };
    const { foo } = params(exampleDefaults, "foo=true");
    expect(foo).toEqual("true");
  });

  it("parses the query string", function () {
    expect(params({}, "foo=bar")).toEqual({ foo: "bar" });
  });

  it("parses more complex query strings", function () {
    expect(params({}, "foo[]=bar&foo[]=baz&bar=foo")).toEqual({
      foo: ["bar", "baz"],
      bar: "foo",
    });
  });

  describe("with type coercion", function () {
    it("coerces the types", function () {
      expect(params({}, "size=55&color=blue&public=false")).toEqual({
        size: 55,
        color: "blue",
        public: false,
      });
    });
  });

  describe("with defaults", function () {
    it("sets defaults", function () {
      expect(params({ color: "blue", speed: 25 }, "speed=50")).toEqual({
        color: "blue",
        speed: 50,
      });
    });
  });
});
