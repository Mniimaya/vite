import { TYPE_PROFILE_TRANSPORT } from "../../TYPES";
import {
  templateMessageHiddenData,
  templateMessageNoData,
} from "./templatesMessage";

// Рендер транспорта
export const renderTransportData = (
  transportData: TYPE_PROFILE_TRANSPORT[],
  role: string | undefined = undefined
) => {
  const transportBlock: HTMLElement = document.querySelector("#transportData");
  const parent: HTMLElement = transportBlock.closest(
    ".profile-data__container"
  );
  const buttonVisible: HTMLButtonElement = parent.querySelector(
    ".profile-visible-button"
  );

  const render = () => {
    transportData.forEach((transport: TYPE_PROFILE_TRANSPORT) => {
      if (transport.status === true) {
        const transportItem: HTMLElement = document.createElement("li");
        transportItem.classList.add(
          "profile-data__transport-item",
          `${
            transport.type === "Автомобиль"
              ? "profile-data__transport-item--car"
              : "profile-data__transport-item--motorbike"
          }`
        );
        transportItem.innerHTML = `
              <div class="profile-data__transport-type-wrapper">
              <span class="profile-data__transport-type-icon"></span>
              <span class="profile-data__transport-type">${transport.type}</span>
          </div>
          <div class="profile-data__transport-content">
              <p class="profile-data__transport-number">${transport.number}</p>
              <p>Марка авто: <span>${transport.brand}</span> </p>
              <p>Модель: <span>${transport.model}</span></p>
          </div>
            `;

        transportBlock.appendChild(transportItem);
      }
    });
  };

  if (!!transportData.length) {
    transportBlock.innerHTML = "";
    buttonVisible ? (buttonVisible.style.display = "block") : "";
    if (transportData[0].visible) {
      parent.classList.remove("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "visible") : "";
      render();
    } else if (!transportData[0].visible && role === "user") {
      transportBlock.innerHTML = templateMessageHiddenData;
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    } else if (
      (!transportData[0].visible && role === "admin") ||
      (!transportData[0].visible && role === undefined)
    ) {
      buttonVisible ? (buttonVisible.style.display = "block") : "";
      render();
      parent.classList.add("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    }
  } else {
    transportBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    transportBlock.innerHTML = templateMessageNoData;
    buttonVisible ? (buttonVisible.style.display = "none") : "";
  }
};
