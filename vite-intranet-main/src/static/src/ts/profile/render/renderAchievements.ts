import { TYPE_PROFILE_ACHIEVEMENT } from "../../TYPES";
import {
  templateMessageHiddenData,
  templateMessageNoData,
} from "./templatesMessage";

// Рендер достижений
export const renderAchievementsData = (
  achievementsData: TYPE_PROFILE_ACHIEVEMENT[],
  role: string | undefined = undefined
) => {
  const mainCareerBlock: HTMLElement = document.querySelector(
    '.profile-data__container[data-category="career-achievements"]'
  );
  const mainPersonalBlock: HTMLElement = document.querySelector(
    '.profile-data__container[data-category="personal-achievements"]'
  );
  const personalAchievementsBlock: HTMLElement = document.querySelector(
    "#personal-achievements"
  );
  const parentPersonal: HTMLElement = personalAchievementsBlock.closest(
    ".profile-data__container"
  );
  const buttonVisiblePersonal: HTMLButtonElement = parentPersonal.querySelector(
    ".profile-visible-button"
  );

  const careerAchievementsBlock: HTMLElement = document.querySelector(
    "#career-achievements"
  );

  const parentCareer: HTMLElement = careerAchievementsBlock.closest(
    ".profile-data__container"
  );
  const buttonVisibleCareer: HTMLButtonElement = parentCareer.querySelector(
    ".profile-visible-button"
  );

  if (!!achievementsData.length) {
    const personalItems = achievementsData.filter(
      (item) => item.kind === "Personal" && item.status === true
    );
    const careerItems = achievementsData.filter(
      (item) => item.kind === "Career" && item.status === true
    );

    const renderPersonal = () => {
      personalItems.forEach((item) => {
        const achievementsItem = document.createElement("li");
        achievementsItem.innerHTML = `
          <div class="profile-data__career-achievements-date" data-type="${item.type}">
              <p>${item.year}</p>
              <span></span>
          </div>
          <div class="profile-data__career-achievements-content">
            <span>${item.type}</span>
            <p>${item.description}</p>
          </div>
          `;
        personalAchievementsBlock.appendChild(achievementsItem);
      });
    };
    const visibleButton = mainPersonalBlock.querySelector(
      ".profile-visible-button"
    ) as HTMLButtonElement;
    if (!!!personalItems.length) {
      visibleButton ? (visibleButton.style.display = "none") : "";
      personalAchievementsBlock.innerHTML = "";

      personalAchievementsBlock
        .closest(".profile-data__container")
        .classList.remove("profile__hidden-data");
      personalAchievementsBlock.innerHTML = templateMessageNoData;
    } else {
      personalAchievementsBlock.innerHTML = "";
      visibleButton ? (visibleButton.style.display = "block") : "";
      if (personalItems[0].visible) {
        parentPersonal.classList.remove("profile__hidden-data");
        visibleButton ? (visibleButton.dataset.status = "visible") : "";
        renderPersonal();
      } else if (!personalItems[0].visible && role === "user") {
        personalAchievementsBlock.innerHTML = templateMessageHiddenData;
        visibleButton ? (visibleButton.dataset.status = "hidden") : "";
      } else if (
        (!personalItems[0].visible && role === "admin") ||
        (!personalItems[0].visible && role === undefined)
      ) {
        visibleButton ? (visibleButton.style.display = "block") : "";
        renderPersonal();
        parentPersonal.classList.add("profile__hidden-data");
        visibleButton ? (visibleButton.dataset.status = "hidden") : "";
      }
    }

    const renderCareer = () => {
      careerItems.forEach((item) => {
        const achievementsItem = document.createElement("li");
        achievementsItem.innerHTML = `
          <div class="profile-data__career-achievements-date" data-type="${item.type}">
              <p>${item.year}</p>
              <span></span>
          </div>
          <div class="profile-data__career-achievements-content">
            <span>${item.type}</span>
            <p>${item.description}</p>
          </div>
          `;
        careerAchievementsBlock.appendChild(achievementsItem);
      });
    };

    const visibleButtonCareer = mainCareerBlock.querySelector(
      ".profile-visible-button"
    ) as HTMLButtonElement;

    if (!!!careerItems.length) {
      visibleButtonCareer ? (visibleButtonCareer.style.display = "none") : "";
      careerAchievementsBlock.innerHTML = "";
      careerAchievementsBlock
        .closest(".profile-data__container")
        .classList.remove("profile__hidden-data");
      careerAchievementsBlock.innerHTML = templateMessageNoData;
    } else {
      careerAchievementsBlock.innerHTML = "";
      visibleButtonCareer ? (visibleButtonCareer.style.display = "block") : "";
      careerAchievementsBlock.innerHTML = "";
      if (careerItems[0].visible) {
        parentCareer.classList.remove("profile__hidden-data");
        visibleButtonCareer
          ? (visibleButtonCareer.dataset.status = "visible")
          : "";
        renderCareer();
      } else if (!careerItems[0].visible && role === "user") {
        careerAchievementsBlock.innerHTML = templateMessageHiddenData;
        visibleButtonCareer
          ? (visibleButtonCareer.dataset.status = "hidden")
          : "";
      } else if (
        (!careerItems[0].visible && role === "admin") ||
        (!careerItems[0].visible && role === undefined)
      ) {
        visibleButtonCareer
          ? (visibleButtonCareer.style.display = "block")
          : "";
        renderCareer();
        parentCareer.classList.add("profile__hidden-data");
        visibleButtonCareer
          ? (visibleButtonCareer.dataset.status = "hidden")
          : "";
      }
    }
  } else {
    const visibleButton = mainCareerBlock.querySelector(
      ".profile-visible-button"
    ) as HTMLButtonElement;
    visibleButton ? (visibleButton.style.display = "none") : "";
    const visibleButtonPersonal = mainPersonalBlock.querySelector(
      ".profile-visible-button"
    ) as HTMLButtonElement;
    visibleButtonPersonal ? (visibleButtonPersonal.style.display = "none") : "";
    careerAchievementsBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    personalAchievementsBlock
      .closest(".profile-data__container")
      .classList.remove("profile__hidden-data");
    personalAchievementsBlock.innerHTML = templateMessageNoData;
    careerAchievementsBlock.innerHTML = templateMessageNoData;
  }
};
