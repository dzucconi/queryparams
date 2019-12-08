import qs from "qs";
import { Options } from "../types";

export const encode = (options: Options): string => qs.stringify(options);
