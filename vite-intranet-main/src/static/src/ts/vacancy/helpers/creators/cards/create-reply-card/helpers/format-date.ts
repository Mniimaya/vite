export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const day =
    dateObj.getDay() > 0 && dateObj.getDay() < 10
      ? `0${dateObj.getDay()}`
      : dateObj.getDay();
  const month =
    dateObj.getMonth() > 0 && dateObj.getMonth() < 10
      ? `0${dateObj.getMonth()}`
      : dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};
