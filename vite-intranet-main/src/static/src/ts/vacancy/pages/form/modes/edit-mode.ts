// Const;
import { Mode, VACANCY_HELPERS_HIDDEN, VacancyPage } from "../../../const";

// Helpers;
import { redirectTo } from "../../../helpers/redirect-to";
import { enableForm } from "../../../helpers/form/enable-form";
import { clearContainer } from "../../../helpers/clear-container";
import { validateForm } from "../validate/validate-form";
import { getAuth } from "../../../helpers/get-auth";
import { setDataForm } from "../../../helpers/form/set-data-form";
import { compareForm } from "../../../helpers/form/compare-form";
import { getDataForm } from "../../../helpers/form/get-data-form";
// Types
import type { TYPE_BALLONS } from "../../../types/ballons";
import type { TYPE_REQUEST } from "../../../types/request";
import type { TYPE_AUTH_DATA } from "../../../types/auth-data";

export const editMode = async (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[],
  data: TYPE_REQUEST
) => {
  const { company } = (await getAuth()) as TYPE_AUTH_DATA;

  // Elements;
  const headerElement = form.querySelector(`.vacancy-form-header`);
  const headerParticipantElement = form.querySelector(
    `.vacancy-form-header-participants`
  );
  const formTitleElement = form.querySelector(`.vacancy-form-main__title`);
  const requestNumberElement = form.querySelector(
    `.vacancy-form-header-request__number`
  );
  const middleActionsAll = form.querySelector(
    `.vacancy-form-header__actions--middle-all`
  );

  // Containers;
  // Items containers;
  const additionalLocationContainer = form.querySelector(
    `.vacancy-form-items--location-additional`
  );
  const additionalParticipantsContainer = form.querySelector(
    `.vacancy-form-items--participants-additional`
  );

  // Actions
  const headerTopActionsAll = form.querySelector(
    `.vacancy-form-header__actions--top-all`
  );
  const headerActionsModeView = form.querySelector(
    `.vacancy-form-header__actions--bottom-mode-view`
  );
  const headerActionsModeEdit = form.querySelector(
    `.vacancy-form-header__actions--bottom-mode-edit`
  );

  const footerActionsModeDefault = form.querySelector(
    `.vacancy-form-footer__actions--mode-default`
  );
  const footerActionsModeEdit = form.querySelector(
    `.vacancy-form-footer__actions--mode-edit`
  );

  // Buttons;
  const exitFromEditorButton = form.querySelector(
    `.vacancy-form-button--exit-from-editor`
  );
  const saveAndCloseButton = form.querySelector(
    `.vacancy-form-button--save-and-close`
  );
  const cancelButton = form.querySelector(`.vacancy-form-button--cancel`);

  // Events;
  exitFromEditorButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(
      `/service/vacancy/${VacancyPage.FORM}?mode=${Mode.VIEW}&id=${data.id}`
    );
  });

  saveAndCloseButton.addEventListener(`click`, async (evt) => {
    evt.preventDefault();

    // const errors: unknown[] = [];
    // validateForm(errors);

    // if (errors.length === 0) {
    //   console.log(`TODO: Send Form`);
    // } else {
    //   console.log(`TODO: Show Error Modal, ${errors.length}`);
    // }

    console.log(data, Object.keys(data));

    const newData = await getDataForm(form, ballons, {
      id: data.id,
      date_archive: data.date_archive,
      date_publication: data.date_publication,
      id_request: data.id,
    });

    console.log(newData, Object.keys(newData));
  });

  cancelButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    [additionalLocationContainer, additionalParticipantsContainer].forEach(
      (container: HTMLElement) => clearContainer(container)
    );

    setDataForm(form, ballons, data);
  });

  // Hidded/Show elements;
  headerElement.classList.remove(VACANCY_HELPERS_HIDDEN);
  headerTopActionsAll.classList.add(VACANCY_HELPERS_HIDDEN);
  headerParticipantElement.classList.add(VACANCY_HELPERS_HIDDEN);
  formTitleElement.classList.add(VACANCY_HELPERS_HIDDEN);
  headerActionsModeView.classList.add(VACANCY_HELPERS_HIDDEN);
  headerActionsModeEdit.classList.remove(VACANCY_HELPERS_HIDDEN);
  footerActionsModeDefault.classList.add(VACANCY_HELPERS_HIDDEN);
  footerActionsModeEdit.classList.remove(VACANCY_HELPERS_HIDDEN);
  middleActionsAll.classList.add(VACANCY_HELPERS_HIDDEN);

  // Fill containtes;
  requestNumberElement.textContent = `${data.id}`;

  enableForm(form, ballons);
  setDataForm(form, ballons, data);
};

// TODO (maybe?):
// Собрать новые данные;
// сравнить со старыми данными;
// если, что то изменилось, то провалидировать данные,
// если нет, то показать модалку;

// |-> Логика модалки;
// если данные изменились, то отправить на ручку VacancyAPI.updateRequest(formData);
// если Отмена, то сбросить данные на initial data;
