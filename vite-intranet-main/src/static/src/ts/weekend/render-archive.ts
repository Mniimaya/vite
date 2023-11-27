import { TYPE_TRIP } from "../TYPES";

import { SERVICES_SONO } from "../types/common";
import { IRequest } from "./handlers-create";

//отрисовка архива из полученного массива
export const renderArchive = (data: IRequest[]) => {
  const archive = document.querySelector(".weekend__table--archive");
  const templateArchive = (
    document.querySelector(".archive-item") as HTMLTemplateElement
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
      const newArchive = templateArchive.cloneNode(true) as HTMLElement;
      newArchive.dataset.id = item.id.toString();
      if (item.comments) {
        newArchive.dataset.comments = item.comments;
      }
      let numberVirtual;
      //если повловинка
      if (item.half == "1") {
        newArchive.classList.add("weekend__request--part");
      }

      //если горячая
      if (item.part == "1") {
        newArchive.classList.add("weekend__request--super");
      }

      //если были жалобы
      if (item.is_claim == "1") {
        newArchive.classList.add("weekend__request--reject");
      }
      newArchive.querySelector(".weekend__request--number").textContent =
        numberVirtual;
      newArchive.querySelector(".weekend__request--number").textContent =
        item.id.toString();

      newArchive.querySelector(".weekend__request--date").textContent =
        item.date;
      newArchive.querySelector(".weekend__request--info").innerHTML = item.info;
      newArchive.querySelector(".weekend__request--hotel").textContent =
        item.hotel;
      newArchive.querySelector(".weekend__request--guest").textContent =
        item.name;
      const key = item.sono;
      newArchive.querySelector(".weekend__request--filial").textContent =
        SERVICES_SONO[key];
      newArchive.querySelector(".weekend__request--house").textContent =
        item.house;
      newArchive.querySelector(".weekend__request--dates").textContent =
        item.dates;
      if (item.newdate) {
        newArchive.querySelector(".weekend__request--dates").textContent =
          item.newdate;
      }
      newArchive.querySelector(".weekend__request--room").textContent =
        item.room;
      newArchive.querySelector(".weekend__request--tel").textContent = item.tel;
      if (item.work) {
        newArchive.querySelector(".weekend__request--work").textContent =
          item.work;
      }
      newArchive.querySelector(".weekend__request--mail").textContent =
        item.mail;
      item.comments
        ? (newArchive.querySelector(".weekend__archive--extra").innerHTML +=
            item.comments)
        : (newArchive.querySelector(".weekend__archive--extra").innerHTML +=
            "оставить комментарий");

      archive.appendChild(newArchive);
    });
};
