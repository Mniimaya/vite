// Helpers;
import { VACANCY_ADMINISTRATOR_ROLE } from "../../../../const";
// Creators;
import { createUserActions } from "./helpers/create-user-actions";
import { createHrActions } from "./helpers/create-hr-actions";
// Types;
import { SERVICES_SONO } from "../../../../../types/common";

// Templates;
const template = document.querySelector(
  `.template--card--request`
) as HTMLTemplateElement;

export const createRequestCard = (
  data: any,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  const cardElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild as HTMLAnchorElement;

  // Find elements;
  const companyValueElement = cardElement.querySelector(
    `.vacancy-card__company-value`
  );
  const vacancyTitleElement = cardElement.querySelector(
    `.vacancy-card__intro-title`
  );
  const approveStatusElement = cardElement.querySelector(
    `.vacancy-card__intro-status`
  );
  const departmentElement = cardElement.querySelector(
    `.vacancy-card__department-value`
  );
  const wrapperElement = cardElement.querySelector(
    `.vacancy-card__wrapper`
  ) as HTMLElement;

  // Fill;
  companyValueElement.textContent =
    SERVICES_SONO[data.sono as keyof typeof SERVICES_SONO] ||
    `Филиал не указан`;
  vacancyTitleElement.textContent =
    data.name_of_vacancy || `Название вакансии не указано`;
  approveStatusElement.textContent;
  departmentElement.textContent = data.department || `Не указан`;

  if (
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.HR ||
    administratorRole === VACANCY_ADMINISTRATOR_ROLE.SUPER_USER
  ) {
    createHrActions(wrapperElement, {
      id: data.id,
      status: data.status,
    });
  } else {
    createUserActions();
  }

  return cardElement;
};
