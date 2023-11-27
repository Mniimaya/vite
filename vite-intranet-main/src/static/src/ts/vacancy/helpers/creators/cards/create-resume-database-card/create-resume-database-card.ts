// Helpers;
import { VACANCY_ADMINISTRATOR_ROLE } from "../../../../const";
import { getAge } from "./helpers/get-age";

// Templates;
const template = document.querySelector(
  `.template--card--resume-database-card`
) as HTMLTemplateElement;

export const createResumeDatabaseCard = (
  data: any,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  const cardElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  // Find elements;
  const avatarImageElement = cardElement.querySelector(
    `.vacancy-card__personal-avatar img`
  ) as HTMLImageElement;
  const fullNameElement = cardElement.querySelector(
    `.vacancy-card__personal-fullname`
  );
  const ageElement = cardElement.querySelector(`.vacancy-card__personal-age`);
  const vacancyLink = cardElement.querySelector(
    `.vacancy-card__about-link`
  ) as HTMLAnchorElement;
  const vacancyAddressValueElement = cardElement.querySelector(
    `.vacancy-card__address-value`
  );

  // Fill elements;
  avatarImageElement.src = data.avatar_src;
  fullNameElement.textContent = data.full_name;
  ageElement.textContent = getAge(data.date_of_birth);
  vacancyLink.href = data.vacancy_link;
  vacancyAddressValueElement.textContent = data.priority_address;

  return cardElement;
};
