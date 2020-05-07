export const schema = (defaults: any) =>
  Object.keys(defaults).reduce<
    {
      param: string;
      description?: string;
      type: string;
      default: any;
    }[]
  >(
    (memo, key) => [
      ...memo,
      { param: key, default: defaults[key], type: typeof defaults[key] }
    ],
    []
  );
