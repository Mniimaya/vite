import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";
class AdministratorApi {
  async postRequest(formData, cb) {
    await fetch(`/api/administrator`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => showMessage('Данные успешно отправлены'))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getRoles(samaccountname, cb) {
    await fetch(`/api/administrator/${samaccountname}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getRolesByService(samaccountname,number, cb) {
    return await fetch(
      `/api/administrator/${samaccountname}/service/${number}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getMyRequests(samaccountname, cb) {
    await fetch(`/api/administrator/${samaccountname}/status/0`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getAllRequests(samaccountname, filters, cb) {
    await fetch(`/api/administrator/${samaccountname}/search?filter_status=${filters}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async postStatusApprove(formData, id) {
    return await fetch(`/api/administrator/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    }).catch((err) => {
      showMessage("Сервер не отвечает");
      console.log(err);
    });
  }

  async postStatusDecline(formData, id) {
    return await fetch(`/api/administrator/${id}`, {
      method: "DELETE",
      body: formData,
      credentials: "include",
    }).catch((err) => {
      showMessage("Сервер не отвечает");
      console.log(err);
    });
  }
}

export const AdministratorAPI = new AdministratorApi();
