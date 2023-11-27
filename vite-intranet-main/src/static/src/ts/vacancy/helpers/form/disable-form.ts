import { VACANCY_HELPERS_HIDDEN } from "../../const";

import type { TYPE_BALLONS } from "../../types/ballons";

export const disableForm = (form: HTMLFormElement, ballons: TYPE_BALLONS[]) => {
  const inputs = form.querySelectorAll(`input`);
  const selects = form.querySelectorAll(`select`);
  const buttons = form.querySelectorAll(`button`);
  const clearButtons = form.querySelectorAll(`.vacancy-form-button--clear`);

  [...inputs, ...selects, ...buttons].forEach((item) =>
    item.setAttribute(`disabled`, `true`)
  );

  Array.from(clearButtons).forEach((button) =>
    button.classList.add(VACANCY_HELPERS_HIDDEN)
  );

  ballons.forEach((ballon) => {
    ballon.then((editor) => editor.enableReadOnlyMode(editor.customName));
  });
};
