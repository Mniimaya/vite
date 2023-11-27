// Удаление всех добавленных полей в модальном окне
export const resetFormItems = (modal: HTMLElement) => {
  if (modal.getAttribute("data-modal") !== "personal") {
    const cloneItems = modal.querySelectorAll(".profile__form-clone-item");
    if (!!cloneItems.length) {
      cloneItems.forEach((item) => item.remove());
    }
  }
};
