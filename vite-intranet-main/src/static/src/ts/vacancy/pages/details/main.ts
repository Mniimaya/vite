// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi.js";

// Helpers;
import { DetailsMode, ERROR_PAGE } from "../../const";
import { getSearchParams } from "../../helpers/get-search-params";
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { redirectTo } from "../../helpers/redirect-to";
// import { setDataDetailsVacancy } from "../../helpers/set-data-details-vacancy";
import { showLoader, hiddenLoader } from "../../../util";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { setDataDetails } from "../../helpers/details/set-data-details";

const { samaccountname: myAccount } = JSON.parse(
  sessionStorage.getItem(`auth`)
);

const [id] = getSearchParams(window.location.search, [`id`]);

const parentElement = document.querySelector(`.vacancy-details`) as HTMLElement;
const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;
const administratorRole = await getAdministratorRole(myAccount);

initialTabs(tabContainer, null, administratorRole);

if (id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) =>
      // setDataDetailsVacancy(parentElement, data, DetailsMode.VACANCY)
      setDataDetails(parentElement, data)
    )
    .finally(hiddenLoader);
} else {
  redirectTo(ERROR_PAGE);
}
