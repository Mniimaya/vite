export const getAge = (date: string) => {
  const yearOfBirth = new Date(date).getFullYear();
  const nowYear = new Date().getFullYear();
  const age = nowYear - yearOfBirth;

  console.log(yearOfBirth, nowYear, age);

  if (
    age === 18 ||
    age === 19 ||
    age === 20 ||
    age === 25 ||
    age === 26 ||
    age === 27 ||
    age === 28 ||
    age === 29 ||
    age === 30 ||
    age === 35 ||
    age === 36 ||
    age === 37 ||
    age === 38 ||
    age === 39 ||
    age === 40 ||
    age === 45 ||
    age === 46 ||
    age === 47 ||
    age === 48 ||
    age === 49 ||
    age === 50 ||
    age === 55 ||
    age === 56 ||
    age === 57 ||
    age === 58 ||
    age === 59 ||
    age === 60 ||
    age === 65 ||
    age === 66 ||
    age === 67 ||
    age === 68 ||
    age === 69 ||
    age === 70 ||
    age === 75 ||
    age === 76 ||
    age === 77 ||
    age === 78 ||
    age === 79 ||
    age === 80 ||
    age === 85 ||
    age === 86 ||
    age === 87 ||
    age === 88 ||
    age === 89 ||
    age === 90 ||
    age === 95 ||
    age === 96 ||
    age === 97 ||
    age === 98 ||
    age === 99
  ) {
    return `${age} лет`;
  }

  return `${age} год`;
};
