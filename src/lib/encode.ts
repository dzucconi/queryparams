import { stringify } from "qs";
import { Options } from "../types";
import { enforce } from "./enforce";

export const encode = (nextOptions: Options, defaults?: Options): string => {
  if (defaults) enforce(nextOptions, defaults);
  return stringify({ ...(defaults ?? {}), ...nextOptions });
};
