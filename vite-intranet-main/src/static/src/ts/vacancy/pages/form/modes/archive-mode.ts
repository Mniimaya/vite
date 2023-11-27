import { setDataForm } from "../../../helpers/form/set-data-form";
import { VACANCY_HELPERS_HIDDEN } from "../../../const";
import { validateForm } from "../validate/validate-form";
import { clearContainer } from "../../../helpers/clear-container";

// TYPES;
import { TYPE_BALLONS } from "../../../types/ballons";
import { TYPE_REQUEST } from "../../../types/request";

export const archiveMode = (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[],
  data: TYPE_REQUEST
) => {
  // Containers;
  const additionalLocationContainer = form.querySelector(
    `.vacancy-form-items--location-additional`
  );
  const additionalParticipantsContainer = form.querySelector(
    `.vacancy-form-items--participants-additional`
  );

  const footerContainer = form.querySelector(`.vacancy-form-footer__wrapper`);
  const footerActionsDraft = form.querySelector(
    `.vacancy-form-footer__actions--mode-draft`
  );

  // Buttons;
  const sendButton = footerActionsDraft.querySelector(
    `.vacancy-form-button--draft-send`
  );
  const cancelButton = footerActionsDraft.querySelector(
    `.vacancy-form-button--draft-cancel`
  );

  // Modals;
  const succeessModal = document.querySelector(
    `.vacancy-modal-form-success-container`
  );
  const errorModal = document.querySelector(
    `.vacancy-modal-form-error-container`
  );
  const errorTextContainer = errorModal.querySelector(
    `.vacancy-modal-form-error__text`
  );
  const succeessModalCloseButton = succeessModal.querySelector(
    `.vacancy-modal-button-close`
  );
  const errorModalCloseButton = errorModal.querySelector(
    `.vacancy-modal-button-close`
  );

  [succeessModalCloseButton, errorModalCloseButton].forEach((button) => {
    button.addEventListener(`click`, () => {
      const parent = button.closest(`.vacancy-modal`);
      parent.classList.add(VACANCY_HELPERS_HIDDEN);
    });
  });

  Array.from(footerContainer.children).forEach((element) =>
    element.classList.add(VACANCY_HELPERS_HIDDEN)
  );

  footerActionsDraft.classList.remove(VACANCY_HELPERS_HIDDEN);

  setDataForm(form, ballons, data);

  // Events;
  sendButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const errors: unknown[] = [];
    validateForm(errors);

    if (errors.length === 0) {
      console.log(`TODO: Update form со статусом 1 (Заявка)`);
    } else {
      errorModal.classList.remove(VACANCY_HELPERS_HIDDEN);
      errorTextContainer.textContent = `При заполнении формы были допущены ошибки (${errors.length})`;
    }
  });

  cancelButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    [additionalLocationContainer, additionalParticipantsContainer].forEach(
      (container: HTMLElement) => clearContainer(container)
    );

    setDataForm(form, ballons, data);
  });
};
