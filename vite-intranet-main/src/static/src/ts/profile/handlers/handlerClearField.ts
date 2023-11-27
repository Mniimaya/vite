import { handlerValidation } from "../profile-validation";

const handlerInputs = (evt: Event) => {
  const input = evt.target as HTMLInputElement | HTMLSelectElement;
  if (input.value !== "" && input.value !== "placeholder") {
    if (input.nextElementSibling.classList.contains("err")) {
      input.nextElementSibling.nextElementSibling.classList.add("active");
    } else {
      input.nextElementSibling.classList.add("active");
    }
  } else {
    input.nextElementSibling.classList.remove("active");
  }
};

// Обработчик очистки полей
export const handlerClearField = (wrapper: HTMLElement) => {
  const buttonClear = document.createElement("button");
  buttonClear.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="#8A8C8E"></circle>
        <path d="M13 5L5.00007 12.9999" stroke="white" stroke-width="2"></path>
        <path d="M13 13.0005L5.00007 5.00055" stroke="white" stroke-width="2"></path>
      </svg>
      `;

  buttonClear.classList.add("profile__clear-button");
  buttonClear.setAttribute("type", "button");
  buttonClear.addEventListener("click", (evt) => {
    const buttonEvent = evt.target as HTMLButtonElement;

    if (buttonEvent.previousElementSibling.classList.contains("err")) {
      const input = buttonEvent.previousElementSibling
        .previousElementSibling as HTMLSelectElement | HTMLInputElement;

      buttonEvent.classList.remove("active");
      if (input.tagName === "SELECT") {
        input.value = "placeholder";
      } else {
        input.value = "";
      }
      const form: HTMLFormElement = input.closest(".profile__form");
      handlerValidation(form, input);
    } else {
      const input = buttonEvent.previousElementSibling as
        | HTMLSelectElement
        | HTMLInputElement;

      buttonEvent.classList.remove("active");
      if (input.tagName === "SELECT") {
        input.value = "placeholder";
      } else {
        input.value = "";
      }

      const form: HTMLFormElement = input.closest(".profile__form");
      handlerValidation(form, input);
    }
  });

  wrapper.appendChild(buttonClear);

  const field = wrapper.querySelectorAll("input, select");
  field.forEach((item) => {
    if (item.tagName === "SELECT") {
      item.addEventListener("change", (evt) => {
        handlerInputs(evt);
      });
    } else {
      item.addEventListener("input", (evt) => {
        handlerInputs(evt);
      });
    }
  });
};
