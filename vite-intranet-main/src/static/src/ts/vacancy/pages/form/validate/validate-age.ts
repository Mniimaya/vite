import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [[HTMLInputElement, HTMLInputElement], HTMLInputElement];

export const validateAge = (
  [[ageMinInput, ageMaxInput], checkbox]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: HTMLElement[]
) => {
  if (checkbox.checked) {
    return;
  }

  if (ageMinInput.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле "от" не заполнено`;
    errors.push(ageMinInput);
    return;
  }

  if (ageMaxInput.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле "до" не заполнено`;
    errors.push(ageMaxInput);
    return;
  }

  if (Number(ageMinInput.value) < 16) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Мин.значение "от" - 16`;
    errors.push(ageMinInput);
    return;
  }

  if (Number(ageMaxInput.value) < 16) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Мин.значение "до" - 16`;
    errors.push(ageMinInput);
    return;
  }

  if (Number(ageMinInput.value) > 99) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Макс.значение "от" - 99`;
    errors.push(ageMinInput);
    return;
  }

  if (Number(ageMaxInput.value) > 99) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Макс.значение "до" - 99`;
    errors.push(ageMinInput);
    return;
  }

  if (Number(ageMinInput.value) > Number(ageMaxInput.value)) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Значение "до" должно быть больше значения "от"`;
    errors.push(ageMinInput);
    return;
  }
};
