// Helpers;
import { createAddresses } from "./helpers/create-addresses";
import { createMetro } from "./helpers/create-metro";
import { createSalary } from "./helpers/create-salary";
import { createHrActions } from "./helpers/create-hr-actions";
import { getHr } from "./helpers/get-hr";
import {
  ExperienceToText,
  VacancyPage,
  VACANCY_ADMINISTRATOR_ROLE,
} from "../../../../const";

// Templates;
const template = document.querySelector(
  `.template--card--vacancy`
) as HTMLTemplateElement;

export const createVacancyCard = (
  data: any,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  const cardElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild as HTMLAnchorElement;

  cardElement.href = `/service/vacancy/${VacancyPage.DETAILS}?id=${data.id}`;

  // Find elements;
  const datePublicationElement = cardElement.querySelector(
    `.vacancy-card__date-value`
  ) as HTMLElement;
  const vacancyTitleElement = cardElement.querySelector(
    `.vacancy-card__title`
  ) as HTMLElement;
  const addressesListElement = cardElement.querySelector(
    `.vacancy-card__addresses-list`
  ) as HTMLElement;
  const hrNameElement = cardElement.querySelector(
    `.vacancy-card__actions-hr-value`
  ) as HTMLElement;
  const salaryElement = cardElement.querySelector(
    `.vacancy-card__details-salary`
  ) as HTMLElement;
  const experienceElement = cardElement.querySelector(
    `.vacancy-card__details-experience-value`
  ) as HTMLElement;
  const metroListElement = cardElement.querySelector(
    `.vacancy-card__details-metro-list`
  ) as HTMLElement;
  const actionsElement = cardElement.querySelector(
    `.vacancy-card__actions`
  ) as HTMLElement;

  // Fill;
  datePublicationElement.textContent = data.date_publication || `Не указана`;
  vacancyTitleElement.textContent =
    data.name_of_vacancy || `Название вакансии не указано`;
  hrNameElement.textContent = getHr(data.participants);
  experienceElement.textContent =
    ExperienceToText[data.experience] || `Не указан`;

  createAddresses(addressesListElement, data.addresses);
  createMetro(metroListElement, data.addresses);
  createSalary(salaryElement, {
    isChecked: data.salary_checked,
    isGross: data.salary_gross === 1,
    min: data.salary_min,
    max: data.salary_max,
  });

  if (
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.HR ||
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.SUPER_USER
  ) {
    createHrActions(actionsElement, { id: data.id });
  }

  return cardElement;
};
