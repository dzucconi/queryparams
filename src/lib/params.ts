import { parse } from "./parse";
import { coerce, Input } from "./coerce";
import { getQueryString } from "./util";

export const params = <T>(defaults: T, query?: string | Input): T => {
  const options = coerce(parse(query ?? getQueryString()), defaults);
  return { ...(defaults ? defaults : <T>{}), ...options };
};
