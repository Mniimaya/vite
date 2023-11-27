// Helpers;
import { createMainData } from "./create-main-data";
import { createAddressData } from "./create-address-data";
import { createScheduleData } from "./create-schedule-data";
import { createParticipantData } from "./create-participant-data";

export const getDataForm = async (
  form: any,
  ballons: any,
  additionalData: any
) => {
  const mainData = await createMainData(form, ballons, additionalData);
  const addresses = createAddressData(form, {
    id_request: Number(additionalData.id_request),
  });
  const schedules = createScheduleData(form, {
    id_request: Number(additionalData.id_request),
  });
  const participants = createParticipantData(form, {
    id_request: Number(additionalData.id_request),
  });

  return { ...mainData, addresses, schedules, participants };
};

// const obj = {};

// // 1 row;
// const nameOfVacancyInput = form.elements[`name_of_vacancy`];
// const nameOfPositionInput = form.elements[`name_of_position`];
// const nameOfPositionCheckbox = form.elements[`name_of_position_checkbox`];
// const departmentInput = form.elements[`department`];

// // 2 row;
// const dateOpenInput = form.elements[`date_open`];
// const dateCloseInput = form.elements[`date_close`];

// // 3 row;
// const employeesQuantityInput = form.elements[`employees_quantity`];
// const sexValueCheckbox = form.elements[`sex_value_checkbox`];
// const sexValueRadios = form.elements[`sex_value`];
// const ageCheckbox = form.elements[`age_checkbox`];
// const ageMinInput = form.elements[`age_min`];
// const ageMaxInput = form.elements[`age_max`];
// const educationCheckbox = form.elements[`education_checkbox`];
// const education = form.elements[`education`];

// // 4 row;
// const salaryShowCheckbox = form.elements[`salary_checkbox`];
// const salaryRadios = form.elements[`salary_gross`];
// const salaryMinInput = form.elements[`salary_min`];
// const salaryMaxInput = form.elements[`salary_max`];

// // 5 row;
// const experienceSelect = form.elements[`experience`];
// const scheduleSelect = form.elements[`schedule`];

// // 6 row;
// const employmentTypeRadios = form.elements[`employment_type`];

// obj[`name_of_vacancy`] = nameOfVacancyInput.value
//   ? nameOfVacancyInput.value
//   : null;
// obj[`name_of_position`] = nameOfPositionInput.value
//   ? nameOfPositionInput.value
//   : null;
// obj[`name_of_position_checked`] = nameOfPositionCheckbox.checked;
// obj[`department`] = departmentInput.value ? departmentInput.value : null;
// obj[`date_open`] = dateOpenInput.value ? dateOpenInput.value : null;
// obj[`date_close`] = dateCloseInput.value ? dateCloseInput.value : null;
// obj[`employees_quantity`] = employeesQuantityInput.value
//   ? employeesQuantityInput.value
//   : null;
// obj[`sex_value_checked`] = sexValueCheckbox.checked;
// obj[`sex_value`] = sexValueRadios.value ? Number(sexValueRadios.value) : null;
// obj[`age_checked`] = ageCheckbox.checked;
// obj[`age_min`] = ageMinInput.value ? Number(ageMinInput.value) : null;
// obj[`age_max`] = ageMaxInput.value ? Number(ageMaxInput.value) : null;
// obj[`education_checked`] = educationCheckbox.checked;
// obj[`education`] = education.value ? Number(education.value) : null;
// obj[`salary_checked`] = salaryShowCheckbox.checked;
// obj[`salary_gross`] = salaryRadios.value ? Number(salaryRadios.value) : null;
// obj[`salary_min`] = salaryMinInput.value
//   ? Number(salaryMinInput.value)
//   : null;
// obj[`salary_max`] = salaryMaxInput.value
//   ? Number(salaryMaxInput.value)
//   : null;
// obj[`experience`] = experienceSelect.value
//   ? Number(experienceSelect.value)
//   : null;
// obj[`employment_type`] = employmentTypeRadios.value
//   ? Number(employmentTypeRadios.value)
//   : null;

// await Promise.all(ballons).then((values) => {
//   values.forEach((editor) => {
//     obj[editor.customName] = editor.getData();
//   });
// });

// console.log(obj);
