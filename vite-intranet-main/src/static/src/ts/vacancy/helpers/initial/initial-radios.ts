import { VACANCY_HELPERS_ERROR } from "../../const";

interface FormElements extends HTMLFormControlsCollection {
  employment_type: RadioNodeList;
  sex_value: RadioNodeList;
  salary_gross: RadioNodeList;
}

export const initialRadios = (form: HTMLFormElement) => {
  const sexRadios = (form.elements as FormElements)[`sex_value`];
  const salaryRadios = (form.elements as FormElements)[`salary_gross`];
  const employmentRadios = (form.elements as FormElements)[`employment_type`];

  // Parents;
  const sexComponent = (sexRadios[0] as HTMLInputElement).closest(
    `.vacancy-form-component--sex`
  );
  const salaryComponent = (salaryRadios[0] as HTMLInputElement).closest(
    `.vacancy-form-component--salary`
  );
  const employmentComponent = (employmentRadios[0] as HTMLInputElement).closest(
    `.vacancy-form-component--type-of-employment`
  );

  // Events;
  sexRadios.forEach((radio) =>
    radio.addEventListener(`click`, () => {
      sexComponent.classList.remove(VACANCY_HELPERS_ERROR);
    })
  );

  salaryRadios.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      salaryComponent.classList.remove(VACANCY_HELPERS_ERROR);
    });
  });

  employmentRadios.forEach((radio) => {
    radio.addEventListener(`click`, () => {
      employmentComponent.classList.remove(VACANCY_HELPERS_ERROR);
    });
  });
};
