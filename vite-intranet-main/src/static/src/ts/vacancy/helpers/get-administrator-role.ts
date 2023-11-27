// Helpers;
import { VACANCY_SERVICE_NUMBER } from "../const";
// Api;
import { AdministratorAPI } from "../../../js/API/administratorApi.js";

type TYPE_ADMINISTRATOR_RESPONSE = {
  administrator_role: number;
};

export const getAdministratorRole = async (accountNumber: string) => {
  let administratorRole;
  let maxAccessRight;

  const formData = new FormData();
  formData.append(`administrator_samaccountname`, accountNumber);
  formData.append(`administrator_service`, `${VACANCY_SERVICE_NUMBER}`);

  await AdministratorAPI.getRolesByService(
    accountNumber,
    VACANCY_SERVICE_NUMBER,
    (data: TYPE_ADMINISTRATOR_RESPONSE[]) => {
      if (data.length === 0) {
        administratorRole = 2;
        return administratorRole;
      }

      maxAccessRight = data.sort(
        (a, b) => b.administrator_role - a.administrator_role
      )[0];

      administratorRole = maxAccessRight.administrator_role;
      return administratorRole;
    }
  );

  return administratorRole;
};
