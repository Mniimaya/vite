import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";
class AlertApi {
  async getById(data, cb) {
    await fetch(`/api/alert/samaccountname/${data.account_number}`, {
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
  async getNew(data, cb) {
    await fetch(`/api/alert/samaccountname/${data.account_number}/new`, {
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

  async postNew(data) {
    await fetch(`/api/alert`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }).catch((err) => {
      showMessage("Сервер не отвечает");
      console.log(err);
    });
  }
  // async postIsView(data) {
  //   await fetch(`/api/alert`, {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     credentials: "include",
  //   }).catch((err) => {
  //     showMessage("Сервер не отвечает");
  //     console.log(err);
  //   });
  // }
}

export const AlertAPI = new AlertApi();
