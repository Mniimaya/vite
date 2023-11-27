//отрисовка заявок из полученного массива

import { TYPE_TRIP } from "../TYPES";

import { SERVICES_SONO } from "../types/common";
import { IRequest } from "./handlers-create";

const requestContainer = document.querySelector(".weekend__table--requests");

export const renderRequests = (data: IRequest[]) => {
  const templateRequest = (
    document.querySelector(".request-item") as HTMLTemplateElement
  ).content.querySelector(".weekend__row--request");
  data
    .sort((a, b) =>
      a.date[6].toString() +
        a.date[7].toString() +
        a.date[3].toString() +
        a.date[4].toString() +
        a.date[0].toString() +
        a.date[1].toString() <
      b.date[6].toString() +
        b.date[7].toString() +
        b.date[3].toString() +
        b.date[4].toString() +
        b.date[0].toString() +
        b.date[1].toString()
        ? 1
        : -1
    )
    .forEach((item) => {
      const newRequest = templateRequest.cloneNode(true) as HTMLElement;
      newRequest.dataset.id = item.id.toString();
      newRequest.dataset.dates = item.dates;
      newRequest.dataset.sono = item.sono;
      if (item.comments) {
        newRequest.dataset.comments = item.comments;
      }
      newRequest.dataset.hot = item.hot;
      newRequest.dataset.half = item.half;
      if (item.freedate) {
        newRequest.dataset.part = item.part;
        newRequest.dataset.freedate = item.freedate;
        newRequest.querySelector(".weekend__request--dates").textContent =
          item.newdate;
      } else {
        newRequest.querySelector(".weekend__request--dates").textContent =
          item.dates;
      }
      newRequest.querySelector(".weekend__request--date").textContent =
        item.date;
      newRequest.querySelector(".weekend__request--hotel").textContent =
        item.hotel;
      newRequest.querySelector(".weekend__request--guest").textContent =
        item.name;

      newRequest.querySelector(".weekend__request--number").textContent =
        item.id.toString();

      if (item.comments) {
        newRequest.querySelector(".weekend__request--extra").innerHTML =
          item.comments;
      }
      //если половинка
      if (item.half == "1") {
        newRequest.classList.add("weekend__request--part");
      }

      //если горячая
      if (item.hot == "1") {
        newRequest.classList.add("weekend__request--super");
      }

      //если были жалобы
      if (item.is_claim == "1") {
        newRequest.classList.add("weekend__request--reject");
      }

      if (item.part == "1" && item.comments) {
        newRequest.dataset.dates = item.dates;
        const dates = item.dates;
        newRequest.querySelector(
          ".weekend__request--extra"
        ).innerHTML = `даты по умолчанию:  <br> ${dates} <br> комментарии: ${item.comments}`;
      }
      if (
        !(
          newRequest.querySelector(
            ".weekend__request-number--newdate"
          ) as HTMLInputElement
        ).value
      ) {
        (
          newRequest.querySelector(
            ".weekend__request-number--newdate"
          ) as HTMLInputElement
        ).disabled = true;
      }

      const key = item.sono;
      newRequest.querySelector(".weekend__request--filial").textContent =
        SERVICES_SONO[key];
      newRequest.querySelector(".weekend__request--house").textContent =
        item.house;
      newRequest.querySelector(".weekend__request--info").innerHTML = item.info;
      newRequest.querySelector(".weekend__request--room").textContent =
        item.room;
      newRequest.querySelector(".weekend__request--tel").textContent = item.tel;
      if (item.work) {
        newRequest.querySelector(".weekend__request--work").textContent =
          item.work;
      }
      newRequest.querySelector(".weekend__request--mail").textContent =
        item.mail;
      (
        newRequest.querySelector(
          ".weekend__request-id--approve"
        ) as HTMLInputElement
      ).value = item.id.toString();
      (
        newRequest.querySelector(
          ".weekend__request-name--approve"
        ) as HTMLInputElement
      ).value = item.name;
      (
        newRequest.querySelector(
          ".weekend__request-date--approve"
        ) as HTMLInputElement
      ).value = item.date;
      (
        newRequest.querySelector(
          ".weekend__request-dates--approve"
        ) as HTMLInputElement
      ).value = item.dates;
      (
        newRequest.querySelector(
          ".weekend__request-hotel--approve"
        ) as HTMLInputElement
      ).value = item.hotel;
      (
        newRequest.querySelector(
          ".weekend__request-number--approve"
        ) as HTMLInputElement
      ).value = newRequest.querySelector(
        ".weekend__request--number"
      ).textContent;
      (
        newRequest.querySelector(
          ".weekend__request-info--approve"
        ) as HTMLInputElement
      ).value = item.info;
      if (item.comments) {
        (
          newRequest.querySelector(
            ".weekend__request-extra--approve"
          ) as HTMLInputElement
        ).value = item.comments;
      } else {
        (
          newRequest.querySelector(
            ".weekend__request-extra--approve"
          ) as HTMLInputElement
        ).disabled = true;
      }
      (
        newRequest.querySelector(
          ".weekend__request-room--approve"
        ) as HTMLInputElement
      ).value = item.room;
      (
        newRequest.querySelector(
          ".weekend__request-house--approve"
        ) as HTMLInputElement
      ).value = item.house;
      (
        newRequest.querySelector(
          ".weekend__request-tel--approve"
        ) as HTMLInputElement
      ).value = item.tel;
      (
        newRequest.querySelector(
          ".weekend__request-mail--approve"
        ) as HTMLInputElement
      ).value = item.mail;

      requestContainer.appendChild(newRequest);
    });
  if (data.length > 0) {
    document
      .querySelector(".weekend__table--requests")
      .classList.remove("js-nodisplay--request");
  } else {
    const container = document.querySelector(".weekend__container--request");
    const message = document.createElement("P");
    message.classList.add("temp__message--request");
    message.style.fontSize = "32px";
    message.style.textAlign = "center";
    message.textContent = "Актуальных заявок на данный момент нет";
    container.appendChild(message);
  }
};
