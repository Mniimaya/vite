import { resetFormItems } from "../utils/resetFormItems";
import { deactivadeModal } from "../utils/deactivadeModal";
import { handlerValidation } from "../profile-validation";
import { requestData } from "../utils/requestData";
import { handlerRemoveCrearButtons } from "../utils/removeClearButtons";

// Обработчики отпрвки и сброса в модальных окнах изменениях данных
export const handlerFormModals = (idUser: number, cb: Function) => {
  const modalWrapperElement: HTMLElement =
    document.querySelector(".profile__modal");
  const allModalsElements = [
    ...modalWrapperElement.querySelectorAll(".profile__modal-body"),
  ];
  const modalForms = allModalsElements.map((modal) => {
    return modal.querySelector("form");
  });

  modalForms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      const currentForm = evt.target as HTMLFormElement;
      evt.preventDefault();
      const currentModal: HTMLElement = currentForm.closest(
        ".profile__modal-body"
      );
      const typeData: string = currentForm.getAttribute("data-type");
      const wrappeerInputs = [
        ...currentModal.querySelectorAll(`.profile__form-clone-item`),
      ] as HTMLElement[];

      if (
        wrappeerInputs.length === 1 &&
        wrappeerInputs[0].dataset.status === "empty"
      ) {
        resetFormItems(currentModal);
        deactivadeModal(currentModal);
      } else if (!!idUser && handlerValidation(currentForm)) {
        requestData(currentForm, typeData, idUser, cb);
        resetFormItems(currentModal);
        deactivadeModal(currentModal);
      }
    });
  });

  // Закрытие модального окна при клике на overlay
  modalWrapperElement.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      const activeModal: HTMLElement =
        modalWrapperElement.querySelector(".active");
      resetFormItems(activeModal);
      deactivadeModal(activeModal);
      handlerRemoveCrearButtons(activeModal);
      document.body.classList.remove("lock");
    }
  });

  //Закрытие модального окна при нажатии Escape
  document.addEventListener("keydown", (evt) => {
    if (
      modalWrapperElement.classList.contains("active") &&
      evt.key == "Escape"
    ) {
      const activeModal: HTMLElement =
        modalWrapperElement.querySelector(".active");
      modalWrapperElement.classList.remove("active");
      resetFormItems(activeModal);
      deactivadeModal(activeModal);
      document.body.classList.remove("lock");
    }
  });
};
