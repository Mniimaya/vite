import { TYPE_REQUEST } from "../TYPES";
import { AdministratorAPI } from "../../js/API/administratorApi";
import { setArchive } from "./handlers-archive";
import { setCreate } from "./handlers-create";
import { setRequests } from "./handlers-requests";

import { TYPE_AUTH } from "../types/common";

export let creator001 = false;

export const getRoles = async (auth: TYPE_AUTH) => {
  const formData = new FormData();
  formData.append("administrator_service", "1");
  formData.append("administrator_samaccountname", auth.samaccountname);
  return await AdministratorAPI.getRolesByService(
    auth.samaccountname,
    1,
    (data: TYPE_REQUEST[]) => {
      const admin = data.some((role) => role.administrator_role > 1);
      if (admin) {
        creator001 = true;
        setCreate();
        setRequests();
        setArchive();
      } else {
        creator001 = false;
      }
    }
  );
};
