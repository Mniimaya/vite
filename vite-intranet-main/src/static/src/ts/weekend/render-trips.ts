import { TYPE_TRIP } from "../TYPES";
import { ITrip } from "./handlers-create";
import { creator001 } from "./role";

//отрисовка путевок
const tableTrips = document.querySelector(".weekend__table--trips");

export const renderTrips = (data: ITrip[]) => {
  const templateTrip = (
    document.querySelector(".template-trip") as HTMLTemplateElement
  ).content.querySelector(".weekend__row--data");
  console.log(data);
  data
    .sort((a, b) =>
      a.dates[6].toString() +
        a.dates[7].toString() +
        a.dates[3].toString() +
        a.dates[4].toString() +
        a.dates[0].toString() +
        a.dates[1].toString() +
        a.dates[17].toString() +
        a.dates[18].toString() +
        a.dates[14].toString() +
        a.dates[15].toString() +
        a.dates[11].toString() +
        a.dates[12].toString() >
      b.dates[6].toString() +
        b.dates[7].toString() +
        b.dates[3].toString() +
        b.dates[4].toString() +
        b.dates[0].toString() +
        b.dates[1].toString() +
        b.dates[17].toString() +
        b.dates[18].toString() +
        b.dates[14].toString() +
        b.dates[15].toString() +
        b.dates[11].toString() +
        b.dates[12].toString()
        ? 1
        : -1
    )
    .forEach((item) => {
      const newTrip = templateTrip.cloneNode(true) as HTMLElement;
      newTrip.dataset.id = item.id.toString();

      newTrip.querySelector(".weekend__data--date").textContent = item.date;
      const link = newTrip.querySelector(
        ".weekend__data-link"
      ) as HTMLLinkElement;
      link.textContent = item.hotel;
      switch (item.hotel) {
        case `Сокол Саратовская область`:
          link.href = "/service/weekend/0001-sokol.html";
          break;
        case `Эллада Анапа`:
          link.href = "/service/weekend/0001-ellada.html";
          break;
        case `Подмосковье Московская область`:
          link.href = "/service/weekend/0001-mo.html";
          break;
        case `Рожок Ростовская область`:
          link.href = "/service/weekend/0001-rozhok.html";
          break;
        case `Радуга Сочи`:
          link.href = "/service/weekend/0001-raduga.html";
          break;
        case `Парус Туапсинский район`:
          link.href = "/service/weekend/0001-parus.html";
          break;
        case `Днепр Ялта`:
          link.href = "/service/weekend/0001-dnepr.html";
          break;
        case `Маяк Евпатория`:
          link.href = "/service/weekend/0001-mayak.html";
          break;
        case `Золотой берег Владивосток`:
          link.href = "/service/weekend/0001-bereg.html";
          break;
      }
      newTrip.querySelector(".weekend__data--house").textContent = item.house;
      newTrip.querySelector(".weekend__data--number").textContent =
        item.id.toString();

      newTrip.querySelector(".weekend__data--dates").textContent = item.dates;

      if (item.hot === "1") {
        newTrip
          .querySelector(".weekend__data--date")
          .classList.add("weekend__data--hot");
      }

      if (item.half === "1") {
        newTrip
          .querySelector(".weekend__data--date")
          .classList.add("weekend__data--super");
      }

      newTrip.querySelector(".weekend__data--room").textContent = item.room;
      if (newTrip.querySelector(".weekend__request-id--reject")) {
        (
          newTrip.querySelector(
            ".weekend__request-id--reject"
          ) as HTMLInputElement
        ).value = item.id.toString();
      }
      if (!creator001) {
        newTrip.querySelector(".weekend__noborder--edit").remove();
        newTrip.querySelector(".weekend__noborder--del").remove();
      }
      tableTrips.appendChild(newTrip);
    });
};
