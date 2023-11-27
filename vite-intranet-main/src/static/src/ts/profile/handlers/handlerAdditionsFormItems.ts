import { createTemplateFormItem } from "../render/createTemplateFormItem";

// Обработчик добавления новых полей в редактировании данных
export const handlerAdditionsFormItems = () => {
  const buttonsFormAddItem: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".profile__form-button-add");
  buttonsFormAddItem.forEach((button) => {
    button.addEventListener("click", (evt: Event) => {
      const currentButton = evt.target as HTMLButtonElement;
      const currentModal: HTMLElement = currentButton.closest(
        ".profile__modal-body"
      );
      const itemsWrapper: HTMLElement = currentModal.querySelector(
        ".profile__form-items-wrapper"
      );

      if (currentButton.dataset.name === "project") {
        const buttonParent: HTMLElement = currentButton.closest(
          ".profile__form-fieldset-template--project"
        );
        const wrapper: HTMLElement = buttonParent.querySelector(
          ".profile__form-items-wrapper"
        );
        createTemplateFormItem(buttonParent, wrapper, true, "new");
      } else {
        createTemplateFormItem(currentModal, itemsWrapper, true, "new");
      }
    });
  });
};
