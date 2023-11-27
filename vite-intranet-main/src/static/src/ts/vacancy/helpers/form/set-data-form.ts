import { setDataTextareas } from "./set-data-textareas";
import { createParticipants } from "../creators/form/create-participants";
import { createLocation } from "../creators/form/create-location";

export const setDataForm = (form: any, ballons: any, data: any) => {
  // First row;
  const nameOfVacancyInput = form.querySelector(`input[name=name_of_vacancy]`);
  const nameOfPositionInput = form.querySelector(
    `input[name=name_of_position]`
  );
  const nameOfPositionCheckbox = form.querySelector(
    `input[name=name_of_position_checkbox]`
  );
  const departmentInput = form.querySelector(`input[name=department]`);
  // Second row;
  const dateOpenInput = form.querySelector(`input[name=date_open]`);
  const dateCloseInput = form.querySelector(`input[name=date_close]`);
  // Third row;
  const employeesQuantityInput = form.querySelector(
    `input[name=employees_quantity]`
  );
  const sexCheckbox = form.querySelector(`input[name=sex_value_checkbox]`);
  const sexRadios = form.querySelectorAll(`input[name=sex_value]`);
  const ageCheckbox = form.querySelector(`input[name=age_checkbox]`);
  const ageMinInput = form.querySelector(`input[name=age_min]`);
  const ageMaxInput = form.querySelector(`input[name=age_max]`);
  const educationCheckbox = form.querySelector(
    `input[name=education_checkbox]`
  );
  const educationSelect = form.querySelector(`select[name=education]`);
  // Fourth row;
  const salaryShowCheckbox = form.querySelector(`input[name=salary_checkbox]`);
  const salaryRadios = form.querySelectorAll(`input[name=salary_gross]`);
  const salaryMinInput = form.querySelector(`input[name=salary_min]`);
  const salaryMaxInput = form.querySelector(`input[name=salary_max]`);

  // Addresses;
  // Fifth row;
  const experienceSelect = form.querySelector(`select[name=experience]`);
  const scheduleSelect = form.querySelector(`select[name=schedule]`);
  // Sixth row;
  const employmentTypeRadios = form.querySelectorAll(
    `input[name=employment_type]`
  );
  // Seventh row;

  // Filling out the form
  // First row;
  nameOfVacancyInput.value = data.name_of_vacancy;
  nameOfPositionInput.value = data.name_of_position;
  nameOfPositionCheckbox.checked = data.name_of_position_checked;
  departmentInput.value = data.department;

  if (data.name_of_position_checked) {
    nameOfPositionInput.setAttribute(`disabled`, `true`);
  } else {
    nameOfPositionInput.removeAttribute(`disabled`);
  }
  // Second row;
  dateOpenInput.value = data.date_open;
  dateCloseInput.value = data.date_close;
  // Third row;
  employeesQuantityInput.value = data.employees_quantity;

  if (data.sex_value_checked) {
    sexCheckbox.checked = true;
    Array.from(sexRadios as HTMLInputElement[]).forEach((input) =>
      input.setAttribute(`disabled`, `true`)
    );
  } else {
    sexCheckbox.checked = false;
    Array.from(sexRadios as HTMLInputElement[]).forEach((input) =>
      input.removeAttribute(`disabled`)
    );
  }

  Array.from(sexRadios as HTMLInputElement[]).forEach((input) => {
    if (Number(input.value) === data.sex_value) {
      input.checked = true;
    }
  });

  if (data.age_checked) {
    ageCheckbox.checked = true;
    [ageMinInput, ageMaxInput].forEach((input) =>
      input.setAttribute(`disabled`, `true`)
    );
  } else {
    ageCheckbox.checked = false;
    [ageMinInput, ageMaxInput].forEach((input) =>
      input.removeAttribute(`disabled`)
    );
  }

  if (data.age_min) {
    ageMinInput.value = data.age_min;
  }

  if (data.age_max) {
    ageMaxInput.value = data.age_max;
  }

  if (data.education_checked) {
    educationCheckbox.checked = true;
    educationSelect.setAttribute(`disabled`, `true`);
  } else {
    educationCheckbox.checked = false;
    educationSelect.removeAttribute(`disabled`);
  }

  if (data.education === null) {
    educationSelect.value = ``;
  } else if (data.education >= 0) {
    educationSelect.value = data.education;
  }

  // Fourth row;
  Array.from(salaryRadios as HTMLInputElement[]).forEach((input) => {
    if (Number(input.value) === data.salary_gross) {
      input.checked = true;
    }
  });

  if (data.salary_checked) {
    salaryShowCheckbox.checked = true;
    Array.from(salaryRadios as HTMLInputElement[]).forEach((input) =>
      input.setAttribute(`disabled`, `true`)
    );
    [salaryMinInput, salaryMaxInput].forEach((input) =>
      input.setAttribute(`disabled`, `true`)
    );
  } else {
    salaryShowCheckbox.checked = false;
    Array.from(salaryRadios as HTMLInputElement[]).forEach((input) =>
      input.removeAttribute(`disabled`)
    );
    [salaryMinInput, salaryMaxInput].forEach((input) =>
      input.removeAttribute(`disabled`)
    );
  }

  salaryMinInput.value = data.salary_min;
  salaryMaxInput.value = data.salary_max;

  // Fifth row;
  if (data.experience === null) {
    experienceSelect.value = ``;
  } else if (data.experience >= 0) {
    experienceSelect.value = data.experience;
  }
  // TODO: Сделать график;

  // Sixth row;
  Array.from(employmentTypeRadios as HTMLInputElement[]).forEach((input) => {
    if (Number(input.value) === data.employment_type) {
      input.checked = true;
    }
  });

  // Location containers;
  const mainLocationContainer = form.querySelector(
    `.vacancy-form-items--location-main`
  );
  const additionalLocationContainer = form.querySelector(
    `.vacancy-form-items--location-additional`
  );

  // Participant containers;
  const mainParticipantsContainer = form.querySelector(
    `.vacancy-form-items--participants-main`
  );
  const additionalParticipantsContainer = form.querySelector(
    `.vacancy-form-items--participants-additional`
  );

  setDataTextareas(ballons, {
    functional: data.functional,
    wishes: data.wishes,
    advantages: data.advantages,
    offering: data.offering,
  });

  createLocation(data.addresses, [
    mainLocationContainer,
    additionalLocationContainer,
  ]);

  createParticipants(data.participants, [
    mainParticipantsContainer,
    additionalParticipantsContainer,
  ]);
};
