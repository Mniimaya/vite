import { NewsAPI } from "../../js/API/newsApi";
import { offActualButton } from "./helpers";
import { renderNoApprovedNews } from "./render-edit";
import { validateFile } from "../utils/validations-attach";
import { loaderTrue } from "../util";
import {
  TYPE_NEW,
  TYPE_NEWS,
  TYPE_MODER_NEW,
  KeyOfTypeModerNew,
} from "../TYPES";
import { TYPE_AUTH } from "../types/common";
import { closeModal } from "../util";

const hiddenComment = (modal: HTMLElement) => {
  modal
    .querySelector(".modal-public__comment-wrapper")
    .classList.add("js-public-nodisplay");
  modal
    .querySelector(".modal-public__comment-wrapper")
    .classList.remove("js-public-display");
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
  (
    modal.querySelector(".modal-public__input--comment") as HTMLInputElement
  ).disabled = true;
  (
    modal.querySelector(".modal-public__input--title") as HTMLInputElement
  ).disabled = false;
  (
    modal.querySelector(".modal-public__input--description") as HTMLInputElement
  ).disabled = false;
  (
    modal.querySelector(".modal-public__input--avatar") as HTMLInputElement
  ).disabled = false;
  (
    modal.querySelector(".modal-public__input--photo") as HTMLInputElement
  ).disabled = false;
  (modal.querySelector(".modal-public__photos") as HTMLElement).style.display =
    "flex";
};

const showComment = (modal: HTMLElement) => {
  (
    modal.querySelector(".modal-public__input--title") as HTMLInputElement
  ).disabled = true;
  (
    modal.querySelector(".modal-public__input--description") as HTMLInputElement
  ).disabled = true;
  modal
    .querySelector(".modal-public__comment-wrapper")
    .classList.remove("js-public-nodisplay");
  modal
    .querySelector(".modal-public__comment-wrapper")
    .classList.add("js-public-display");
  modal
    .querySelector(".modal-public__input--title")
    .classList.add("js-public-nodisplay");
  modal
    .querySelector(".modal-public__input--description")
    .classList.add("js-public-nodisplay");
  modal
    .querySelector(".modal-public__label--title")
    .classList.add("js-public-nodisplay");
  modal
    .querySelector(".modal-public__label--description")
    .classList.add("js-public-nodisplay");
  (
    modal.querySelector(".modal-public__input--avatar") as HTMLInputElement
  ).disabled = true;
  (
    modal.querySelector(".modal-public__input--photo") as HTMLInputElement
  ).disabled = true;
  (modal.querySelector(".modal-public__photos") as HTMLElement).style.display =
    "none";
  (
    modal.querySelector(".modal-public__input--comment") as HTMLInputElement
  ).disabled = false;
};

//изменение формы на disabled при нажатии на input
export const doInputsDisabled = () => {
  const modal: HTMLElement = document.querySelector(".modal-public");
  modal
    .querySelector(".modal-public__form")
    .addEventListener("change", (evt) => {
      if ((evt.target as HTMLInputElement).type === "radio") {
        if (
          (
            modal.querySelector(
              ".modal-public__input--reject"
            ) as HTMLInputElement
          ).checked
        ) {
          showComment(modal);
        } else {
          hiddenComment(modal);
        }
      }
    });
};

//если администратор

const handlerInitEditor = (button: HTMLElement | undefined = undefined) => {
  const publicWrap = document.querySelector(".public");

  offActualButton();
  const items = document.querySelectorAll(".public__item");
  if (items.length > 0) {
    items.forEach((item) => item.remove());
  }

  const getModerNews = {
    status: 0,
    limit: 6,
    offset: 0,
  };
  NewsAPI.getNews(getModerNews, renderNoApprovedNews);
  if (!publicWrap.classList.contains("js-display")) {
    const visible = document.querySelector(".js-display");
    visible.classList.remove("js-display");
    visible.classList.add("js-nodisplay");
    publicWrap.classList.remove("js-nodisplay");
    if (document.querySelector(".tab--actual")) {
      document.querySelector(".tab--actual").classList.remove("tab--actual");
    }
    publicWrap.classList.add("js-display");
    if (button) {
      button.classList.add("tab--actual");
    }
  }
};

const handlersAchives = (auth: TYPE_AUTH) => {
  // const pdfBtnPublic = document.querySelector(".modal-public__input--pdf");
  // if (pdfBtnPublic) {
  //   pdfBtnPublic.addEventListener("change", (evt: Event) => {
  //     console.log(evt);
  //     (
  //       document.querySelector(".modal-public__pdf") as HTMLElement
  //     ).style.border = `1px solid #08882e`;
  //     document.querySelector(".modal-public__label--pdf").textContent =
  //       "PDF выбран";
  //     (
  //       document.querySelector(".modal-public__label--pdf") as HTMLElement
  //     ).style.width = "inherit";
  //     (
  //       document.querySelector(".modal-public__label--pdf") as HTMLElement
  //     ).style.color = "#08882e";
  //   });
  // }
  const avatarBtnPublic = document.querySelector(
    ".modal-public__input--avatar"
  );
  avatarBtnPublic.addEventListener("change", (evt: Event) => {
    if (
      validateFile(
        evt.target as HTMLInputElement,
        ["jpg", "jpeg", "png", "webp"],
        1
      )
    ) {
      (
        document.querySelector(".modal-public__icon--avatar") as HTMLElement
      ).classList.add("modal-public__icon--attached");
    } else {
      (
        document.querySelector(".modal-public__icon--avatar") as HTMLElement
      ).classList.remove("modal-public__icon--attached");
    }
  });

  // const videoBtnPublic = document.querySelector(".modal-public__input--video");
  // if (videoBtnPublic) {
  //   videoBtnPublic.addEventListener("change", () => {
  //     (
  //       document.querySelector(".modal-public__video") as HTMLElement
  //     ).style.border = `1px solid #08882e`;
  //     document.querySelector(".modal-public__label--video").textContent =
  //       "Видео выбрано";
  //     (
  //       document.querySelector(".modal-public__label--video") as HTMLElement
  //     ).style.width = "inherit";
  //     (
  //       document.querySelector(".modal-public__label--video") as HTMLElement
  //     ).style.color = "#08882e";
  //   });
  // }
  const photoBtnPublic = document.querySelector(".modal-public__input--photo");
  photoBtnPublic.addEventListener("change", (evt) => {
    if (
      validateFile(
        evt.target as HTMLInputElement,
        ["jpg", "jpeg", "png", "webp"],
        8
      )
    ) {
      (
        document.querySelector(".modal-public__icon--images") as HTMLElement
      ).classList.add("modal-public__icon--attached");
    } else {
      (
        document.querySelector(".modal-public__icon--images") as HTMLElement
      ).classList.remove("modal-public__icon--attached");
    }
  });

  const handlderAddPhotoModerate = (
    form: HTMLFormElement,
    data: TYPE_NEWS,
    arrayFiles: FormData[],
    id: number
  ) => {
    form.reset();
    handlerInitEditor();
    console.log(data);
    if (arrayFiles.length) {
      arrayFiles.forEach((file) => {
        NewsAPI.postNewsFile(form, file, id);
      });
    }
  };

  //сохранение новости администратором
  const formAdmin = document.querySelector(".modal-public__form");
  formAdmin.addEventListener("submit", (evt) => {
    evt.preventDefault();
    loaderTrue();
    const form = evt.target as HTMLFormElement;
    const dataInputs: NodeListOf<HTMLInputElement> =
      form.querySelectorAll(".news__input-moder");
    let data: any = {};
    const newId = +form.dataset.id;
    dataInputs.forEach((input) => {
      if (input.name === "status" && input.checked) {
        data[input.name] = +input.value;
      } else if (input.name !== "status") {
        const inputName = input.name;
        data[inputName as KeyOfTypeModerNew] = input.value;
      }
    });

    // (
    //   document.querySelector(".modal-public__comment-wrapper") as HTMLElement
    // ).classList.remove("js-public-display");
    // (
    //   document.querySelector(".modal-public__comment-wrapper") as HTMLElement
    // ).classList.add("js-public-nodisplay");

    const removedPhotoInputs: NodeListOf<HTMLInputElement> =
      formAdmin.querySelectorAll('input[name="del[]"');
    if (removedPhotoInputs.length) {
      removedPhotoInputs.forEach((input) => {
        NewsAPI.deletePhotoNew(newId, +input.value);
      });
    }

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
    NewsAPI.updateModerateNews(
      newId,
      form,
      data,
      arrayFiles,
      handlderAddPhotoModerate
    );

    const modal: HTMLElement = document.querySelector(".modal-public");
    hiddenComment(modal);
    modal.classList.remove("js-public-display");
    modal.classList.add("js-public-nodisplay");
  });
  document
    .querySelector(".editor-admin")
    .addEventListener("beforeinput", (evt) => {
      (
        document.getElementById("modal-public__description") as HTMLInputElement
      ).value = (evt.target as HTMLElement).innerHTML;
    });
  document.querySelector(".editor-admin").addEventListener("paste", (evt) => {
    (
      document.getElementById("modal-public__description") as HTMLInputElement
    ).value = (evt.target as HTMLElement).innerHTML;
  });
  document.querySelector(".editor-admin").addEventListener("blur", (evt) => {
    (
      document.getElementById("modal-public__description") as HTMLInputElement
    ).value = (evt.target as HTMLElement).innerHTML;
  });

  (
    document.querySelectorAll(
      ".modal-public__icon--attached"
    ) as NodeListOf<HTMLElement>
  ).forEach((el) => el.classList.remove("modal-public__icon--attached"));
};

export const handlerEditor = (auth: TYPE_AUTH) => {
  const button = document.createElement("button");
  button.className = "tab news-nav__btn news-nav__btn--public";
  button.textContent = "На рассмотрении";
  button.addEventListener("click", () => handlerInitEditor(button));

  document.querySelector(".tab-section__wrapper").appendChild(button);
  doInputsDisabled();
  handlersAchives(auth);
};
