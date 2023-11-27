import { TYPE_PROFILE_EDUCATION } from "../../TYPES";
import {
  templateMessageNoData,
  templateMessageHiddenData,
} from "./templatesMessage";

// Рендер образования
export const renderEducationsData = (
  educationsData: TYPE_PROFILE_EDUCATION[],
  role: string | undefined = undefined
) => {
  const educationBlock: HTMLElement = document.querySelector("#educationData");
  const parent: HTMLElement = educationBlock.closest(
    ".profile-data__container"
  );
  const buttonVisible: HTMLButtonElement = parent.querySelector(
    ".profile-visible-button"
  );

  const render = () => {
    educationsData.forEach((education: TYPE_PROFILE_EDUCATION) => {
      if (education.status === true) {
        const item: HTMLElement = document.createElement("li");
        item.classList.add("profile-data__education-item");
        item.innerHTML = `
          <div class="profile-data__education">
          <span class="profile-data__education-date">
          ${education.date_off_issue.substring(4, -1)}</span>
          <span class="profile-data__education-type">${education.degree}</span>
          </div>
          <ul class="profile-data__education-inner-list">
          <li class="profile-data__education-name">
              ${education.university}
          </li>
          <li>
              <p>Факультет: <span>${education.faculty}</span></p>
          </li>
          <li>
              <p>Специальность: <span>${education.specialization}</span></p>
          </li>
          </ul>
      `;

        educationBlock.appendChild(item);
      }
    });
  };

  if (!!educationsData.length) {
    educationBlock.innerHTML = "";

    if (educationsData[0].visible) {
      parent.classList.remove("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "visible") : "";
      render();
    } else if (!educationsData[0].visible && role === "user") {
      educationBlock.innerHTML = templateMessageHiddenData;
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    } else if (
      (!educationsData[0].visible && role === "admin") ||
      (!educationsData[0].visible && role === undefined)
    ) {
      buttonVisible ? (buttonVisible.style.display = "block") : "";
      render();
      parent.classList.add("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    }
  } else {
    educationBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    educationBlock.innerHTML = templateMessageNoData;
    buttonVisible ? (buttonVisible.style.display = "none") : "";
  }
};
