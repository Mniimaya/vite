import { VACANCY_HELPERS_ERROR } from "../../../const";

type TYPE_ELEMENTS = [HTMLInputElement];

export const validateEmployeesQuantity = (
  [input]: TYPE_ELEMENTS,
  parent: HTMLElement,
  textContainer: HTMLElement,
  errors: HTMLElement[]
) => {
  if (input.value.trim() === ``) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Поле не заполнено`;
    errors.push(input);
    return;
  }

  if (Number(input.value) < 0) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Мин.значение 1`;
    errors.push(input);
    return;
  }

  if (Number(input.value) > 99) {
    parent.classList.add(VACANCY_HELPERS_ERROR);
    textContainer.textContent = `Макс.значение 99`;
    errors.push(input);
    return;
  }
};
