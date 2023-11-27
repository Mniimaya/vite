import { getRoleForRender } from "./render-actual";
import { NewsAPI } from "../../js/API/newsApi";

const COUNT_RENDER = 6;

export const requestPagination = (
  offset: number,
  status: number,
  cb: Function
) => {
  const optionRequest = {
    status: status,
    limit: COUNT_RENDER,
    offset: offset,
  };
  NewsAPI.getNews(optionRequest, cb);
};

export const handlerPagination = (
  wrapper: HTMLElement,
  status: number,
  cb: Function
) => {
  const paginationItems: NodeListOf<HTMLButtonElement> =
    wrapper.querySelectorAll(".pagination__btn-number");
  const paginationButtonsExtreme: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".pagination__btn--end, .pagination__btn--start");
  const paginationButtonsArrow: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".pagination__btn--prev, .pagination__btn--next");

  if (paginationButtonsExtreme.length) {
    paginationButtonsExtreme.forEach((button) => {
      button.addEventListener("click", (evt) => {
        const value = (evt.target as HTMLButtonElement).dataset.page;
        const offset: number = COUNT_RENDER * (+value - 1);
        requestPagination(offset, status, cb);
        window.scrollTo(0, 0);
      });
    });
  }

  if (paginationButtonsArrow.length) {
    paginationButtonsArrow.forEach((button) => {
      button.addEventListener("click", (evt) => {
        const actualValue = (
          document.querySelector(
            ".pagination__btn--actual"
          ) as HTMLButtonElement
        ).textContent;
        const offset: number = COUNT_RENDER * (+actualValue - 1);
        requestPagination(offset, status, cb);
        window.scrollTo(0, 0);
      });
    });
  }
  paginationItems.forEach((button) => {
    button.addEventListener("click", (evt) => {
      paginationItems.forEach((item) =>
        item.classList.remove("pagination__btn--actual")
      );
      const currentButton = evt.target as HTMLButtonElement;
      currentButton.classList.add("pagination__btn--actual");
      const value = (evt.target as HTMLButtonElement).textContent;
      const offset: number = COUNT_RENDER * (+value - 1);
      requestPagination(offset, status, cb);
      window.scrollTo(0, 0);
    });
  });
};

export const getPageCount = (count: number): number => {
  let countPage = count % COUNT_RENDER;
  countPage = countPage === 0 ? count / COUNT_RENDER : count / COUNT_RENDER + 1;
  countPage = +String(countPage).split(".")[0];
  return countPage;
};
