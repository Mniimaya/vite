import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class PhoneApi {
  async postUsers(formData, cb) {
    await fetch(`${apiPath}/connect/phone/api/users.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postCompany(formData, cb) {
    await fetch(`${apiPath}/connect/phone/api/get-company.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postDepartment(formData, cb) {
    await fetch(`${apiPath}/connect/phone/api/get-department.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postManager(formData, cb) {
    await fetch(`${apiPath}/connect/phone/api/get-manager.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export const PhoneAPI = new PhoneApi();
