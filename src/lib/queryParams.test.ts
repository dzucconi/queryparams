import { queryParams } from "./queryParams";

describe("queryParams", () => {
  it("works", () => {
    const exampleDefaults = {
      foo: "bar",
      bar: 1,
      baz: true,
      what: ["ok", "then"]
    };

    const parameters = queryParams("wow=what&bar=2&foo=2", exampleDefaults);

    expect(parameters).toEqual({
      foo: "2",
      bar: 2,
      baz: true,
      what: ["ok", "then"],
      wow: "what"
    });
  });

  it("coerces based on the defaults (number should be string)", () => {
    const exampleDefaults = { foo: "bar" };
    const { foo } = queryParams("foo=1", exampleDefaults);
    expect(foo).toEqual("1");
  });

  it("coerces based on the defaults (boolean should be string)", () => {
    const exampleDefaults = { foo: "bar" };
    const { foo } = queryParams("foo=true", exampleDefaults);
    expect(foo).toEqual("true");
  });

  it("parses the query string", function() {
    expect(queryParams("foo=bar")).toEqual({ foo: "bar" });
  });

  it("parses more complex query strings", function() {
    expect(queryParams("foo[]=bar&foo[]=baz&bar=foo")).toEqual({
      foo: ["bar", "baz"],
      bar: "foo"
    });
  });

  describe("with type coercion", function() {
    it("coerces the types", function() {
      expect(queryParams("size=55&color=blue&public=false")).toEqual({
        size: 55,
        color: "blue",
        public: false
      });
    });
  });

  describe("with defaults", function() {
    it("sets defaults", function() {
      expect(queryParams("speed=50", { color: "blue", speed: 25 })).toEqual({
        color: "blue",
        speed: 50
      });
    });
  });
});
