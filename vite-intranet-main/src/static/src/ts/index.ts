import { NewsAPI } from "../js/API/newsApi.js";
import { setNewsLocalStorage } from "./util";
import { apiPath } from "../main.js";
import { TYPE_NEWS, TYPE_PHOTOS } from "./TYPES";
import { openPopupLink } from "./news/helpers";
import { transformationDate } from "./utils/transformationDate";
import { SERVICES_SONO } from "./types/common";

setTimeout(() => {
  if (sessionStorage.getItem("auth") != null) {
    const data = JSON.parse(sessionStorage.getItem("auth"));
    const formData = new FormData();
    formData.append("id", data.samaccountname);
    // NewsAPI.getLikes(setNewsLocalStorage, formData);
  }
}, 300);
//отрисовка слайдера на главной
const renderSlider = (data: TYPE_NEWS[]) => {
  const slideTemplate = (
    document.querySelector(".slider-template") as HTMLTemplateElement
  ).content.querySelector(".slider__item");
  const slideContainer = document.querySelector(".slider__list");
  data.forEach((item) => {
    const newSlide = slideTemplate.cloneNode(true) as HTMLElement;
    (newSlide.querySelector(".slider__image") as HTMLImageElement).src =
      `${apiPath}` + item.avatar;
    let date = transformationDate(item.createdAt);
    newSlide.querySelector(".slider__date").textContent = date;
    newSlide.querySelector(".slider__title").textContent = item.title;
    newSlide.querySelector(".slider__title--company").textContent =
      SERVICES_SONO[item.sono];
    newSlide.querySelector(".slider__description").innerHTML = item.description;
    newSlide.querySelector(".slider__views").textContent =
      item.views.toString();
    newSlide.querySelector(".slider__likes").textContent =
      `${item.is_liked.length}` ? `${item.is_liked.length}` : "0";
    newSlide.addEventListener("click", () => {
      NewsAPI.getLink(item.id, openPopupLink);
      newSlide.querySelector(".slider__views").textContent = String(
        Number(newSlide.querySelector(".slider__views").textContent) + 1
      );
    });
    if (item.images && item.images !== "Все фотографии удалены модератером") {
      for (let j = 0; j < item.images.length; j++) {
        const imageSecondary = newSlide
          .querySelector(".slider__image")
          .cloneNode(true) as HTMLImageElement;
        imageSecondary.src =
          `${apiPath}` + (item.images[j] as TYPE_PHOTOS).photos;
        imageSecondary.classList.add("js-nodisplay");
        newSlide.appendChild(imageSecondary);
      }
    }
    if (item.admin) {
      for (let j = 0; j < item.admin.length; j++) {
        const imageSecondary = newSlide
          .querySelector(".slider__image")
          .cloneNode(true) as HTMLImageElement;
        imageSecondary.src = `${apiPath}` + item.admin[j];
        imageSecondary.classList.add("js-nodisplay");
        newSlide.appendChild(imageSecondary);
      }
    }

    if (item.pdf != null && item.pdf != "NULL") {
      (newSlide.querySelector(".slider__pdf") as HTMLLinkElement).href =
        `${apiPath}/` + item.pdf;
    } else {
      newSlide.querySelector(".slider__pdf").remove();
    }

    if (item.video != null && item.pdf != "NULL") {
      (newSlide.querySelector(".slider__video") as HTMLVideoElement).src =
        `${apiPath}/` + item.video;
    } else {
      newSlide.querySelector(".slider__video").remove();
    }
    newSlide.dataset.id = item.id;
    newSlide.dataset.sono = item.sono;
    newSlide.dataset.userlogin = item.userlogin;
    slideContainer.appendChild(newSlide);
  });
};

const startSlider = () => {
  // Анимация слайдера

  const slider = document.querySelector(".slider");
  const line = slider.querySelector(".slider__line");
  const btnNext = slider.querySelector(".slider__btn--next");
  const btnPrev = slider.querySelector(".slider__btn--prev");
  const slides = slider.querySelectorAll(".slider__item");

  let count = 0;

  const getOpacity = () => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add("js-opacity-0");
    }
    slides[count].classList.remove("js-opacity-0");
  };

  getOpacity();

  const moveRight = () => {
    if (count + 1 == slides.length) {
      count = 0;
    } else {
      count++;
    }
    getOpacity();
  };
  let initInterval: ReturnType<typeof setInterval> | undefined;

  const getInterval = () => {
    initInterval = setInterval(moveRight, 6000);
  };

  getInterval();

  const moveNext = (cb: () => void) => {
    btnNext.addEventListener("click", () => {
      clearInterval(initInterval);
      moveRight();
      cb();
    });
  };

  const movePrev = (cb: () => void) => {
    btnPrev.addEventListener("click", () => {
      clearInterval(initInterval);
      if (count - 1 == -1) {
        count = slides.length - 1;
      } else {
        count--;
      }
      getOpacity();
      cb();
    });
  };

  moveNext(getInterval);
  movePrev(getInterval);
};

const startJs = () => {
  const titleNews = document.querySelector(".index-news__title") as HTMLElement;
  titleNews.addEventListener("mouseover", () => {
    titleNews.style.opacity = "0";
    titleNews.textContent = "Подробнее...";
    titleNews.style.opacity = "1";
    titleNews.style.textDecoration = "underline";
  });

  titleNews.addEventListener("mouseout", () => {
    titleNews.style.opacity = "0";
    titleNews.textContent = "Новости";
    titleNews.style.opacity = "1";
    titleNews.style.textDecoration = "none";
  });

  const titleService = document.querySelector(
    ".services__headline"
  ) as HTMLElement;
  titleService.addEventListener("mouseover", () => {
    titleService.style.opacity = "0";
    titleService.textContent = "Подробнее...";
    titleService.style.opacity = "1";
    titleService.style.textDecoration = "underline";
  });

  titleService.addEventListener("mouseout", () => {
    titleService.style.opacity = "0";
    titleService.textContent = "Сервисы";
    titleService.style.opacity = "1";
    titleService.style.textDecoration = "none";
  });
  //получаем список id новостей с лайками
};

//Запуск приложения

const goStart = (data: any) => {
  console.log(data);
  renderSlider(data.rows.slice(0, 4));
  startSlider();
  startJs();
};

const getActualData = {
  status: 1,
  limit: 6,
  offset: 0,
};

NewsAPI.getNews(getActualData, goStart);
