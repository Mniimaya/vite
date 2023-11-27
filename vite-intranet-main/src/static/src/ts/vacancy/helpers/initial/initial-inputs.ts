// Const;
import {
  VACANCY_HELPERS_ERROR,
  VACANCY_HELPERS_HIDDEN,
  DEBOUNCE_DELAY,
} from "../../const";

// Helpers;
import { debounce } from "../../helpers/debounce";

// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi";

interface FormElements extends HTMLFormControlsCollection {
  name_of_position: HTMLInputElement;
  department: HTMLInputElement;
  date_open: HTMLInputElement;
  date_close: HTMLInputElement;
}

type TYPE_MY_ACCOUNT = {
  cn: string;
  company: string;
  department: string;
  samaccountname: string | null;
  title: string | null;
  jpegphoto: string | null;
};

export const initialInputs = (form: HTMLFormElement) => {
  // Input collections;
  const textInputs = form.querySelectorAll(`input[type=text]`);
  const numberInputs = form.querySelectorAll(`input[type=number]`);
  const dateInputs = form.querySelectorAll(`input[type=date]`);
  const fullnameInputs = form.querySelectorAll(`.vacancy-form-input--fullname`);

  // Inputs elements;
  const positionInput = (form.elements as FormElements)[`name_of_position`];
  const departmentInput = (form.elements as FormElements)[`department`];
  const dateOpenInput = (form.elements as FormElements)[`date_open`];
  const dateCloseInput = (form.elements as FormElements)[`date_close`];

  // Parents elements for position and department elements;
  const parentItemPosition = positionInput.closest(
    `.vacancy-form-item--name-of-position`
  );
  const parentItemDepartment = departmentInput.closest(
    `.vacancy-form-item--department`
  );

  // Search List for position and department elements;
  const searchListPosition =
    parentItemPosition.querySelector(`.vacancy-search-list`);
  const searchListDepartment =
    parentItemDepartment.querySelector(`.vacancy-search-list`);

  // Error containers for position and department elements;
  const errorContainerPosition =
    parentItemPosition.querySelector(`.vacancy-form-error`);
  const errorContainerDepartment =
    parentItemDepartment.querySelector(`.vacancy-form-error`);

  // Search Item Templates;
  const participantsSearchItemTemplate = document.querySelector(
    `.template--participants-search-item`
  ) as HTMLTemplateElement;
  const searchItemTemplate = document.querySelector(
    `.template--search-item`
  ) as HTMLTemplateElement;

  const debounceSearchPosition = debounce((evt: Event) => {
    Array.from(searchListPosition.children).forEach((child) => {
      child.remove();
    });

    const formData = new FormData();
    formData.append(`search`, (evt.target as HTMLInputElement).value);

    VacancyAPI.getPosition(formData).then((data: [{ title: string }] | []) => {
      Array.from(searchListPosition.children).forEach((child) =>
        child.remove()
      );

      if (data.length === 0) {
        searchListPosition.classList.add(VACANCY_HELPERS_HIDDEN);
        parentItemPosition.classList.add(VACANCY_HELPERS_ERROR);
        errorContainerPosition.textContent = `По вашему запросу ничего не найдено`;
        return;
      }

      if (data.length < 15) {
        searchListPosition.classList.remove(VACANCY_HELPERS_HIDDEN);

        data.forEach(({ title }) => {
          const searchItemElement = (
            searchItemTemplate.content.cloneNode(true) as HTMLElement
          ).firstElementChild;
          const textContainer = searchItemElement.querySelector(
            `.vacancy-search-list__text`
          );

          searchItemElement.addEventListener(`click`, (evt: Event) => {
            evt.preventDefault();

            positionInput.value = title;

            searchListPosition.classList.add(VACANCY_HELPERS_HIDDEN);
            parentItemPosition.classList.remove(VACANCY_HELPERS_ERROR);
          });

          textContainer.textContent = title;

          searchListPosition.append(searchItemElement);
        });
      } else {
        searchListPosition.classList.add(VACANCY_HELPERS_HIDDEN);
        parentItemPosition.classList.add(VACANCY_HELPERS_ERROR);
        errorContainerPosition.textContent = `Найдено слишком много результатов: ${data.length}`;
      }
    });
  }, DEBOUNCE_DELAY);

  const debounceSearchDepartment = debounce((evt: Event) => {
    const formData = new FormData();
    formData.append(`search`, (evt.target as HTMLInputElement).value);

    VacancyAPI.getDepartment(formData).then(
      (data: [{ department: string }] | []) => {
        Array.from(searchListDepartment.children).forEach((child) =>
          child.remove()
        );

        if (data.length === 0) {
          searchListDepartment.classList.add(VACANCY_HELPERS_HIDDEN);
          parentItemDepartment.classList.add(VACANCY_HELPERS_ERROR);
          errorContainerDepartment.textContent = `По вашему запросу ничего не найдено`;
          return;
        }

        if (data.length < 15) {
          searchListDepartment.classList.remove(VACANCY_HELPERS_HIDDEN);

          data.forEach(({ department }) => {
            const searchItemElement = (
              searchItemTemplate.content.cloneNode(true) as HTMLInputElement
            ).firstElementChild;
            const textContainer = searchItemElement.querySelector(
              `.vacancy-search-list__text`
            );

            searchItemElement.addEventListener(`click`, (evt: Event) => {
              evt.preventDefault();

              departmentInput.value = department;

              searchListDepartment.classList.add(VACANCY_HELPERS_HIDDEN);
              parentItemDepartment.classList.remove(VACANCY_HELPERS_ERROR);
            });

            textContainer.textContent = department;

            searchListDepartment.append(searchItemElement);
          });
        } else {
          searchListDepartment.classList.add(VACANCY_HELPERS_HIDDEN);
          parentItemDepartment.classList.add(VACANCY_HELPERS_ERROR);
          errorContainerDepartment.textContent = `Найдено слишком много результатов: ${data.length}`;
        }
      }
    );
  }, DEBOUNCE_DELAY);

  // Events inputs;
  positionInput.addEventListener(`input`, debounceSearchPosition);
  departmentInput.addEventListener(`input`, debounceSearchDepartment);

  // Events for collentions inputs;
  [...textInputs, ...numberInputs, ...dateInputs].forEach(
    (input: HTMLInputElement) => {
      if (input.type === `hidden`) {
        return;
      }

      const wrapperElement = input.closest(`.vacancy-form-item__wrapper`);
      const parentComponent = input.closest(
        `.vacancy-form-component--participants`
      );
      const searchList = wrapperElement.querySelector(`.vacancy-search-list`);

      // Participants hidden input;
      let searchParticipantList: unknown;
      let accountNumberInput: unknown;
      let positionInput: unknown;
      let avatarSrcInput: unknown;
      let isApproveInput: unknown;

      if (parentComponent) {
        searchParticipantList = parentComponent.querySelector(
          `.vacancy-participants-search-list`
        );
        accountNumberInput = parentComponent.querySelector(
          `.vacancy-form-input--account-number`
        );
        positionInput = parentComponent.querySelector(
          `.vacancy-form-input--position`
        );
        avatarSrcInput = parentComponent.querySelector(
          `.vacancy-form-input--avatar-src`
        );
        isApproveInput = parentComponent.querySelector(
          `.vacancy-form-input--is-approve`
        );
      }

      // Clear button;
      const clearButton = wrapperElement.querySelector(
        `.vacancy-form-button--clear`
      );

      clearButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const parentComponent = input.closest(`.vacancy-form-component`);
        const parentItem = input.closest(`.vacancy-form-item`);

        input.value = ``;

        if (input.name === `date_open`) {
          dateCloseInput.min =
            dateOpenInput.value || new Date().toISOString().split("T")[0];
        }

        if (input.name === `date_close`) {
          dateOpenInput.max = dateCloseInput.value;
        }

        if (parentComponent && searchParticipantList) {
          Array.from(
            (searchParticipantList as HTMLUListElement).children
          ).forEach((child) => child.remove());

          (accountNumberInput as HTMLInputElement).value = ``;
          (positionInput as HTMLInputElement).value = ``;
          (avatarSrcInput as HTMLInputElement).value = ``;

          parentComponent.classList.remove(VACANCY_HELPERS_ERROR);
          (searchParticipantList as HTMLUListElement).classList.add(
            VACANCY_HELPERS_HIDDEN
          );
        }

        if (parentItem) {
          parentItem.classList.remove(VACANCY_HELPERS_ERROR);
        }

        if (searchList) {
          input.value = ``;
          searchList.classList.add(VACANCY_HELPERS_HIDDEN);
        }

        clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
      });

      input.addEventListener(`input`, () => {
        const parentItem = input.closest(`.vacancy-form-item`);
        const parentComponent = input.closest(`.vacancy-form-component`);

        if (parentItem) {
          parentItem.classList.remove(VACANCY_HELPERS_ERROR);
        }

        if (parentComponent) {
          parentComponent.classList.remove(VACANCY_HELPERS_ERROR);
        }

        if (input.value) {
          clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
        } else {
          clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
        }
      });
    }
  );

  Array.from(fullnameInputs).forEach((input) => {
    // Parent component;
    const parentComponent = input.closest(
      `.vacancy-form-component--participants`
    );
    // Parent element;
    const parentItem = input.closest(`.vacancy-form-item`);

    // Hidden inputs;
    const accountNumberInput = parentComponent.querySelector(
      `.vacancy-form-input--account-number`
    );
    const positionInput = parentComponent.querySelector(
      `.vacancy-form-input--position`
    );
    const avatarSrcInput = parentComponent.querySelector(
      `.vacancy-form-input--avatar-src`
    );

    // Error container;
    const errorContainer = parentItem.querySelector(`.vacancy-form-error`);

    // Participants Search List and Participants Search Item template;
    const participantsSearchList = parentComponent.querySelector(
      `.vacancy-participants-search-list`
    );

    const debounceSearch = debounce((evt: Event) => {
      const formData = new FormData();

      formData.append(`sono`, ``);
      formData.append(`search`, (evt.target as HTMLInputElement).value);

      (accountNumberInput as HTMLInputElement).value = ``;
      (positionInput as HTMLInputElement).value = ``;
      (avatarSrcInput as HTMLInputElement).value = ``;

      if ((evt.target as HTMLInputElement).value.trim() === ``) {
        return;
      }

      VacancyAPI.getUsers(formData).then((data) => {
        Array.from(participantsSearchList.children).forEach((child) =>
          child.remove()
        );

        if (data.length === 0) {
          participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);
          parentItem.classList.add(VACANCY_HELPERS_ERROR);
          errorContainer.textContent = `По вашему запросу никого не найдено`;
          return;
        }

        if (data.length < 15) {
          participantsSearchList.classList.remove(VACANCY_HELPERS_HIDDEN);

          data.forEach((item: TYPE_MY_ACCOUNT) => {
            const participantsSearchItemElement = (
              participantsSearchItemTemplate.content.cloneNode(
                true
              ) as HTMLElement
            ).firstElementChild;
            // Elements;
            const fullNameElement = participantsSearchItemElement.querySelector(
              `.vacancy-participants-search-list__fullname`
            );
            const companyElement = participantsSearchItemElement.querySelector(
              `.vacancy-participants-search-list__company`
            );
            const departmentElement =
              participantsSearchItemElement.querySelector(
                `.vacancy-participants-search-list__department`
              );

            // Fill elements;
            fullNameElement.textContent = item.cn;
            companyElement.textContent = item.company;
            departmentElement.textContent = item.department;

            // Events;
            participantsSearchItemElement.addEventListener(
              `click`,
              (evt: Event) => {
                evt.preventDefault();

                // Fill fullname;
                (input as HTMLInputElement).value = item.cn;

                // Fill hidden;
                (accountNumberInput as HTMLInputElement).value =
                  item.samaccountname || ``;
                (positionInput as HTMLInputElement).value = item.title || ``;
                (avatarSrcInput as HTMLInputElement).value =
                  item.jpegphoto || ``;

                // Hidden search list;
                participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);

                // Remove error;
                parentItem.classList.remove(VACANCY_HELPERS_ERROR);
              }
            );

            participantsSearchList.append(participantsSearchItemElement);
          });
        } else {
          participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);
          parentItem.classList.add(VACANCY_HELPERS_ERROR);
          errorContainer.textContent = `Найдено слишком много результатов: ${data.length}`;
        }
      });
    }, DEBOUNCE_DELAY);

    // Event;
    input.addEventListener(`input`, debounceSearch);
  });

  // Date;
  dateOpenInput.min = new Date().toISOString().split("T")[0];
  dateCloseInput.min = dateOpenInput.min;

  dateOpenInput.addEventListener(`change`, () => {
    dateCloseInput.min =
      dateOpenInput.value || new Date().toISOString().split("T")[0];
  });

  dateCloseInput.addEventListener(`change`, () => {
    dateOpenInput.max = dateCloseInput.value;
  });
};
