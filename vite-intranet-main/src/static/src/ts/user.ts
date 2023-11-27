import { AuthAPI } from "../js/API/authApi.js";
import { isDevelopment } from "../main.js";
import { NotificationAPI } from "../js/API/notificationApi.js";
import { AlertAPI } from "../js/API/alertApi.js";
import { StatisticAPI } from "../js/API/statisticApi.js";
import { TYPE_ALERT, TYPE_NOTIFICATION } from "./TYPES";

import { TYPE_AUTH } from "./types/common";

if (isDevelopment) {
  console.log("develop");
  // sessionStorage.setItem(
  //   "auth",
  //   JSON.stringify({
  //     idusers: 2666,
  //     cn: "Кан Евгений Сергеевич",
  //     title: "Консультант",
  //     telephonenumber: "8(97)1711",
  //     whenchanged: "20230816053239.0Z",
  //     department: "Отдел администрирования технологической инфраструктуры",
  //     company: "ФФКУ ''Налог-Сервис'' ФНС России в г. Москве",
  //     samaccountname: "n7700-01-144",
  //     mail: "EKan@r77.service-nalog.ru",
  //     manager: "Романьков Артем Александрович",
  //     objectsid: "077000010144",
  //     jpegphoto: "/photos/n7700-01-144.jpg",
  //     sono: "n7700",
  //     rang: "0",
  //     givenname: "Евгений Сергеевич",
  //     sn: "Кан",
  //     departments: "Departments:",
  //   })
  // );
} else {
  StatisticAPI.postStatistic();
  console.log("production");
}

//notification and alert API
const handlerNotice = () => {
  const showNotice = (
    data: [] | TYPE_ALERT[] | TYPE_NOTIFICATION[],
    string: string
  ) => {
    data.length > 0
      ? document
          .querySelector(`.uprow__link--${string}`)
          .classList.add(`uprow__link--true`)
      : "";
  };
  const data = JSON.parse(sessionStorage.getItem("auth"));
  const formData: {} = {
    account_number: data.samaccountname,
  };
  AlertAPI.getNew(formData, (data: [] | TYPE_ALERT[]) =>
    showNotice(data, "alert")
  );
  NotificationAPI.getNew(formData, (data: [] | TYPE_NOTIFICATION[]) =>
    showNotice(data, "notification")
  );
};

if (sessionStorage.getItem("auth") != null) {
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  document.querySelector(".uprow__auth").textContent = auth.cn;
  (document.querySelector(".uprow__link--auth") as HTMLLinkElement).href =
    "/section/cabinet.html";
  handlerNotice();
} else {
  document.querySelector<HTMLLinkElement>(".uprow__link--notification").href =
    "";
  document.querySelector<HTMLLinkElement>(".uprow__link--alert").href = "";
  const formData = new FormData();
  formData.append("auth", "verification");
  const changeName = (data: TYPE_AUTH[]) => {
    if (data.length > 0) {
      document.querySelector(".uprow__auth").textContent = data[0].cn;
      sessionStorage.setItem("auth", JSON.stringify(data[0]));
      (document.querySelector(".uprow__link--auth") as HTMLLinkElement).href =
        "/section/cabinet.html";
      handlerNotice();
    } else {
      document.querySelector(".uprow__auth").textContent = "Гость";
    }
  };
  AuthAPI.postAuth(formData, changeName);
}
