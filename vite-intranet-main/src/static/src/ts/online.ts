export {};

const buttonsShow = document.querySelectorAll(".online__button--show");
const links = document.querySelectorAll(".online__link");
//отмена перехода по ссылке если нажимаем на кнопку раскрыть информацию
links.forEach((link) => {
  link.addEventListener("click", (evt) => {
    if ((evt.target as HTMLElement).tagName === "BUTTON") {
      evt.preventDefault();
    }
  });
});

//показывем информацию
buttonsShow.forEach((btn: HTMLElement) => {
  btn.addEventListener("click", (evt) => {
    const parent = (evt.target as HTMLElement).closest(".online__item");
    if (!parent.classList.contains("online__item--opened")) {
      parent.classList.add("online__item--opened");
      parent
        .querySelector(".online__link")
        .classList.add("online__link--opened");
      (parent.querySelector(".online__inner") as HTMLElement).style.maxHeight =
        parent.querySelector(".online__inner").scrollHeight + "px";
      btn.style.transform = "rotate(180deg)";
      // btn.classList.remove('online__button--show')
      // btn.classList.add('online__button--hide')
    } else {
      parent.classList.remove("online__item--opened");
      parent
        .querySelector(".online__link")
        .classList.remove("online__link--opened");
      (parent.querySelector(".online__inner") as HTMLElement).style.maxHeight =
        null;
      // btn.classList.add('online__button--show')
      // btn.classList.remove('online__button--hide')
      btn.style.transform = "rotate(0deg)";
    }
  });
});

//скрываем информацию
const buttonsHide = document.querySelectorAll(".online__button--hide");
buttonsHide.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const parent = (evt.target as HTMLElement).closest(".online__item");
    if (parent.classList.contains("online__item--opened")) {
      parent.classList.remove("online__item--opened");
      parent
        .querySelector(".online__link")
        .classList.remove("online__link--opened");
      (parent.querySelector(".online__inner") as HTMLElement).style.maxHeight =
        null;
      (
        parent.querySelector(".online__button--show") as HTMLElement
      ).style.transform = "rotate(0deg)";
    }
  });
});

//логика поиска сервиса
const input = document.querySelector(".online__input");
const sections = document.querySelectorAll(".online");
input.addEventListener("input", (evt) => {
  const allNoDisplay = document.querySelectorAll(".js-nodisplay");
  allNoDisplay.forEach((item) => item.classList.remove("js-nodisplay"));
  sections.forEach((section) => {
    section.classList.add("js-nodisplay");
    const services = section.querySelectorAll(".online__title");
    services.forEach((service) => {
      if (
        !service.textContent
          .toLowerCase()
          .includes((evt.target as HTMLInputElement).value.toLowerCase())
      ) {
        service.closest(".online__item").classList.add("js-nodisplay");
      } else if (
        service.closest(".online").classList.contains("js-nodisplay")
      ) {
        console.log("here");
        service.closest(".online").classList.remove("js-nodisplay");
      }
    });
  });
});
