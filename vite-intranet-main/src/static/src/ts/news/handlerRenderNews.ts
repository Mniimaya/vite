import { getRoleForRender } from "../news/render-actual";
import { NewsAPI } from "../../js/API/newsApi.js";
const newsList = document.querySelector(".actual__list");

// Параметры и запрос для акуальных новостей
export const requestActualNews = () => {
  const getActualData = {
    status: 1,
    limit: 6,
    offset: 0,
  };

  const type = "actual";

  NewsAPI.getNews(getActualData, getRoleForRender, type);
};

// Параметры и запрос для всех новостей
export const requestAllNews = () => {
  const getAllData = {
    status: 1,
    limit: 6,
    offset: 0,
  };
  const type = "all";
  NewsAPI.getNews(getAllData, getRoleForRender, type);
};

// Получение значения акутуальной категории новостей и выбор запроса
export const handlerRenderNews = (category: string) => {
  newsList.innerHTML = "";
  if (category === "all") {
    requestAllNews();
  } else if (category === "actual") {
    requestActualNews();
  }
};
