const options: {} = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

export const transformationDate = (str: string): string => {
  let date = new Date(str);
  return date.toLocaleString("ru", options);
};
