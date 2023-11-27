import { deactivadeModal } from "../utils/deactivadeModal";
import { resetFormItems } from "../utils/resetFormItems";
import { activationModal } from "../utils/activationModal";
import { TYPE_PFOFILE } from "../../TYPES";
import { handlerRemoveCrearButtons } from "../utils/removeClearButtons";
// Обработчики модальных окнон
export const handlerModals = (
  editDataButtonsElement: HTMLElement[],
  currentProfile: TYPE_PFOFILE
) => {
  const allCloseModalButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".profile-close-modal");
  const allCancellationButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".profile__form-button-reset");
  // Открытие модального окна по склику на редактирование данных
  editDataButtonsElement.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const button = evt.target as HTMLButtonElement;
      const category = button.getAttribute("data-category");
      if (!!currentProfile) {
        activationModal(category, currentProfile);
      }
    });
  });

  // Закрытие модального окна по клику отмена
  allCancellationButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const button = evt.target as HTMLButtonElement;
      const parentForm = button.closest(".profile__form") as HTMLFormElement;
      const modal: HTMLElement = parentForm.closest(".profile__modal-body");
      resetFormItems(modal);
      deactivadeModal(modal);
      handlerRemoveCrearButtons(modal);
      document.body.classList.remove("lock");
    });
  });

  // Закрытие модального окна по клику на индивидуальные кнопки закрытия в модальном окне
  allCloseModalButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const evtButton = evt.target as HTMLButtonElement;
      const evtModal = evtButton.closest(
        ".profile__modal-body"
      ) as HTMLButtonElement;
      resetFormItems(evtModal);
      deactivadeModal(evtModal);
      handlerRemoveCrearButtons(evtModal);
      document.body.classList.remove("lock");
    });
  });
};
