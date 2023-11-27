// Helpers;
import { VACANCY_ADMINISTRATOR_ROLE } from "../../../../const";
import { createHrActions } from "./helpers/create-hr-actions";
import { getApplicant } from "./helpers/get-applicant";

// Templates;
const template = document.querySelector(
  `.template--card--draft`
) as HTMLTemplateElement;

export const createDraftCard = (
  data: any,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  const cardElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  // Find elements;
  const vacancyTitleElement = cardElement.querySelector(
    `.vacancy-card__title`
  ) as HTMLElement;
  const dateOfCreated = cardElement.querySelector(`.vacancy-card__date-value`);
  const applicantValueElement = cardElement.querySelector(
    `.vacancy-card__applicant-value`
  ) as HTMLElement;
  const headerElement = cardElement.querySelector(
    `.vacancy-card__header`
  ) as HTMLElement;

  // Fill;
  vacancyTitleElement.textContent =
    data.name_of_vacancy || `Название вакансии не указано`;
  dateOfCreated.textContent =
    new Date(data.createdAt).toISOString().split("T")[0] || `Дата не указана`;
  applicantValueElement.textContent = getApplicant(data.participants);

  if (
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.HR ||
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.SUPER_USER
  ) {
    createHrActions(headerElement, { id: data.id });
  }

  return cardElement;
};
