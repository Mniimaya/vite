import { checkNumberValue } from "../check-number-value";

import type { TYPE_BALLONS } from "../../types/ballons";

interface AdditionalData {
  id_request?: number;
  status?: number;
  sono?: string;
  date_publication?: string | null;
  date_archive?: string | null;
}

interface FormElements extends HTMLFormControlsCollection {
  name_of_position: HTMLInputElement;
  name_of_vacancy: HTMLInputElement;
  department: HTMLInputElement;
  name_of_position_checkbox: HTMLInputElement,
  date_open: HTMLInputElement,
  date_close: HTMLInputElement,
  employees_quantity: HTMLInputElement,
  sex_value: HTMLInputElement,
  sex_value_checkbox: HTMLInputElement,
  age_min: HTMLInputElement,
  age_max: HTMLInputElement,
  age_checkbox: HTMLInputElement,
  salary_gross: HTMLInputElement,
  salary_min: HTMLInputElement,
  salary_max: HTMLInputElement,
  salary_checkbox: HTMLInputElement,
  experience: HTMLSelectElement,
  employment_type: HTMLInputElement,
  education: HTMLSelectElement,
  salary_checked: HTMLInputElement,
  sex_value_checked: HTMLInputElement,
  age_checked: HTMLInputElement,
  education_checkbox: HTMLInputElement,
  name_of_position_checked: HTMLInputElement,
}

export const createMainData = async (form: HTMLFormElement, ballons: TYPE_BALLONS[], additionalData: AdditionalData) => {
  const nameOfPosition = (form.elements as FormElements)[`name_of_position`];
  const nameOfVacancy = (form.elements as FormElements)[`name_of_vacancy`];
  const department = (form.elements as FormElements)[`department`];
  const nameOfPositionCheckbox = (form.elements as FormElements)[`name_of_position_checkbox`];
  const dateOpen = (form.elements as FormElements)[`date_open`];
  const dateClose = (form.elements as FormElements)[`date_close`];
  const employeesQuantity = (form.elements as FormElements)[`employees_quantity`];
  const sexValue = (form.elements as FormElements)[`sex_value`];
  const sexValueCheckbox	= (form.elements as FormElements)[`sex_value_checkbox`];
  const ageMin = (form.elements as FormElements)[`age_min`];
  const ageMax = (form.elements as FormElements)[`age_max`];
  const ageCheckbox = (form.elements as FormElements)[`age_checkbox`];
  const salaryCheckbox = (form.elements as FormElements)[`salary_checkbox`];
  const salaryGross = (form.elements as FormElements)[`salary_gross`];
  const salaryMin = (form.elements as FormElements)[`salary_min`];
  const salaryMax = (form.elements as FormElements)[`salary_max`];
  const experience = (form.elements as FormElements)[`experience`];
  const employmentType = (form.elements as FormElements)[`employment_type`];
  const education = (form.elements as FormElements)[`education`];
  const educationChekbox = (form.elements as FormElements)[`education_checkbox`];

  const ballonsData: any = {};

  await Promise.all(ballons).then((editors) => editors.forEach((editor) => ballonsData[editor.customName] = editor.getData()));

  return {
    name_of_vacancy: nameOfVacancy.value || null,
    name_of_position: nameOfPosition.value || null,
    name_of_position_checked: nameOfPositionCheckbox.checked ? true : false,
    department: department.value || null,
    date_open: dateOpen.value || null,
    date_close: dateClose.value || null,
    employees_quantity: checkNumberValue(employeesQuantity.value),
    sex_value: checkNumberValue(sexValue.value),
    sex_value_checked: sexValueCheckbox.checked ? true : false,
    age_min: checkNumberValue(ageMin.value),
    age_max: checkNumberValue(ageMax.value),
    age_checked: ageCheckbox.checked ? true : false,
    education: checkNumberValue(education.value),
    education_checked: educationChekbox.checked ? true : false,
    salary_gross: checkNumberValue(salaryGross.value),
    salary_min: checkNumberValue(salaryMin.value),
    salary_max: checkNumberValue(salaryMax.value),
    salary_checked: salaryCheckbox.checked ? true : false,
    experience: checkNumberValue(experience.value),
    employment_type: checkNumberValue(employmentType.value),
    ...additionalData,
    ...ballonsData,
  }
}
