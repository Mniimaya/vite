import { setNewsLocalStorage } from "./util";
import { NewsAPI } from "../js/API/newsApi.js";
import { renderPagination } from "./pagination";
import { getRoles } from "./news/role";
import { openPopupLink } from "./news/helpers";
import { handlerRenderNews, requestActualNews } from "./news/handlerRenderNews";
import { closeModal } from "./util";

//значения по умолчанию
setTimeout(() => {
  let auth;
  if (JSON.parse(sessionStorage.getItem("auth")) != null) {
    auth = JSON.parse(sessionStorage.getItem("auth"));
    const samaccountname: string = auth.samaccountname;
    NewsAPI.getLikes(setNewsLocalStorage, samaccountname);
    getRoles(auth);
  }
}, 300);

//логика если в адресной строке есть id
// Берем данные из адресной строки и запрашиваем с сервера соответсвующую новость
export const goLink = () => {
  const href = window.location.href;
  const url = new URL(href);
  const id = +url.searchParams.get("id");
  if (!!id) {
    NewsAPI.getLink(id, openPopupLink);
  }
};

// Обработчик переключения и ререндеринга новостей
const handlerTabsNew = () => {
  const tabsLinks = document.querySelectorAll(".button-tab-category");
  const tabsWrappers = document.querySelectorAll(".new-tab-container");
  const wrapper = document.querySelector(".actual");

  const deactivationTabs = () => {
    tabsLinks.forEach((button) => {
      button.classList.remove("button-service--active");
    });
  };

  const deactivationAdminTabs = () => {
    const buttons = document.querySelectorAll(".news-nav__btn");
    buttons.forEach((button) => {
      button.classList.remove("tab--actual");
    });
  };

  tabsLinks.forEach((button) => {
    button.addEventListener("click", (evt) => {
      tabsWrappers.forEach((wrapper) => wrapper.classList.remove("js-display"));
      deactivationAdminTabs();
      wrapper.classList.add("js-display");
      const currentButton = evt.currentTarget as HTMLButtonElement;
      deactivationTabs();
      currentButton.classList.add("button-service--active");
      const currentCategory = currentButton.dataset.category;
      handlerRenderNews(currentCategory);
    });
  });
};

closeModal();
requestActualNews();
handlerTabsNew();
goLink();
