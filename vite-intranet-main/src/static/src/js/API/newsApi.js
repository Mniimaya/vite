import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";
import { loaderFalse } from "../../ts/util";

class NewsApi {
  // Получить новости
  async getNews(data, cb, type = undefined) {
    await fetch(
      `/api/news/filter?status=${data.status}&limit=${data.limit}&offset=${data.offset}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => cb(data, type))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Получение лайков по учетной записи
  async getLikes(cb, samaccountname) {
    fetch(`/api/news/likes/samaccountname/${samaccountname}`, {
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

  // Получение новости по id
  async getLink(id, cb) {
    fetch(`/api/news/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        console.log(err);
      });
  }

  // Добавление новости
  async postNews(form, data, arrayFiles, cb) {
    fetch(`/api/news`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        cb(form, data, arrayFiles);
        showMessage("Новость создана и отправлена на проверку");
      })
      .catch(() => {
        showMessage("Сервер не отвечает, попробуйте позже");
      });
  }

  // Добавление файла к новой новости
  async postNewsFile(form, data, id) {
    fetch(`/api/news/${id}/upload`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => form.reset())
      .catch(() => {
        showMessage("Сервер не отвечает, попробуйте позже");
      });
  }

  // Изменение статуса новости (модерация) и  изменение самой новости
  async updateModerateNews(id, form, data, arrayFiles, cb) {
    fetch(`/api/news/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => cb(form, data, arrayFiles, id))
      .catch(() => {
        showMessage("Сервер не отвечает, попробуйте позже");
      })
      .finally(() => {});
  }

  // Изменение статуса новости
  async updateStatusNews(data, id, cb) {
    fetch(`/api/news/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => cb())
      .catch(() => {
        showMessage("Сервер не отвечает, попробуйте позже");
      });
  }

  async postViews(id) {
    fetch(`/api/news/${id}/views`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          showMessage("Сервер не отвечает, попробуйте позже");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Отправка количесва лайков
  async postLikes(data, id, cb) {
    fetch(`/api/news/${id}/likes`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление новости
  async deleteNew(id) {
    fetch(`/api/news/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          showMessage("Сервер не отвечает, попробуйте позже");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление фотографии в новости
  async deletePhotoNew(id, idImage) {
    fetch(`/api/news/${id}/image/${idImage}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          showMessage("Сервер не отвечает, попробуйте позже");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const NewsAPI = new NewsApi();
