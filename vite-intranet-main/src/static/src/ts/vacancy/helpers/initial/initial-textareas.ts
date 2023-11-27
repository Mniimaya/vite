import { VACANCY_HELPERS_HIDDEN, DEFAULT_BALLOONS_DATA } from "../../const";

// Types;
import { TYPE_BALLONS } from "../../types/ballons";

type TYPE_KEY_DEFAULT_BALLOONS =
  | `functional`
  | `wishes`
  | `advantages`
  | `offering`;

export const initialTextareas = (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[]
) => {
  ballons.forEach((ballon) => {
    ballon.then((editor) => {
      const textarea = form.querySelector(
        `.vacancy-form-textarea[data-name=${editor.customName}]`
      ) as HTMLElement;

      const wrapperElement = textarea.closest(`.vacancy-form-item__wrapper`);
      const clearButton = wrapperElement.querySelector(
        `.vacancy-form-button--clear`
      );

      editor.model.document.on(`change:data`, () => {
        if (editor.getData() === ``) {
          clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
        } else {
          clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
        }
      });

      editor.on(`change:isReadOnly`, () => {
        if (editor.isReadOnly) {
          clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
        } else if (!editor.isReadOnly && editor.getData()) {
          clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
        }
      });

      clearButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        editor.setData(``);
      });

      editor.setData(
        DEFAULT_BALLOONS_DATA[
          textarea.dataset.name as TYPE_KEY_DEFAULT_BALLOONS
        ]
      );
    });
  });
};
