import { params as __params__ } from "./lib/params";
import { schema as __schema__ } from "./lib/schema";
import { encode as __encode__ } from "./lib/encode";
import { redirect } from "./lib/util";
import { Options } from "./types";

export const configure = <T>(defaults: T, queryString?: string) => {
  const encode = (nextParams: Options) => {
    return __encode__(nextParams, defaults);
  };

  const reconfigure = (nextParams: Options) => {
    return redirect(encode(nextParams));
  };

  return {
    defaults,
    params: __params__(defaults, queryString),
    schema: __schema__(defaults),
    encode,
    reconfigure,
  };
};

export default configure;
