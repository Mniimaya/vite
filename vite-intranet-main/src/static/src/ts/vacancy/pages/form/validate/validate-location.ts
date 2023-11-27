import { VACANCY_HELPERS_ERROR } from "../../../const";

export const validateLocation = (
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
      const statusInput = component.querySelector(
        `.vacancy-form-input--status`
      ) as HTMLInputElement;

      if (statusInput.value && Number(statusInput.value) === 1) {
        return;
      }

      const regionInput = component.querySelector(
        `.vacancy-form-input--region`
      ) as HTMLInputElement;
      const addressInput = component.querySelector(
        `.vacancy-form-input--address`
      ) as HTMLInputElement;

      const regionItem = regionInput.closest(`.vacancy-form-item`);
      const addressItem = addressInput.closest(`.vacancy-form-item`);

      if (regionInput.value.trim() === ``) {
        regionItem.classList.add(VACANCY_HELPERS_ERROR);
        errors.push(regionInput);
      }

      if (addressInput.value.trim() === ``) {
        addressItem.classList.add(VACANCY_HELPERS_ERROR);
        errors.push(addressInput);
      }
    });
  });
};
