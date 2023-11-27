// helpers;
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { getAuth } from "../../helpers/get-auth";
// types
import { TYPE_AUTH_DATA } from "../../types/auth-data";
import { redirectTo } from "../../helpers/redirect-to";

const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;

const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;

const administratorRole = await getAdministratorRole(samaccountname);

initialTabs(tabContainer, ``, administratorRole);

