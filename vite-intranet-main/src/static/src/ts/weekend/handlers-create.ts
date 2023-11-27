import { WeekendAPI } from "../../js/API/weekendApi";
import { TYPE_SONO } from "../types/common";
import { closeModal, getInfo, toggleTab } from "./helpers";

export interface ITrip {
  hotel?: string;
  house?: string;
  dates?: string;
  date?: string;
  freedate?: string;
  newdate?: string;
  room?: string;
  half?: string;
  hot?: string;
  amount?: number;
  id?: number;
  part?: string;
  status?: string;
}

export interface IRequest extends ITrip {
  name?: string;
  title?: string;
  mail?: string;
  work?: string;
  info?: string;
  part?: string;
  comments?: string;
  login?: string;
  sono?: TYPE_SONO;
  tel?: string;
  reject_reason?: string;
  is_claim?: string;
}

const handlerSubmit = () => {
  //валидация инпутов
  const inputCheckIn = document.querySelector(
    ".form__input--checkin"
  ) as HTMLInputElement;
  const inputCheckOut = document.querySelector(
    ".form__input--checkout"
  ) as HTMLInputElement;

  inputCheckIn.addEventListener("change", () => {
    inputCheckOut.min = inputCheckIn.value;
  });

  inputCheckOut.addEventListener("change", () => {
    inputCheckIn.max = inputCheckOut.value;
  });
  // Размещение новой льготной путевки на вкладке льготные путевки
  const form = document.querySelector(".weekend__container--form");
  const formTrip = document.querySelector(".form__trip");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data: ITrip = {};

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

    data.amount = +(
      formTrip.querySelector(".form__input--quality") as HTMLInputElement
    ).value;
    const checkIn = (
      formTrip.querySelector(".form__input--checkin") as HTMLInputElement
    ).value;
    const checkOut = (
      formTrip.querySelector(".form__input--checkout") as HTMLInputElement
    ).value;
    const newCheckIn =
      checkIn[8] +
      checkIn[9] +
      "." +
      checkIn[5] +
      checkIn[6] +
      "." +
      checkIn[2] +
      checkIn[3];
    const newCheckOut =
      checkOut[8] +
      checkOut[9] +
      "." +
      checkOut[5] +
      checkOut[6] +
      "." +
      checkOut[2] +
      checkOut[3];
    data.dates = `${newCheckIn} - ${newCheckOut}`;
    data.hotel = (
      (evt.target as HTMLFormElement).querySelector(
        ".form__select--hotel"
      ) as HTMLInputElement
    ).value;
    data.house = (
      (evt.target as HTMLFormElement).querySelector(
        ".form__select--house"
      ) as HTMLInputElement
    ).value;
    data.room = (
      (evt.target as HTMLFormElement).querySelector(
        ".form__select--room"
      ) as HTMLInputElement
    ).value;
    data.half = (
      (evt.target as HTMLFormElement).querySelector(
        'input[name="hot"]:checked'
      ) as HTMLInputElement
    ).value;
    data.hot = (
      (evt.target as HTMLFormElement).querySelector(
        'input[name="super"]:checked'
      ) as HTMLInputElement
    ).value;

    WeekendAPI.postTrip(data);
  });
};

//создать новую путевку
const handlerCreate = (evt: Event) => {
  toggleTab();
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
    .querySelector(".weekend__container--form")
    .classList.remove("js-nodisplay");
  document
    .querySelector(".weekend__container--form")
    .classList.add("js-display");
  const sort = document.querySelector(".sort");
  if (sort && sort.classList.contains("js-sortdisplay")) {
    sort.classList.remove("js-sortdisplay");
    sort.classList.add("js-sortnodisplay");
  }
};

export const setCreate = () => {
  const buttonCreate = document.createElement("button");
  buttonCreate.className = "weekend__btn tab weekend__btn--form";
  buttonCreate.textContent = "Создать путевку";
  buttonCreate.addEventListener("click", handlerCreate);

  document.querySelector(".tab-section__wrapper").appendChild(buttonCreate);
  handlerSubmit();
};
