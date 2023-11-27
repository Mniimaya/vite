import { StatisticAPI } from "../js/API/statisticApi.js";

type TYPE_VISIT = {
  views: number;
  hosts: number;
  date: string;
};

//вывод информации в блоке посещений

const renderVisits = (data: TYPE_VISIT[]) => {
  const dataReverse = data.slice().reverse();
  const stat = document.querySelector(".stat__list");
  const lastDay = stat.querySelector(".stat__item--today");
  const yesterday = stat.querySelector(".stat__item--yesterday");
  const week = stat.querySelector(".stat__item--week");
  const month = stat.querySelector(".stat__item--30days");
  if (dataReverse.length > 1) {
    const visitsYesterday = dataReverse[1]["views"]
      ? dataReverse[1]["views"]
      : "";
    const visitsUniqYesterday = dataReverse[1]["hosts"]
      ? dataReverse[1]["hosts"]
      : "";
    yesterday.textContent = `Вчера: всего посещений: ${visitsYesterday}, уникальных: ${visitsUniqYesterday}`;
  }
  const visitsToday = dataReverse[0]["views"];
  const visitsUniqToday = dataReverse[0]["hosts"];
  const calcWeek = dataReverse.slice(0, 7).reduce((visitsWeek, a) => {
    return +visitsWeek + +a.views;
  }, 0);
  const calcMonth = dataReverse.slice(0, 10).reduce((visitsWeek, a) => {
    return +visitsWeek + +a.views;
  }, 0);
  lastDay.textContent = `Сегодня: всего посещений: ${visitsToday}, уникальных: ${visitsUniqToday}`;
  week.textContent = `За последние 7 дней: всего посещений: ${calcWeek}`;
  month.textContent = `За последние 30 дней: всего посещений: ${calcMonth}`;
};

const renderSchedule = (data: TYPE_VISIT[]) => {
  const dataReverse = data.reverse().slice(0, 10).reverse();

  dataReverse.forEach((day) => {
    const template = (
      document.querySelector(".template-day") as HTMLTemplateElement
    ).content.querySelector(".schedule__item");
    const item = template.cloneNode(true) as HTMLElement;
    item.querySelector(".schedule__visits").textContent = day.views.toString();
    (
      item.querySelector(".schedule__mark") as HTMLElement
    ).style.height = `${day.views}px`;
    item.querySelector(".schedule__title").textContent = `${day.date}`;
    item.querySelector(".schedule__uniq").textContent = day.hosts.toString();
    document.querySelector(".schedule__list").appendChild(item);
  });
};

StatisticAPI.getStatistic(renderVisits, renderSchedule);
