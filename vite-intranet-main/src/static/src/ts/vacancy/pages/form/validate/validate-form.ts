// Validate helpers;
import { validateNameOfPosition } from "./validate-name-of-position";
import { validateNameOfVacancy } from "./validate-name-of-vacancy";
import { validateDepartment } from "./validate-department";
import { validateDateOpen } from "./validate-date-open";
import { validateDateClose } from "./validate-date-close";
import { validateEmployeesQuantity } from "./validate-employees-quantity";
import { validateSex } from "./validate-sex";
import { validateAge } from "./validate-age";
import { validateEducation } from "./validate-education";
import { validateSalary } from "./validate-salary";
import { validateExperience } from "./validate-experience";
import { validateSchedule } from "./validate-schedule";
import { validateEmploymentType } from "./validate-employment-type";
// Location/Participants;
import { validateLocation } from "./validate-location";
import { validateParticipants } from "./validate-participants";

interface FormElements extends HTMLFormControlsCollection {
  name_of_position: HTMLInputElement;
  name_of_vacancy: HTMLInputElement;
  department: HTMLInputElement;
  date_open: HTMLInputElement;
  date_close: HTMLInputElement;
  employees_quantity: HTMLInputElement;
  age_min: HTMLInputElement;
  age_max: HTMLInputElement;
  salary_min: HTMLInputElement;
  salary_max: HTMLInputElement;
  sex_value: RadioNodeList;
  salary_gross: RadioNodeList;
  employment_type: RadioNodeList;
  education: HTMLSelectElement;
  experience: HTMLSelectElement;
  schedule: HTMLSelectElement;
  vacancy_no_name_checkbox: HTMLInputElement;
  sex_checkbox: HTMLInputElement;
  age_checkbox: HTMLInputElement;
  education_checkbox: HTMLInputElement;
  salary_checkbox: HTMLInputElement;
}

// Form;
const form = document.querySelector(`.vacancy-form`) as HTMLFormElement;
// Inputs;
const nameOfPositionInput = (form.elements as FormElements)[`name_of_position`];
const nameOfVacancyInput = (form.elements as FormElements)[`name_of_vacancy`];
const departmentInput = (form.elements as FormElements)[`department`];
const dateOpenInput = (form.elements as FormElements)[`date_open`];
const dateCloseInput = (form.elements as FormElements)[`date_close`];
const employeesQuantityInput = (form.elements as FormElements)[
  `employees_quantity`
];
const ageMinInput = (form.elements as FormElements)[`age_min`];
const ageMaxInput = (form.elements as FormElements)[`age_max`];
const salaryMinInput = (form.elements as FormElements)[`salary_min`];
const salaryMaxInput = (form.elements as FormElements)[`salary_max`];
// Radios;
const sexRadios = (form.elements as FormElements)[`sex_value`];
const salaryRadios = (form.elements as FormElements)[`salary_gross`];
const employmentTypeRadios = (form.elements as FormElements)[`employment_type`];
// Selects;
const educationSelect = (form.elements as FormElements)[`education`];
const experienceSelect = (form.elements as FormElements)[`experience`];
const scheduleSelect = (form.elements as FormElements)[`schedule`];
// Checkboxs;
const vacancyNoNameCheckbox = (form.elements as FormElements)[
  `vacancy_no_name_checkbox`
];
const sexCheckbox = (form.elements as FormElements)[`sex_checkbox`];
const ageCheckbox = (form.elements as FormElements)[`age_checkbox`];
const educationCheckbox = (form.elements as FormElements)[`education_checkbox`];
const salaryCheckbox = (form.elements as FormElements)[`salary_checkbox`];
// Parents;
const nameOfPositionItem = nameOfPositionInput.closest(
  `.vacancy-form-item`
) as HTMLElement;
const nameOfVacancyComponent = nameOfVacancyInput.closest(
  `.vacancy-form-item`
) as HTMLElement;
const departmentItem = departmentInput.closest(
  `.vacancy-form-item`
) as HTMLElement;
const dateOpenItem = dateOpenInput.closest(`.vacancy-form-item`) as HTMLElement;
const dateCloseItem = dateCloseInput.closest(
  `.vacancy-form-item`
) as HTMLElement;
const employeesQuantityItem = employeesQuantityInput.closest(
  `.vacancy-form-item`
) as HTMLElement;
const sexComponent = (sexRadios[0] as HTMLInputElement).closest(
  `.vacancy-form-component`
) as HTMLElement;
const ageComponent = ageMinInput.closest(
  `.vacancy-form-component`
) as HTMLElement;
const educationComponent = educationSelect.closest(
  `.vacancy-form-component`
) as HTMLElement;
const salaryComponent = salaryMinInput.closest(
  `.vacancy-form-component`
) as HTMLElement;
const experienceItem = experienceSelect.closest(
  `.vacancy-form-item`
) as HTMLElement;
const scheduleItem = scheduleSelect.closest(
  `.vacancy-form-item`
) as HTMLElement;
const employmentTypeComponent = (
  employmentTypeRadios[0] as HTMLInputElement
).closest(`.vacancy-form-component`) as HTMLElement;
// Text containers;
const nameOfPositionTextContainer = nameOfPositionItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const nameOfVacancyTextContainer = nameOfVacancyComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const departmentTextContainer = departmentItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const dateOpenTextContainer = dateOpenItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const dateCloseTextContainer = dateCloseItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const employeesQuantityTextContainer = employeesQuantityItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const sexTextContainer = sexComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const ageTextContainer = ageComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const educationTextContainer = educationComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const salaryTextContainer = salaryComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const experienceTextContainer = experienceItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const scheduleTextContainer = scheduleItem.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
const employmentTypeTextContainer = employmentTypeComponent.querySelector(
  `.vacancy-form-error`
) as HTMLElement;
// Location containers;
const locationMainContainer = form.querySelector(
  `.vacancy-form-items--location-main`
) as HTMLElement;
const locationAdditionalContainer = form.querySelector(
  `.vacancy-form-items--location-additional`
) as HTMLElement;
// Participants containers;
const participantsMainContainer = form.querySelector(
  `.vacancy-form-items--participants-main`
) as HTMLElement;
const participantsAdditionalContainer = form.querySelector(
  `.vacancy-form-items--participants-additional`
) as HTMLElement;

export const validateForm = (errors: unknown[]) => {
  validateNameOfPosition(
    [nameOfPositionInput],
    nameOfPositionItem,
    nameOfPositionTextContainer,
    errors as HTMLInputElement[]
  );

  validateNameOfVacancy(
    [nameOfVacancyInput, vacancyNoNameCheckbox],
    nameOfVacancyComponent,
    nameOfVacancyTextContainer,
    errors as HTMLInputElement[]
  );

  validateDepartment(
    [departmentInput],
    departmentItem,
    departmentTextContainer,
    errors as HTMLInputElement[]
  );

  validateDateOpen(
    [dateOpenInput],
    dateOpenItem,
    dateOpenTextContainer,
    errors as HTMLInputElement[]
  );

  validateDateClose(
    [dateCloseInput],
    dateCloseItem,
    dateCloseTextContainer,
    errors as HTMLInputElement[]
  );

  validateEmployeesQuantity(
    [employeesQuantityInput],
    employeesQuantityItem,
    employeesQuantityTextContainer,
    errors as HTMLInputElement[]
  );

  validateSex(
    [sexRadios, sexCheckbox],
    sexComponent,
    sexTextContainer,
    errors as [RadioNodeList | HTMLElement]
  );

  validateAge(
    [[ageMinInput, ageMaxInput], ageCheckbox],
    ageComponent,
    ageTextContainer,
    errors as HTMLInputElement[]
  );

  validateEducation(
    [educationSelect, educationCheckbox],
    educationComponent,
    educationTextContainer,
    errors as HTMLInputElement[]
  );

  validateSalary(
    [[salaryMinInput, salaryMaxInput], salaryRadios, salaryCheckbox],
    salaryComponent,
    salaryTextContainer,
    errors as [RadioNodeList | HTMLElement]
  );

  validateExperience(
    [experienceSelect],
    experienceItem,
    experienceTextContainer,
    errors as HTMLInputElement[]
  );

  validateSchedule(
    [scheduleSelect],
    scheduleItem,
    scheduleTextContainer,
    errors as HTMLInputElement[]
  );

  validateEmploymentType(
    [employmentTypeRadios],
    employmentTypeComponent,
    employmentTypeTextContainer,
    errors as [RadioNodeList | HTMLElement]
  );

  validateLocation(
    [locationMainContainer, locationAdditionalContainer],
    errors as HTMLInputElement[]
  );

  validateParticipants(
    [participantsMainContainer, participantsAdditionalContainer],
    errors as HTMLInputElement[]
  );

  return errors;
};
