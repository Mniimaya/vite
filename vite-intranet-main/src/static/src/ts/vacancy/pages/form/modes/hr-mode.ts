// Const;
import {
  VACANCY_HELPERS_HIDDEN,
  Mode,
  ERROR_PAGE,
  VacancyStatus,
  VacancyPage,
} from "../../../const";
import { validateForm } from "../validate/validate-form";

// Helpers;
import { redirectTo } from "../../../helpers/redirect-to";
import { setDataForm } from "../../../helpers/form/set-data-form";
import { getAuth } from "../../../helpers/get-auth";
// Types
import type { TYPE_BALLONS } from "../../../types/ballons";
import type { TYPE_REQUEST } from "../../../types/request";
import type { TYPE_AUTH_DATA } from "../../../types/auth-data";

export const hrMode = async (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[],
  data: TYPE_REQUEST
) => {
  const { company } = (await getAuth()) as TYPE_AUTH_DATA;

  // Elements;
  const headerElement = form.querySelector(`.vacancy-form-header`);
  const headerTopElement = form.querySelector(
    `.vacancy-form-header__actions--top-all`
  );
  const headerParticipants = form.querySelector(
    `.vacancy-form-header-participants`
  );
  const titleElement = form.querySelector(`.vacancy-form-main__title`);
  const headerModeView = form.querySelector(
    `.vacancy-form-header__actions--bottom-mode-view`
  );
  const headerModeHr = form.querySelector(
    `.vacancy-form-header__actions--bottom-mode-hr`
  );
  const defaultActionsElement = form.querySelector(
    `.vacancy-form-footer__actions--mode-default`
  );
  const hrActionsElement = form.querySelector(
    `.vacancy-form-footer__actions--mode-hr`
  );
  const middleActionsAll = form.querySelector(
    `.vacancy-form-header__actions--middle-all`
  );
  // Containers;
  const idContainer = form.querySelector(
    `.vacancy-form-header-request__number`
  ) as HTMLElement;

  // Modals;
  const succeessModal = document.querySelector(
    `.vacancy-modal-form-success-container`
  );

  // Buttons;
  const returnToRequestButton = form.querySelector(
    `.vacancy-form-button--return-to-request`
  );
  const previewButton = form.querySelector(
    `.vacancy-form-button--preview-vacancy`
  );
  const postVacancy = form.querySelector(
    `.vacancy-form-button--hr-post-vacancy`
  );
  const saveToDraftButton = form.querySelector(
    `.vacancy-form-button--hr-post-save-to-draft`
  );

  idContainer.textContent = `${data.id}`;

  // Show/hide elements;
  defaultActionsElement.classList.add(VACANCY_HELPERS_HIDDEN);
  hrActionsElement.classList.remove(VACANCY_HELPERS_HIDDEN);
  headerElement.classList.remove(VACANCY_HELPERS_HIDDEN);
  headerModeView.classList.add(VACANCY_HELPERS_HIDDEN);
  headerModeHr.classList.remove(VACANCY_HELPERS_HIDDEN);
  titleElement.classList.add(VACANCY_HELPERS_HIDDEN);
  headerTopElement.classList.add(VACANCY_HELPERS_HIDDEN);
  headerParticipants.classList.add(VACANCY_HELPERS_HIDDEN);
  middleActionsAll.classList.add(VACANCY_HELPERS_HIDDEN);

  setDataForm(form, ballons, data);

  // Events;
  returnToRequestButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(
      `/service/vacancy/${VacancyPage.FORM}?mode=${Mode.VIEW}&id=${data.id}`
    );
  });

  previewButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(`/service/vacancy/${VacancyPage.PREVIEW}?id=${data.id}`);
  });

  postVacancy.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const errors: unknown[] = [];
    validateForm(errors);

    if (errors.length === 0) {
      console.log(`TODO: Сделать размещение вакансии`);
    } else {
      console.log(`Вакансия не была размещена; TODO: сделать модалку`);
    }
  });
};
