export const debounce = (
  callback: (context: undefined) => void,
  timeoutDelay = 700
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...rest: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(undefined, rest), timeoutDelay);
  };
};
