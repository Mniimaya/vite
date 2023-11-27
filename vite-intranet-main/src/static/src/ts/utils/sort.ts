// Обработчик блока sort
export const handlerSort = () => {
  const sort = document.querySelector(".sort");
  if (!!sort) {
    const togglerButton = sort.querySelector(".sort__toggler-button");
    togglerButton.addEventListener("click", () => {
      sort.classList.toggle("js-active");
    });
  }
};

// Закрытие блока sort
export const hiddenSort = () => {
  const sort = document.querySelector(".sort");
  sort.classList.remove("js-active");
};

// Открытие блока sort
export const showSort = () => {
  const sort = document.querySelector(".sort");
  sort.classList.add("js-active");
};

// Сброс формы блока sort
export const handlerClearButton = (cb: Function | undefined = undefined) => {
  const sort = document.querySelector(".sort");
  if (!!sort) {
    const clearButton = sort.querySelector(".sort__clear-form");
    clearButton.addEventListener("click", () => {
      if (!!cb) {
        cb();
      }
      clearButton.closest(".sort").querySelector("form").reset();
    });
  }
};
