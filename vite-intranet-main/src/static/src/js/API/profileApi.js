import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class ProfileApi {
  // Получение id пользователя
  async getIdProfile(profileId, cb) {
    await fetch(`/api/profiles/${profileId}`, {
      headers: { "Content-Type": "application/json" },
      method: `GET`,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data[0].id))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Создание аватара
  async postCreateAvatar(data, profileId, cb) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/avatars`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb();
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение аватара
  async updateAvatar(data, profileId, id, cb) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/avatars/${id}`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb();
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление аватара
  async deleteAvatar(profileId, id, cb) {
    await fetch(`/api/profiles/${profileId}/avatars/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb();
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Создание проекта
  async postCreateProject(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/projects`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение проекта
  async updateProject(data, profileId) {
    await fetch(`/api/profiles/${profileId}/projects/${data.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление проекта
  async deleteProject(data, profileId, id) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/projects/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Создание документа
  async postCreateDocument(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/documents`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение видимости блока документа
  async updateStatusVisibleDocuments(data, profileId, cb) {
    await fetch(`/api/profiles/${profileId}/documents`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb(profileId);
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Изменение документа
  async updateDocument(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/documents/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление документа
  async deleteDocument(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/documents/${id}`, {
      method: `DELETE`,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Создание образования
  async postCreateEducations(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/educations`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение образования
  async updateEducation(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/educations/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос update");
  }

  // Удаление образования
  async deleteEducation(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/educations/${id}`, {
      method: `DELETE`,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение видимости блока образования
  async updateStatusVisibleEducation(data, profileId, cb) {
    await fetch(`/api/profiles/${profileId}/educations`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb(profileId);
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Создание работы
  async postCreateWork(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/works`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение работы
  async updateWork(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/works/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление работы
  async deleteWork(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/works/${id}`, {
      method: `DELETE`,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение видимости блока работы
  async updateStatusVisibleWorks(data, profileId, cb) {
    await fetch(`/api/profiles/${profileId}/works`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        cb(profileId);
        response.json();
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Создание достижения
  async postCreateAchievement(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/achievements`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение достижения
  async updateAchievement(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/achievements/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление достижения
  async deleteAchievement(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/achievements/${id}`, {
      method: `DELETE`,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение видимости блока достижений
  async updateStatusVisibleAchievements(data, profileId, cb) {
    await fetch(`/api/profiles/${profileId}/achievements`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb(profileId);
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Создание транспорта
  async postCreateTransport(data, profileId) {
    delete data.id;
    await fetch(`/api/profiles/${profileId}/transports`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение транспорта
  async updateTransport(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/transports/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Удаление транспорта
  async deleteTransport(data, profileId, id) {
    await fetch(`/api/profiles/${profileId}/transports/${id}`, {
      method: `DELETE`,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });

    console.log("запрос");
  }

  // Изменение видимости блока транспорта
  async updateStatusVisibleTransports(data, profileId, cb) {
    await fetch(`/api/profiles/${profileId}/transports`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        response.json();
        cb(profileId);
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  // Обновление пользователя
  async updateProfile(data, profileId, cb = undefined) {
    await fetch(`/api/profiles/${profileId}`, {
      headers: { "Content-Type": "application/json" },
      method: `PATCH`,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        if (!!cb) {
          cb(profileId);
        }
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export let ProfileAPI = new ProfileApi();
