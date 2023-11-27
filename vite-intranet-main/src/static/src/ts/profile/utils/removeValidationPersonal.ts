import { handlerAddClass } from "../utils/addValidationClass";

// Обработчик добавления класса валидации в модальное окно персональных данных
export const handlerRemoveValidationPersonal = (modal: HTMLElement) => {
  modal
    .querySelector('input[name="mobile"]')
    .removeEventListener("change", handlerAddClass);
  modal
    .querySelector('input[name="email"]')
    .removeEventListener("change", handlerAddClass);
  modal
    .querySelector('input[name="birthday"]')
    .removeEventListener("change", handlerAddClass);
};
