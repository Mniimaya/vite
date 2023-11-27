// Const
import { VACANCY_HELPERS_HIDDEN, VacancyStatus } from "../../../const";
// Helpers;
import { getAuth } from "../../../helpers/get-auth";
import { sendForm } from "../../../helpers/form/send-form";
import { disableForm } from "../../../helpers/form/disable-form";
import { enableForm } from "../../../helpers/form/enable-form";
import { returnFormToInitialState } from "../../../helpers/form/return-form-to-initial-state";
import { hiddenLoader, showLoader } from "../../../../util";

// Validate;
import { validateForm } from "../validate/validate-form";
// API;
import { NotificationAPI } from "../../../../../js/API/notificationApi.js";

// TYPES;
import type { TYPE_BALLONS } from "../../../types/ballons";
import type { TYPE_AUTH_DATA } from "../../../types/auth-data";

export const defaultMode = async (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[]
) => {
  const { samaccountname, cn, title, jpegphoto, sono } =
    (await getAuth()) as TYPE_AUTH_DATA;

  // Elements;
  const sendFormButton = form.querySelector(
    `.vacancy-form-button--send-form`
  ) as HTMLButtonElement;
  const saveToDraftButton = form.querySelector(
    `.vacancy-form-button--save-to-draft`
  ) as HTMLButtonElement;

  // Inputs;
  const participantFullNameInput = form.querySelector(
    `.vacancy-form-input--fullname`
  ) as HTMLInputElement;
  const accountNumberInput = form.querySelector(
    `.vacancy-form-input--account-number`
  ) as HTMLInputElement;
  const positionInput = form.querySelector(
    `.vacancy-form-input--position`
  ) as HTMLInputElement;
  const avatarSrcInput = form.querySelector(
    `.vacancy-form-input--avatar-src`
  ) as HTMLInputElement;
  const isApproveInput = form.querySelector(
    `.vacancy-form-input--is-approve`
  ) as HTMLInputElement;

  // Modals;
  const modal = document.querySelector(`.vacancy-modal-container`);
  const modalTextElement = modal.querySelector(`.vacancy-modal__text`);

  // Events;
  sendFormButton.addEventListener(`click`, async (evt) => {
    evt.preventDefault();

    disableForm(form, ballons);
    showLoader();

    sendForm(form, ballons, {
      status: VacancyStatus.REQUEST,
      sono,
      date_archive: null,
      date_publication: null,
    }).finally(() => {
      enableForm(form, ballons);
      returnFormToInitialState(form, ballons);
      hiddenLoader();
      modal.classList.remove(VACANCY_HELPERS_HIDDEN);
      modalTextElement.textContent = `Форма успешно отправлена`;
      setTimeout(() => {
        modal.classList.add(VACANCY_HELPERS_HIDDEN);
      }, 2500);
    });
  });

  saveToDraftButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    disableForm(form, ballons);
    showLoader();

    sendForm(form, ballons, {
      status: VacancyStatus.DRAFT,
      sono,
      date_archive: null,
      date_publication: null,
    }).finally(() => {
      enableForm(form, ballons);
      returnFormToInitialState(form, ballons);
      hiddenLoader();
      modal.classList.remove(VACANCY_HELPERS_HIDDEN);
      modalTextElement.textContent = `Сохранено в черновики`;
      setTimeout(() => {
        modal.classList.add(VACANCY_HELPERS_HIDDEN);
      }, 2500);
    });
  });

  // Fill inputs;
  participantFullNameInput.value = cn;
  accountNumberInput.value = samaccountname;
  positionInput.value = title;
  avatarSrcInput.value = jpegphoto;
  isApproveInput.value = `1`;
};
