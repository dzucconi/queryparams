import { params as __params__ } from "./lib/params";
import { schema as __schema__ } from "./lib/schema";
import { encode as __encode__ } from "./lib/encode";
import { getQueryString, redirect } from "./lib/util";
import { Options } from "./types";
import { parse } from "./lib/parse";

export const configure = <T>(defaults: T, queryString?: string) => {
  const encode = (nextParams: Options) => {
    return __encode__(nextParams, defaults);
  };

  const reconfigure = (nextParams: Options) => {
    return redirect(encode(nextParams));
  };

  const query = parse(queryString ?? getQueryString());

  return {
    defaults,
    query,
    params: __params__(defaults, query),
    schema: __schema__(defaults),
    encode,
    reconfigure,
  };
};

export default configure;
