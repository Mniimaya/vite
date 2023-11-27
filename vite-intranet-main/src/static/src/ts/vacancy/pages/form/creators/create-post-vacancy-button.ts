export const createPostVacancyButton = () => {
  const button = document.createElement(`button`);
  button.className = `vacancy-form-button vacancy-form-button--post`;
  button.textContent = `Размещение вакансии`;

  return button;
};
