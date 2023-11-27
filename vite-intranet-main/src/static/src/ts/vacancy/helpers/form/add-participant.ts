// Helpers;
import {
  VACANCY_HELPERS_HIDDEN,
  VACANCY_HELPERS_ERROR,
  DEBOUNCE_DELAY,
  Mode,
} from "../../const";
import { debounce } from "../../helpers/debounce";
// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi";
// Types;
import type { TYPE_PARTICIPANT } from "../../types/participant";

type TYPE_MY_ACCOUNT = {
  cn: string;
  samaccountname: string;
  title: string;
  jpegphoto: string;
  company: string;
  department: string;
};

const participantTemplate = document.querySelector(
  `.template--participants-component`
) as HTMLTemplateElement;

const participantModalTemplate = document.querySelector(
  `.template--modal-participants-component`
) as HTMLTemplateElement;

export const addParticipant = (
  container: HTMLElement,
  data: TYPE_PARTICIPANT = null,
  mode = Mode.DEFAULT
) => {
  let participantElement: unknown;

  if (mode === Mode.DEFAULT) {
    participantElement = (
      participantTemplate.content.cloneNode(true) as HTMLElement
    ).firstElementChild;
  }

  if (mode === Mode.VIEW || mode === Mode.MODAL) {
    participantElement = (
      participantModalTemplate.content.cloneNode(true) as HTMLElement
    ).firstElementChild;
  }

  // Buttons;
  const deleteButton = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-button--delete-participants`
  ) as HTMLButtonElement;
  const editButton = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-button--edit-participants`
  ) as HTMLButtonElement;
  const saveButton = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-button--save-participants`
  ) as HTMLButtonElement;

  // Elements (inputs, checkboxs)
  const roleSelect = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-select--role`
  ) as HTMLSelectElement;
  const fullNameInput = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-input--fullname`
  ) as HTMLInputElement;
  const isViewCheckbox = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-checkbox--is-view`
  ) as HTMLInputElement;
  const isInterviewCheckbox = (participantElement as HTMLElement).querySelector(
    `.vacancy-form-checkbox--is-interview`
  ) as HTMLInputElement;

  const wrapperElement = fullNameInput.closest(`.vacancy-form-item__wrapper`);
  const roleItem = roleSelect.closest(`.vacancy-form-item`);

  // Parents;
  const parentItem = fullNameInput.closest(`.vacancy-form-item`);
  const parentComponent = fullNameInput.closest(`.vacancy-form-component`);

  // Error container;
  const errorContainer = parentItem.querySelector(`.vacancy-form-error`);

  // Actions container;
  const actionsContainer = parentComponent.querySelector(
    `.vacancy-form-component__actions`
  );

  // Participants Search List and Participants Search Item template;
  const participantsSearchList = parentComponent.querySelector(
    `.vacancy-participants-search-list`
  );
  const participantsSearchItemTemplate = document.querySelector(
    `.template--participants-search-item`
  ) as HTMLTemplateElement;

  // Hidden inputs;
  const accountNumberInput = parentComponent.querySelector(
    `.vacancy-form-input--account-number`
  ) as HTMLInputElement;
  const positionInput = parentComponent.querySelector(
    `.vacancy-form-input--position`
  ) as HTMLInputElement;
  const avatarSrcInput = parentComponent.querySelector(
    `.vacancy-form-input--avatar-src`
  ) as HTMLInputElement;
  const isApproveInput = parentComponent.querySelector(
    `.vacancy-form-input--is-approve`
  ) as HTMLInputElement;
  const statusInput = parentComponent.querySelector(
    `.vacancy-form-input--status`
  ) as HTMLInputElement;
  const idInput = parentComponent.querySelector(
    `.vacancy-form-input--id`
  ) as HTMLInputElement;
  const idRequestInput = parentComponent.querySelector(
    `.vacancy-form-input--id-request`
  ) as HTMLInputElement;
  const reasonRejectInput = parentComponent.querySelector(
    `.vacancy-form-input--reason-reject`
  ) as HTMLInputElement;
  const isEditedInput = parentComponent.querySelector(
    `.vacancy-form-input--is-edited`
  ) as HTMLInputElement;

  // Debounce handler;
  const debounceSearch = debounce((evt: Event) => {
    const formData = new FormData();

    formData.append(`sono`, ``);
    formData.append(`search`, (evt.target as HTMLInputElement).value);

    [accountNumberInput, positionInput, avatarSrcInput].forEach(
      (input: HTMLInputElement) => {
        input.value = ``;
      }
    );

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

      if (data.length < 10) {
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
          ) as HTMLInputElement;
          const companyElement = participantsSearchItemElement.querySelector(
            `.vacancy-participants-search-list__company`
          ) as HTMLInputElement;
          const departmentElement = participantsSearchItemElement.querySelector(
            `.vacancy-participants-search-list__department`
          ) as HTMLInputElement;

          // Fill elements;
          fullNameElement.textContent = item.cn;
          companyElement.textContent = item.company;
          departmentElement.textContent = item.department;

          // Events;
          participantsSearchItemElement.addEventListener(`click`, (evt) => {
            evt.preventDefault();

            // Fill fullname;
            fullNameInput.value = item.cn;

            // Fill hidden;
            accountNumberInput.value = item.samaccountname || ``;
            positionInput.value = item.title || ``;
            avatarSrcInput.value = item.jpegphoto || ``;
            statusInput.value = `0`;

            // Hidden search list;
            participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);

            // Remove error;
            parentItem.classList.remove(VACANCY_HELPERS_ERROR);
          });

          participantsSearchList.append(participantsSearchItemElement);
        });
      } else {
        participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);
        parentItem.classList.add(VACANCY_HELPERS_ERROR);
        errorContainer.textContent = `Найдено слишком много результатов: ${data.length}`;
      }
    });
  }, DEBOUNCE_DELAY);

  // Clear button;
  const clearButton = wrapperElement.querySelector(
    `.vacancy-form-button--clear`
  );

  // Events;
  fullNameInput.addEventListener(`input`, () => {
    if (parentItem) {
      parentItem.classList.remove(VACANCY_HELPERS_ERROR);
    }

    if (parentComponent) {
      parentComponent.classList.remove(VACANCY_HELPERS_ERROR);
    }

    if (fullNameInput.value) {
      clearButton.classList.remove(VACANCY_HELPERS_HIDDEN);
    } else {
      clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
    }
  });

  fullNameInput.addEventListener(`input`, debounceSearch);

  clearButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    fullNameInput.value = ``;

    [accountNumberInput, positionInput, avatarSrcInput].forEach((input) => {
      input.value = ``;
    });

    participantsSearchList.classList.add(VACANCY_HELPERS_HIDDEN);
    clearButton.classList.add(VACANCY_HELPERS_HIDDEN);
  });

  roleSelect.addEventListener(`change`, () => {
    const role = Number(roleSelect.value);
    roleItem.classList.remove(VACANCY_HELPERS_ERROR);

    if (role === 1 || role === 5) {
      isApproveInput.value = `1`;
    } else if (role === 2 || role === 3 || role === 4) {
      isApproveInput.value = `0`;
    } else {
      isApproveInput.value = ``;
    }
  });

  if (data) {
    roleSelect.value = `${data.role}`;
    fullNameInput.value = data.full_name;
    isViewCheckbox.checked = Boolean(data.is_view);
    isInterviewCheckbox.checked = Boolean(data.is_interview);
    accountNumberInput.value = data.account_number;
    positionInput.value = data.position;
    avatarSrcInput.value = data.avatar_src;
    isApproveInput.value = `${data.is_approve}`;
    statusInput.value = `${data.status}`;
    idInput.value = `${data.id}`;
    idRequestInput.value = `${data.id_request}`;
    reasonRejectInput.value = data.reason_reject;
    isEditedInput.value = `0`;

    deleteButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      statusInput.value = `1`;
      isEditedInput.value = `0`;
      (participantElement as HTMLElement).classList.add(VACANCY_HELPERS_HIDDEN);
    });
  } else {
    deleteButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      statusInput.value = `1`;
      (participantElement as HTMLElement).classList.add(VACANCY_HELPERS_HIDDEN);
    });
  }

  if (mode === Mode.MODAL && Number(data.role) !== 1) {
    // Disabled form elemnts;
    roleSelect.setAttribute(`disabled`, `true`);
    fullNameInput.setAttribute(`disabled`, `true`);
    isViewCheckbox.setAttribute(`disabled`, `true`);
    isInterviewCheckbox.setAttribute(`disabled`, `true`);

    // Buttons;
    deleteButton.classList.add(VACANCY_HELPERS_HIDDEN);
    editButton.classList.remove(VACANCY_HELPERS_HIDDEN);

    editButton.addEventListener(`click`, () => {
      roleSelect.removeAttribute(`disabled`);
      fullNameInput.removeAttribute(`disabled`);
      isViewCheckbox.removeAttribute(`disabled`);
      isInterviewCheckbox.removeAttribute(`disabled`);

      editButton.classList.add(VACANCY_HELPERS_HIDDEN);
      saveButton.classList.remove(VACANCY_HELPERS_HIDDEN);
      deleteButton.classList.remove(VACANCY_HELPERS_HIDDEN);
      isEditedInput.value = `1`;
    });

    saveButton.addEventListener(`click`, () => {
      roleSelect.setAttribute(`disabled`, `true`);
      fullNameInput.setAttribute(`disabled`, `true`);
      isViewCheckbox.setAttribute(`disabled`, `true`);
      isInterviewCheckbox.setAttribute(`disabled`, `true`);

      saveButton.classList.add(VACANCY_HELPERS_HIDDEN);
      deleteButton.classList.add(VACANCY_HELPERS_HIDDEN);
      editButton.classList.remove(VACANCY_HELPERS_HIDDEN);
      isEditedInput.value = `0`;
    });
  } else if (mode === Mode.MODAL && Number(data.role) === 1) {
    roleSelect.setAttribute(`disabled`, `true`);
    fullNameInput.setAttribute(`disabled`, `true`);
    isViewCheckbox.setAttribute(`disabled`, `true`);
    isInterviewCheckbox.setAttribute(`disabled`, `true`);

    actionsContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  }

  container.append(participantElement as HTMLElement);
};
