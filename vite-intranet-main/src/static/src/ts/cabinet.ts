import { apiPath } from "../main";

setTimeout(() => {
  if (sessionStorage.getItem("auth") != null) {
    const data = JSON.parse(sessionStorage.getItem("auth"));
    console.log(data);
    const user = document.querySelector(".cabinet__item--user");
    if (data.jpegphoto !== null) {
      const photo = user.querySelector(".cabinet__avatar") as HTMLImageElement;
      photo.src = `${apiPath}${data.jpegphoto}`;
    }
    user.querySelector(".cabinet__cn").textContent = data.cn;
    user.querySelector(".cabinet__title").textContent = data.title;
    user.querySelector(".cabinet__number").textContent = data.mobile
      ? data.mobile
      : "не указан";
    user.querySelector(".cabinet__work").textContent = data.telephonenumber;
    user.querySelector(".cabinet__mail").textContent = data.mail;
    user.querySelector(".cabinet__department").textContent = data.department;
    user.querySelector(".cabinet__company").textContent = data.company;
    user.querySelector(".cabinet__avatar");
  }
}, 300);
