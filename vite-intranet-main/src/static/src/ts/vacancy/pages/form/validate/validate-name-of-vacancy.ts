import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [HTMLInputElement, HTMLInputElement];

export const validateNameOfVacancy = (
  [input, checkbox]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: HTMLElement[]
) => {
  if (checkbox.checked) {
    return;
  }

  if (input.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле не заполнено`;
    errors.push(input);
  }
};
