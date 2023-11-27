import { NewsAPI } from "../../js/API/newsApi";
import { apiPath } from "../../main";
import { TYPE_BODY_NEWS, TYPE_NEWS, TYPE_PHOTOS } from "../TYPES";
import { openAdminModal, openPopupLink, openPopupPublic } from "./helpers";
import { transformationDate } from "../utils/transformationDate";
import { closeModal } from "../util";
import { renderPagination } from "../pagination";
import { getPageCount, handlerPagination } from "./handlerPaginationNew";
const publicWrapper = document.querySelector(".public__list");

const renderNew = (item: TYPE_NEWS) => {
  const templateNoApprovedNews = (
    document.querySelector(".public-template") as HTMLTemplateElement
  ).content.querySelector(".public__item");

  const newItem = templateNoApprovedNews.cloneNode(true) as HTMLElement;
  newItem.dataset.id = item.id;
  newItem.dataset.sono = item.sono;
  newItem.addEventListener("click", (evt) => {
    if ((evt.target as HTMLElement).tagName != "BUTTON") {
      NewsAPI.getLink(+item.id, openPopupLink);
    }
  });
  if (item.userlogin) {
    newItem.dataset.userlogin = item.userlogin;
  }
  let date = transformationDate(item.createdAt);
  newItem.querySelector(".public__date").textContent = date;
  newItem.querySelector(".public__title").textContent = item.title;
  if (item.pdf) {
    (newItem.querySelector(".public__pdf") as HTMLLinkElement).href =
      `${apiPath}` + item.pdf;
  } else {
    newItem.querySelector(".public__pdf").remove();
  }

  if (item.video) {
    (newItem.querySelector(".public__video") as HTMLVideoElement).src =
      `${apiPath}` + item.video;
  } else {
    newItem.querySelector(".public__video").remove();
  }
  newItem.querySelector(".public__description").innerHTML = item.description;
  (newItem.querySelector(".public__image") as HTMLImageElement).src =
    `${apiPath}` + item.avatar;
  if (item.images && item.images !== "Все фотографии удалены модератером") {
    const filterImages: TYPE_PHOTOS[] = (item.images as TYPE_PHOTOS[]).filter(
      (img) => img.status === true
    );
    for (let j = 0; j < filterImages.length; j++) {
      const imageSecondary = newItem
        .querySelector(".public__image")
        .cloneNode(true) as HTMLImageElement;
      imageSecondary.src =
        `${apiPath}` + (item.images[j] as TYPE_PHOTOS).photos;
      imageSecondary.classList.add("js-nodisplay");
      imageSecondary.classList.remove("public__image--avatar");
      imageSecondary.classList.add("public__image--photo");
      imageSecondary.dataset.id = (
        filterImages[j] as TYPE_PHOTOS
      ).id.toString();
      newItem.appendChild(imageSecondary);
    }
  }
  if (item.admin) {
    for (let j = 0; j < item.admin.length; j++) {
      const imageSecondary = newItem
        .querySelector(".public__image")
        .cloneNode(true) as HTMLImageElement;
      imageSecondary.src = `${apiPath}` + item.admin[j];
      imageSecondary.classList.add("js-nodisplay");
      imageSecondary.classList.remove("public__image--avatar");
      imageSecondary.classList.add("public__image--photo");
      newItem.appendChild(imageSecondary);
    }
  }
  publicWrapper.appendChild(newItem);
};

//отрисовка не подтвержденных новостей
export const renderNoApprovedNews = (data: TYPE_BODY_NEWS) => {
  const paginationContainer: HTMLElement = document.querySelector(
    ".public__pagination-container"
  );

  const dataNew = data.rows;
  paginationContainer.innerHTML = "";
  publicWrapper.innerHTML = "";
  if (data.count > 6) {
    renderPagination(".public__pagination-container", getPageCount(data.count));
    handlerPagination(paginationContainer, 0, (dataObj: TYPE_BODY_NEWS) => {
      const data = dataObj.rows;
      publicWrapper.innerHTML = "";
      data.forEach((item) => {
        renderNew(item);
      });
    });
  }

  if (dataNew) {
    dataNew.forEach((data) => {
      renderNew(data);
    });
  }
  openAdminModal();
};
