import type { TYPE_ADDRESS } from "../../../../../types/address";

// Templates;
const template = document.querySelector(
  `.template--vacancy-card--metro`
) as HTMLTemplateElement;

export const createMetro = (
  container: HTMLElement,
  addresses: TYPE_ADDRESS[]
) => {
  if (addresses.length === 0) {
    container.textContent = `Адрес не указан`;
    return;
  }

  addresses.forEach((item) => {
    const metroLiElement = (template.content.cloneNode(true) as HTMLElement)
      .firstElementChild;

    const metroValueElement = metroLiElement.querySelector(
      `.vacancy-card__details-metro-value`
    );

    const { metro } = item;

    metroValueElement.textContent = metro || `Не указано`;

    container.append(metroLiElement);
  });
};
