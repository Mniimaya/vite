// отрисовка новостей на вкладках актуальное

import { NewsAPI } from "../../js/API/newsApi";
import { apiPath } from "../../main";
import { TYPE_NEWS, TYPE_PHOTOS, TYPE_BODY_NEWS, TYPE_REQUEST } from "../TYPES";
import { openPopupLink } from "./helpers";
import { handlerClosePopup } from "../util";
import { transformationDate } from "../utils/transformationDate";
import { AdministratorAPI } from "../../js/API/administratorApi";
import { renderPagination } from "../pagination";
import { getPageCount, handlerPagination } from "./handlerPaginationNew";

export const getRoleForRender = (
  data: TYPE_BODY_NEWS,
  type: string | undefined
) => {
  if (JSON.parse(sessionStorage.getItem("auth")) != null) {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    const samaccountname: string = auth.samaccountname;
    AdministratorAPI.getRolesByService(samaccountname, 2, (role: any) => {
      renderApprovedActualNews(role, data, type);
    });
  }
};

export const renderApprovedActualNews = (
  role: TYPE_REQUEST[],
  data: TYPE_BODY_NEWS,
  type: string | undefined = undefined
) => {
  const paginationContainer: HTMLElement = document.querySelector(
    ".actual__pagination"
  );

  if (data.count > 6 && type === "all") {
    paginationContainer.dataset.type = type;
    paginationContainer.innerHTML = "";
    renderPagination(".actual__pagination", getPageCount(data.count));
    handlerPagination(paginationContainer, 1, getRoleForRender);
  } else if (type === "actual") {
    paginationContainer.innerHTML = "";
  }
  const editor = role.some((role) => role.administrator_role >= 3);
  const container: HTMLElement = document.querySelector(".actual__list");
  if (type) {
    container.dataset.category = type;
  }
  const actualTemplate = (
    document.querySelector(".actual-template") as HTMLTemplateElement
  ).content.querySelector(".actual__item");
  container.innerHTML = "";
  const dataNews: TYPE_NEWS[] = data.rows;

  dataNews.forEach((data, i) => {
    const item = actualTemplate.cloneNode(true) as HTMLElement;
    item.dataset.id = data.id;
    item.dataset.sono = data.sono;
    item.addEventListener("click", () => {
      NewsAPI.getLink(+data.id, (data: TYPE_NEWS) => {
        openPopupLink(data, editor);
      });
      item.querySelector(".actual__views").textContent = String(
        Number(item.querySelector(".actual__views").textContent) + 1
      );
    });
    if (data.userlogin) {
      item.dataset.userlogin = data.userlogin;
    }
    let date = transformationDate(data.createdAt);
    item.querySelector(".actual__date").textContent = date;
    item.querySelector(".actual__title").textContent = data.title;
    item.querySelector(".actual__views").textContent = data.views.toString();
    item.querySelector(".actual__likes").textContent = `${data.is_liked.length}`
      ? `${data.is_liked.length}`
      : "0";
    item.querySelector(".actual__description").innerHTML = data.description;
    (item.querySelector(".actual__image") as HTMLImageElement).src =
      `${apiPath}` + data.avatar;
    if (data.images && data.images !== "Все фотографии удалены модератером") {
      for (let j = 0; j < data.images.length; j++) {
        const imageSecondary = item
          .querySelector(".actual__image")
          .cloneNode(true) as HTMLImageElement;
        imageSecondary.src =
          `${apiPath}` + (data.images[j] as TYPE_PHOTOS).photos;
        imageSecondary.classList.add("js-nodisplay");
        item.appendChild(imageSecondary);
      }
    }
    if (data.admin) {
      for (let j = 0; j < data.admin.length; j++) {
        const imageSecondary = item
          .querySelector(".actual__image")
          .cloneNode(true) as HTMLImageElement;
        imageSecondary.src = `${apiPath}` + data.admin[j];
        imageSecondary.classList.add("js-nodisplay");
        item.appendChild(imageSecondary);
      }
    }
    if (data.pdf) {
      (item.querySelector(".actual__pdf") as HTMLLinkElement).href =
        `${apiPath}` + data.pdf;
    } else {
      item.querySelector(".actual__pdf").remove();
    }

    if (data.video) {
      (item.querySelector(".actual__video") as HTMLVideoElement).src =
        `${apiPath}` + data.video;
    } else {
      item.querySelector(".actual__video").remove();
    }

    container.appendChild(item);
  });
};
