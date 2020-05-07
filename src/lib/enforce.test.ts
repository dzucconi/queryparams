import { enforce } from "./enforce";

describe("enforce", () => {
  it("throws when one of the value types from defaults does not match", () => {
    expect(() => {
      enforce({ visible: true }, { visible: "false" });
    }).toThrowError();
  });

  it("throws when one of the value types from options does not match", () => {
    expect(() => {
      enforce({ visible: "false" }, { visible: true });
    }).toThrowError();
  });

  it("silently returns if one of the objects is empty", () => {
    expect(() => {
      enforce({}, { visible: true });
    }).not.toThrowError();
  });

  it("silently returns if one of the corresponding options values is null", () => {
    expect(() => {
      enforce({ visible: null }, { visible: true });
    }).not.toThrowError();
  });

  it("silently returns if one of the corresponding values is absent", () => {
    expect(() => {
      enforce({ color: "blue" }, { visible: true, color: "red" });
    }).not.toThrowError();
  });
});
