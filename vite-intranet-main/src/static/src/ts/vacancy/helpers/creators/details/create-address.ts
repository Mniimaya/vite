// Helpers;
import { VACANCY_HELPERS_HIDDEN } from "../../../const";

// Types;
import type { TYPE_ADDRESS } from "../../../types/address";

const template = document.querySelector(
  `.template-vacancy-details--address-item`
) as HTMLTemplateElement;

export const createAddress = (
  container: HTMLElement,
  addresses: TYPE_ADDRESS[]
) => {
  if (addresses.length === 0) {
    return;
  }

  addresses.forEach((item) => {
    // Data;
    const { region, address, metro } = item;

    // Elements;
    const addressItemElement = (template.content.cloneNode(true) as HTMLElement)
      .firstElementChild;
    const regionElement = addressItemElement.querySelector(
      `.vacancy-details__address`
    );
    const regionValueElement = addressItemElement.querySelector(
      `.vacancy-details__address-value`
    );
    const metroElement = addressItemElement.querySelector(
      `.vacancy-details__metro`
    );
    const metroValueElement = addressItemElement.querySelector(
      `.vacancy-details__metro-value`
    );

    // Logic;
    if (address || region) {
      regionValueElement.textContent = `${region}, ${address}`;
    } else {
      regionElement.classList.add(VACANCY_HELPERS_HIDDEN);
    }

    if (metro) {
      metroValueElement.textContent = `${metro}`;
    } else {
      metroElement.classList.add(VACANCY_HELPERS_HIDDEN);
    }

    container.append(addressItemElement);
  });
};
