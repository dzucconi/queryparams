export const transform = <T>(
  obj: { [key: string]: T },
  fn: (value: T) => any
) =>
  Object.keys(obj).reduce<{ [key: string]: T }>((memo, key) => {
    memo[key] = fn(obj[key]);
    return memo;
  }, {});
