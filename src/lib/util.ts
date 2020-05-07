export const getQueryString = () => {
  return typeof window === "undefined" ? "" : window.location.search.slice(1);
};

export const redirect = (querystring: string): void => {
  window.location.search = `?${querystring}`;
};
