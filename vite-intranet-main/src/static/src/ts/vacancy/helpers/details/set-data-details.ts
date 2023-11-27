// Helpers;
import { createAddress } from "../creators/details/create-address";
import { createSalary } from "../creators/details/create-salary";
import { setDataContent } from "./set-data-content";
import { setDataContacts } from "./set-data-contacts";
import { EducationToText, ExperienceToText } from "../../const";

// Types;
import type { TYPE_REQUEST } from "../../types/request";

export const setDataDetails = (parent: HTMLElement, data: TYPE_REQUEST) => {
  const { functional, wishes, advantages, offering } = data;

  // Elements;
  const titleElement = parent.querySelector(
    `.vacancy-details__title`
  ) as HTMLElement;
  const experienceValue = parent.querySelector(
    `.vacancy-details__experience-value`
  ) as HTMLElement;
  const educationValue = parent.querySelector(
    `.vacancy-details__education-value`
  ) as HTMLElement;
  const salaryContainer = parent.querySelector(
    `.vacancy-details__salary`
  ) as HTMLElement;
  const addressContainer = parent.querySelector(
    `.vacancy-details__list--addresses`
  ) as HTMLElement;
  const contentContainer = parent.querySelector(
    `.vacancy-details__content`
  ) as HTMLElement;
  const contactsContainer = parent.querySelector(
    `.vacancy-details__contacts`
  ) as HTMLElement;
  const dateOfPublication = parent.querySelector(
    `.vacancy-details__date-value`
  );

  // Buttons;
  const replyButton = parent.querySelector(`.vacancy-details__button--reply`);

  // Fill;
  titleElement.textContent =
    data.name_of_vacancy || `Название вакансии не указано`;
  experienceValue.textContent =
    ExperienceToText[data.experience] || `Не указан`;
  educationValue.textContent = EducationToText[data.education] || `Не указан`;
  dateOfPublication.textContent = data.date_publication || `Не указана`;

  // Events;
  replyButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    console.log(`click`);
  });

  // Creators;
  createAddress(addressContainer, data.addresses);
  createSalary(salaryContainer, {
    isChecked: data.salary_checked,
    isGross: data.salary_gross === 1,
    min: data.salary_min,
    max: data.salary_max,
  });
  setDataContent(contentContainer, {
    functional,
    wishes,
    advantages,
    offering,
  });
  setDataContacts(contactsContainer, []);
};
