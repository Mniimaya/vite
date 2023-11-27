import type { TYPE_ADDRESS } from "../../../../../types/address";

// Template;
const template = document.querySelector(
  `.template--vacancy-card--address`
) as HTMLTemplateElement;

export const createAddresses = (
  container: HTMLElement,
  addresses: TYPE_ADDRESS[]
) => {
  if (addresses.length === 0) {
    container.textContent = `Адрес не указан`;
    return;
  }

  addresses.forEach((item) => {
    const addressLiElement = (template.content.cloneNode(true) as HTMLElement)
      .firstElementChild;
    const addressValueElement = addressLiElement.querySelector(
      `.vacancy-card__addresses-value`
    );

    const { region, address } = item;

    if (region && address) {
      addressValueElement.textContent = `${region}, ${address}`;
      container.append(addressLiElement);
      return;
    }

    addressValueElement.textContent = `Адрес не указан`;

    container.append(addressLiElement);
  });
};
