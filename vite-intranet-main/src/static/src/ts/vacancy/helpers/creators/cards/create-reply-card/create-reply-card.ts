// Helpers;
import { VACANCY_ADMINISTRATOR_ROLE } from "../../../../const";
import { getAge } from "./helpers/get-age";
import { formatDate } from "./helpers/format-date";

// Templates;
const template = document.querySelector(
  `.template--card--reply`
) as HTMLTemplateElement;

export const createReplyCard = (
  data: any,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  const cardElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  // Find elements;
  const dateOfResponseElement = cardElement.querySelector(
    `.vacancy-card__date-value`
  );
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
  const coverLetterElement = cardElement.querySelector(
    `.vacancy-card__letter-value`
  );

  // Fill elements;
  dateOfResponseElement.textContent = formatDate(data.date_response);
  avatarImageElement.src = data.avatar_src;
  fullNameElement.textContent = data.full_name;
  ageElement.textContent = getAge(data.date_of_birth);
  vacancyLink.href = data.vacancy_link;
  vacancyAddressValueElement.textContent = data.priority_address;
  coverLetterElement.textContent = `${data.cover_letter.slice(0, 155)}...`;

  return cardElement;
};
