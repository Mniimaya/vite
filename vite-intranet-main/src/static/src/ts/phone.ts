import { PhoneAPI } from "../js/API/phoneApi.js";
import { apiPath } from "../main.js";
import { TYPE_SEARCH } from "./TYPES";
import { showMessage } from "./util";

import { TYPE_AUTH } from "./types/common";

const form = document.querySelector(".phone__form");
const select = form.querySelector(".phone__select") as HTMLInputElement;
const search = form.querySelector(".phone__search") as HTMLInputElement;

const template = (
  document.querySelector(".template-phone") as HTMLTemplateElement
).content.querySelector(".phone__item");
const container = document.querySelector(".phone__result") as HTMLElement;

//рендер полученного списка
const renderData = (data: TYPE_AUTH[]) => {
  const excel = document.querySelector(".excel-btn");
  if (excel) {
    excel.remove();
  }
  let sortedData: TYPE_AUTH[];
  if (
    (document.querySelector(".phone__select") as HTMLInputElement).value !==
      "Все СОНО" &&
    (document.querySelector(".phone__select") as HTMLInputElement).value !== ""
  ) {
    sortedData = data.sort((a, b) => {
      if (+a.rang > +b.rang) {
        return -1;
      }
      if (+a.rang < +b.rang) {
        return 1;
      }
      if (a.cn < b.cn) {
        return -1;
      }
      if (a.cn > b.cn) {
        return 1;
      }
      return 0;
    });
  } else {
    sortedData = data.sort((a, b) => {
      if (a.cn < b.cn) {
        return -1;
      }
      if (a.cn > b.cn) {
        return 1;
      }
      return 0;
    });
  }
  if (data.length == 1) {
    container.style.minHeight = "490px";
  }
  document.body.style.cursor = "default";
  //очищаем перед отрисовкой нового
  const users = document.querySelectorAll(".phone__item");
  if (users.length > 0) {
    users.forEach((user) => user.remove());
  }
  if (sortedData.length == 0) {
    showMessage(`Ничего не найдено`);
  }
  if (
    (document.querySelector(".phone__search") as HTMLInputElement).value !==
      "" ||
    (document.querySelector(".phone__search") as HTMLInputElement).dataset
      .search !== ""
  ) {
    //логика работы с локал сторадж
    //заходим в локал сторадж
    const results = localStorage.getItem("phone_result");
    const dataLS = JSON.parse(results);
    //если там пусто создаем массив и туда записываем
    if (dataLS == null) {
      //если поск меньше 2 то записываем всех, если больше то записываем ключ поиска
      if (sortedData.length < 2) {
        localStorage.setItem("phone_result", JSON.stringify(sortedData));
      } else {
        const localArray = [];

        const searchData: TYPE_SEARCH = {};
        searchData.multiple = true;
        searchData.search = (
          document.querySelector(".phone__search") as HTMLInputElement
        ).dataset.search;
        if (
          (document.querySelector(".phone__search") as HTMLInputElement).dataset
            .company
        ) {
          searchData.company = sortedData[0].company;
        }
        searchData.sono = (
          document.querySelector(".phone__select") as HTMLInputElement
        ).dataset.sono;
        localArray.push(searchData);
        localStorage.setItem("phone_result", JSON.stringify(localArray));
      }
    } else {
      //записываем в локалстордж при не пустом локалсторадж
      if (sortedData.length < 2) {
        //функция поиска повторений, в some проверям совпадение и удаляем из локалсторадж совпадение
        const filteredData = dataLS.filter((item: TYPE_AUTH) => {
          const result = sortedData.some(
            (itemFromDB) => itemFromDB.idusers == item.idusers
          );
          return !result;
        });

        //записываем в отфильтрованный массив локалсторадж все результаты поиска
        sortedData.forEach((item) => filteredData.push(item));
        localStorage.setItem("phone_result", JSON.stringify(filteredData));
      } else {
        const searchData: TYPE_SEARCH = {};
        searchData.multiple = true;
        searchData.search = (
          document.querySelector(".phone__search") as HTMLInputElement
        ).dataset.search;
        if (
          (document.querySelector(".phone__search") as HTMLInputElement).dataset
            .company
        ) {
          searchData.company = sortedData[0].company;
        }
        searchData.search = (
          document.querySelector(".phone__search") as HTMLInputElement
        ).dataset.search;
        searchData.sono = (
          document.querySelector(".phone__select") as HTMLInputElement
        ).dataset.sono;
        const filteredData = dataLS.filter((item: TYPE_SEARCH) => {
          if (item.search) {
            return item.search !== searchData.search;
          }
          return true;
        });
        filteredData.push(searchData);
        localStorage.setItem("phone_result", JSON.stringify(filteredData));
        delete (document.querySelector(".phone__search") as HTMLInputElement)
          .dataset.company;
      }
    }
    //очищаю историю поиска
    const historyList = document.querySelectorAll(".history__item");
    for (let i = 0; i < historyList.length; i++) {
      historyList[i].remove();
    }
    const results2 = localStorage.getItem("phone_result");
    const storage = JSON.parse(results2);
    //отрисовываю в списке нахождения
    storage.reverse().forEach((item: TYPE_SEARCH) => {
      const container = document.querySelector(".history__list");

      //разделяем на сотрудников и мультивывод сотрудников
      if (item.multiple) {
        const template = (
          document.querySelector(
            ".template-history-notfound"
          ) as HTMLTemplateElement
        ).content.querySelector(".history__item");
        const newItem = template.cloneNode(true) as HTMLElement;
        if (item.company) {
          newItem.querySelector(".history__search").textContent = item.company;
          newItem.dataset.company = item.company;
        } else {
          newItem.querySelector(".history__search").textContent = item.search;
        }
        newItem.querySelector(".history__sono").textContent = item.sono;
        newItem.dataset.search = item.search;
        newItem.dataset.sono = item.sono;
        container.appendChild(newItem);
      } else {
        const template = (
          document.querySelector(".template-history") as HTMLTemplateElement
        ).content.querySelector(".history__item");
        const newItem = template.cloneNode(true) as HTMLElement;
        newItem.querySelector(".history__sn").textContent = item.sn;
        newItem.querySelector(".history__gn").textContent = item.givenname;
        newItem.querySelector(".history__telephonenumber").textContent =
          item.telephonenumber;
        newItem.dataset.search = item.samaccountname;
        newItem.dataset.sono = "Все СОНО";
        container.appendChild(newItem);
      }
    });
  }
  //сортируем по должности и по имени и отрисовываем в доме
  sortedData.forEach((item: TYPE_AUTH) => {
    const newItem = template.cloneNode(true) as HTMLElement;
    newItem.querySelector(".phone__sn").textContent = item.sn;
    newItem.querySelector(".phone__gn").textContent = item.givenname;
    newItem.querySelector(".phone__title").textContent = item.title;
    newItem.querySelector(".phone__mail").textContent = item.mail;
    newItem.querySelector(".phone__telephonenumber").textContent =
      item.telephonenumber;
    newItem.querySelector(".phone__company").textContent = item.company;
    newItem.querySelector(".phone__manager").textContent = item.manager;
    newItem.querySelector(".phone__department").textContent = item.department;
    newItem.querySelector(".phone__login").textContent = item.samaccountname;
    newItem
      .querySelector(".phone__copy--cn")
      .addEventListener("click", (evt) => {
        (evt.target as HTMLElement).classList.add("phone__copy--copied");
        setTimeout(() => {
          (evt.target as HTMLElement).classList.remove("phone__copy--copied");
        }, 1000);
        navigator.clipboard.writeText(`${item.sn} ${item.givenname}`);
      });
    newItem.querySelectorAll(".phone__copy--default").forEach((item) => {
      item.addEventListener("click", (evt) => {
        item.classList.add("phone__copy--copied");
        setTimeout(() => {
          item.classList.remove("phone__copy--copied");
        }, 1000);
        navigator.clipboard.writeText(
          (evt.target as HTMLElement)
            .closest(".phone__copy-wrapper")
            .querySelector(".phone__copy-info").textContent
        );
      });
    });

    if (item.jpegphoto) {
      (
        newItem.querySelector(".phone__image") as HTMLImageElement
      ).src = `${apiPath}${item.jpegphoto}`;
    }

    //отделяем строки по разделителю и создаем уникальный объект
    const departments = item.departments.split("*");
    const departmentsUniq = new Set(departments);

    if (departmentsUniq.size > 1 && item.rang > "1") {
      const departmentsSortUniq = [...departmentsUniq].sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });

      for (let i = 1; i < departmentsSortUniq.length; i++) {
        const department = document.createElement("SPAN");
        department.classList.add("phone__departments");
        department.textContent = departmentsSortUniq[i];
        newItem
          .querySelector(".phone__departments-wrapper")
          .appendChild(department);
      }
    } else {
      newItem.querySelector(".phone__departments-wrapper").remove();
    }

    //обработчики событий на нажатие на компанию, филиал
    newItem.addEventListener("click", (evt) => {
      const target = evt.target as HTMLElement;
      const search = document.querySelector(
        ".phone__search"
      ) as HTMLInputElement;
      const select = document.querySelector(
        ".phone__select"
      ) as HTMLInputElement;
      if (target.classList.contains("phone__company")) {
        search.dataset.search = "-" + item.sono + "-";
        search.dataset.company = target.textContent;
        console.log(search.dataset.company);
        select.dataset.sono = item.sono;
        select.value = item.sono;
        document.body.style.cursor = "wait";
        const users = document.querySelectorAll(".phone__item");
        if (users.length > 0) {
          users.forEach((user) => user.remove());
        }
        const formData = new FormData();
        formData.append("sono", `${item.sono}`);
        PhoneAPI.postCompany(formData, renderData);
      }
      if (target.classList.contains("phone__department")) {
        search.dataset.search = target.textContent;
        select.dataset.sono = item.sono;
        select.value = item.sono;
        document.body.style.cursor = "wait";
        const formData = new FormData();
        formData.append("sono", `${item.sono}`);
        formData.append("department", `${item.department}`);
        PhoneAPI.postDepartment(formData, renderData);
      }
      if (target.classList.contains("phone__manager")) {
        search.dataset.search = target.textContent;
        document.body.style.cursor = "wait";
        const formData = new FormData();
        formData.append("cn", `${item.manager.trim()}`);
        PhoneAPI.postManager(formData, renderData);
      }
      if (target.classList.contains("phone__departments")) {
        search.dataset.search = target.textContent;
        select.dataset.sono = item.sono;
        select.value = item.sono;
        document.body.style.cursor = "wait";
        const formData = new FormData();
        formData.append("sono", `${item.sono}`);
        formData.append("department", `${target.textContent}`);
        PhoneAPI.postDepartment(formData, renderData);
      }
    });
    container.querySelector(".phone__list").appendChild(newItem);
  });
  const exportTableToExcel = (sortedData: TYPE_AUTH[]) => {
    const tableTemplate = (
      document.querySelector(".template-table") as HTMLTemplateElement
    ).content.querySelector(".table");
    const itemTemplate = (
      document.querySelector(".template-item") as HTMLTemplateElement
    ).content;
    const container = tableTemplate.cloneNode(true) as HTMLElement;
    sortedData.forEach((item) => {
      const newItem = itemTemplate.cloneNode(true) as HTMLElement;
      newItem.querySelector(".cn").textContent = item.cn;
      newItem.querySelector(".title").textContent = item.title;
      newItem.querySelector(".number").textContent = item.telephonenumber;
      newItem.querySelector(".mail").textContent = item.mail;
      container.appendChild(newItem);
    });

    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableHTML = container.outerHTML.replace(/ /g, "%20");

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    //@ts-ignore
    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      //@ts-ignore
      navigator.msSaveOrOpenBlob(blob, "Phone.xls");
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = "Phone.xls";

      //triggering the function
      downloadLink.click();
    }
  };
  if (sortedData.length > 1) {
    // Добавляем кнопку скачать
    const btnExcel = document.createElement("BUTTON");
    btnExcel.classList.add("excel-btn");
    btnExcel.textContent = "xls";
    btnExcel.style.color = "#ffffff";
    btnExcel.style.fontSize = "18px";
    btnExcel.style.textTransform = "uppercase";
    btnExcel.style.fontWeight = "700";
    btnExcel.addEventListener("click", () => {
      exportTableToExcel(sortedData);
    });
    container.appendChild(btnExcel);
  }
};
//событие кнопки и энтер
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  (
    document.querySelector(".phone__search") as HTMLInputElement
  ).dataset.search = (
    document.querySelector(".phone__search") as HTMLInputElement
  ).value;
  (document.querySelector(".phone__select") as HTMLInputElement).dataset.sono =
    (document.querySelector(".phone__select") as HTMLInputElement).value;
  document.body.style.cursor = "wait";
  const formData = new FormData(evt.target as HTMLFormElement);
  PhoneAPI.postUsers(formData, renderData);
});

const buttonClose = document.querySelector(".modal__phone-close");
buttonClose.addEventListener("click", () => {
  document.querySelector(".modal__phone").classList.add("js-phone-nodisplay");
  document.querySelector(".modal__phone").classList.remove("js-phone-display");
});

//событие change select
select.addEventListener("change", (evt) => {
  if (search.value.length >= 2) {
    (
      document.querySelector(".phone__search") as HTMLInputElement
    ).dataset.search = search.value;
    (
      document.querySelector(".phone__select") as HTMLInputElement
    ).dataset.sono = (evt.target as HTMLInputElement).value;
  }
  if (!search.value) {
    (
      document.querySelector(".phone__search") as HTMLInputElement
    ).dataset.search = "-" + (evt.target as HTMLInputElement).value + "-";
    (
      document.querySelector(".phone__search") as HTMLInputElement
    ).dataset.company = "-" + (evt.target as HTMLInputElement).value + "-";
  }
  if (
    search.value.length >= 2 ||
    (evt.target as HTMLInputElement).value !== "Все СОНО"
  ) {
    evt.preventDefault();
    document.body.style.cursor = "wait";
    const users = document.querySelectorAll(".phone__item");
    if (users.length > 0) {
      users.forEach((user) => user.remove());
    }

    const formData = new FormData();
    formData.append("search", `${search.value}`);
    formData.append("sono", `${select.value}`);

    PhoneAPI.postUsers(formData, renderData);
  }
});

//отрисовываю историю поиска при загрузке страницы

const results2 = localStorage.getItem("phone_result");
const storage = JSON.parse(results2);
if (storage) {
  storage.reverse().forEach((item: TYPE_SEARCH) => {
    const container = document.querySelector(".history__list");
    if (item.multiple) {
      const template = (
        document.querySelector(
          ".template-history-notfound"
        ) as HTMLTemplateElement
      ).content.querySelector(".history__item");
      const newItem = template.cloneNode(true) as HTMLElement;
      if (item.company) {
        newItem.querySelector(".history__search").textContent = item.company;
        newItem.dataset.company = item.company;
      } else {
        newItem.querySelector(".history__search").textContent = item.search;
      }
      newItem.querySelector(".history__sono").textContent = item.sono;
      newItem.dataset.search = item.search;
      newItem.dataset.sono = item.sono;
      container.appendChild(newItem);
    } else {
      const template = (
        document.querySelector(".template-history") as HTMLTemplateElement
      ).content.querySelector(".history__item");
      const newItem = template.cloneNode(true) as HTMLElement;
      newItem.querySelector(".history__sn").textContent = item.sn;
      newItem.querySelector(".history__gn").textContent = item.givenname;
      newItem.querySelector(".history__telephonenumber").textContent =
        item.telephonenumber;
      newItem.dataset.search = item.samaccountname;
      newItem.dataset.sono = "Все СОНО";
      container.appendChild(newItem);
    }
  });
}

//обработчик события клика на список истории

const historyList = document.querySelector(".history__list");

historyList.addEventListener("click", (evt) => {
  const item = (evt.target as HTMLElement).closest("LI") as HTMLElement;
  (
    document.querySelector(".phone__search") as HTMLInputElement
  ).dataset.search = item.dataset.search;
  if (item.dataset.company) {
    console.log("here");
    (
      document.querySelector(".phone__search") as HTMLInputElement
    ).dataset.company = item.dataset.company;
  }
  (document.querySelector(".phone__select") as HTMLInputElement).dataset.sono =
    item.dataset.sono;
  (document.querySelector(".phone__select") as HTMLInputElement).value =
    item.dataset.sono;
  const formData = new FormData();
  formData.append("search", `${item.dataset.search}`);
  formData.append("sono", `${item.dataset.sono}`);
  PhoneAPI.postUsers(formData, renderData);
});

//обработчик события скрытия истории
const history = document.querySelector(".history") as HTMLElement;
let count = 0;
const btnHistory = history.querySelector(".history__button");
btnHistory.addEventListener("click", (evt) => {
  if (count % 2 == 0) {
    (evt.target as HTMLElement).textContent = "История";
    history.style.right = "-265px";
  } else {
    (evt.target as HTMLElement).textContent = "Скрыть";
    history.style.right = "0";
  }
  count++;
});
