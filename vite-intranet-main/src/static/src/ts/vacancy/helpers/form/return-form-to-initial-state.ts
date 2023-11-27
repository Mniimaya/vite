// Const;
import {
  VACANCY_HELPERS_HIDDEN,
  DEFAULT_BALLOONS_DATA,
  VACANCY_HELPERS_ERROR,
} from "../../const";
// Helpers;
import { clearContainer } from "../clear-container";
import { setDataTextareas } from "./set-data-textareas";

import type { TYPE_BALLONS } from "../../types/ballons";

interface FormElements extends HTMLFormControlsCollection {
  date_open: HTMLInputElement;
  date_close: HTMLInputElement;
  education: HTMLSelectElement;
  experience: HTMLSelectElement;
  schedule: HTMLSelectElement;
}

export const returnFormToInitialState = (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[]
) => {
  // Inputs (text, number, date);
  const textInputs = form.querySelectorAll(`input[type=text]`);
  const numberInputs = form.querySelectorAll(`input[type=number]`);
  const dateInputs = form.querySelectorAll(`input[type=date]`);
  // Exception;
  const fullNameInput = form.querySelector(`.vacancy-form-input--fullname`);
  const dateOpenInput = (form.elements as FormElements)[`date_open`];
  const dateCloseInput = (form.elements as FormElements)[`date_close`];
  const filterdTextInputs = Array.from(textInputs).filter(
    (input) => input !== fullNameInput
  );
  // Selects;
  const educationSelect = (form.elements as FormElements)[`education`];
  const experienceSelect = (form.elements as FormElements)[`experience`];
  const scheduleSelect = (form.elements as FormElements)[`schedule`];
  const roleSelect = form.querySelector(`.vacancy-form-select--role`);
  // Checkboxs;
  const checkboxInputs = form.querySelectorAll(`input[type=checkbox]`);
  // Radios;
  const radioInputs = form.querySelectorAll(`input[type=radio]`);
  // Containers;
  const additionalLocationContainer = form.querySelector(
    `.vacancy-form-items--location-additional`
  ) as HTMLDivElement;
  const participantAdditionalContainer = form.querySelector(
    `.vacancy-form-items--participants-additional`
  ) as HTMLDivElement;
  // Clear buttons;
  const clearButtons = form.querySelectorAll(
    `.vacancy-form-button--clear`
  ) as NodeListOf<HTMLButtonElement>;

  [
    ...filterdTextInputs,
    ...numberInputs,
    ...dateInputs,
    educationSelect,
    experienceSelect,
    scheduleSelect,
  ].forEach((input: HTMLInputElement) => {
    const parentComponent = input.closest(`.vacancy-form-component`);
    const parentItem = input.closest(`.vacancy-form-item`);

    if (parentComponent) {
      parentComponent.classList.remove(VACANCY_HELPERS_ERROR);
    }

    if (parentItem) {
      parentItem.classList.remove(VACANCY_HELPERS_ERROR);
    }

    input.value = ``;
    input.disabled = false;
  });

  [...checkboxInputs, ...radioInputs].forEach((input: HTMLInputElement) => {
    input.checked = false;
    input.disabled = false;
  });

  [...clearButtons].forEach((button: HTMLButtonElement) => {
    button.disabled = false;
    button.classList.add(VACANCY_HELPERS_HIDDEN);
  });

  setDataTextareas(ballons, DEFAULT_BALLOONS_DATA);

  [additionalLocationContainer, participantAdditionalContainer].forEach(
    (container: HTMLDivElement) => clearContainer(container)
  );

  // Date;
  dateOpenInput.min = new Date().toISOString().split("T")[0];
  dateCloseInput.min = dateOpenInput.min;

  // Participants;
  roleSelect.setAttribute(`disabled`, `true`);
  fullNameInput.setAttribute(`disabled`, `true`);
};
