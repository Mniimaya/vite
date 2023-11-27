export {};

const btnsOpen = document.querySelectorAll(".managements__open");
btnsOpen.forEach((btn: HTMLElement) => {
  btn.addEventListener("click", (evt: Event) => {
    const parent = (evt.target as HTMLElement).closest(".managements__item");
    const inner: HTMLElement = parent.querySelector(".managements__inner");
    if (inner.classList.contains("js-nodisplay-managements")) {
      inner.classList.remove("js-nodisplay-managements");
      btn.style.transform = "rotate(-180deg)";
      inner.style.maxHeight = inner.scrollHeight + "px";
    } else {
      inner.classList.add("js-nodisplay-managements");
      btn.style.transform = "rotate(0deg)";
      inner.style.maxHeight = null;
    }
  });
});
