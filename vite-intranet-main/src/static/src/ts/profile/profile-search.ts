import { PhoneAPI } from "../../js/API/phoneApi.js";
import { apiPath } from "../../main.js";
import { TYPE_PROFILE_SRVICE } from "../TYPES";
import { hiddenSort, handlerClearButton, handlerSort } from "../utils/sort";
import { TYPE_SEARCH } from "../TYPES";

const sortForm: HTMLFormElement = document.querySelector(".sort-profile-form");
const searchList: HTMLElement = document.querySelector(".profile-search__list");

const serviceData: TYPE_PROFILE_SRVICE = JSON.parse(
  sessionStorage.getItem("auth")
);

// const renderHistory = () => {
//   const results2 = localStorage.getItem("phone_result");
//   const storage = JSON.parse(results2);
//   console.log(storage);
//   const container = document.querySelector(".history__list");
//   container.innerHTML = "";
//   if (storage) {
//     storage.reverse().forEach((item: TYPE_SEARCH) => {
//       const template = document.querySelector(
//         ".template-history"
//       ) as HTMLTemplateElement;
//       const templateClone = template.content.cloneNode(true) as HTMLElement;
//       const newItem = templateClone.querySelector(
//         ".history__item"
//       ) as HTMLElement;
//       newItem.querySelector(".history__sn").textContent = item.sn;
//       newItem.querySelector(".history__gn").textContent = item.givenname;
//       newItem.dataset.search = item.samaccountname;
//       newItem.dataset.sono = "Все СОНО";
//       container.appendChild(newItem);
//     });
//     handlerHistory();
//   }
// };

// const handlerHistory = () => {
//   const historyList: HTMLElement = historyBlock.querySelector(".history__list");
//   historyList.addEventListener("click", (evt) => {
//     const item = (evt.target as HTMLElement).closest("LI") as HTMLElement;
//     (
//       document.querySelector(".profile-user__input-search") as HTMLInputElement
//     ).dataset.search = item.dataset.search;
//     if (item.dataset.company) {
//       console.log("here");
//       (
//         document.querySelector(
//           ".profile-user__input-search"
//         ) as HTMLInputElement
//       ).dataset.company = item.dataset.company;
//     }
//     (
//       document.querySelector(".profile-user__select-search") as HTMLInputElement
//     ).dataset.sono = item.dataset.sono;
//     (
//       document.querySelector(".profile-user__select-search") as HTMLInputElement
//     ).value = item.dataset.sono;
//     const formData = new FormData();
//     formData.append("search", `${item.dataset.search}`);
//     formData.append("sono", `${item.dataset.sono}`);
//     PhoneAPI.postUsers(formData, renderUsers);
//   });
// };

// Стартовая загрузка сотрудников из филиала
const startingInitUsers = () => {
  const userSono = serviceData.sono;
  const data = new FormData();
  data.append("sono", userSono);
  PhoneAPI.postUsers(data, renderUsers);
};

// Очистка списка сотрудников
const clearSearchList = () => {
  searchList.innerHTML = "";
};

// Шаблон сообщения, что нет искомых сотрудников
const templateMessageNoData = (): HTMLElement => {
  const item = document.createElement("li");
  item.classList.add("profile-search__item-nodata");
  item.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M35 63C50.464 63 63 50.464 63 35C63 19.536 50.464 7 35 7C19.536 7 7 19.536 7 35C7 50.464 19.536 63 35 63ZM43.4 35C44.9464 35 46.2 33.1196 46.2 30.8C46.2 28.4804 44.9464 26.6 43.4 26.6C41.8536 26.6 40.6 28.4804 40.6 30.8C40.6 33.1196 41.8536 35 43.4 35ZM29.4 30.8C29.4 33.1196 28.1464 35 26.6 35C25.0536 35 23.8 33.1196 23.8 30.8C23.8 28.4804 25.0536 26.6 26.6 26.6C28.1464 26.6 29.4 28.4804 29.4 30.8ZM24.9129 50.2505C25.6036 51.1823 26.9188 51.3777 27.8505 50.6871C29.8899 49.1754 32.3515 48.3 35 48.3C37.6485 48.3 40.1101 49.1754 42.1495 50.6871C43.0812 51.3777 44.3964 51.1823 45.0871 50.2505C45.7777 49.3188 45.5823 48.0036 44.6505 47.3129C41.9278 45.2947 38.5979 44.1 35 44.1C31.4021 44.1 28.0722 45.2947 25.3495 47.3129C24.4177 48.0036 24.2223 49.3188 24.9129 50.2505Z" fill="#BFC3C7"/>
  </svg>
  Ничего не найдено
  `;
  return item;
};

// Шаблон сообщения, что нет искомых сотрудников и необходимо воспользоваться поиском
const templateMessageSeacrh = () => {
  searchList.innerHTML = "";
  const item = document.createElement("li");
  item.classList.add("profile-search__item-nosearch");
  item.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M63.2728 34.9999C63.2728 50.613 50.6167 63.2692 35.0036 63.2692C19.3905 63.2692 6.73438 50.613 6.73438 34.9999C6.73438 19.3868 19.3905 6.73071 35.0036 6.73071C50.6167 6.73071 63.2728 19.3868 63.2728 34.9999ZM24.2344 32.9999C23.1298 32.9999 22.2344 33.8954 22.2344 34.9999C22.2344 36.1045 23.1298 36.9999 24.2344 36.9999H46.6703C47.7748 36.9999 48.6703 36.1045 48.6703 34.9999C48.6703 33.8954 47.7748 32.9999 46.6703 32.9999H24.2344Z" fill="#BFC3C7"/>
  </svg>
  <span>Список профилей пуст </span>
  <small>Воспользуйтесь поиском</small>
  `;
  searchList.appendChild(item);
};

// Рендер шаблона одного сотрудника
const renderTempalteUser = (data: TYPE_PROFILE_SRVICE): HTMLElement => {
  const template: HTMLTemplateElement = document.querySelector(
    ".profile-search__template-user"
  );
  const templateClone = template.content.cloneNode(true) as HTMLElement;
  const templateCloneBody: HTMLElement = templateClone.querySelector(
    ".profile-search__item"
  );
  templateCloneBody.dataset.samaccountname = data.samaccountname;
  if (data.jpegphoto !== null) {
    (
      templateCloneBody.querySelector(
        ".profile-search__user-img"
      ) as HTMLImageElement
    ).src = `${apiPath}${data.jpegphoto}`;
  }
  templateCloneBody.querySelector(".profile-search__user-name").textContent =
    data.cn;
  templateCloneBody.querySelector(".profile-search__user-title").textContent =
    data.title;
  templateCloneBody.querySelector(
    ".profile-search__user-telephonenumber"
  ).textContent = data.telephonenumber;
  templateCloneBody.querySelector(".profile-search__user-mail").textContent =
    data.mail;
  templateCloneBody.querySelector(".profile-search__user-company").textContent =
    data.company;
  templateCloneBody.querySelector(
    ".profile-search__user-department"
  ).textContent = data.department;
  templateCloneBody.querySelector(".profile-search__user-manager").textContent =
    data.manager;
  templateCloneBody.querySelector(
    ".profile-search__user-samaccountname"
  ).textContent = data.samaccountname;
  if (data.departments.includes("Departments:")) {
    let departamentsArray = data.departments.split("*");
    departamentsArray = departamentsArray.filter(
      (item) => item !== "Departments:" && item !== "-"
    );

    if (departamentsArray.length) {
      templateCloneBody.querySelector(
        ".profile-search__user-projects"
      ).textContent = departamentsArray.join(", ");
    } else {
      templateCloneBody.querySelector(
        ".profile-search__user-projects"
      ).textContent = "-";
    }
  }

  return templateClone;
};

// Рендер списка сотрудников
const renderUsers = (data: TYPE_PROFILE_SRVICE[]) => {
  searchList.innerHTML = "";
  if (data.length) {
    data.forEach((user) => {
      searchList.appendChild(renderTempalteUser(user));
    });
    handlerRedirect();
  } else {
    searchList.appendChild(templateMessageNoData());
  }
};

// Обработчик отправки формы поиска
const handlerFormSubmit = () => {
  sortForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = new FormData(sortForm);
    PhoneAPI.postUsers(data, renderUsers);
    hiddenSort();
  });
};

// Переход на страницу профиля сотрудника
const handlerRedirect = () => {
  const userItems = document.querySelectorAll(".profile-search__item");
  userItems.forEach((user) => {
    user.addEventListener("click", (evt) => {
      const currentUser = evt.currentTarget as HTMLElement;
      const currentSamaccountname = currentUser.dataset.samaccountname;
      if (currentSamaccountname === serviceData.samaccountname) {
        window.location.href = `/service/profile.html`;
      } else {
        window.location.href = `/service/profile-user.html?id=${currentSamaccountname}`;
      }
    });
  });
};

handlerRedirect();
startingInitUsers();
handlerFormSubmit();
handlerClearButton(templateMessageSeacrh);
handlerSort();
