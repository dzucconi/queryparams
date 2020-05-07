import { parse } from "qs";
import { coerce } from "./coerce";
import { getQueryString } from "./util";

export const params = <T>(defaults: T, queryString?: string): T => {
  const options = coerce(parse(queryString ?? getQueryString()), defaults);
  return { ...(defaults ? defaults : <T>{}), ...options };
};
