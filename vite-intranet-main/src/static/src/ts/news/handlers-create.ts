import { NewsAPI } from "../../js/API/newsApi";
import { debounce } from "../../js/libraries/debounce";
import { clickImage, loaderTrue, showMessage } from "../util";
import { validSono } from "../utils/validation-sono";
import { offActualButton } from "./helpers";
import { validateFile } from "../utils/validations-attach";

import { TYPE_AUTH } from "../types/common";
import { TYPE_NEW, TYPE_NEWS, KeyOfTypeNew } from "../TYPES";
import { handlerClosePopup } from "../util";

const newest = document.querySelector(".newest");
const formNewest = document.querySelector(".newest__form");
const inputTitle = formNewest.querySelector(
  ".newest__input--title"
) as HTMLInputElement;
const prev = document.querySelector(".preview");
const prevTitle = prev.querySelector(".preview__title");

const showNewest = (button: HTMLElement) => {
  offActualButton();
  if (!newest.classList.contains("js-display")) {
    const actuals = document.querySelectorAll(".tab--actual");
    if (actuals) {
      actuals.forEach((actual) => actual.classList.remove("tab--actual"));
    }
    const visible = document.querySelector(".js-display");
    visible.classList.remove("js-display");
    visible.classList.add("js-nodisplay");
    newest.classList.remove("js-nodisplay");
    newest.classList.add("js-display");
    button.classList.add("tab--actual");
    validSono();
  }
};

const handlersPrev = () => {
  const inputImage = formNewest.querySelector(
    ".newest__input--avatar"
  ) as HTMLInputElement;
  const prevImage = prev.querySelector(".preview__image") as HTMLImageElement;
  const inputPhotos = formNewest.querySelector(
    ".newest__input--photo"
  ) as HTMLInputElement;

  inputImage.addEventListener("change", () => {
    const image = inputImage.files[0];
    if (image) {
      prevImage.src = URL.createObjectURL(image);
    }
  });

  inputPhotos.addEventListener("change", () => {
    const images = document.querySelectorAll(".preview__photo");
    for (let i = 0; i < images.length; i++) {
      images[i].remove();
    }

    for (let i = 0; i < inputPhotos.files.length; i++) {
      const item = document.createElement("IMG") as HTMLImageElement;
      item.className = "preview__image preview__photo js-nodisplay";
      item.src = URL.createObjectURL(inputPhotos.files[i]);
      document.querySelector(".preview__item").appendChild(item);
    }
  });

  prev.addEventListener("click", (evt) => {
    const parent = (evt.target as HTMLElement).parentElement;
    const popupTemplate = (
      document.querySelector(".popup-template") as HTMLTemplateElement
    ).content;
    const popup = popupTemplate.cloneNode(true) as HTMLElement;
    const body = document.querySelector("body");
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
    popup.querySelector(
      ".popup__date"
    ).textContent = `${day}.${month}.${date.getFullYear()}`;
    popup.querySelector(".popup__title").textContent =
      parent.querySelector(".preview__title").textContent;
    popup.querySelector(".popup__description").innerHTML = parent.querySelector(
      ".preview__description"
    ).innerHTML;
    const images = parent.querySelectorAll(".preview__image");
    for (let i = 0; i < images.length; i++) {
      const item = document.createElement("IMG") as HTMLImageElement;
      item.classList.add("popup__image");
      if (i === 0) {
        item.classList.add("popup__image--avatar");
      }
      item.src = (images[i] as HTMLImageElement).src;
      popup.querySelector(".popup__image-wrapper").appendChild(item);
    }
    body.appendChild(popup);
    handlerClosePopup();
    clickImage();
    // clickBtnClose();
  });

  //сброс превью
  let lastLinkSrc = (
    document.querySelector(".preview__avatar") as HTMLImageElement
  ).src;
  const btnReset = formNewest.querySelector(".newest__btn--reset");
  btnReset.addEventListener("click", (evt) => {
    const prevDescription = prev.querySelector(".preview__description");
    //@ts-ignore
    window.editor.first.setData("<p></p>");
    prevTitle.textContent = "Получение ИНН через МФЦ станет быстрее";
    prevDescription.innerHTML =
      "Получить ИНН в МФЦ можно будет быстрее. Оптимизировать срок предоставления услуги удалось благодаря сокращению бумажного документооборота между Налоговой службой и офисом «Мои документы». Федеральная налоговая служба разработала новый вид сведений в СМЭВ «Передача заявления физического лица о постановке на учет в налоговый орган и выдача (повторная выдача) физическому лицу свидетельства о постановке на учет в налоговом органе» (версия 4.0.0, URL-идентификатор urn://x-artefacts-fns-mfcufl/root/313-12/4.0.0). Этот вид сведений предназначен для обмена электронными документами с налоговым органом при оказании в МФЦ услуги по выдаче свидетельства ИНН. Сейчас срок выдачи ИНН через МФЦ составляет до 10 дней. Благодаря нововведению он сократится и будет занимать от одного до трех дней.";
    prevImage.src = lastLinkSrc;
    const images = document.querySelectorAll(".preview__image");
    for (let i = 1; i < images.length; i++) {
      images[i].remove();
    }
    document
      .querySelectorAll(".newest__icon--attached")
      .forEach((item) => item.classList.remove("newest__icon--attached"));
    let element = document.querySelector(".editor--news-post");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
};

export const changeTitle = () => {
  prevTitle.textContent = inputTitle.value;
};

export const changeTitlePrev = (cb: (arg: () => void) => void) => {
  inputTitle.addEventListener("input", (evt) => {
    cb(changeTitle);
  });
};

const handlerAchives = (auth: TYPE_AUTH) => {
  const sono = auth.sono;
  (document.querySelector(".newest__input--sono") as HTMLInputElement).value =
    sono;
  (document.querySelector(".newest__input--user") as HTMLInputElement).value =
    auth.samaccountname;
  (
    (
      document.querySelector(".popup-template") as HTMLTemplateElement
    ).content.querySelector(".popup__form") as HTMLElement
  ).dataset.login = auth.samaccountname;

  //событие изменение надписи выбора аватара при создании и при модерации
  const avatarBtn = document.querySelector(".newest__input--avatar");
  avatarBtn.addEventListener("change", (evt) => {
    if (
      validateFile(
        evt.target as HTMLInputElement,
        ["jpg", "jpeg", "png", "webp"],
        1
      )
    ) {
      (
        document.querySelector(".newest__icon--avatar") as HTMLElement
      ).classList.add("newest__icon--attached");
    } else {
      (
        document.querySelector(".newest__icon--avatar") as HTMLElement
      ).classList.remove("newest__icon--attached");
    }
  });
  //событие изменение надписи выбора pdf при создании и при модерации
  const pdfBtn = document.querySelector(".newest__input--pdf");
  pdfBtn.addEventListener("change", (evt) => {
    if (validateFile(evt.target as HTMLInputElement, ["pdf"], 1)) {
      (
        document.querySelector(".newest__icon--pdf") as HTMLElement
      ).classList.add("newest__icon--attached");
    } else {
      (
        document.querySelector(".newest__icon--pdf") as HTMLElement
      ).classList.remove("newest__icon--attached");
    }
  });

  //событие изменение надписи выбора video при создании и при модерации
  const videoBtn = document.querySelector(".newest__input--video");
  videoBtn.addEventListener("change", (evt) => {
    if (validateFile(evt.target as HTMLInputElement, ["mp4"], 1, 50000000)) {
      (
        document.querySelector(".newest__icon--video") as HTMLElement
      ).classList.add("newest__icon--attached");
    } else {
      (
        document.querySelector(".newest__icon--video") as HTMLElement
      ).classList.remove("newest__icon--attached");
    }
  });
  //событие изменение надписи выбора фотографий при создании и при модерации
  const photoBtn = document.querySelector(".newest__input--photo");
  photoBtn.addEventListener("change", (evt) => {
    if (
      validateFile(
        evt.target as HTMLInputElement,
        ["jpg", "jpeg", "png", "webp"],
        8
      )
    ) {
      (
        document.querySelector(".newest__icon--images") as HTMLElement
      ).classList.add("newest__icon--attached");
    } else {
      (
        document.querySelector(".newest__icon--images") as HTMLElement
      ).classList.remove("newest__icon--attached");
    }
  });
  //Размещение новой новости

  formNewest.addEventListener("submit", (evt) => {
    const form = evt.target as HTMLFormElement;
    loaderTrue();
    evt.preventDefault();
    const id = Date.now();
    (formNewest.querySelector(".newest__input--id") as HTMLInputElement).value =
      id.toString();
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
    const year = date.getFullYear().toString().slice(2);
    (
      formNewest.querySelector(".newest__input--date") as HTMLInputElement
    ).value = `${day}.${month}.${year}`;
    const contentInputs: NodeListOf<HTMLInputElement> =
      form.querySelectorAll(".input-new");
    const fileInputs: NodeListOf<HTMLInputElement> =
      form.querySelectorAll('input[type="file"]');
    const arrayFiles: FormData[] = [];
    fileInputs.forEach((input) => {
      console.log(input.files.length);
      if (input.value) {
        for (let i = 0; i < input.files.length; i++) {
          const formData = new FormData();
          formData.append(input.name, input.files[i], input.files[i].name);
          arrayFiles.push(formData);
        }
      }
    });
    let data: TYPE_NEW = {};
    contentInputs.forEach((input) => {
      data[input.name as KeyOfTypeNew] = input.value;
    });

    data.userlogin = auth.cn;
    NewsAPI.postNews(formNewest, data, arrayFiles, addFileForNew);
    setTimeout(() => {
      document.location.reload();
    }, 1500);
  });

  const addFileForNew = (
    form: HTMLFormElement,
    data: TYPE_NEWS,
    arrayFiles: FormData[]
  ) => {
    const newId = data.id;
    if (arrayFiles.length) {
      arrayFiles.forEach((file) => {
        NewsAPI.postNewsFile(form, file, newId);
      });
    }
  };
  const prevDescription = prev.querySelector(".preview__description");

  document.querySelector(".editor").addEventListener("beforeinput", (evt) => {
    const target = evt.target as HTMLElement;
    (
      document.querySelector(".newest__input--description") as HTMLInputElement
    ).value = target.innerHTML;
    prevDescription.innerHTML = target.innerHTML;
  });
  document.querySelector(".editor").addEventListener("paste", (evt) => {
    const target = evt.target as HTMLElement;

    (
      document.querySelector(".newest__input--description") as HTMLInputElement
    ).value = target.innerHTML;
    prevDescription.innerHTML = target.innerHTML;
  });
  document.querySelector(".editor").addEventListener("blur", (evt) => {
    const target = evt.target as HTMLElement;

    (
      document.querySelector(".newest__input--description") as HTMLInputElement
    ).value = target.innerHTML;
    prevDescription.innerHTML = target.innerHTML;
  });
};

export const handlerCreator = (auth: TYPE_AUTH) => {
  const button = document.createElement("button");
  button.className = "tab news-nav__btn news-nav__btn--newest";
  button.textContent = "Создать новость";
  button.addEventListener("click", () => showNewest(button));

  document.querySelector(".tab-section__wrapper").appendChild(button);
  changeTitlePrev(debounce(changeTitle, 500));
  handlersPrev();
  handlerAchives(auth);
};
