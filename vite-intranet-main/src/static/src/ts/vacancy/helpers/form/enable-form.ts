import { VACANCY_HELPERS_HIDDEN } from "../../const";

import type { TYPE_BALLONS } from "../../types/ballons";

export const enableForm = (form: HTMLFormElement, ballons: TYPE_BALLONS[]) => {
  const inputs = form.querySelectorAll(`input`);
  const selects = form.querySelectorAll(`select`);
  const buttons = form.querySelectorAll(`button`);

  [...inputs, ...selects, ...buttons].forEach((item) => {
    item.removeAttribute(`disabled`);

    if (
      (item.tagName.toLowerCase() === `input` && item.type === `text`) ||
      item.type === `number` ||
      item.type === `date`
    ) {
      if (item.value) {
        const wrappedElement = item.closest(`.vacancy-form-item__wrapper`);
        const clearButton = wrappedElement.querySelector(
          `.vacancy-form-button--clear`
        );
        clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
      }
    }
  });

  ballons.forEach((ballon) => {
    ballon.then((editor) => editor.disableReadOnlyMode(editor.customName));
  });

  // Exceptions;
  const roleSelect = form.querySelector(`.vacancy-form-select--role`);
  const fullNameInput = form.querySelector(`.vacancy-form-input--fullname`);

  roleSelect.setAttribute(`disabled`, `true`);
  fullNameInput.setAttribute(`disabled`, `true`);
};
