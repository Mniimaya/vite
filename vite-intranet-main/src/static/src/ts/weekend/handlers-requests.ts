import { clearList } from "../util";
import { WeekendAPI } from "../../js/API/weekendApi";
import { loaderTrue } from "../util";
import { toggleTab } from "./helpers";
import { renderRequests } from "./render-requests";
import { IRequest, ITrip } from "./handlers-create";

const clickBtnRequest = (btnRequest: HTMLElement) => {
  clearList(
    document.querySelector(".weekend__table--requests"),
    ".weekend__row--request"
  );
  clearList(
    document.querySelector(".weekend__container--request"),
    ".temp__message--request"
  );
  toggleTab();
  loaderTrue();
  WeekendAPI.get(renderRequests, setEventsAfterLoadRequests, "1");

  const actual = document.querySelector(".tab--actual");
  if (actual) {
    actual.classList.remove("tab--actual");
  }
  btnRequest.classList.add("tab--actual");
  const display = document.querySelectorAll(".js-display");
  for (let i = 0; i < display.length; i++) {
    display[i].classList.remove("js-display");
    display[i].classList.add("js-nodisplay");
  }
  document
    .querySelector(".weekend__container--request")
    .classList.remove("js-nodisplay");
  document
    .querySelector(".weekend__container--request")
    .classList.add("js-display");
  const sort = document.querySelector(".sort");
  (sort.querySelector(".sort__form") as HTMLFormElement).reset();
  if (sort && sort.classList.contains("js-sortnodisplay")) {
    sort.classList.remove("js-sortnodisplay");
    sort.classList.add("js-sortdisplay");
  }
};

//удаление заявок
const returnRequest = () => {
  const btnsDel = document.querySelectorAll(".weekend__btn--return");
  btnsDel.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const parent = (evt.target as HTMLElement).closest(
        ".weekend__row--request"
      ) as HTMLElement;
      const modal = document.querySelector(".modal__reject");
      modal.classList.remove("js-archive-nodisplay");
      modal.classList.add("js-archive-display");
      const form = modal.querySelector(".modal__reject-form") as HTMLElement;
      form.dataset.hotel = parent.querySelector(
        ".weekend__request--hotel"
      ).textContent;
      form.dataset.dates = parent.dataset.dates;
      form.dataset.house = parent.querySelector(
        ".weekend__request--house"
      ).textContent;
      form.dataset.room = parent.querySelector(
        ".weekend__request--room"
      ).textContent;
      form.dataset.hot = parent.dataset.hot;
      form.dataset.half = parent.dataset.half;
      if (parent.dataset.part) {
        form.dataset.part = parent.dataset.part;
      }
      form.dataset.id = parent.dataset.id;
    });
  });
};

//подтверждение заявок и отправка в архив
const archiveRequest = () => {
  const formSubmit = document.querySelectorAll(
    ".weekend__request-form--submit"
  );
  formSubmit.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const parent = (evt.target as HTMLElement).closest(
        ".weekend__row--request"
      ) as HTMLElement;
      const data: ITrip = {};
      if (parent.dataset.part == "1") {
        data.hotel = parent.querySelector(
          ".weekend__request--hotel"
        ).textContent;
        data.house = parent.querySelector(
          ".weekend__request--house"
        ).textContent;
        data.room = parent.querySelector(".weekend__request--room").textContent;
        data.hot = parent.dataset.hot;
        data.freedate = parent.dataset.freedate;
        data.status = "2";
        WeekendAPI.patch(data, parent.dataset.id);
      } else {
        WeekendAPI.patch({ status: "2" }, parent.dataset.id);
      }
    });
  });
};

//обработчики для отклонения
const rejectRequests = () => {
  //закрытие модального окна с комментарием отклонения

  const btnCloseReject = document.querySelector(".weekend__btn--reject-close");
  const closeRejectModal = () => {
    if (
      document
        .querySelector(".modal__reject")
        .classList.contains("js-archive-display")
    ) {
      document
        .querySelector(".modal__reject")
        .classList.remove("js-archive-display");
      document
        .querySelector(".modal__reject")
        .classList.add("js-archive-nodisplay");
      (
        document.querySelector(".modal__reject-form") as HTMLFormElement
      ).reset();
    }
  };
  btnCloseReject.addEventListener("click", closeRejectModal);
  //отправка отклоненных заявок
  const formReject = document.querySelector(
    ".modal__reject-form"
  ) as HTMLFormElement;

  formReject.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const parent = evt.target as HTMLFormElement;
    const data: IRequest = {};
    data.hotel = parent.dataset.hotel;
    data.house = parent.dataset.house;
    data.dates = parent.dataset.dates;
    data.room = parent.dataset.room;
    data.half = parent.dataset.half;
    data.hot = parent.dataset.hot;
    data.reject_reason = (
      parent.querySelector(".modal__input--reject") as HTMLInputElement
    ).value;
    data.status = "3";
    WeekendAPI.decline(data, parent.dataset.id);
  });
};

const setEventsAfterLoadRequests = () => {
  returnRequest();
  archiveRequest();
};

export const setRequests = () => {
  const buttonRequest = document.createElement("button");
  buttonRequest.className = "weekend__btn tab weekend__btn--request";
  buttonRequest.textContent = "Актуальные заявки";
  buttonRequest.addEventListener("click", () => clickBtnRequest(buttonRequest));

  document.querySelector(".tab-section__wrapper").appendChild(buttonRequest);
  rejectRequests();
};
