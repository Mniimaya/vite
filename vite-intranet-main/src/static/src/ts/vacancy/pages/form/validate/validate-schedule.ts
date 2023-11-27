import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [HTMLSelectElement];

export const validateSchedule = (
  [select]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: HTMLElement[]
) => {
  if (select.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Выберите один за варинатов`;
    errors.push(select);
    return;
  }
};
