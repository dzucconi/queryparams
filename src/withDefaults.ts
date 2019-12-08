import { queryParams as __queryParams__ } from "./lib/queryParams";
import { schema as __schema__ } from "./lib/schema";
import { encode as __encode__ } from "./lib/encode";
import { Options } from "./types";

export { __queryParams__ };

const queryString = () => {
  return typeof window === "undefined" ? "" : window.location.search.slice(1);
};

const redirect = (querystring: string): void => {
  window.location.search = `?${querystring}`;
};

let __defaults__: Options = {};

export const queryParams = <T>(defaults?: T): T => {
  __defaults__ = defaults as Options;
  return __queryParams__(queryString(), defaults);
};

export const encode = (params: Options) =>
  __encode__({ ...__defaults__, ...params });

export const reconfigure = (params: Options) => redirect(encode(params));

export const schema = () => __schema__(__defaults__);

export default queryParams;
