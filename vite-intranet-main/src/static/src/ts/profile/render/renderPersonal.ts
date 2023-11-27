import {
  templateMessageHiddenData,
  getMessageNoInformaion,
} from "./templatesMessage";

import { TYPE_PROFILE_PERSONAL } from "../../TYPES";

import { mounth } from "../types";

// Рендер персональных данных
export const renderPersonalData = (
  personalData: TYPE_PROFILE_PERSONAL,
  role: string | undefined = undefined
) => {
  const personalBlock: HTMLElement = document.querySelector("#personalData");
  const parent: HTMLElement = personalBlock.closest(".profile-data__container");
  const buttonVisible: HTMLButtonElement = parent.querySelector(
    ".profile-visible-button"
  );
  personalBlock.innerHTML = "";
  const template = document.querySelector(
    ".profile__personal-template"
  ) as HTMLTemplateElement;
  const templateClone = template.content.cloneNode(true) as HTMLElement;
  personalBlock.appendChild(templateClone);

  const render = () => {
    if (!!!personalData.birthday) {
      personalBlock.querySelector("#personalData-birthday").textContent =
        getMessageNoInformaion();
    } else {
      if (personalData.visibleYear) {
        personalBlock.querySelector("#personalData-birthday").textContent =
          personalData.birthday.split("-").reverse().join(".");
        parent.dataset.visbleYear = "true";
      } else {
        personalBlock.querySelector("#personalData-birthday").textContent = `${
          personalData.birthday.split("-")[2]
        }  ${mounth[+personalData.birthday.split("-")[1]]}`;
        parent.dataset.visbleYear = "false";
      }
    }

    personalBlock.querySelector("#personalData-phone").textContent =
      personalData.mobile !== null
        ? personalData.mobile
        : getMessageNoInformaion();
    personalBlock.querySelector("#personalData-email").textContent =
      personalData.email !== null
        ? personalData.email
        : getMessageNoInformaion();
    personalBlock.querySelector("#personalData-birthplace").textContent =
      personalData.birthplace !== null
        ? personalData.birthplace
        : getMessageNoInformaion();
  };

  if (personalData.visible) {
    render();
    parent.classList.remove("profile__hidden-data");
    buttonVisible ? (buttonVisible.dataset.status = "visible") : "";
  } else if (!personalData.visible && role === "user") {
    personalBlock.innerHTML = templateMessageHiddenData;
    buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
  } else if (
    (!personalData.visible && role === "admin") ||
    (!personalData.visible && role === undefined)
  ) {
    render();
    parent.classList.add("profile__hidden-data");
    buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
  }
};
