import { AlertAPI } from "../js/API/alertApi";
import { TYPE_ALERT } from "./TYPES";

setTimeout(() => {
  if (JSON.parse(sessionStorage.getItem("auth")) != null) {
    const data = JSON.parse(sessionStorage.getItem("auth"));
    const formData = {
      account_number: data.samaccountname,
    };

    const renderAlerts = (data: TYPE_ALERT[]) => {
      const container = document.querySelector(".alert__list");
      data.forEach((alert) => {
        const template = document
          .querySelector("template")
          .content.querySelector(".alert__item");
        const newItem = template.cloneNode(true) as HTMLElement;
        newItem.querySelector(".alert__service").textContent =
          alert.alert_service;
        newItem.querySelector(".alert__theme").textContent = alert.alert_theme;
        newItem.querySelector(".alert__body").innerHTML = alert.alert_body;
        const dateJs = new Date(`${alert.alert_date} GMT`);
        newItem.querySelector(".alert__date").innerHTML =
          dateJs.toLocaleDateString();
        newItem.querySelector(".alert__time").innerHTML = dateJs
          .toLocaleTimeString("it-IT")
          .slice(0, -3);
        alert.alert_is_view == 0
          ? newItem.classList.add("alert__item--new")
          : "";
        container.appendChild(newItem);
      });
      // AlertAPI.postIsView(formData);
    };

    AlertAPI.getById(formData, renderAlerts);
  }
}, 300);
