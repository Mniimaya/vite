// Удаление кнопок clear в инпутах
export const handlerRemoveCrearButtons = (modal: HTMLElement) => {
  const wrapperClearField = modal.querySelectorAll(".profile__clear-wrapper");
  wrapperClearField.forEach((wrapper) => {
    wrapper.querySelector(".profile__clear-button").remove();
  });
};
