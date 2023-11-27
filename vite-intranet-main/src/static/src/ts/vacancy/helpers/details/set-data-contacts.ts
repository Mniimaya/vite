// Helpers;
import { VACANCY_HELPERS_HIDDEN } from "../../const";

// Types;
import type { TYPE_PARTICIPANT } from "../../types/participant";

const template = document.querySelector(
  `.template-vacancy-details--contacts-item`
) as HTMLTemplateElement;

export const setDataContacts = (
  container: HTMLElement,
  participant: TYPE_PARTICIPANT[] | []
) => {
  const contactsList = container.querySelector(
    `.vacancy-details__list--contacts`
  );

  if (participant.length === 0) {
    container.classList.add(VACANCY_HELPERS_HIDDEN);
  } else {
    participant.forEach((item) => {
      // Скопировать template;
      // Добавить данные;
      // Добавить элемент в contactsList;
    });
  }
};
