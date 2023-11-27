import { NewsAPI } from "../../js/API/newsApi";
import { apiPath } from "../../main";
import { TYPE_NEWS, TYPE_PHOTOS, TYPE_LIKES } from "../TYPES";
import { handlerNewPopup, handlerClosePopup, clickImage } from "../util";
import { doInputsDisabled } from "./handlers-edit";
import { transformationDate } from "../utils/transformationDate";
import { SERVICES_SONO, TYPE_SONO } from "../types/common";
import { removeNew } from "./handler-removed";

const handlerIsLike = (news: TYPE_NEWS, popup: HTMLElement) => {
  const isLiked = news.is_liked;
  const dataAuth = JSON.parse(sessionStorage.getItem("auth"));
  const samaccountname: string = dataAuth.samaccountname;
  let isChecked: boolean[] = [];
  if (isLiked.length) {
    for (let i = 0; i < isLiked.length; i++) {
      if (isLiked[i].news_user === samaccountname) {
        isChecked[i] = true;
      } else {
        isChecked[i] = false;
      }
    }
  } else {
    isChecked.push(false);
  }

  const inputLike: HTMLInputElement = popup.querySelector(".popup__checkbox");

  const result: boolean[] = isChecked.filter((el) => el === true);
  if (result.length) {
    inputLike.checked = true;
  } else {
    inputLike.checked = false;
  }
};

// // события открытия актуальных новостей
// export const openPopupActual = () => {
//   const newsAll = document.querySelectorAll(".actual__item, .slider__item");
//   newsAll.forEach((news) => {
//     news.addEventListener("click", (evt) => {
//       const parent = (evt.target as HTMLElement).closest(
//         ".actual__item"
//       ) as HTMLElement;
//       const id = +parent.dataset.id;
//       let contentView: HTMLElement = parent.querySelector(".actual__views");
//       contentView.textContent = String(Number(contentView.textContent) + 1);
//       NewsAPI.postViews(id);
//       const popupTemplate = (
//         document.querySelector(".popup-template") as HTMLTemplateElement
//       ).content;
//       const popup = popupTemplate.cloneNode(true) as HTMLElement;
//       const body = document.querySelector("body");
//       const images = parent.querySelectorAll(".actual__image");
//       for (let i = 0; i < images.length; i++) {
//         const item = document.createElement("IMG") as HTMLImageElement;
//         item.classList.add("popup__image");
//         if (i === 0) {
//           item.classList.add("popup__image--avatar");
//         }
//         item.src = (images[i] as HTMLImageElement).src;
//         popup.querySelector(".popup__image-wrapper").appendChild(item);
//       }
//       const pdf = parent.querySelector(".actual__pdf") as HTMLLinkElement;
//       if (pdf) {
//         const blockPdf = document.createElement("A") as HTMLLinkElement;
//         blockPdf.classList.add("popup__pdf");
//         blockPdf.href = pdf.href;
//         blockPdf.target = "_blank";
//         popup.querySelector(".popup__image-wrapper").appendChild(blockPdf);
//       }
//       const video = parent.querySelector(".actual__video") as HTMLVideoElement;
//       if (video) {
//         const link = document.createElement("A") as HTMLLinkElement;
//         link.classList.add("popup__video");
//         link.href = video.src;
//         link.target = "_blank";
//         popup.querySelector(".popup__image-wrapper").appendChild(link);
//       }
//       (popup.querySelector(".popup__form") as HTMLElement).dataset.id =
//         parent.dataset.id;
//       //проверка на совпадение
//       const findId = (item: string) => {
//         return item == parent.dataset.id;
//       };

//       // if (data != null && data.length >= 1 && data.some(findId)) {
//       //   (popup.querySelector(".popup__checkbox") as HTMLInputElement).checked =
//       //     true;
//       // }
//       // //проверяем данные из sessionStorage
//       // const newsLike = sessionStorage.getItem(parent.dataset.id);
//       // if (newsLike == "0") {
//       //   (popup.querySelector(".popup__checkbox") as HTMLInputElement).checked =
//       //     false;
//       // }
//       // if (newsLike == "1") {
//       //   (popup.querySelector(".popup__checkbox") as HTMLInputElement).checked =
//       //     true;
//       // }
//       if (parent.dataset.userlogin) {
//         popup.querySelector(".popup__author").textContent =
//           parent.dataset.userlogin;
//       }
//       if (parent.dataset.sono) {
//         popup.querySelector(".popup__filial").textContent =
//           SERVICES_SONO[parent.dataset.sono as TYPE_SONO];
//       }
//       popup.querySelector(".popup__date").textContent =
//         parent.querySelector(".actual__date").textContent;
//       popup.querySelector(".popup__title").textContent =
//         parent.querySelector(".actual__title").textContent;
//       popup.querySelector(".popup__description").innerHTML =
//         parent.querySelector(".actual__description").textContent;
//       (popup.querySelector(".popup__input--id") as HTMLInputElement).value =
//         parent.dataset.id;
//       // history.pushState(
//       //   null,
//       //   null,
//       //   `/section/news.html?id=${parent.dataset.id}`
//       // );
//       (
//         popup.querySelector(".popup__link") as HTMLElement
//       ).dataset.link = `${window.location.hostname}/service/news.html?id=${parent.dataset.id}`;
//       popup.querySelector(".popup__link").addEventListener("click", (evt) => {
//         const target = evt.target as HTMLElement;
//         navigator.clipboard.writeText(target.dataset.link);
//         // target.textContent = "Скопировано";
//       });
//       document
//         .querySelector(".page__body")
//         .classList.add("page__body--noscroll");
//       body.appendChild(popup);
//       //обновляем в базе данных количество лайков по изменению чекбокса
//       const dataAuth = JSON.parse(sessionStorage.getItem("auth"));
//       document
//         .querySelector(".popup__form")
//         .addEventListener("change", (evt) => {
//           const target = evt.target as HTMLElement;
//           (
//             document.querySelector(".popup__input--user") as HTMLInputElement
//           ).value = dataAuth.samaccountname;
//           if (
//             (document.querySelector(".popup__checkbox") as HTMLInputElement)
//               .checked
//           ) {
//             (
//               document.querySelector(
//                 ".popup__input--like-no"
//               ) as HTMLInputElement
//             ).disabled = true;
//             (
//               document.querySelector(
//                 ".popup__input--like-yes"
//               ) as HTMLInputElement
//             ).disabled = false;
//             sessionStorage.setItem(
//               `${target.parentElement.parentElement.dataset.id}`,
//               "1"
//             );
//             parent.querySelector(".actual__likes").textContent = (
//               +parent.querySelector(".actual__likes").textContent + 1
//             ).toString();
//           } else {
//             (
//               document.querySelector(
//                 ".popup__input--like-no"
//               ) as HTMLInputElement
//             ).disabled = false;
//             (
//               document.querySelector(
//                 ".popup__input--like-yes"
//               ) as HTMLInputElement
//             ).disabled = true;
//             sessionStorage.setItem(
//               `${target.parentElement.parentElement.dataset.id}`,
//               "0"
//             );
//             parent.querySelector(".actual__likes").textContent = (
//               +parent.querySelector(".actual__likes").textContent - 1
//             ).toString();
//           }
//           const formData = new FormData(
//             target.parentElement.parentElement as HTMLFormElement
//           );
//           NewsAPI.postLikes(formData);
//         });
//       clickImage();
//       handlerNewPopup();
//     });
//   });
// };

export const renderCurrentLikes = (data: any) => {
  const newData = data[1][0];
  const newItem: HTMLElement = document.querySelector(
    `.actual__item[data-id="${newData.news_id}"]`
  );
  const newSliderItem: HTMLElement = document.querySelector(
    `.slider__item[data-id="${newData.news_id}"]`
  );

  if (newItem) {
    const statusLike = newData.news_like;
    const newItemLikes: HTMLSpanElement =
      newItem.querySelector(".actual__likes");
    const countLikes = Number(newItemLikes.textContent);
    if (statusLike === "0" && countLikes !== 0) {
      newItemLikes.textContent = String(countLikes - 1);
    } else {
      newItemLikes.textContent = String(countLikes + 1);
    }
  } else if (newSliderItem) {
    const statusLike = newData.news_like;
    const newItemLikes: HTMLSpanElement =
      newSliderItem.querySelector(".slider__likes");
    const countLikes = Number(newItemLikes.textContent);
    if (statusLike === "0" && countLikes !== 0) {
      newItemLikes.textContent = String(countLikes - 1);
    } else {
      newItemLikes.textContent = String(countLikes + 1);
    }
  }
};

// //события открытия архивных новостей
export const openPopupLink = (news: TYPE_NEWS, role: boolean) => {
  const dataAuth = JSON.parse(sessionStorage.getItem("auth"));
  const item = news;
  const id = +item.id;

  NewsAPI.postViews(id);
  const popupTemplate = (
    document.querySelector(".popup-template") as HTMLTemplateElement
  ).content;
  const popup = popupTemplate.cloneNode(true) as HTMLElement;
  const body = document.querySelector("body");

  handlerIsLike(news, popup);

  if (item.avatar) {
    const itemNew = document.createElement("IMG") as HTMLImageElement;
    itemNew.classList.add("popup__image");
    itemNew.classList.add("popup__image--avatar");
    itemNew.src = `${apiPath}${item.avatar}`;
    popup.querySelector(".popup__image-wrapper").appendChild(itemNew);
  }
  if (Array.isArray(item.images)) {
    const filterImages: TYPE_PHOTOS[] = (item.images as TYPE_PHOTOS[]).filter(
      (img) => img.status === true
    );
    filterImages.forEach((image: TYPE_PHOTOS) => {
      const item = document.createElement("IMG") as HTMLImageElement;
      item.classList.add("popup__image");
      item.src = `${apiPath}${image.photos}`;
      popup.querySelector(".popup__image-wrapper").appendChild(item);
    });
  }
  if (item.pdf) {
    const blockPdf = document.createElement("A") as HTMLLinkElement;
    blockPdf.classList.add("popup__pdf");
    blockPdf.href = `${apiPath}${item.pdf}`;
    blockPdf.target = "_blank";
    popup.querySelector(".popup__image-wrapper").appendChild(blockPdf);
  }
  if (item.video) {
    const link = document.createElement("A") as HTMLLinkElement;
    link.classList.add("popup__video");
    link.href = `${apiPath}${item.video}`;
    link.target = "_blank";
    popup.querySelector(".popup__image-wrapper").appendChild(link);
  }
  (popup.querySelector(".popup__form") as HTMLElement).dataset.id = item.id;

  if (item.userlogin) {
    popup.querySelector(".popup__author").textContent = item.userlogin;
  }
  if (item.sono != null) {
    popup.querySelector(".popup__filial").textContent =
      SERVICES_SONO[item.sono];
  }
  let date = transformationDate(item.createdAt);
  popup.querySelector(".popup__date").textContent = date;
  popup.querySelector(".popup__title").textContent = item.title;
  popup.querySelector(".popup__description").innerHTML = item.description;
  popup.querySelector(".popup__description").innerHTML = popup.querySelector(
    ".popup__description"
  ).textContent;
  // (popup.querySelector(".popup__input--id") as HTMLInputElement).value =
  //   item.id;
  // (
  (
    popup.querySelector(".popup__link") as HTMLElement
  ).dataset.link = `${window.location.hostname}/service/news.html?id=${item.id}`;
  if (role) {
    const buttonWrapper = popup.querySelector(
      ".popup__remove-new"
    ) as HTMLElement;
    const button = document.createElement("button");
    button.dataset.id = item.id;
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 6H5H21" stroke="#D71920" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#D71920" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 11V17" stroke="#D71920" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 11V17" stroke="#D71920" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    button.addEventListener("click", (evt) => {
      const currentButton = evt.currentTarget as HTMLButtonElement;
      removeNew(currentButton);
    });
    buttonWrapper.appendChild(button);
  }
  popup.querySelector(".popup__link").addEventListener("click", (evt) => {
    navigator.clipboard.writeText((evt.target as HTMLElement).dataset.link);
  });
  document.querySelector(".page__body").classList.add("page__body--noscroll");
  body.appendChild(popup);
  //обновляем в базе данных количество лайков по изменению чекбокса
  if (JSON.parse(sessionStorage.getItem("auth")) != null) {
    document.querySelector(".popup__form").addEventListener("change", (evt) => {
      const dataAuth = JSON.parse(sessionStorage.getItem("auth"));
      (
        document.querySelector(".popup__input--user") as HTMLInputElement
      ).value = dataAuth.samaccountname;
      if (
        (document.querySelector(".popup__checkbox") as HTMLInputElement).checked
      ) {
        (
          document.querySelector(".popup__input--like-no") as HTMLInputElement
        ).disabled = true;
        (
          document.querySelector(".popup__input--like-yes") as HTMLInputElement
        ).disabled = false;
        sessionStorage.setItem(
          `${
            (evt.target as HTMLElement).parentElement.parentElement.dataset.id
          }`,
          "1"
        );
      } else {
        (
          document.querySelector(".popup__input--like-no") as HTMLInputElement
        ).disabled = false;
        (
          document.querySelector(".popup__input--like-yes") as HTMLInputElement
        ).disabled = true;
        sessionStorage.setItem(
          `${
            (evt.target as HTMLElement).parentElement.parentElement.dataset.id
          }`,
          "0"
        );
      }
      const formData = new FormData(
        (evt.target as HTMLElement).parentElement
          .parentElement as HTMLFormElement
      );
      let data: any = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });
      NewsAPI.postLikes(data, id, renderCurrentLikes);
    });
  }
  clickImage();
  handlerClosePopup();
  handlerNewPopup();
};
//события открытия не одобренных новостей
export const openPopupPublic = () => {
  const newsAll = document.querySelectorAll(".public__item");
  newsAll.forEach((news) => {
    news.addEventListener("click", (evt) => {
      const target = evt.target as HTMLElement;
      const parent = target.closest(".public__item") as HTMLElement;
      if (target.tagName === "BUTTON") {
        return;
      }
      const popupTemplate = (
        document.querySelector(".popup-template") as HTMLTemplateElement
      ).content;
      const popup = popupTemplate.cloneNode(true) as HTMLElement;
      const body = document.querySelector("body");
      const images = parent.querySelectorAll(".public__image");
      for (let i = 0; i < images.length; i++) {
        const item = document.createElement("IMG") as HTMLImageElement;
        item.classList.add("popup__image");
        if (i === 0) {
          item.classList.add("popup__image--avatar");
        }
        item.src = (images[i] as HTMLImageElement).src;
        popup.querySelector(".popup__image-wrapper").appendChild(item);
      }
      const pdf = parent.querySelector(".public__pdf") as HTMLLinkElement;
      if (pdf) {
        const blockPdf = document.createElement("A") as HTMLLinkElement;
        blockPdf.classList.add("popup__pdf");
        blockPdf.href = pdf.href;
        blockPdf.target = "_blank";
        popup.querySelector(".popup__image-wrapper").appendChild(blockPdf);
      }
      const video = parent.querySelector(".public__video") as HTMLVideoElement;
      if (video) {
        const link = document.createElement("A") as HTMLLinkElement;
        link.classList.add("popup__video");
        link.href = video.src;
        link.target = "_blank";
        popup.querySelector(".popup__image-wrapper").appendChild(link);
      }
      if (parent.dataset.userlogin) {
        popup.querySelector(".popup__author").textContent =
          parent.dataset.userlogin;
      }
      if (parent.dataset.sono) {
        popup.querySelector(".popup__filial").textContent =
          SERVICES_SONO[parent.dataset.sono as TYPE_SONO];
      }
      popup.querySelector(".popup__date").textContent =
        parent.querySelector(".public__date").textContent;
      popup.querySelector(".popup__title").textContent =
        parent.querySelector(".public__title").textContent;
      popup.querySelector(".popup__description").innerHTML =
        parent.querySelector(".public__description").textContent;
      (
        popup.querySelector(".popup__link") as HTMLLinkElement
      ).dataset.link = `${window.location.hostname}/service/news.html?id=${parent.dataset.id}`;
      popup.querySelector(".popup__link").addEventListener("click", (evt) => {
        navigator.clipboard.writeText((evt.target as HTMLElement).dataset.link);
        // (evt.target as HTMLElement).textContent = "Скопировано";
      });
      body.appendChild(popup);
      clickImage();
      handlerClosePopup();
      handlerNewPopup();
    });
  });
};
export const offActualButton = () => {
  if (document.querySelector(".pagination__list")) {
    document.querySelector(".pagination__list").classList.add("js-nodisplay");
  }
  const actualButton = document.querySelector(".button-service--active");
  if (actualButton) {
    actualButton.classList.remove("button-service--active");
  }
};
//формирование списка фотографий
const createPhoto = (parent: HTMLElement) => {
  const photos = parent.querySelectorAll(".public__image--photo");
  photos.forEach((photo: HTMLImageElement) => {
    const photoContainer = document.querySelector(".modal-public__photos");
    const image = document.createElement("IMG") as HTMLImageElement;
    image.dataset.id = photo.dataset.id;
    image.src = photo.src;
    image.style.width = "62px";
    image.style.height = "62px";
    image.classList.add("modal-public__image");
    const container = document.createElement("DIV");
    container.classList.add("modal-public__photos-wrapper");
    container.classList.add("modal-public__photo-wrapper");
    container.dataset.id = photo.dataset.id;
    container.appendChild(image);
    photoContainer.appendChild(container);
  });
};
// открытие модального окна управления новостями
export const openAdminModal = () => {
  const publicBtns = document.querySelectorAll(".public__btn");
  publicBtns.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const parent = (evt.target as HTMLElement).parentElement.parentElement;
      const newId = parent.dataset.id;
      const modal = document.querySelector(".modal-public");
      modal.classList.remove("js-public-nodisplay");
      modal.classList.add("js-public-display");
      modal.querySelector(".modal-public__input--title").textContent =
        parent.querySelector(".public__title").textContent;
      modal.querySelector(".modal-public__input--description").innerHTML =
        parent.querySelector(".public__description").textContent;
      (
        modal.querySelector(".modal-public__description") as HTMLInputElement
      ).value = parent.querySelector(".public__description").textContent;
      //@ts-ignore
      window.editor.second.setData(
        parent.querySelector(".public__description").textContent
      );
      (
        modal.querySelector(".modal-public__input--id") as HTMLInputElement
      ).value = parent.dataset.id;
      (
        modal.querySelector(".modal-public__form") as HTMLFormElement
      ).dataset.id = newId;
      const date = new Date();
      let dayActual = date.getDate();
      let day;
      let month;
      if (dayActual < 10) {
        day = `0${dayActual}`;
      } else {
        day = dayActual;
      }
      let monthActual = date.getMonth() + 1;
      if (monthActual < 10) {
        month = `0${monthActual}`;
      } else {
        month = monthActual;
      }
      (
        modal.querySelector(".modal-public__input--date") as HTMLInputElement
      ).value = `${day}.${month}.${date.getFullYear()}`;
      createPhoto(parent);
      doInputsDisabled();
      const photos = modal.querySelectorAll(".modal-public__photo-wrapper");
      photos.forEach((photo: HTMLImageElement) => {
        photo.addEventListener("click", (evt) => {
          (evt.target as HTMLElement)
            .closest(".modal-public__photos-wrapper")
            .remove();
          //добавление id фотографий к удалению, меняем на статус 0
          // modal.querySelector('.modal-public__input--update-photo').disabled = false;
          const input = document.createElement("INPUT") as HTMLInputElement;
          input.type = "hidden";
          input.name = "del[]";
          input.value = photo.dataset.id;
          modal.querySelector(".modal-public__form").appendChild(input);
          // modal.querySelector('.modal-public__input--update-photo').value += photo.dataset.id + ',';
        });
      });
    });
  });
};
