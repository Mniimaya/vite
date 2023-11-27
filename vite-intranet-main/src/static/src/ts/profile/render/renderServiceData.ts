import { TYPE_PROFILE_SRVICE } from "../../TYPES";

// Рендер служебных данных
export const renderServiceData = (serviceData: TYPE_PROFILE_SRVICE) => {
  const serviceBlock: HTMLParagraphElement =
    document.querySelector("#serviceData");
  const serviceListDepartaments = document.querySelector(
    ".profile__departaments-name"
  );
  const departments: string = serviceData.departments;
  if (departments.includes("Departments:")) {
    let departamentsArray = departments.split("*");
    departamentsArray = departamentsArray.filter(
      (item) => item !== "Departments:" && item !== "-"
    );

    if (departamentsArray.length) {
      const departamentsString = departamentsArray.join(", ");
      serviceListDepartaments.textContent = departamentsString;
      serviceListDepartaments.parentElement.style.display = "block";
    } else {
      serviceListDepartaments.parentElement.style.display = "none";
    }
  } else {
    serviceListDepartaments.parentElement.style.display = "none";
  }

  serviceBlock.querySelector("#serviceData-cn").textContent = serviceData.cn;
  serviceBlock.querySelector("#serviceData-phone").textContent =
    serviceData.telephonenumber;
  serviceBlock.querySelector("#serviceData-mail").textContent =
    serviceData.mail;
  serviceBlock.querySelector("#serviceData-company").textContent =
    serviceData.company;
  serviceBlock.querySelector("#serviceData-title").textContent =
    serviceData.title;
  serviceBlock.querySelector("#serviceData-department").textContent =
    serviceData.department;
  serviceBlock.querySelector("#serviceData-manager").textContent =
    serviceData.manager;
};
