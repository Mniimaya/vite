//перейти на вкладку архив

import { clearList, loaderTrue } from "../util";
import { WeekendAPI } from "../../js/API/weekendApi";
import { setComment, toggleTab } from "./helpers";
import { renderArchive } from "./render-archive";
import { IRequest } from "./handlers-create";

const handlerSubmit = () => {
  //Отправка формы редактирования примечаний
  // Обработчики событий переключения блоков weekend.html

  const archive = document.querySelector(
    ".weekend__container--archive"
  ) as HTMLElement;
  const formArchive = document.querySelector(".modal-archive__form");

  formArchive.addEventListener("submit", (evt) => {
    const modalArchive = document.querySelector(".modal-archive");

    evt.preventDefault();
    const sendSuccess = () => {
      if (modalArchive.classList.contains("js-archive-display")) {
        modalArchive.classList.remove("js-archive-display");
        modalArchive.classList.add("js-archive-nodisplay");
      }
      (formArchive as HTMLFormElement).reset();
      clearList(archive, ".weekend__row--request");
      console.log("here");
      (document.querySelector(".modal-archive") as HTMLElement).className =
        "modal-archive js-archive-nodisplay";
      WeekendAPI.get(renderArchive, setEventAfterLoadArchive, "2");
    };
    const data: IRequest = {};
    data.comments = (
      (evt.target as HTMLFormElement).querySelector(
        ".modal-archive__input"
      ) as HTMLInputElement
    ).value;
    data.is_claim = (
      (evt.target as HTMLFormElement).querySelector(
        "input[name='reject']:checked"
      ) as HTMLInputElement
    ).value;
    data.status = "2";
    WeekendAPI.patch(
      data,
      (
        (evt.target as HTMLFormElement).querySelector(
          ".modal-archive__id"
        ) as HTMLInputElement
      ).value,
      sendSuccess
    );
  });
};

const handlerArchive = (evt: Event) => {
  toggleTab();
  clearList(
    document.querySelector(".weekend__container--archive"),
    ".weekend__row--request"
  );
  loaderTrue();
  WeekendAPI.get(renderArchive, setEventAfterLoadArchive, "2");
  const display = document.querySelectorAll(".js-display");
  for (let i = 0; i < display.length; i++) {
    display[i].classList.remove("js-display");
    display[i].classList.add("js-nodisplay");
  }
  const actual = document.querySelector(".tab--actual");
  if (actual) {
    actual.classList.remove("tab--actual");
  }
  (evt.target as HTMLElement).classList.add("tab--actual");
  document
    .querySelector(".weekend__container--archive")
    .classList.remove("js-nodisplay");
  document
    .querySelector(".weekend__container--archive")
    .classList.add("js-display");
  const sort = document.querySelector(".sort");
  (sort.querySelector(".sort__form") as HTMLFormElement).reset();

  if (sort && sort.classList.contains("js-sortnodisplay")) {
    sort.classList.remove("js-sortnodisplay");
    sort.classList.add("js-sortdisplay");
  }
  const rowsNoDisplay = document
    .querySelector(".weekend__container--archive")
    .querySelectorAll(".js-sortrownodisplay");
  if (rowsNoDisplay.length > 0) {
    rowsNoDisplay.forEach((item) => {
      item.classList.remove("js-sortrownodisplay");
    });
  }
};

//обработчики событий данных с сервера
export const setEventAfterLoadArchive = () => {
  setComment();
};

export const setArchive = () => {
  const buttonArchive = document.createElement("button");
  buttonArchive.className = "weekend__btn tab weekend__btn--archive";
  buttonArchive.textContent = "Подтвержденные заявки";
  buttonArchive.addEventListener("click", handlerArchive);

  document.querySelector(".tab-section__wrapper").appendChild(buttonArchive);
  handlerSubmit();
};
