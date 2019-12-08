import { queryParams, reconfigure, schema } from "./withDefaults";

declare var global: any;

describe("withDefaults", () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      port: "123",
      protocol: "http:",
      hostname: "localhost"
    };
  });

  const { foo, bar, baz } = queryParams({ foo: "bar", bar: true, baz: 1 });

  describe("queryParams", () => {
    it("returns the correct values", () => {
      expect(foo).toEqual("bar");
      expect(bar).toBe(true);
      expect(baz).toBe(1);
    });
  });

  describe("reconfigure", () => {
    it("updates the location respecting the defaults", () => {
      reconfigure({ foo: "baz" });
      expect(global.window.location.search).toEqual("?foo=baz&bar=true&baz=1");
    });
  });

  describe("schema", () => {
    it("prints the schema based on the defaults", () => {
      expect(schema()).toEqual([
        { default: "bar", param: "foo", type: "string" },
        { default: true, param: "bar", type: "boolean" },
        { default: 1, param: "baz", type: "number" }
      ]);
    });
  });
});
