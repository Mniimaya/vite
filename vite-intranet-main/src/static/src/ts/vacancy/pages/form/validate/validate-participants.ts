import { VACANCY_HELPERS_ERROR } from "../../../const";

export const validateParticipants = (
  containers: HTMLElement[] | [],
  errors: HTMLElement[]
) => {
  if (containers.length === 0) {
    return;
  }

  containers.forEach((container: HTMLElement) => {
    if (container.children.length === 0) {
      return;
    }

    Array.from(container.children).forEach((component) => {
      const roleSelect = component.querySelector(
        `.vacancy-form-select--role`
      ) as HTMLSelectElement;

      const fullNameInput = component.querySelector(
        `.vacancy-form-input--fullname `
      ) as HTMLInputElement;
      const accountNumberInput = component.querySelector(
        `.vacancy-form-input--account-number`
      ) as HTMLInputElement;
      const isEditedInput = component.querySelector(
        `.vacancy-form-input--is-edited`
      ) as HTMLInputElement;
      const statusInput = component.querySelector(
        `.vacancy-form-input--status`
      ) as HTMLInputElement;

      const roleItem = roleSelect.closest(`.vacancy-form-item`);
      const fullNameItem = fullNameInput.closest(`.vacancy-form-item`);

      if (Number(statusInput.value) === 1) {
        return;
      }

      if (roleSelect.value.trim() === ``) {
        roleItem.classList.add(VACANCY_HELPERS_ERROR);
        errors.push(roleSelect);
      }

      if (
        fullNameInput.value.trim() === `` ||
        accountNumberInput.value.trim() === ``
      ) {
        fullNameItem.classList.add(VACANCY_HELPERS_ERROR);
        errors.push(fullNameInput);
      }
    });
  });
};
