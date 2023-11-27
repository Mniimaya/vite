import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class VacancyApi {
  // PHP API;

  // Get users from AD;
  async getUsers(formData) {
    return await fetch(`${apiPath}/connect/phone/api/users.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  // Get position from AD:
  async getPosition(formData) {
    return await fetch(`${apiPath}/connect/vacancy/api/getTitles.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  // Get departments from AD;
  async getDepartment(formData) {
    return await fetch(`${apiPath}/connect/vacancy/api/getDepartments.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  //NEST API;
  async getAllVacancy() {
    return await fetch(`/api/vacancy`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getAllRequests({ samaccountname, status }) {
    return await fetch(
      `/api/vacancy/samaccountname/${samaccountname}/status/${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getMyRequest({ samaccountname, status }) {
    return await fetch(
      `/api/vacancy/samaccountname/${samaccountname}/status/${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getDrafts({ samaccountname, status }) {
    return await fetch(
      `/api/vacancy/samaccountname/${samaccountname}/status/${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getArchive({ samaccountname, status }) {
    return await fetch(
      `/api/vacancy/samaccountname/${samaccountname}/status/${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getExpired({ samaccountname, status }) {
    return await fetch(
      `/api/vacancy/samaccountname/${samaccountname}/status/${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getVacancyById(id) {
    return await fetch(`/api/vacancy/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postVacancy(data) {
    return await fetch(`/api/vacancy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postAddress(data) {
    return await fetch(`/api/vacancy/${data.id_request}/address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postParticipant(data) {
    return await fetch(`/api/vacancy/${data.id_request}/participant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postSchedule(data) {
    return await fetch(`/api/vacancy/${data.id_request}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async patchVacancy(id, data) {
    return await fetch(`/api/vacancy/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export const VacancyAPI = new VacancyApi();
