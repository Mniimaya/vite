// Helpers;
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { getAuth } from "../../helpers/get-auth";
import { showLoader, hiddenLoader } from "../../../util";
import { VacancyAPI } from "../../../../js/API/vacancyApi.js";
import { VacancyCard, VACANCY_HELPERS_HIDDEN } from "../../const";
import { createCard } from "../../helpers/creators/cards/create-card";

// Types;
import { TYPE_REQUEST } from "../../types/request";
import { TYPE_AUTH_DATA } from "../../types/auth-data";

// Data;
const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;
const administratorRole = await getAdministratorRole(samaccountname);

// Containers;
const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;
const vacancyListContainer = document.querySelector(
  `.vacancy-list--main`
) as HTMLElement;
const emptyContainer = document.querySelector(`.vacancy-empty-container`);

initialTabs(tabContainer, null, administratorRole);

showLoader();

VacancyAPI.getAllVacancy()
  .then((data: TYPE_REQUEST[]) => {
    if (data.length === 0) {
      emptyContainer.classList.remove(VACANCY_HELPERS_HIDDEN);
      return;
    }

    data
      .sort((a, b) => Number(a.id) - Number(b.id))
      .forEach((item) => {
        const card = createCard(VacancyCard.VACANCY, item, administratorRole);
        const liElement = document.createElement(`li`);

        liElement.className = `vacancy-list__item`;
        liElement.append(card);

        vacancyListContainer.append(liElement);
      });
  })

  .finally(hiddenLoader);
