import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";
class NotificationApi {
  async getAll(cb) {
    await fetch(`${apiPath}/connect/notification/api/getMain.php`, {
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

  // Получение чатов
  async postId(samaccountname, cb) {
    return await fetch(`/api/notification/samaccountname/${samaccountname}`, {
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
  async postMessage(formData, cb, cb2) {
    await fetch(`${apiPath}/connect/notification/api/postMessage.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(() => cb())
      .then(() => cb2())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Получение сообщений
  async getMessages(chats_id, participant, cb) {
    await fetch(
      `/api/notification/${chats_id}/message/participant/${participant}`,
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

  // Создание чата
  async postChat(data, cb) {
    await fetch(`/api/notification`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => cb())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Добавление участников чата
  async postNewParticipants(data, chats_id, cb) {
    await fetch(`/api/notification/${chats_id}/participant`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Получение участников чата
  async getParticipants(chats_id, cb) {
    await fetch(`/api/notification/${chats_id}/participant`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Удаление участников чата
  async removeParticipant(chats_id, id, cb) {
    await fetch(`/api/notification/${chats_id}/participant/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async postExit(formData, cb) {
    await fetch(`${apiPath}/connect/notification/api/postExit.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => cb())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Удалить чат
  async removeChat(id, cb) {
    await fetch(`/api/notification/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => cb())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export const NotificationAPI = new NotificationApi();
