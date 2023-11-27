import { AdministratorAPI } from "../js/API/administratorApi";
import { showMessage } from "./util";
import { PhoneAPI } from "../js/API/phoneApi";
import { debounce } from "./vacancy/helpers/debounce";
import { validSono } from "../js/utils/validation-sono";
import { TYPE_REQUEST } from "./TYPES";
import {
  handlerSort as handlerToggleSort,
  showSort,
  hiddenSort,
} from "./utils/sort";

import {
  REQUEST_TYPE,
  SERVICES_TYPES_ARRAY,
  SERVICES_TYPES_ENUM,
} from "./ENUMS";

import {
  STATUS,
  TYPE_AUTH,
  ROLE_ADMINISTRATOR,
  SERVICES_SONO,
} from "../ts/types/common";

let auth: TYPE_AUTH | null;

//значения по умолчанию
setTimeout(() => {
  if (JSON.parse(sessionStorage.getItem("auth")) != null) {
    auth = JSON.parse(sessionStorage.getItem("auth"));
    const formData = new FormData();
    formData.append("id", auth.samaccountname);
    writeFormRequest();
    getRoles();
  }
}, 300);
const container = document.querySelector(".administrator") as HTMLElement;
//handler change user

const inputCn = document.querySelector<HTMLInputElement>(".administrator__cn");
const inputSamaccountname = document.querySelector<HTMLInputElement>(
  ".administrator__samaccountname"
);

const searchNewUser = (evt: Event): void => {
  const target = evt.target as HTMLInputElement;
  const parent: HTMLElement = target.closest(".input__wrapper");
  target.classList.contains("administrator__samaccountname")
    ? (container.querySelector<HTMLInputElement>(".administrator__cn").value =
        "")
    : (container.querySelector<HTMLInputElement>(
        ".administrator__samaccountname"
      ).value = "");

  container.querySelector<HTMLInputElement>(".administrator__company").value =
    "";

  container.querySelector<HTMLInputElement>(
    ".administrator__department"
  ).value = "";
  container.querySelector<HTMLInputElement>(".administrator__title").value = "";
  (container.querySelector(".administrator__mail") as HTMLInputElement).value =
    "";
  (
    container.querySelector(
      ".administrator__telephone_number"
    ) as HTMLInputElement
  ).value = "";
  if (target.value.length > 2) {
    (
      parent.querySelector(".notification__list-search") as HTMLElement
    ).textContent = "";
    (
      parent.querySelector(".notification__validation") as HTMLElement
    ).textContent = "";

    const formData = new FormData();
    formData.append("search", target.value);
    formData.append("sono", "");

    PhoneAPI.postUsers(formData, (data: TYPE_AUTH[]): void => {
      if (data.length == 0) {
        (
          parent.querySelector(".notification__validation") as HTMLElement
        ).textContent = `Ничего не найдено, измените условия поиска`;
      }
      if (data.length >= 40) {
        (
          parent.querySelector(".notification__validation") as HTMLElement
        ).textContent = `Продолжайте вводить, результатов поиска: ${data.length}`;
      }
      if (data.length <= 39) {
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("notification__find");
          li.innerHTML = `${item.cn} <br> ${item.company}<br> ${item.department} <hr>`;
          (
            parent.querySelector(".notification__list-search") as HTMLElement
          ).appendChild(li);
          li.addEventListener("click", () => {
            (
              parent.querySelector(".notification__list-search") as HTMLElement
            ).textContent = "";
            (
              parent.querySelector(".notification__validation") as HTMLElement
            ).textContent = "";
            (
              container.querySelector(".administrator__cn") as HTMLInputElement
            ).value = item.cn;
            (
              container.querySelector(
                ".administrator__samaccountname"
              ) as HTMLInputElement
            ).value = item.samaccountname;
            (
              container.querySelector(
                ".administrator__company"
              ) as HTMLInputElement
            ).value = item.company;
            (
              container.querySelector(
                ".administrator__department"
              ) as HTMLInputElement
            ).value = item.department;
            (
              container.querySelector(
                ".administrator__title"
              ) as HTMLInputElement
            ).value = item.title;
            (
              container.querySelector(
                ".administrator__mail"
              ) as HTMLInputElement
            ).value = item.mail;
            (
              container.querySelector(
                ".administrator__sono"
              ) as HTMLInputElement
            ).value = item.sono;
            (
              container.querySelector(
                ".administrator__telephone_number"
              ) as HTMLInputElement
            ).value = item.telephonenumber;
          });
        });
      }
    });
  }
};

inputCn.addEventListener("input", debounce(searchNewUser, 500));
inputSamaccountname.addEventListener("input", debounce(searchNewUser, 500));
window.addEventListener("click", (): void => {
  document
    .querySelectorAll(".notification__list-search")
    .forEach((item) => (item.textContent = ""));
  document
    .querySelectorAll(".notification__validation")
    .forEach((item) => (item.textContent = ""));
});

//write form new request
const writeFormRequest = (): void => {
  if (sessionStorage.getItem("auth") != null) {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    (container.querySelector(".administrator__cn") as HTMLInputElement).value =
      auth.cn;
    (
      container.querySelector(
        ".administrator__samaccountname"
      ) as HTMLInputElement
    ).value = auth.samaccountname;
    (
      container.querySelector(".administrator__company") as HTMLInputElement
    ).value = auth.company;
    (
      container.querySelector(".administrator__department") as HTMLInputElement
    ).value = auth.department;
    (
      container.querySelector(".administrator__title") as HTMLInputElement
    ).value = auth.title;
    (
      container.querySelector(".administrator__mail") as HTMLInputElement
    ).value = auth.mail;
    (
      container.querySelector(".administrator__sono") as HTMLInputElement
    ).value = auth.sono;
    (
      container.querySelector(
        ".administrator__visible-sono"
      ) as HTMLInputElement
    ).value = auth.sono;
    (
      container.querySelector(
        ".administrator__telephone_number"
      ) as HTMLInputElement
    ).value = auth.telephonenumber;
    const date = new Date();
    (
      container.querySelector(".administrator__date_start") as HTMLInputElement
    ).min = date.toISOString().slice(0, 10);
    (
      container.querySelector(".administrator__date_end") as HTMLInputElement
    ).min = date.toISOString().slice(0, 10);
    validSono();
  }
};

const renderDefaultRoles = () => {
  const roles = Object.keys(ROLE_ADMINISTRATOR).filter(
    (x) => !(parseInt(x) >= 0)
  );
  const services = Object.keys(SERVICES_TYPES_ENUM).filter(
    (x) => !(parseInt(x) >= 0)
  );
  const setRoles = (actualRole: number, container: HTMLElement) => {
    roles.map((role, index) => {
      let className;
      index <= actualRole
        ? (className = `administrator__role administrator__role--actual administrator__${role}`)
        : (className = `administrator__role administrator__${role}`);
      const span = document.createElement("span");
      span.textContent = role.slice(0, 1).toUpperCase();
      span.className = className;
      container.appendChild(span);
    });
  };
  console.log(services);
  services.map((service) => {
    if (document.querySelector(`.administrator__roles--${service}`)) {
      const container: HTMLElement = document.querySelector(
        `.administrator__roles--${service}`
      );
      switch (service) {
        case "administrator": {
          setRoles(ROLE_ADMINISTRATOR.view, container);
          break;
        }
        case "vacancy": {
          setRoles(ROLE_ADMINISTRATOR.create, container);
          break;
        }
        case "news": {
          setRoles(ROLE_ADMINISTRATOR.view, container);
          break;
        }
        case "weekend": {
          setRoles(ROLE_ADMINISTRATOR.view, container);
          break;
        }
        case "profile": {
          setRoles(ROLE_ADMINISTRATOR.create, container);
          break;
        }
      }
    }
  });
};

const updateRoles = (actualRole: number, container: HTMLElement) => {
  const defaultRoles = [...container.querySelectorAll(".administrator__role")];
  for (let i = 0; i <= actualRole; i++) {
    if (!defaultRoles[i].classList.contains("administrator__role--actual")) {
      defaultRoles[i].classList.add("administrator__role--actual");
    }
  }
};

const renderAdminTab = (data: TYPE_REQUEST[]) => {
  const isAdmin = data.some(
    (role) => role.administrator_role == ROLE_ADMINISTRATOR.full
  );
  const container = document.querySelector(".tab-section__wrapper");
  if (isAdmin) {
    const button = document.createElement("button");
    button.className = "tab tab--requests";
    button.textContent = "Все заявки";
    container.appendChild(button);
  }
  const button = document.createElement("button");
  button.className = "tab tab--my-requests";
  button.textContent = "Мои заявки";

  container.appendChild(button);
  handlerSortingAdmin();
  handlerAdminTabs();
};

const renderRoles = (data: TYPE_REQUEST[]): void => {
  renderAdminTab(data);
  renderDefaultRoles();
  if (data.length > 0) {
    data.map((role) => {
      switch (role.administrator_service) {
        case SERVICES_TYPES_ENUM.administrator: {
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[0]}`
            )
          );
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[1]}`
            )
          );
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[2]}`
            )
          );
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[5]}`
            )
          );
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[84]}`
            )
          );
          break;
        }
        case SERVICES_TYPES_ENUM.weekend: {
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[1]}`
            )
          );
          break;
        }
        case SERVICES_TYPES_ENUM.news: {
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[2]}`
            )
          );
          break;
        }
        case SERVICES_TYPES_ENUM.vacancy: {
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[5]}`
            )
          );
          break;
        }
        case SERVICES_TYPES_ENUM.profile: {
          updateRoles(
            role.administrator_role,
            document.querySelector(
              `.administrator__roles--${SERVICES_TYPES_ENUM[84]}`
            )
          );
          break;
        }
      }
    });
  }
};

const getRoles = (): void => {
  if (sessionStorage.getItem("auth") != null) {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    const formData = new FormData();
    formData.append("administrator_samaccountname", auth.samaccountname);
    AdministratorAPI.getRoles(auth.samaccountname, renderRoles);
  }
};

//handler for click on open date new request
(
  container.querySelector(".administrator__forever") as HTMLInputElement
).addEventListener("change", (evt: Event) => {
  if (!(evt.target as HTMLInputElement).checked) {
    (
      container.querySelector(".administrator__date_start") as HTMLInputElement
    ).disabled = false;
    (
      container.querySelector(".administrator__date_end") as HTMLInputElement
    ).disabled = false;
  } else {
    (
      container.querySelector(".administrator__date_start") as HTMLInputElement
    ).disabled = true;
    (
      container.querySelector(".administrator__date_end") as HTMLInputElement
    ).disabled = true;
  }
});

//submit new request
const form = document.querySelector(".form") as HTMLFormElement;
form.addEventListener("submit", (evt: Event) => {
  evt.preventDefault();
  const checkboxes = [...document.querySelectorAll(".checkbox--rules")];
  const setRole = checkboxes.some((item) => (item as HTMLInputElement).checked);
  if (!setRole) {
    showMessage("Выберите права");
  }
  if (
    (
      container.querySelector(
        ".administrator__samaccountname"
      ) as HTMLInputElement
    ).value == ""
  ) {
    showMessage("Выберите пользователя");
  }
  if (
    container.querySelector<HTMLInputElement>(".administrator__cn").value == ""
  ) {
    showMessage("Выберите учетную запись");
  }
  if (
    (
      container.querySelector(
        ".administrator__samaccountname"
      ) as HTMLInputElement
    ).value != "" &&
    setRole &&
    (container.querySelector(".administrator__cn") as HTMLInputElement).value !=
      ""
  ) {
    const formData = new FormData(evt.target as HTMLFormElement);
    if (auth) {
      formData.append(
        "administrator_author_samaccountname",
        auth.samaccountname
      );
      formData.append("administrator_author_cn", auth.cn);

      formData.append("administrator_author_title", auth.title);
      formData.append("administrator_author_department", auth.department);
      formData.append("administrator_author_company", auth.company);
      formData.append(
        "administrator_author_telephone_number",
        auth.telephonenumber
      );
      formData.append("administrator_author_mail", auth.mail);
      formData.append("administrator_author_sono", auth.sono);
    } else {
      formData.append("administrator_author_samaccountname", "not auth");
      formData.append("administrator_author_cn", "not auth");
    }
    AdministratorAPI.postRequest(formData, (response: string) => {
      showMessage(response);
    });
  }
});
//create new request
(
  document.querySelector(".administrator__button-request") as HTMLElement
).addEventListener("click", () => {
  document.querySelector(".sort").classList.add("js-nodisplay");
  hiddenSort();
  if (
    (
      container.querySelector(".administrator__request") as HTMLElement
    ).classList.contains("js-nodisplay")
  ) {
    document
      .querySelectorAll(".administrator__container")
      .forEach((item) => item.classList.add("js-nodisplay"));
    document
      .querySelectorAll(".tab--actual")
      .forEach((item) => item.classList.remove("tab--actual"));
    (
      document.querySelector(".administrator__request") as HTMLElement
    ).classList.remove("js-nodisplay");
    (
      document.querySelector(".button-service--rules") as HTMLElement
    ).classList.remove("button-service--active");
    (
      document.querySelector(".button-service--request") as HTMLElement
    ).classList.add("button-service--active");
  }
});

const openModal = (id: number, status: number) => {
  (document.querySelector(".modal__reject") as HTMLElement).classList.remove(
    "js-nodisplay"
  );
  (document.querySelector(".modal__id") as HTMLInputElement).value =
    id.toString();
  (document.querySelector(".modal__status") as HTMLInputElement).value =
    status.toString();
};

const sendStatus = (id: number, status: number, account: string) => {
  const formData = new FormData();
  // formData.append("administrator_id", id.toString());
  // formData.append("administrator_status", status.toString());
  // formData.append("administrator_samaccountname", account);
  formData.append("administrator_admin", auth.cn);
  return status === STATUS.Approve
    ? AdministratorAPI.postStatusApprove(formData, id.toString())
    : AdministratorAPI.postStatusDecline(formData, id.toString());
};

const renderDefaultRequest = (samaccountname: string, filters = "0") => {
  AdministratorAPI.getAllRequests(
    samaccountname,
    filters,
    (data: TYPE_REQUEST[]) =>
      renderMyRequests(
        data,
        REQUEST_TYPE.New,
        ".template-request",
        ".administrator__list--all-requests"
      )
  );
};

const renderMyRequests = (
  data: TYPE_REQUEST[],
  type: REQUEST_TYPE,
  templateClass: string,
  containerClass: string
): void => {
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const container = document.querySelector(containerClass) as HTMLElement;
  container
    .querySelectorAll(".administrator__item--row")
    .forEach((item) => item.remove());
  if (auth != null) {
    data.forEach((item) => {
      const template = (
        document.querySelector(templateClass) as HTMLTemplateElement
      ).content.querySelector(".administrator__item") as HTMLElement;
      const newItem = template.cloneNode(true) as HTMLElement;
      (
        newItem.querySelector(".administrator__row--date") as HTMLElement
      ).textContent = item.administrator_date_request;
      (
        newItem.querySelector(".administrator__row--author_cn") as HTMLElement
      ).textContent = item.administrator_author_cn;
      (
        newItem.querySelector(".administrator__row--cn") as HTMLElement
      ).textContent = item.administrator_cn;
      item.administrator_date_end === null
        ? ((
            newItem.querySelector(".administrator__row--dates") as HTMLElement
          ).textContent = "бессрочно")
        : ((
            newItem.querySelector(".administrator__row--dates") as HTMLElement
          ).textContent = `${item.administrator_date_start} - ${item.administrator_date_end}`);
      if (item.administrator_status === STATUS.Create) {
        (
          newItem.querySelector(".administrator__row--comments") as HTMLElement
        ).innerHTML = `${item.administrator_comments}<br>`;
      }
      if (item.administrator_status === STATUS.Approve) {
        (
          newItem.querySelector(".administrator__row--comments") as HTMLElement
        ).innerHTML = `${item.administrator_comments}<br><b>${item.administrator_reject}</b>`;
      }
      if (item.administrator_status === STATUS.Cancel) {
        const comments = item.administrator_reject
          ? `${item.administrator_comments}<br>
        <b>${item.administrator_reject}</b>
        `
          : `${item.administrator_comments}<br>
       <b>Отозвана</b>
        `;
        (
          newItem.querySelector<HTMLInputElement>(
            ".administrator__row--comments"
          ) as HTMLElement
        ).innerHTML = comments;
      }

      (
        newItem.querySelector(".administrator__row--service") as HTMLElement
      ).textContent = SERVICES_TYPES_ARRAY[item.administrator_service];
      (
        newItem.querySelector(".administrator__row--id") as HTMLElement
      ).textContent = item.administrator_id.toString();
      //logic render request roles
      const roles = [...newItem.querySelectorAll(".administrator__role")];
      for (let i = 0; i < roles.length; i++) {
        if (+item.administrator_role >= i) {
          roles[i].classList.add("administrator__role--actual");
        }
      }
      //logic if my requests or admin requests
      if (type == REQUEST_TYPE.My) {
        (
          newItem.querySelector(".administrator__btn--approve") as HTMLElement
        ).remove();
        (
          newItem.querySelector(".administrator__btn--cancel") as HTMLElement
        ).addEventListener("click", () =>
          sendStatus(
            item.administrator_id,
            STATUS.Cancel,
            auth.samaccountname
          ).then(() => {
            const formData = new FormData();
            formData.append(
              "administrator_samaccountname",
              auth.samaccountname
            );
            AdministratorAPI.getMyRequests(
              auth.samaccountname,
              (data: TYPE_REQUEST[]) =>
                renderMyRequests(
                  data,
                  REQUEST_TYPE.My,
                  ".template-request",
                  ".administrator__list-my-requests"
                )
            );
          })
        );
      }
      if (type == REQUEST_TYPE.New) {
        if (item.administrator_status === STATUS.Create) {
          newItem
            .querySelector(".administrator__btn--approve")
            .addEventListener("click", () =>
              sendStatus(
                item.administrator_id,
                STATUS.Approve,
                auth.samaccountname
              ).then(() => handlerSort(sort.querySelector(".sort__form")))
            );
        } else {
          newItem.querySelector(".administrator__btn--approve").remove();
        }
        if (
          item.administrator_status === STATUS.Create ||
          item.administrator_status === STATUS.Approve
        ) {
          newItem
            .querySelector(".administrator__btn--cancel")
            .addEventListener("click", () =>
              openModal(item.administrator_id, STATUS.Cancel)
            );
        } else {
          newItem.querySelector(".administrator__btn--cancel").remove();
        }
      }
      const innerGetter = newItem.querySelector(
        ".administrator__inner-list--getter"
      );
      innerGetter.querySelector(".administrator__description--cn").textContent =
        item.administrator_cn;
      innerGetter.querySelector(
        ".administrator__description--title"
      ).textContent = item.administrator_title;
      innerGetter.querySelector(
        ".administrator__description--department"
      ).textContent = item.administrator_department;
      innerGetter.querySelector(
        ".administrator__description--company"
      ).textContent = item.administrator_company;
      innerGetter.querySelector(
        ".administrator__description--number"
      ).textContent = item.administrator_telephone_number;
      innerGetter.querySelector(
        ".administrator__description--mail"
      ).textContent = item.administrator_mail;
      let visible: string = "";
      if (item.administrator_sono_list) {
        item.administrator_sono_list.map((item) => {
          visible += `${SERVICES_SONO[item]} <br>`;
        });
      }

      innerGetter.querySelector(
        ".administrator__description--visible"
      ).innerHTML = visible;
      const innerSetter = newItem.querySelector(
        ".administrator__inner-list--author"
      );
      innerSetter.querySelector(".administrator__description--cn").textContent =
        item.administrator_author_cn;
      innerSetter.querySelector(
        ".administrator__description--title"
      ).textContent = item.administrator_author_title;
      innerSetter.querySelector(
        ".administrator__description--department"
      ).textContent = item.administrator_author_department;
      innerSetter.querySelector(
        ".administrator__description--company"
      ).textContent = item.administrator_author_company;
      innerSetter.querySelector(
        ".administrator__description--number"
      ).textContent = item.administrator_author_telephone_number;
      innerSetter.querySelector(
        ".administrator__description--mail"
      ).textContent = item.administrator_author_mail;
      container.appendChild(newItem);
    });
  }
};

//reject from admin modal
const formModal = document.querySelector(
  ".modal__reject-form"
) as HTMLFormElement;
formModal.addEventListener("submit", (evt: Event) => {
  evt.preventDefault();
  const formData = new FormData(evt.target as HTMLFormElement);
  if (auth) {
    formData.append("administrator_sono", auth.sono);
    formData.append("administrator_cn", auth.cn);
    AdministratorAPI.postStatusDecline(
      formData,
      formModal.querySelector<HTMLInputElement>(".modal__id").value
    ).then(() => handlerSort(sort.querySelector(".sort__form")));
    formModal.reset();
    (document.querySelector(".modal__reject") as HTMLElement).classList.add(
      "js-nodisplay"
    );
  }
});

//show requests
const handlerAdminTabs = () => {
  document.querySelectorAll(".tab").forEach((item) =>
    item.addEventListener("click", (evt) => {
      if (sessionStorage.getItem("auth") != null) {
        const auth = JSON.parse(sessionStorage.getItem("auth"));
        const target = evt.target as HTMLElement;
        document
          .querySelectorAll(".tab")
          .forEach((item) => item.classList.remove("tab--actual"));
        target.classList.add("tab--actual");
        document
          .querySelectorAll(".button-service")
          .forEach((item) => item.classList.remove("button-service--active"));
        document
          .querySelectorAll(".administrator__container")
          .forEach((item) => item.classList.add("js-nodisplay"));
        if (target.classList.contains("tab--requests")) {
          // closeFilter(sort.querySelector(".toggle-side__mark--left"));
          document.querySelector<HTMLFormElement>(".sort__form").reset();
          document.querySelector(".sort").classList.remove("js-nodisplay");
          (
            document.querySelector(".administrator__requests") as HTMLElement
          ).classList.remove("js-nodisplay");
        } else {
          document.querySelector(".sort").classList.add("js-nodisplay");
          hiddenSort();
        }
        if (target.classList.contains("tab--my-requests")) {
          (
            document.querySelector(".administrator__my-requests") as HTMLElement
          ).classList.remove("js-nodisplay");
          const formData = new FormData();
          if (sessionStorage.getItem("auth") != null) {
            console.log("here auth");
            formData.append(
              "administrator_samaccountname",
              auth.samaccountname
            );
            AdministratorAPI.getMyRequests(
              auth.samaccountname,
              (data: TYPE_REQUEST[]) =>
                renderMyRequests(
                  data,
                  REQUEST_TYPE.My,
                  ".template-request",
                  ".administrator__list-my-requests"
                )
            );
          }
        }
      }
    })
  );
};

//handler checkboxes rules
document.querySelectorAll(".checkbox--rules").forEach((item) => {
  item.addEventListener("change", (evt) => {
    const target = evt.target as HTMLInputElement;
    const rule = container.querySelector(
      ".administrator__checkbox-rules"
    ) as HTMLInputElement;
    if (target.checked) {
      rule.value = target.value;
      (
        document.querySelectorAll(
          ".checkbox--rules"
        ) as NodeListOf<HTMLInputElement>
      ).forEach((item) =>
        (item as HTMLInputElement).value >
        (
          document.querySelector(
            ".administrator__checkbox-rules"
          ) as HTMLInputElement
        ).value
          ? (item.checked = false)
          : (item.checked = true)
      );
    } else {
      target.value === ROLE_ADMINISTRATOR.view.toString()
        ? (rule.value = "")
        : (rule.value = (+target.value - 1).toString());

      (
        document.querySelectorAll(
          ".checkbox--rules"
        ) as NodeListOf<HTMLInputElement>
      ).forEach((item) =>
        item.value <=
        (
          document.querySelector(
            ".administrator__checkbox-rules"
          ) as HTMLInputElement
        ).value
          ? (item.checked = true)
          : (item.checked = false)
      );
    }
  });
});

//sort open close
const sort: HTMLElement = document.querySelector(".sort");
const btnSort = sort.querySelector(".toggle-side");
// const closeFilter = (mark: HTMLElement) => {
//   // sort.style.left = "-265px";
//   mark.classList.remove("toggle-side__mark--left-active");
//   btnSort.querySelector<HTMLElement>(".toggle-side__text").style.visibility =
//     "visible";
// };
// const toggleSort = () => {
//   const mark: HTMLElement = sort.querySelector(".toggle-side__mark--left");
//   if (sort.style.left != "0px") {
//     // sort.style.left = "0px";
//     mark.classList.add("toggle-side__mark--left-active");
//     (
//       btnSort.querySelector(".toggle-side__text") as HTMLElement
//     ).style.visibility = "hidden";
//   } else {
//     closeFilter(mark);
//   }
// };
const handlerSortingAdmin = () => {
  // btnSort.addEventListener("click", toggleSort);
  sort.querySelector(".sort__form").addEventListener(
    "input",
    debounce(() => {
      handlerSort(sort.querySelector(".sort__form"));
    }, 500)
  );

  sort.querySelector(".sort__form").addEventListener("reset", (evt: Event) => {
    console.log("reset");
    const formData = new FormData();
    if (sessionStorage.getItem("auth") != null) {
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      formData.append("administrator_sono", auth.sono);
      formData.append("administrator_samaccountname", auth.samaccountname);
      formData.append("status", STATUS.Create.toString());
      renderDefaultRequest(auth.samaccountname, STATUS.Create.toString());
    }
  });
};

//handler sorting new requests
const handlerSort = (target: HTMLFormElement) => {
  if (sessionStorage.getItem("auth") != null) {
    const formData = new FormData(target);
    formData.append("administrator_sono", auth.sono);
    formData.append("administrator_samaccountname", auth.samaccountname);
    let filters = "";
    const list = document.querySelector(".sort__list");
    const checkedInputs = list.querySelectorAll("input:checked");
    checkedInputs.forEach(
      (input) => (filters += `${(input as HTMLInputElement).value},`)
    );
    const input: HTMLInputElement = sort.querySelector(".sort__input--search");
    input.value ? formData.append("search", input.value) : "";
    renderDefaultRequest(
      auth.samaccountname,
      filters.slice(0, -1) ? filters.slice(0, -1) : "10"
    );
  }
};

const addSono = document.querySelector(".notification__button-add");
addSono.addEventListener("click", (evt: Event) => {
  const target = evt.target as HTMLElement;
  const newItem = (
    document.querySelector(".template") as HTMLTemplateElement
  ).content
    .querySelector(".input__wrapper")
    .cloneNode(true);
  (
    (newItem as HTMLElement).querySelector(
      ".administrator__button-remove"
    ) as HTMLElement
  ).addEventListener("click", (evt: Event) => {
    const parent = (evt.target as HTMLElement)
      .closest(".input__wrapper")
      .remove();
  });
  document.querySelector(".administrator__new-sono").appendChild(newItem);
  validSono();
});

document
  .querySelector(".weekend__btn--reject-close")
  .addEventListener("click", () => {
    document.querySelector(".modal__reject").classList.add("js-nodisplay");
  });

handlerToggleSort();
