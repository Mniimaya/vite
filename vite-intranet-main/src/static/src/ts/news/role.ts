import { TYPE_REQUEST } from "../TYPES";
import { AdministratorAPI } from "../../js/API/administratorApi";
import { handlerCreator } from "./handlers-create";
import { handlerEditor } from "./handlers-edit";
import { handlerRemoved } from "./handler-removed";
import { handlerRejected } from "./handlerRejected";

import { TYPE_AUTH } from "../types/common";

export let creator002 = false;
export let editor002 = false;

export const getRoles = async (auth: TYPE_AUTH) => {
  const formData = new FormData();
  formData.append("administrator_service", "2");
  formData.append("administrator_samaccountname", auth.samaccountname);
  return await AdministratorAPI.getRolesByService(
    auth.samaccountname,
    2,
    (data: TYPE_REQUEST[]) => {
      const creator = data.some((role) => role.administrator_role === 2);
      const editor = data.some((role) => role.administrator_role >= 3);

      if (creator && !editor) {
        creator002 = true;
        handlerCreator(auth);
      } else {
        creator002 = false;
      }
      if (editor) {
        editor002 = true;
        creator002 = true;
        handlerCreator(auth);
        handlerEditor(auth);
        handlerRejected();
        handlerRemoved();
      } else {
        editor002 = false;
      }
    }
  );
};
