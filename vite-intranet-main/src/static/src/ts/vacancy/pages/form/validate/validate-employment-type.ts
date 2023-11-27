import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [RadioNodeList];

export const validateEmploymentType = (
  [radios]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: [HTMLElement | RadioNodeList]
) => {
  if (radios.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Выберите значение`;
    errors.push(radios);
  }
};
