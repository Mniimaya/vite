import { VACANCY_HELPERS_ERROR, VACANCY_HELPERS_HIDDEN } from "../../const";
// Types;
import type { TYPE_ADDRESS } from "../../types/address";

const locationComponentTemplate = document.querySelector(
  `.template--location-component`
) as HTMLTemplateElement;

export const addLocation = (
  container: HTMLElement,
  data: TYPE_ADDRESS | null = null
) => {
  const locationComponentElement = (
    locationComponentTemplate.content.cloneNode(true) as HTMLElement
  ).firstElementChild;
  const deleteButton = locationComponentElement.querySelector(
    `.vacancy-form-button--delete-location`
  );

  const regionInput = locationComponentElement.querySelector(
    `.vacancy-form-input--region`
  ) as HTMLInputElement;
  const addressInput = locationComponentElement.querySelector(
    `.vacancy-form-input--address`
  ) as HTMLInputElement;
  const metroInput = locationComponentElement.querySelector(
    `.vacancy-form-input--metro`
  ) as HTMLInputElement;
  const statusInput = locationComponentElement.querySelector(
    `.vacancy-form-input--status`
  ) as HTMLInputElement;
  const idRequestInput = locationComponentElement.querySelector(
    `.vacancy-form-input--id-request`
  ) as HTMLInputElement;
  const idAddressInput = locationComponentElement.querySelector(
    `.vacancy-form-input--id-address`
  ) as HTMLInputElement;

  if (data) {
    regionInput.value = data.region;
    addressInput.value = data.address;
    metroInput.value = data.metro;
    statusInput.value = `${data.status}`;
    idRequestInput.value = `${data.id_request}`;
    idAddressInput.value = `${data.id}`;
  }

  [regionInput, addressInput, metroInput].forEach((input) => {
    const wrapperElement = input.closest(`.vacancy-form-item__wrapper`);

    // Clear button;
    const clearButton = wrapperElement.querySelector(
      `.vacancy-form-button--clear`
    );

    clearButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      input.value = ``;

      clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
    });

    input.addEventListener(`input`, () => {
      const parentItem = input.closest(`.vacancy-form-item`);
      const parentComponent = input.closest(`.vacancy-form-component`);

      if (parentItem) {
        parentItem.classList.remove(VACANCY_HELPERS_ERROR);
      }

      if (parentComponent) {
        parentComponent.classList.remove(VACANCY_HELPERS_ERROR);
      }

      if (input.value) {
        clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
      } else {
        clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
      }
    });
  });

  deleteButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    statusInput.value = `1`;
    locationComponentElement.classList.add(VACANCY_HELPERS_HIDDEN);
  });

  container.append(locationComponentElement);
};
