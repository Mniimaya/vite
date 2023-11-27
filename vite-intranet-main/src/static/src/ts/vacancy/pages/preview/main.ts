import { VacancyAPI } from "../../../../js/API/vacancyApi.js";
import { ERROR_PAGE } from "../../const";
import { getSearchParams } from "../../helpers/get-search-params";
import { redirectTo } from "../../helpers/redirect-to";
import { showLoader, hiddenLoader } from "../../../util";
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { getAuth } from "../../helpers/get-auth";
// types;
import { TYPE_AUTH_DATA } from "../../types/auth-data";

const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;

const [id] = getSearchParams(window.location.search, [`id`]);

const parentElement = document.querySelector(
  `.vacancy-details-container`
) as HTMLElement;
const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;

const administratorRole = await getAdministratorRole(samaccountname);

initialTabs(tabContainer, null, administratorRole);

if (id) {
  showLoader();

  VacancyAPI.getVacancyById(id)
    .then((data) => {
      // setDataDetails(parentElement, data[0]);
    })
    .finally(hiddenLoader);
} else {
  redirectTo(ERROR_PAGE);
}
