import { TYPE_PROFILE_DOCUMENT } from "../../TYPES";
import {
  templateMessageHiddenData,
  templateMessageNoData,
} from "../render/templatesMessage";

// Рендер личных документов
export const renderDocumentsData = (
  documentsData: TYPE_PROFILE_DOCUMENT[],
  role: string | undefined = undefined
) => {
  const documentsBlock: HTMLElement = document.querySelector("#documentsData");
  const parent: HTMLElement = documentsBlock.closest(
    ".profile-data__container"
  );
  const buttonVisible: HTMLButtonElement = parent.querySelector(
    ".profile-visible-button"
  );

  const render = () => {
    documentsData.forEach((documentData: TYPE_PROFILE_DOCUMENT) => {
      const documentItem: HTMLElement = document.createElement("li");
      documentItem.innerHTML = `
                <span>${documentData.name}</span>
                <p>Серия и номер: <span>${documentData.serial} ${
        documentData.number
      }</span></p>
                <p>Дата выдачи: <span>${documentData.date_off_issue}</span></p>
                
                ${
                  documentData.name.toLowerCase() === "паспорт"
                    ? `
                    <p>Код подразделения: <span>${documentData.division_code}</span></p>
                    
                    `
                    : ""
                }
                <p>Кем выдан: <span>${documentData.issued_by}</span></p>
                `;
      documentsBlock.appendChild(documentItem);
    });
  };
  if (!!documentsData.length) {
    documentsBlock.innerHTML = "";

    if (documentsData[0].visible) {
      parent.classList.remove("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "visible") : "";
      render();
    } else if (!documentsData[0].visible && role === "user") {
      documentsBlock.innerHTML = templateMessageHiddenData;
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    } else if (
      (!documentsData[0].visible && role === "admin") ||
      (!documentsData[0].visible && role === undefined)
    ) {
      buttonVisible ? (buttonVisible.style.display = "block") : "";
      render();
      parent.classList.add("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    }
  } else {
    documentsBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    documentsBlock.innerHTML = templateMessageNoData;
    buttonVisible ? (buttonVisible.style.display = "none") : "";
  }
};
