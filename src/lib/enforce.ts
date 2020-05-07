import { isEmpty, isNull } from "./is";
import { Options } from "../types";

export const enforce = (nextOptions: Options, defaults: Options) => {
  if (isEmpty(nextOptions) || isEmpty(defaults)) return;

  Object.keys(nextOptions).forEach((key) => {
    if (isNull(defaults[key]) || isNull(nextOptions[key])) return;

    if (!(typeof defaults[key] === typeof nextOptions[key])) {
      throw new Error(`${key} should be ${typeof defaults[key]}`);
    }
  });
};
