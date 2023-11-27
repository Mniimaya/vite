import { createTemplateFormItem } from "../render/createTemplateFormItem";

// Удаление нового поля данных
export const handlerRemoveFormItem = (button: HTMLButtonElement) => {
  button.addEventListener("click", (evt) => {
    const currentTarget = evt.target as HTMLButtonElement;
    const modal: HTMLElement = currentTarget.closest(".profile__modal-body");
    const item: HTMLElement = currentTarget.closest(
      ".profile__form-clone-item"
    );
    const wrapper: HTMLElement = modal.querySelector(
      ".profile__form-items-wrapper"
    );
    const currentStatus = item.getAttribute("data-status");
    item
      .querySelectorAll("input, select")
      .forEach((el) => el.classList.remove("validation"));

    if (currentStatus === "new" || currentStatus === "empty") {
      item.remove();
    } else {
      if (currentTarget.dataset.name === "project") {
        const buttonParent: HTMLElement = currentTarget.closest(
          ".profile__form-fieldset-template--project"
        );
        const projectTitle: HTMLElement = buttonParent.querySelector(
          ".profile__form-title-project"
        );

        const wrapper: HTMLElement = buttonParent.querySelector(
          ".profile__form-items-wrapper"
        );

        if (
          buttonParent.querySelectorAll(".profile__form-clone-item").length <= 1
        ) {
          projectTitle.style.display = "block";
        }

        if (item.previousElementSibling === null) {
          createTemplateFormItem(buttonParent, wrapper, false, "empty");
        }
      } else if (item.previousElementSibling === null) {
        createTemplateFormItem(modal, wrapper, false, "empty");
      }
      item.setAttribute("data-status", "removed");
      item.style.display = "none";
      item
        .querySelectorAll("input, select")
        .forEach((input) => input.classList.remove("validation"));
    }
  });
};
