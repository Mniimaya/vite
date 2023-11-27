import {
  addInputValidate,
  handlerAddValidationPersonal,
} from "../profile-validation";

import { TYPE_PFOFILE } from "../../TYPES";
import { renderDataForModal } from "../render/renderDataForModal";
import { handlerUpdateCreatedData } from "../handlers/handlerUpdateCreatedData";

// Показывает нужное модальное окно
export const activationModal = (
  categoryData: string,
  profile: TYPE_PFOFILE
) => {
  const modalWrapperElement: HTMLElement =
    document.querySelector(".profile__modal");
  const allModalsElements = [
    ...modalWrapperElement.querySelectorAll(".profile__modal-body"),
  ];

  const activeModal = allModalsElements.filter((modal) => {
    if (modal.getAttribute("data-modal") === categoryData) {
      return modal;
    }
  })[0] as HTMLElement;
  if (categoryData === "personal") {
    handlerAddValidationPersonal(activeModal);
  }
  renderDataForModal(activeModal, profile);

  document.body.classList.add("lock");
  activeModal.classList.add("active");
  addInputValidate(
    activeModal.querySelectorAll("input.validation, select.validation")
  );
  modalWrapperElement.classList.add("active");
  handlerUpdateCreatedData(activeModal, "created");
  const wrapperFields: HTMLElement = activeModal.querySelector(
    ".profile__form-items-wrapper"
  );

  if (categoryData !== "personal") {
    wrapperFields.scrollIntoView({ block: "end", behavior: "smooth" });
  }
};
