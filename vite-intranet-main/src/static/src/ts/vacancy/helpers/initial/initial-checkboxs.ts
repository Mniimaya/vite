import { VACANCY_HELPERS_ERROR, VACANCY_HELPERS_HIDDEN } from "../../const";

interface FormElements extends HTMLFormControlsCollection {
  name_of_position_checkbox: HTMLInputElement;
  sex_value_checkbox: HTMLInputElement;
  age_checkbox: HTMLInputElement;
  education_checkbox: HTMLInputElement;
  salary_checkbox: HTMLInputElement;
  name_of_position: HTMLInputElement;
  age_min: HTMLInputElement;
  age_max: HTMLInputElement;
  salary_min: HTMLInputElement;
  salary_max: HTMLInputElement;
  sex_value: RadioNodeList;
  education: HTMLInputElement;
  salary_gross: RadioNodeList;
}

export const initialCheckboxs = (form: HTMLFormElement) => {
  // Checkboxs;
  const vacancyNameOfPosition = (form.elements as FormElements)[
    `name_of_position_checkbox`
  ];
  const sexCheckbox = (form.elements as FormElements)[`sex_value_checkbox`];
  const ageCheckbox = (form.elements as FormElements)[`age_checkbox`];
  const educationCheckbox = (form.elements as FormElements)[
    `education_checkbox`
  ];
  const salaryCheckbox = (form.elements as FormElements)[`salary_checkbox`];

  // Inputs;
  const nameOfPositionInput = (form.elements as FormElements)[
    `name_of_position`
  ];
  const ageMinInput = (form.elements as FormElements)[`age_min`];
  const ageMaxInput = (form.elements as FormElements)[`age_max`];
  const salaryMinInput = (form.elements as FormElements)[`salary_min`];
  const salaryMaxInput = (form.elements as FormElements)[`salary_max`];

  // Radios;
  const sexRadios = (form.elements as FormElements)[`sex_value`];
  const salaryRadios = (form.elements as FormElements)[`salary_gross`];

  // Selects;
  const educationSelect = (form.elements as FormElements)[`education`];

  // Wrapper && Clear Buttons Elements;
  const nameOfPositionWrapper = nameOfPositionInput.closest(
    `.vacancy-form-item__wrapper`
  );
  const nameOfPositionClearButton = nameOfPositionWrapper.querySelector(
    `.vacancy-form-button--clear`
  );
  const ageMinWrapper = ageMinInput.closest(`.vacancy-form-item__wrapper`);
  const ageMinClearButton = ageMinWrapper.querySelector(
    `.vacancy-form-button--clear`
  );
  const ageMaxWrapper = ageMaxInput.closest(`.vacancy-form-item__wrapper`);
  const ageMaxClearButton = ageMaxWrapper.querySelector(
    `.vacancy-form-button--clear`
  );
  const salaryMinWrapper = salaryMinInput.closest(
    `.vacancy-form-item__wrapper`
  );
  const salaryMinClearButton = salaryMinWrapper.querySelector(
    `.vacancy-form-button--clear`
  );
  const salaryMaxWrapper = salaryMaxInput.closest(
    `.vacancy-form-item__wrapper`
  );
  const salaryMaxClearButton = salaryMaxWrapper.querySelector(
    `.vacancy-form-button--clear`
  );

  // Parents;
  const vacancyNameOfPositionItem = form.querySelector(
    `.vacancy-form-item--name-of-position`
  );
  const sexComponent = form.querySelector(`.vacancy-form-component--sex`);
  const ageComponent = form.querySelector(`.vacancy-form-component--age`);
  const educationComponent = form.querySelector(
    `.vacancy-form-component--education`
  );
  const salaryComponent = form.querySelector(`.vacancy-form-component--salary`);

  // Search List;
  const nameOfPositionSearchList =
    vacancyNameOfPositionItem.querySelector(`.vacancy-search-list`);

  // Events;
  vacancyNameOfPosition.addEventListener(`change`, () => {
    if (vacancyNameOfPosition.checked) {
      [nameOfPositionInput, nameOfPositionClearButton].forEach((item) =>
        item.setAttribute(`disabled`, `true`)
      );
      vacancyNameOfPositionItem.classList.remove(VACANCY_HELPERS_ERROR);
      nameOfPositionSearchList.classList.add(VACANCY_HELPERS_HIDDEN);
    } else {
      [nameOfPositionInput, nameOfPositionClearButton].forEach((item) =>
        item.removeAttribute(`disabled`)
      );
    }
  });

  sexCheckbox.addEventListener(`change`, () => {
    if (sexCheckbox.checked) {
      sexRadios.forEach((radio: HTMLInputElement) =>
        radio.setAttribute(`disabled`, `true`)
      );
      sexComponent.classList.remove(VACANCY_HELPERS_ERROR);
    } else {
      sexRadios.forEach((radio: HTMLInputElement) =>
        radio.removeAttribute(`disabled`)
      );
    }
  });

  ageCheckbox.addEventListener(`change`, () => {
    if (ageCheckbox.checked) {
      [ageMinInput, ageMaxInput, ageMinClearButton, ageMaxClearButton].forEach(
        (item) => item.setAttribute(`disabled`, `true`)
      );
      ageComponent.classList.remove(VACANCY_HELPERS_ERROR);
    } else {
      [ageMinInput, ageMaxInput, ageMinClearButton, ageMaxClearButton].forEach(
        (item) => item.removeAttribute(`disabled`)
      );
    }
  });

  educationCheckbox.addEventListener(`change`, () => {
    if (educationCheckbox.checked) {
      educationSelect.setAttribute(`disabled`, `true`);
      educationComponent.classList.remove(VACANCY_HELPERS_ERROR);
    } else {
      educationSelect.removeAttribute(`disabled`);
    }
  });

  salaryCheckbox.addEventListener(`change`, () => {
    if (salaryCheckbox.checked) {
      [
        salaryMinInput,
        salaryMaxInput,
        salaryMinClearButton,
        salaryMaxClearButton,
        ...salaryRadios,
      ].forEach((item: HTMLInputElement) =>
        item.setAttribute(`disabled`, `true`)
      );
      salaryComponent.classList.remove(VACANCY_HELPERS_ERROR);
    } else {
      [
        salaryMinInput,
        salaryMaxInput,
        salaryMinClearButton,
        salaryMaxClearButton,
        ...salaryRadios,
      ].forEach((item: HTMLInputElement) => item.removeAttribute(`disabled`));
    }
  });
};
