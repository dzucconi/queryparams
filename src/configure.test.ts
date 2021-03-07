import { configure } from "./configure";

declare var global: any;

describe("configure", () => {
  describe("with global querystring", () => {
    beforeEach(() => {
      delete global.window.location;
      global.window = Object.create(window);
      global.window.location = {
        port: "123",
        protocol: "http:",
        hostname: "localhost",
      };
    });

    const {
      params: { foo, bar, baz },
      reconfigure,
      schema,
    } = configure({ foo: "bar", bar: true, baz: 1 });

    describe("params", () => {
      it("returns the correct values", () => {
        expect(foo).toEqual("bar");
        expect(bar).toBe(true);
        expect(baz).toBe(1);
      });
    });

    describe("reconfigure", () => {
      it("updates the location respecting the defaults", () => {
        reconfigure({ foo: "baz" });
        expect(global.window.location.search).toEqual(
          "?foo=baz&bar=true&baz=1"
        );
      });
    });

    describe("schema", () => {
      it("prints the schema based on the defaults", () => {
        expect(schema).toEqual([
          { default: "bar", param: "foo", type: "string" },
          { default: true, param: "bar", type: "boolean" },
          { default: 1, param: "baz", type: "number" },
        ]);
      });
    });
  });

  describe("with passed querystring", () => {
    const {
      params: { foo, bar, baz },
      query,
    } = configure(
      { foo: "qux", bar: false, baz: 1 },
      "?foo=baz&bar=false&baz=2"
    );

    describe("params", () => {
      it("returns the correct values", () => {
        expect(foo).toEqual("baz");
        expect(bar).toBe(false);
        expect(baz).toBe(2);
      });
    });

    describe("query", () => {
      it("returns the parsed (but un-coerced) query string", () => {
        expect(query).toEqual({ foo: "baz", bar: "false", baz: "2" });
      });
    });
  });
});
