export const makeApiCall = async (url: string, config?: object) => {
  const response = await fetch(url, config);

  return response;
};
