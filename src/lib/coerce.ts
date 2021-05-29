import { isArray } from "./is";

export type Input = { [key: string]: any };
export type Coerced = string | number | boolean | null | Coerced[];
export type Output = { [key: string]: Coerced };

const coerceNumber = (v: any) => +v!;
const coerceString = (v: any) => `${v}`;
const coerceBoolean = (v: any) => {
  if (v === "true" || v === true) return true;
  return false;
};

const typeOf = (input: Input) => {
  return typeof input === "object" && isArray(input) ? "array" : typeof input;
};

export const intoType = (v: any, hint: any) => {
  switch (typeOf(hint)) {
    case "number":
      return coerceNumber(v);
    case "string":
      return coerceString(v);
    case "boolean":
      return coerceBoolean(v);
    case "array":
      return v.map((x: any, i: number) => intoType(x, hint[i]));
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

export const coerce = (
  input: Input,
  hints: Input = {},
  /**
   * `strictArrays` enforces type AND length
   */
  options: { strictArrays: boolean } = { strictArrays: false }
): Output => {
  return Object.keys(input).reduce<Input>((memo, key) => {
    const v = input[key];

    if (typeOf(hints[key]) === "array" && !options.strictArrays) {
      memo[key] = coerceType(v);
    } else {
      memo[key] =
        hints[key] !== undefined ? intoType(v, hints[key]) : coerceType(v);
    }

    return memo;
  }, {});
};
