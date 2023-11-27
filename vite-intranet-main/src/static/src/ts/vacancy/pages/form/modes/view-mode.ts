// Const;
import {
  VACANCY_HELPERS_HIDDEN,
  Mode,
  VacancyPage,
  VACANCY_ADMINISTRATOR_ROLE,
} from "../../../const";

// Helpers;
import { redirectTo } from "../../../helpers/redirect-to";
import { setDataForm } from "../../../helpers/form/set-data-form";
import { disableForm } from "../../../helpers/form/disable-form";
import { getActiveParticipants } from "../../../helpers/form/get-active-participants";
import { createPostVacancyButton } from "../creators/create-post-vacancy-button";

// Creators;
import { createHeaderParticipants } from "../creators/create-header-participants";
import { createEditRequestButton } from "../creators/create-edit-request-button";

// Types
import type { TYPE_BALLONS } from "../../../types/ballons";
import type { TYPE_REQUEST } from "../../../types/request";

export const viewMode = async (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[],
  data: TYPE_REQUEST,
  administratorRole: number
) => {
  // Elements;
  const headerElement = form.querySelector(`.vacancy-form-header`);
  const requestNumberElement = form.querySelector(
    `.vacancy-form-header-request__number`
  );
  const participatnsHeaderContainer = form.querySelector(
    `.vacancy-form-header-participants__list`
  ) as HTMLElement;
  const participantsRowElement = form.querySelector(
    `.vacancy-form-main-row--participants`
  );
  const formTitleElement = form.querySelector(`.vacancy-form-main__title`);

  const returnBackButton = form.querySelector(
    `.vacancy-form-button--return-back`
  );
  // Active Participants;
  const participants = getActiveParticipants(data.participants);

  // Containers;
  const middleActionsAll = form.querySelector(
    `.vacancy-form-header__actions--middle-all`
  );
  const actionsModeDefault = form.querySelector(
    `.vacancy-form-footer__actions--mode-default`
  );
  const actionsModeView = form.querySelector(
    `.vacancy-form-header__actions--bottom-mode-view`
  );

  // Events;
  returnBackButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(`/service/vacancy/${VacancyPage.REQUESTS}`);
  });

  // Hidded/Show elements;
  headerElement.classList.remove(VACANCY_HELPERS_HIDDEN);

  participantsRowElement.classList.add(VACANCY_HELPERS_HIDDEN);
  actionsModeDefault.classList.add(VACANCY_HELPERS_HIDDEN);
  formTitleElement.classList.add(VACANCY_HELPERS_HIDDEN);

  // Fill containtes;
  requestNumberElement.textContent = `${data.id}` || `не указан`;
  createHeaderParticipants(participatnsHeaderContainer, participants);

  setDataForm(form, ballons, data);
  disableForm(form, ballons);

  // Enable buttons;
  returnBackButton.removeAttribute(`disabled`);

  if (
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `HR` ||
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `SUPER_USER`
  ) {
    const postVacancyButton = createPostVacancyButton();
    const editRequestButton = createEditRequestButton();

    postVacancyButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      redirectTo(
        `/service/vacancy/0005-form.html?mode=${Mode.HR}&id=${data.id}`
      );
    });

    editRequestButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      redirectTo(
        `/service/vacancy/0005-form.html?mode=${Mode.EDIT}&id=${data.id}`
      );
    });

    middleActionsAll.append(postVacancyButton);
    actionsModeView.append(editRequestButton);
  }
};
