import { TYPE_PROFILE_WORK } from "../../TYPES";
import {
  templateMessageHiddenData,
  templateMessageNoData,
} from "../render/templatesMessage";

// Рендер трудовой деятельности
export const renderWorksData = (
  worksData: TYPE_PROFILE_WORK[],
  role: string | undefined = undefined
) => {
  const worksBlock: HTMLElement = document.querySelector("#worksData");
  const parent: HTMLElement = worksBlock.closest(".profile-data__container");
  const buttonVisible: HTMLButtonElement = parent.querySelector(
    ".profile-visible-button"
  );

  const render = () => {
    worksData.forEach((work: TYPE_PROFILE_WORK) => {
      const workItem: HTMLElement = document.createElement("li");
      workItem.innerHTML = `
              <div class="profile-data__job-time">
                  <p>
                      <span>${work.date_start
                        .split("-")
                        .reverse()
                        .join(".")}</span>&nbsp;–<br>
                      <span>${work.date_end
                        .split("-")
                        .reverse()
                        .join(".")}</span>
                  </p>
                  <span></span>
              </div>
              <div class="profile-data__job-content">
                  <p class="profile-data__job-name">${work.company}</p>
                  <p>Должность: <span>${work.title}</span></p>
                  ${
                    work.department
                      ? "<p>Отдел: <span>" + work.department + "</span></p>"
                      : ""
                  }
                  
                  <p>Должностные обязанности: <span>${
                    work.responsibility
                  }</span></p>
              </div>
              `;

      worksBlock.appendChild(workItem);
    });
  };
  if (!!worksData.length) {
    worksBlock.innerHTML = "";

    if (worksData[0].visible) {
      parent.classList.remove("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "visible") : "";
      render();
    } else if (!worksData[0].visible && role === "user") {
      worksBlock.innerHTML = templateMessageHiddenData;
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    } else if (
      (!worksData[0].visible && role === "admin") ||
      (!worksData[0].visible && role === undefined)
    ) {
      buttonVisible ? (buttonVisible.style.display = "block") : "";
      render();
      parent.classList.add("profile__hidden-data");
      buttonVisible ? (buttonVisible.dataset.status = "hidden") : "";
    }
  } else {
    worksBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    worksBlock.innerHTML = templateMessageNoData;
    buttonVisible ? (buttonVisible.style.display = "none") : "";
  }
};
