import { renderPaginationData } from "./news/render-archive";

export const renderPagination = (containerClass: string, pages: number) => {
  const renderRemoveDots = () => {
    if (
      document.querySelector('.pagination__btn[data-number="1"]').textContent !=
      "1"
    ) {
      document.querySelector(".pagination__btn--start-dots").textContent =
        "...";
      (
        document.querySelector(".pagination__btn--start-dots")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
      (
        document.querySelector(".pagination__btn--start")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
      (
        document.querySelector(".pagination__btn--prev")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
    } else {
      document.querySelector(".pagination__btn--start-dots").textContent = "";

      (
        document.querySelector(".pagination__btn--start-dots")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
      (
        document.querySelector(".pagination__btn--start")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
      (
        document.querySelector(".pagination__btn--prev")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
    }
    if (
      document.querySelector('.pagination__btn[data-number="3"]').textContent ==
      pages.toString()
    ) {
      document.querySelector(".pagination__btn--end-dots").textContent = "";
      (
        document.querySelector(".pagination__btn--end-dots")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
      (
        document.querySelector(".pagination__btn--next")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
      (
        document.querySelector(".pagination__btn--end")
          .parentElement as HTMLButtonElement
      ).style.display = "none";
    } else {
      document.querySelector(".pagination__btn--end-dots").textContent = "...";
      (
        document.querySelector(".pagination__btn--end-dots")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
      (
        document.querySelector(".pagination__btn--next")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
      (
        document.querySelector(".pagination__btn--end")
          .parentElement as HTMLButtonElement
      ).style.display = "block";
    }
  };
  const handlerNext = () => {
    const numberFirst = document.querySelector(
      '.pagination__btn[data-number="1"]'
    );
    const numberSecond = document.querySelector(
      ".pagination__btn[data-number = '2']"
    );
    const numberThird = document.querySelector(
      ".pagination__btn[data-number = '3']"
    );
    const actual = document.querySelector(
      ".pagination__btn--actual"
    ) as HTMLElement;
    if (actual.dataset.number == "1") {
      numberFirst.classList.remove("pagination__btn--actual");
      numberSecond.classList.add("pagination__btn--actual");
    }
    if (actual.dataset.number == "2") {
      actual.classList.remove("pagination__btn--actual");
      numberThird.classList.add("pagination__btn--actual");
    }
    if (actual.dataset.number == "3" && actual.textContent < pages.toString()) {
      numberFirst.textContent = (+numberFirst.textContent + 1).toString();
      numberSecond.textContent = (+numberSecond.textContent + 1).toString();
      numberThird.textContent = (+numberThird.textContent + 1).toString();
    }
    renderRemoveDots();
    // renderPaginationData();
  };

  const handlerPrev = () => {
    const numberFirst = document.querySelector(
      '.pagination__btn[data-number="1"]'
    );
    const numberSecond = document.querySelector(
      ".pagination__btn[data-number = '2']"
    );
    const numberThird = document.querySelector(
      ".pagination__btn[data-number = '3']"
    );
    const actual = document.querySelector(
      ".pagination__btn--actual"
    ) as HTMLElement;
    if (actual.dataset.number == "1" && actual.textContent != "1") {
      numberFirst.textContent = (+numberFirst.textContent - 1).toString();
      numberSecond.textContent = (+numberSecond.textContent - 1).toString();
      numberThird.textContent = (+numberThird.textContent - 1).toString();
    }
    if (actual.dataset.number == "2") {
      actual.classList.remove("pagination__btn--actual");
      numberFirst.classList.add("pagination__btn--actual");
    }
    if (actual.dataset.number == "3") {
      actual.classList.remove("pagination__btn--actual");
      numberSecond.classList.add("pagination__btn--actual");
    }
    renderRemoveDots();
    renderPaginationData();
  };

  const handlerEnd = () => {
    document.querySelector('.pagination__btn[data-number="1"]').textContent = (
      pages - 2
    ).toString();
    document
      .querySelector(".pagination__btn--actual")
      .classList.remove("pagination__btn--actual");

    document.querySelector('.pagination__btn[data-number="2"]').textContent = (
      pages - 1
    ).toString();
    document.querySelector('.pagination__btn[data-number="3"]').textContent =
      pages.toString();
    document
      .querySelector('.pagination__btn[data-number="3"]')
      .classList.add("pagination__btn--actual");
    renderRemoveDots();
    renderPaginationData();
  };

  const handlerStart = () => {
    document.querySelector('.pagination__btn[data-number="1"]').textContent =
      "1";
    document
      .querySelector(".pagination__btn--actual")
      .classList.remove("pagination__btn--actual");

    document.querySelector('.pagination__btn[data-number="2"]').textContent =
      "2";
    document.querySelector('.pagination__btn[data-number="3"]').textContent =
      "3";
    document
      .querySelector('.pagination__btn[data-number="1"]')
      .classList.add("pagination__btn--actual");
    renderRemoveDots();
    renderPaginationData();
  };

  const container = document.querySelector(containerClass);
  const pagination = document.createElement("UL");
  pagination.classList.add("pagination__list");
  const createStart = () => {
    const item = document.createElement("li");
    item.classList.add("pagination__item");
    const start = document.createElement("button");
    start.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" viewBox="0 0 20 20" fill="none">
      <path d="M2.66667 4.33333L8.5 10.1667L2.66667 16"  stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M10.1667 4.33333L16 10.1667L10.1667 16" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
    `;
    start.className =
      "pagination__btn pagination__btn--arrow pagination__btn--start";
    start.dataset.page = "1";
    item.style.display = "none";
    start.addEventListener("click", handlerStart);
    item.appendChild(start);
    pagination.appendChild(item);
  };
  const createPrev = () => {
    const itemPrev = document.createElement("li");
    itemPrev.classList.add("pagination__item");
    const prev = document.createElement("button");
    prev.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16"  stroke="currentColor" viewBox="0 0 10 16" fill="none">
      <path d="M2.50004 2.16659L8.33337 7.99992L2.50004 13.8333" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
    `;
    prev.className =
      "pagination__btn pagination__btn--arrow pagination__btn--prev";
    itemPrev.style.display = "none";
    prev.addEventListener("click", handlerPrev);
    itemPrev.appendChild(prev);
    pagination.appendChild(itemPrev);
  };
  const createNext = () => {
    const itemNext = document.createElement("li");
    itemNext.classList.add("pagination__item");
    const next = document.createElement("button");
    next.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16"  stroke="currentColor" viewBox="0 0 10 16" fill="none">
      <path d="M2.50004 2.16659L8.33337 7.99992L2.50004 13.8333" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
    `;
    next.className =
      "pagination__btn pagination__btn--arrow pagination__btn--next";
    next.addEventListener("click", handlerNext);
    itemNext.appendChild(next);
    pagination.appendChild(itemNext);
  };
  const createStartDots = () => {
    const itemDots = document.createElement("li");
    itemDots.classList.add("pagination__item");
    const dots = document.createElement("button");
    dots.textContent = "";
    dots.className =
      "pagination__btn pagination__btn--start-dots pagination__btn--dots";

    itemDots.style.display = "none";
    itemDots.appendChild(dots);
    pagination.appendChild(itemDots);
  };
  const createDots = () => {
    const itemDots = document.createElement("li");
    itemDots.classList.add("pagination__item");
    const dots = document.createElement("button");
    dots.textContent = "...";
    dots.className =
      "pagination__btn pagination__btn--end-dots pagination__btn--dots";
    itemDots.appendChild(dots);
    pagination.appendChild(itemDots);
  };
  const createEnd = () => {
    const itemEnd = document.createElement("li");
    itemEnd.classList.add("pagination__item");
    const end = document.createElement("button");
    end.dataset.page = pages.toString();
    end.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" viewBox="0 0 20 20" fill="none">
      <path d="M2.66667 4.33333L8.5 10.1667L2.66667 16"  stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M10.1667 4.33333L16 10.1667L10.1667 16" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
    `;
    end.className =
      "pagination__btn pagination__btn--arrow pagination__btn--end";
    end.addEventListener("click", handlerEnd);
    itemEnd.appendChild(end);
    pagination.appendChild(itemEnd);
  };

  if (pages > 1 && pages < 6) {
    for (let i = 1; i <= pages; i++) {
      const item = document.createElement("li");
      item.classList.add("pagination__item");
      const button = document.createElement("button");
      button.classList.add("pagination__btn");
      button.classList.add("pagination__btn-number");
      button.dataset.page = i.toString();
      button.textContent = i.toString();
      if (i === 1) {
        button.classList.add("pagination__btn--actual");
      }
      item.appendChild(button);
      pagination.appendChild(item);
    }
    container.appendChild(pagination);
  }
  if (pages > 5) {
    createStart();
    createPrev();
    createStartDots();
    for (let i = 1; i <= 3; i++) {
      const item = document.createElement("li");
      item.classList.add("pagination__item");
      const button = document.createElement("button");
      button.classList.add("pagination__btn-number");
      button.classList.add("pagination__btn");
      button.textContent = i.toString();
      button.addEventListener("click", () => {
        document
          .querySelector(".pagination__btn--actual")
          .classList.remove("pagination__btn--actual");
        button.classList.add("pagination__btn--actual");
        renderPaginationData();
      });
      if (i == 1) {
        button.classList.add("pagination__btn--actual");
        button.dataset.number = "1";
      }
      if (i == 2) {
        button.dataset.number = "2";
      }
      if (i == 3) {
        button.dataset.number = "3";
      }
      item.appendChild(button);
      pagination.appendChild(item);
    }
    createDots();
    createNext();
    createEnd();
    container.appendChild(pagination);
  }
};
