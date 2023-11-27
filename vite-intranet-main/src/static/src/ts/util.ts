//уведомление об успешной отправке данных

import { TYPE_LIKES } from "./TYPES";

const showMessage = (message: string) => {
  const overlay = document.createElement("DIV");
  overlay.classList.add("overlay");
  const content = document.createElement("P");
  content.classList.add("overlay__content");
  content.textContent = message;
  overlay.appendChild(content);
  const body = document.querySelector("body");
  body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2500);
};

// Показ loader
export const showLoader = () => {
  const loader: HTMLElement = document.querySelector(".loader");
  loader.classList.add("js-active");
  document.body.classList.add("lock");
};

// Скрытие loader
export const hiddenLoader = () => {
  const loader: HTMLElement = document.querySelector(".loader");
  loader.classList.remove("js-active");
  document.body.classList.remove("lock");
};

//навигация по открытым фотографиям(дубль news.js)
const moveNextBig = () => {
  const btnNext = document.querySelector(".popup__btn--next");
  const photos = document.querySelectorAll(".popup__image");
  btnNext.addEventListener("click", () => {
    const photoArray: Element[] = [];
    photos.forEach((item) => {
      photoArray.push(item);
    });
    const findOpened = (photo: Element) => {
      return photo.classList.contains("popup__image--opened");
    };
    let sliderIndex = photoArray.findIndex(findOpened);

    photos[sliderIndex].classList.remove("popup__image--opened");
    photos[sliderIndex].classList.add("popup__image");
    if (sliderIndex + 1 == photoArray.length) {
      sliderIndex = -1;
    }
    photos[sliderIndex + 1].classList.remove("popup__image");
    photos[sliderIndex + 1].classList.add("popup__image--opened");
  });
};

const movePrevBig = () => {
  const btnPrev = document.querySelector(".popup__btn--prev");
  const photos = document.querySelectorAll(".popup__image");
  btnPrev.addEventListener("click", () => {
    const photoArray: Element[] = [];
    photos.forEach((item) => {
      photoArray.push(item);
    });
    const findOpened = (photo: Element) => {
      return photo.classList.contains("popup__image--opened");
    };
    let sliderIndex = photoArray.findIndex(findOpened);

    photos[sliderIndex].classList.remove("popup__image--opened");
    photos[sliderIndex].classList.add("popup__image");
    if (sliderIndex - 1 == -1) {
      sliderIndex = photoArray.length;
    }
    photos[sliderIndex - 1].classList.remove("popup__image");
    photos[sliderIndex - 1].classList.add("popup__image--opened");
  });
};

//открытие фотографий(дубль news.js)
const clickImage = () => {
  const imagesOnNewPage = document.querySelectorAll(".popup__image");
  const btns = document.querySelectorAll(".popup__btn");
  imagesOnNewPage.forEach((image) => {
    image.addEventListener("click", () => {
      (
        document.querySelector(".popup__wrapper") as HTMLElement
      ).style.backgroundColor = "#000000";
      if (imagesOnNewPage.length > 1) {
        btns.forEach((btn: HTMLElement) => {
          btn.style.display = "block";
        });
      }
      if (image.classList.contains("popup__image")) {
        image.classList.add("popup__image--opened");
        image.classList.remove("popup__image");
        document.querySelector(".popup").classList.add("popup--image-opened");
      } else {
        (
          document.querySelector(".popup__wrapper") as HTMLElement
        ).style.backgroundColor = "#ffffff";
        image.classList.remove("popup__image--opened");
        image.classList.add("popup__image");
        btns.forEach((btn: HTMLElement) => {
          btn.style.display = "none";
        });
        document
          .querySelector(".popup")
          .classList.remove("popup--image-opened");
      }
    });
  });
  moveNextBig();
  movePrevBig();
};

const clearQueryParams = (key: string, link: string, cb = () => {}) => {
  const href = window.location.href;
  const url = new URL(href);
  const id = url.searchParams.get(key);
  if (id) {
    history.pushState(null, null, link);
    cb();
  }
};

// Закрытие модального окна news
export const handlerClosePopup = () => {
  const closeButton: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".popup__close");
  closeButton.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const buttonTarget = evt.target as HTMLButtonElement;
      buttonTarget.closest(".popup").remove();
      document.body.classList.remove("page__body--noscroll");
    });
  });

  const popup = document.querySelector(".popup--news");
  popup.addEventListener("click", (evt) => {
    const eventTarget = evt.target as HTMLElement;

    if (eventTarget.classList.contains("popup--news")) {
      popup.remove();
      document.body.classList.remove("page__body--noscroll");
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (!!document.querySelector(".popup--news") && evt.key == "Escape") {
      popup.remove();
      document.body.classList.remove(".page__body--noscroll");
    }
  });
};

//появление кнопки вверх

const buttonUp = document.querySelector(".footer__button-up");
buttonUp.addEventListener("click", (evt) => {
  window.scroll(0, 0);
});
let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener("scroll", (e) => {
  last_known_scroll_position = window.scrollY;

  if (!ticking && window.scrollY > 800) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    buttonUp.classList.add("active");
    ticking = true;
  } else {
    buttonUp.classList.remove("active");
  }
});

export const handlerCloseModalNew = () => {
  const modal = document.querySelector(".popup");
  modal.remove();
  document.body.classList.remove("page__body--noscroll");
  console.log(1111);
};

//закрытие фотографий(дубль news.js)
const handlerNewPopup = () => {
  const btnClose = document.querySelector(".popup__close");
  // btnClose.addEventListener("click", (evt) => {
  //   clearQueryParams("id", "/service/news.html");
  //   // handlerCloseModalNew();
  //   handlerClosePopup();
  // });
  const modal = document.querySelector(".popup");
  const content = modal.querySelector(".popup__content");
  modal.addEventListener("click", (evt) => {
    // if (
    //   !content.contains(evt.target as HTMLElement) &&
    //   !modal.querySelector(".popup__image--opened")
    // ) {
    //   handlerClosePopup();
    //   // handlerCloseModalNew();
    //   // clearQueryParams("id", "/service/news.html");
    // }
    if (
      !content.contains(evt.target as HTMLElement) &&
      modal.querySelector(".popup__image--opened")
    ) {
      (
        document.querySelector(".popup__wrapper") as HTMLElement
      ).style.backgroundColor = "#ffffff";
      modal
        .querySelector(".popup__image--opened")
        .classList.add("popup__image");
      modal
        .querySelector(".popup__image--opened")
        .classList.remove("popup__image--opened");
    }
  });
};

//функция записи в localstorage массива id новостей где пользователь ставил лайк

const setNewsLocalStorage = (data: TYPE_LIKES[]) => {
  let likes: string[] = [];
  data.forEach((item) => {
    likes.push(item.news_id);
  });
  // localStorage.setItem("news_likes", JSON.stringify(likes));
};

//закрытие модального окна и сброс формы
const closeModal = () => {
  // BalloonEditor.destroy();
  const modal = document.querySelector(".modal-public");
  const reset = () => {
    modal.classList.remove("js-public-display");
    modal.classList.add("js-public-nodisplay");
    (modal.querySelector(".modal-public__form") as HTMLFormElement).reset();
    (
      modal.querySelector(".modal-public__input--title") as HTMLInputElement
    ).disabled = false;
    (
      modal.querySelector(
        ".modal-public__input--description"
      ) as HTMLInputElement
    ).disabled = false;
    if (document.querySelectorAll(".modal-public__photo-wrapper").length > 0) {
      const photos = document.querySelectorAll(".modal-public__photo-wrapper");
      photos.forEach((item) => {
        item.remove();
      });
    }

    (
      document.querySelectorAll(
        ".modal-public__icon--attached"
      ) as NodeListOf<HTMLElement>
    ).forEach((el) => el.classList.remove("modal-public__icon--attached"));

    modal
      .querySelector(".modal-public__input--title")
      .classList.remove("js-public-nodisplay");
    modal
      .querySelector(".modal-public__input--description")
      .classList.remove("js-public-nodisplay");
    modal
      .querySelector(".modal-public__label--title")
      .classList.remove("js-public-nodisplay");
    modal
      .querySelector(".modal-public__label--description")
      .classList.remove("js-public-nodisplay");
    modal
      .querySelector(".modal-public__comment-wrapper")
      .classList.add("js-public-nodisplay");
    modal
      .querySelector(".modal-public__comment-wrapper")
      .classList.remove("js-public-display");
  };

  modal
    .querySelector(".modal-public__btn--close")
    .addEventListener("click", reset);
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      reset();
    }
  });
};

//очистка списка

const clearList = (container: HTMLElement, className: string) => {
  container.querySelectorAll(className).forEach((item) => item.remove());
};

const loaderTrue = () => {
  const loader = document.createElement("DIV");
  loader.classList.add("loader");
  loader.style.width = "150px";
  loader.style.height = "150px";
  loader.style.position = "fixed";
  loader.style.border = "3px dashed gray";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transition = "all 1s ease";
  loader.style.animation = "move 1s infinite linear";
  loader.style.borderRadius = "50%";
  loader.style.marginLeft = "-75px";
  loader.style.marginTop = "-75px";
  document.querySelector("body").appendChild(loader);
};

const loaderFalse = () => {
  document.querySelector(".loader")
    ? document.querySelector(".loader").remove()
    : console.log("loader not found");
};

export {
  showMessage,
  clickImage,
  handlerNewPopup,
  setNewsLocalStorage,
  closeModal,
  clearList,
  loaderTrue,
  loaderFalse,
  clearQueryParams,
};
