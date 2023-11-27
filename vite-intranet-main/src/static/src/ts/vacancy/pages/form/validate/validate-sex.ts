import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [RadioNodeList, HTMLInputElement];

export const validateSex = (
  [radios, checkbox]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: [HTMLElement | RadioNodeList]
) => {
  if (checkbox.checked) {
    return;
  }

  if (radios.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Выберите значение`;
    errors.push(radios);
  }
};
