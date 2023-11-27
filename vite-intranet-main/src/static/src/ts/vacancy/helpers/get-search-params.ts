export const getSearchParams = (
  locationPath: string,
  params: unknown[] = []
) => {
  const result: string[] = [];
  const searchParams = new URLSearchParams(locationPath);

  params.forEach((key: string) => result.push(searchParams.get(key)));

  return result;
};
