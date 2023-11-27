// Обработчик изменения статуса данных в модальном окне
export const handlerUpdateCreatedData = (
  modal: HTMLElement,
  status: string
) => {
  const createdWrappers = modal.querySelectorAll(
    `.profile__form-clone-item[data-status="${status}"]`
  ) as NodeListOf<HTMLElement>;
  if (createdWrappers) {
    createdWrappers.forEach((wrapper) => {
      const allInpits = wrapper.querySelectorAll("input, select") as NodeListOf<
        HTMLInputElement | HTMLSelectElement
      >;

      allInpits.forEach((el) => {
        el.addEventListener("change", () => {
          if (status === "empty") {
            wrapper.setAttribute("data-status", "new");
          } else {
            wrapper.setAttribute("data-status", "update");
          }
        });
      });
    });
  }
};
