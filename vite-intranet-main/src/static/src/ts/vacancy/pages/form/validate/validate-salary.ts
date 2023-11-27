import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [
  [HTMLInputElement, HTMLInputElement],
  RadioNodeList,
  HTMLInputElement
];

export const validateSalary = (
  [[salaryMinInput, salaryMaxInput], salaryRadios, checkbox]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: [HTMLElement | RadioNodeList]
) => {
  if (checkbox.checked) {
    return;
  }

  if (salaryRadios.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Выберите значение`;
    errors.push(salaryRadios);
    return;
  }

  if (salaryMinInput.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле "от" не заполнено`;
    errors.push(salaryMinInput);
    return;
  }

  if (salaryMaxInput.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле "до" не заполнено`;
    errors.push(salaryMaxInput);
    return;
  }

  if (Number(salaryMinInput.value) < 16242) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Мин.значение "от" - 16242`;
    errors.push(salaryMinInput);
    return;
  }

  if (Number(salaryMaxInput.value) < 16242) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Мин.значение "до" - 16242`;
    errors.push(salaryMaxInput);
    return;
  }

  if (Number(salaryMinInput.value) > Number(salaryMaxInput.value)) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Значение "до" должно быть больше значения "от"`;
    errors.push(salaryMinInput);
    return;
  }
};
