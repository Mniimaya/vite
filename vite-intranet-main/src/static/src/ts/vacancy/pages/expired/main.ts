// Helpers;
import { TAB_NAME, VacancyStatus, VACANCY_HELPERS_HIDDEN } from "../../const";
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAuth } from "../../helpers/get-auth";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { showLoader, hiddenLoader } from "../../../util";
import { createCard } from "../../helpers/creators/cards/create-card";
import { VacancyCard } from "../../const";

// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi";

// Types;
import type { TYPE_AUTH_DATA } from "../../types/auth-data";
import type { TYPE_REQUEST } from "../../types/request";

const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;

const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;

const administratorRole = await getAdministratorRole(samaccountname);

const vacancyListContainer = document.querySelector(
  `.vacancy-list--expired`
) as HTMLElement;
const emptyContainer = document.querySelector(`.vacancy-empty-container`);
const errorContainer = document.querySelector(`.vacancy-error-container`);

initialTabs(tabContainer, TAB_NAME.EXPIRED, administratorRole);

showLoader();

VacancyAPI.getExpired({ samaccountname, status: VacancyStatus.EXPIRED })
  .then((data: TYPE_REQUEST[]) => {
    if (data.length === 0) {
      vacancyListContainer.classList.add(VACANCY_HELPERS_HIDDEN);
      errorContainer.classList.add(VACANCY_HELPERS_HIDDEN);
      emptyContainer.classList.remove(VACANCY_HELPERS_HIDDEN);
      return;
    }

    vacancyListContainer.classList.remove(VACANCY_HELPERS_HIDDEN);
    errorContainer.classList.add(VACANCY_HELPERS_HIDDEN);
    emptyContainer.classList.add(VACANCY_HELPERS_HIDDEN);

    data
      .sort((a, b) => Number(a.id) - Number(b.id))
      .forEach((item) => {
        const card = createCard(VacancyCard.EXPIRED, item, administratorRole);
        const liElement = document.createElement(`li`);

        liElement.className = `vacancy-list__item`;
        liElement.append(card);

        vacancyListContainer.append(liElement);
      });
  })
  .finally(hiddenLoader);
