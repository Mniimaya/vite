import { handlerValidation } from "../profile-validation";

export const handlerAddClass = (evt: Event) => {
  const input = evt.target as HTMLInputElement;
  const form: HTMLFormElement = input.closest(".profile__form");
  if (input.value !== "") {
    input.classList.add("validation");
    handlerValidation(form, input);
  }
};
