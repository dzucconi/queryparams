import qs from "qs";
import { coerce } from "./coerce";

export const queryParams = <T>(queryString: string, defaults?: T): T => {
  const options = coerce(qs.parse(queryString), defaults);
  return { ...(defaults ? defaults : ({} as T)), ...options };
};
