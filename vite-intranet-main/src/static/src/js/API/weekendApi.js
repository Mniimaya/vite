import { showMessage, loaderFalse } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class WeekendApi {
  //nest
  async postDel(cb, id, evt) {
    await fetch(`/api/weekend/${id}/status/4`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Данные успешно отправлены");
          cb(evt);
        } else {
          showMessage("Сервер не отвечает");
        }
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  //nest
  async postTrip(data) {
    await fetch(`/api/weekend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Новая путевка успешно создана");
        } else {
          showMessage("Сервер не отвечает");
        }
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  //nest
  async patch(data, id, cb) {
    fetch(`/api/weekend/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Данные успешно отправлены");
        }
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
    // .finally(() => setTimeout(() => (cb ? cb() : location.reload()), 500));
  }

  async decline(data, id) {
    fetch(`/api/weekend/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Данные успешно отправлены");
        }
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      })
      .finally(() => setTimeout(() => location.reload(), 500));
  }

  async get(render, events, status) {
    fetch(`/api/weekend/filter?status=${status}&limit=20&offset=0`, {
      method: "Get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        render(data.rows);
      })
      .then(() => events())
      .then(() => loaderFalse())
      .catch((err) => {
        showMessage("Проблемы на сервере. Данные не будут отправлены");
        console.log(err);
      });
  }
}

export const WeekendAPI = new WeekendApi();
