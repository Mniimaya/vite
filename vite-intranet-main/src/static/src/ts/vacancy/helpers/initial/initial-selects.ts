import { VACANCY_HELPERS_ERROR } from "../../const";

interface FormElements extends HTMLFormControlsCollection {
  education: HTMLSelectElement;
  experience: HTMLSelectElement;
  schedule: HTMLSelectElement;
}

export const initialSelects = (form: HTMLFormElement) => {
  // Selects;
  const educationSelect = (form.elements as FormElements)[`education`];
  const experienceSelect = (form.elements as FormElements)[`experience`];
  const scheduleSelect = (form.elements as FormElements)[`schedule`];
  const participantsSelects = form.querySelectorAll(
    `.vacancy-form-select--role`
  );

  // Parent Component;
  const educationComponent = educationSelect.closest(
    `.vacancy-form-component--education`
  );
  const experienceItem = experienceSelect.closest(
    `.vacancy-form-item--experience`
  );
  const scheduleItem = scheduleSelect.closest(`.vacancy-form-item--schedule`);

  // Events;
  educationSelect.addEventListener(`change`, () => {
    educationComponent.classList.remove(VACANCY_HELPERS_ERROR);
  });

  experienceSelect.addEventListener(`change`, () => {
    experienceItem.classList.remove(VACANCY_HELPERS_ERROR);
  });

  scheduleSelect.addEventListener(`change`, () => {
    scheduleItem.classList.remove(VACANCY_HELPERS_ERROR);
  });

  participantsSelects.forEach((select: HTMLSelectElement) => {
    const parentComponent = select.closest(
      `.vacancy-form-component--participants`
    );
    const isApproveInput = parentComponent.querySelector(
      `.vacancy-form-input--is-approve`
    );

    select.addEventListener(`change`, () => {
      const role = Number(select.value);

      if (role === 1 || role === 5) {
        (isApproveInput as HTMLInputElement).value = `1`;
      } else if (role === 2 || role === 3 || role === 4) {
        (isApproveInput as HTMLInputElement).value = `0`;
      } else {
        (isApproveInput as HTMLInputElement).value = ``;
      }
    });
  });
};
