import { isArray } from "./is";

type Input = { [key: string]: any };
type Coerced = string | number | boolean | null | Coerced[];
type Output = { [key: string]: Coerced };

const coerceNumber = (v: any) => +v!;
const coerceString = (v: any) => `${v}`;
const coerceBoolean = (v: any) => {
  if (v === "true" || v === true) return true;
  return false;
};

export const intoType = (
  v: any,
  type:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
) => {
  switch (type) {
    case "number":
      return coerceNumber(v);
    case "string":
      return coerceString(v);
    case "boolean":
      return coerceBoolean(v);
  }

  // Falls through
  return null;
};

export const coerceType = (v: any): Coerced => {
  if (isArray(v)) return v.map(coerceType);

  switch (true) {
    case v === "true" || v === true: // Boolean `true`
      return true;
    case v === "false" || v === false: // Boolean `false`
      return false;
    case v === "null" || v === null: // `null`
      return null;
    case +v == v: // Number
      return coerceNumber(v);
    default:
      return v;
  }
};

export const coerce = (input: Input, hints?: Input): Output => {
  return Object.keys(input).reduce<Input>((memo, key) => {
    const v = input[key];
    memo[key] =
      hints && hints[key] ? intoType(v, typeof hints[key]) : coerceType(v);
    return memo;
  }, {});
};