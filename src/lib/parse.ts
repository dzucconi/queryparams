import { parse as __parse__ } from "qs";
import { Input } from "./coerce";

export const parse = (input: string | Input): Record<string, unknown> => {
  if (input !== undefined && typeof input === "string" && input[0] === "?") {
    input = input.slice(1);
  }

  return __parse__(input);
};
