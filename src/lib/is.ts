export const isEmpty = (x: any) => {
  if (!x) return true;
  return Object.keys(x).length === 0 && x.constructor === Object;
};

export const isNull = (x: unknown) => x === null;

export const isArray = Array.isArray;
