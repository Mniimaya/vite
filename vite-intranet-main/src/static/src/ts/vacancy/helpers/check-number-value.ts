export const checkNumberValue = (value: string | null | number) => {
  if (value === `` || value === null) {
    return null;
  }

  if (Number.isInteger(Number(value))) {
    return Number(value);
  }
}
