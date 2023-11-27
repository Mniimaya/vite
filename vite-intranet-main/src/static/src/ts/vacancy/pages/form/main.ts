// Initial;
import { initial } from "../../helpers/initial/initial";

// Modes;
import { defaultMode } from "./modes/default-mode";
import { viewMode } from "./modes/view-mode";
import { editMode } from "./modes/edit-mode";
import { hrMode } from "./modes/hr-mode";
import { draftMode } from "./modes/draft-mode";
import { archiveMode } from "./modes/archive-mode";

// Creators;
import { addLocation } from "../../helpers/form/add-location";
import { addParticipant } from "../../helpers/form/add-participant";

// Helpers;
import { getSearchParams } from "../../helpers/get-search-params";
import { redirectTo } from "../../helpers/redirect-to";
import { isAccess } from "../../helpers/is-access";
import { getAuth } from "../../helpers/get-auth";

// Editor (js);
import { createBalloonEditor } from "./editor/create-balloon-editor.js";

// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi.js";

// Const;
import {
  Mode,
  WORK_PAGE,
  ERROR_PAGE,
  VACANCY_ADMINISTRATOR_ROLE,
} from "../../const";
import { showLoader, hiddenLoader } from "../../../util";
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAdministratorRole } from "../../helpers/get-administrator-role";

// Types;
import type { TYPE_BALLONS } from "../../types/ballons";
import type { TYPE_AUTH_DATA } from "../../types/auth-data";

const form = document.querySelector(`.vacancy-form`) as HTMLFormElement;
const textareas = form.querySelectorAll(`.vacancy-form-textarea`);
const ballons = Array.from(textareas).map((textarea) =>
  createBalloonEditor(textarea)
) as TYPE_BALLONS[];

// Containers;
const locationAdditionalContainer = form.querySelector(
  `.vacancy-form-items--location-additional`
) as HTMLElement;
const participantAdditionalContainer = form.querySelector(
  `.vacancy-form-items--participants-additional`
) as HTMLElement;
const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;

// Buttons;
const addLocationButton = form.querySelector(
  `.vacancy-form-button--add-location`
);
const addParticipants = form.querySelector(
  `.vacancy-form-button--add-participant`
);

const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;
const administratorRole = (await getAdministratorRole(
  samaccountname
)) as number;

// Events;
addLocationButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  addLocation(locationAdditionalContainer);
});

addParticipants.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  addParticipant(participantAdditionalContainer);
});

initial(form, ballons);
initialTabs(tabContainer, null, administratorRole);

const [mode, id] = getSearchParams(window.location.search, [`mode`, `id`]);

if (!mode || !id) {
  defaultMode(form, ballons);
} else if (mode === Mode.VIEW && id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      if (!data) {
        return redirectTo(ERROR_PAGE);
      }

      const isAccessPage = isAccess(
        samaccountname,
        data[0].participants,
        administratorRole
      );

      isAccessPage
        ? viewMode(form, ballons, data[0], administratorRole)
        : redirectTo(WORK_PAGE);
    })

    .finally(hiddenLoader);
} else if (mode === Mode.EDIT && id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      if (!data) {
        return redirectTo(ERROR_PAGE);
      }

      const isAccessPage =
        isAccess(samaccountname, data.participants, administratorRole) &&
        VACANCY_ADMINISTRATOR_ROLE[administratorRole] !== `USER`;

      isAccessPage ? editMode(form, ballons, data) : redirectTo(WORK_PAGE);
    })
    .finally(hiddenLoader);
} else if (mode === Mode.HR && id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      if (!data) {
        return redirectTo(ERROR_PAGE);
      }

      const isAccessPage =
        isAccess(samaccountname, data.participants, administratorRole) &&
        VACANCY_ADMINISTRATOR_ROLE[administratorRole] !== `USER`;

      isAccessPage ? hrMode(form, ballons, data) : redirectTo(WORK_PAGE);
    })
    .finally(hiddenLoader);
} else if (mode === Mode.DRAFT && id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      if (!data) {
        return redirectTo(ERROR_PAGE);
      }

      const isAccessPage = isAccess(
        samaccountname,
        data.participants,
        administratorRole
      );

      isAccessPage ? draftMode(form, ballons, data) : redirectTo(WORK_PAGE);
    })
    .finally(hiddenLoader);
} else if (mode === Mode.ARCHIVE && id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      if (!data) {
        return redirectTo(ERROR_PAGE);
      }

      const isAccessPage = isAccess(
        samaccountname,
        data.participants,
        administratorRole
      );

      isAccessPage ? archiveMode(form, ballons, data) : redirectTo(WORK_PAGE);
    })
    .finally(hiddenLoader);
}
