import { removeInputValidate } from "../profile-validation";
import { handlerRemoveValidationPersonal } from "../utils/removeValidationPersonal";
// Закрывает модальное окно
export const deactivadeModal = (modal: HTMLElement) => {
  const modalWrapperElement: HTMLElement =
    document.querySelector(".profile__modal");
  const categoryModal = modal.dataset.modal;
  if (categoryModal === "personal") {
    handlerRemoveValidationPersonal(modal);
  }
  modal
    .querySelectorAll("input, select")
    .forEach((el) => el.classList.remove("invalid"));
  modal
    .querySelectorAll("input, select")
    .forEach((el) => el.classList.remove("validation"));
  modal.classList.remove("active");
  document.body.classList.remove("lock");
  modalWrapperElement.classList.remove("active");
  removeInputValidate(modal.querySelectorAll("input, select"));
};
