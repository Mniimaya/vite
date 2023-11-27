import { ReviewAPI } from "../js/API/reviewApi.js";
import { TYPE_COMMENT, TYPE_REVIEW } from "./TYPES";

import {TYPE_AUTH} from './types/common';

//send new ticket from portal
if (document.location.pathname == "/section/review.html") {
  document.querySelector(".review__form").addEventListener("submit", (evt) => {
    if (JSON.parse(sessionStorage.getItem("auth")) != null) {
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      (
        document.querySelector(".review__input--account") as HTMLInputElement
      ).value = auth.samaccountname;
    }

    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    ReviewAPI.postReview(formData);
    (document.querySelector(".review__form") as HTMLFormElement).reset();
  });
}

//show list of statuses
const handlerChangeStatus = (evt: Event) => {
  const parent = (evt.target as HTMLElement).closest(".review__item");
  if (
    parent
      .querySelector(".review__list-status")
      .classList.contains("js-nodisplay")
  ) {
    parent
      .querySelector(".review__list-status")
      .classList.remove("js-nodisplay");
    parent
      .querySelector(".review__list-status")
      .querySelectorAll(".review__item-status")
      .forEach((item) =>
        (evt.target as HTMLElement).textContent == item.textContent
          ? item.classList.add("js-nodisplay")
          : item.classList.add("js-display")
      );
  } else {
    parent.querySelector(".review__list-status").classList.add("js-nodisplay");
  }
};

const ajaxRender = () => {
  clearList(".review__list");
  if (document.querySelector(".tab--new").classList.contains("tab--actual")) {
    setTimeout(() => {
      ReviewAPI.getReviews(renderReviews);
    }, 200);
  } else {
    setTimeout(() => {
      ReviewAPI.getReviewsArchive(renderReviews);
    }, 200);
  }
};
let auth: TYPE_AUTH;
let admin: string;

setTimeout(() => {
  if (sessionStorage.getItem("auth") != null) {
    auth = JSON.parse(sessionStorage.getItem("auth"));
    admin = auth.cn;
  } else {
    admin = "incognito admin";
  }
}, 300);
//toggle actual tab
const toggleTab = (evt: Event) => {
  document.querySelector(".tab--actual").classList.remove("tab--actual");
  (evt.target as HTMLElement).classList.add("tab--actual");
};

//toggle ticket status
const toggleStatus = (evt: Event, id: string) => {
  let status;
  switch ((evt.target as HTMLElement).textContent) {
    case "Новое":
      status = "";
      break;
    case "В работе":
      status = 1;
      break;
    case "Выполнено":
      status = 2;
      break;
    case "Частично":
      status = 3;
      break;
    case "Отклонено":
      status = 4;
      break;
  }

  const formData = new FormData();
  formData.append("review_admin", admin);
  formData.append("id", id);
  formData.append("status", status.toString());
  ReviewAPI.postStatus(formData);
  ajaxRender();
};

//one function render
const renderReviews = (data: TYPE_REVIEW[]) => {
  const container = document.querySelector(".review__list");
  data.reverse().forEach((item) => {
    const template = (
      document.querySelector(".review-template") as HTMLTemplateElement
    ).content.querySelector(".review__item");
    const newItem = template.cloneNode(true) as HTMLElement;
    newItem.querySelector(".review__headline").textContent = item.review_title;
    let statusText;
    switch (item.status) {
      case null:
        statusText = "Новое";
        newItem.dataset.status = "0";
        break;
      case 1:
        statusText = "В работе";
        newItem.dataset.status = "1";
        break;
      case 2:
        statusText = "Выполнено";
        newItem.dataset.status = "2";
        break;
      case 3:
        statusText = "Частично";
        newItem.dataset.status = "3";
        break;
      case 4:
        statusText = "Отклонено";
        newItem.dataset.status = "4";
        break;
    }
    newItem.querySelector(".review__status").textContent = statusText;
    newItem
      .querySelector(".review__status")
      .addEventListener("click", handlerChangeStatus);
    newItem.querySelector(".review__admin").textContent = item.review_admin
      ? `: ${item.review_admin}`
      : "";
    newItem.querySelector(".review__body").textContent = item.review_body;
    newItem.querySelector(".review__account").textContent = item.account_number;
    newItem.querySelector(".review__date").textContent = item.date.slice(0, 10);
    newItem.querySelector(".review__name").textContent = item.full_name;
    const numberIsString = item.review_id.toString();
    let number;
    if (numberIsString.length >= 3) {
      number = "010-" + numberIsString + "-00";
    }
    if (numberIsString.length == 2) {
      number = "010-" + "0" + numberIsString + "-00";
    }
    if (numberIsString.length == 1) {
      number = "010-" + "00" + numberIsString + "-00";
    }
    newItem.querySelector(".review__id").textContent = number;
    newItem.querySelectorAll(".review__item-status").forEach((status) =>
      status.addEventListener("click", (evt) => {
        toggleStatus(evt, item.review_id.toString());
      })
    );
    newItem.querySelectorAll(".review__button--comment").forEach((btn) =>
      btn.addEventListener(
        "click",
        (evt) => {
          document
            .querySelector(".modal--comment")
            .classList.remove("js-nodisplay");
          (
            document.querySelector(".modal__id--comment") as HTMLInputElement
          ).value = item.review_id.toString();
        },
        { capture: true }
      )
    );

    let toggle = true;
    newItem.addEventListener("click", (evt) => {
      if (
        !(evt.target as HTMLElement).classList.contains("review__button") &&
        !(evt.target as HTMLElement).classList.contains("review__status")
      ) {
        const parent = (evt.target as HTMLElement).closest(".review__item");

        if (toggle) {
          const formData = new FormData();
          formData.append("id", item.review_id.toString());
          ReviewAPI.getCommentsById(formData, (data: TYPE_COMMENT[]) => {
            if (data.length > 0) {
              const line = document.createElement("hr");
              line.classList.add("review__line");
              parent.querySelector(".review__comments").appendChild(line);
              data.forEach((message) => {
                const newMessage = document.createElement("li");
                newMessage.classList.add("review__message");
                if (message.review_comment) {
                  newMessage.classList.add("review__message--comment");
                  newMessage.textContent = message.review_comment;
                } else {
                  newMessage.classList.add("review__message--notification");
                  newMessage.textContent = message.review_notification;
                }
                parent
                  .querySelector(".review__comments")
                  .appendChild(newMessage);
              });
            }
          });
        } else {
          parent.querySelector(".review__comments").textContent = "";
        }
        toggle = !toggle;
      }
    });
    container.appendChild(newItem);
  });
};

//clear list with tickets
const clearList = (listClass: string) => {
  document.querySelector(listClass).textContent = "";
};

//start render
if (document.location.pathname == "/admin/review.html") {
  ReviewAPI.getReviews(renderReviews);

  //active toggle
  document.querySelector(".tab--archive").addEventListener("click", (evt) => {
    clearList(".review__list");
    toggleTab(evt);
    ReviewAPI.getReviewsArchive(renderReviews);
  });

  document.querySelector(".tab--new").addEventListener("click", (evt) => {
    clearList(".review__list");
    toggleTab(evt);
    ReviewAPI.getReviews(renderReviews);
  });

  //close modal
  document.querySelectorAll(".modal__close").forEach((item) =>
    item.addEventListener("click", (evt) => {
      (evt.target as HTMLElement)
        .closest(".modal")
        .classList.add("js-nodisplay");
    })
  );

  document.querySelectorAll(".modal__form").forEach((form) =>
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      (form.querySelector(".modal__message") as HTMLInputElement).checked
        ? ((form.querySelector(".modal__textarea") as HTMLInputElement).name =
            "notification")
        : ((form.querySelector(".modal__textarea") as HTMLInputElement).name =
            "comment");
      const formData = new FormData(evt.target as HTMLFormElement);
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      let admin;
      if (auth) {
        admin = auth.cn;
      } else {
        admin = "incognito admin";
      }
      formData.append("author", admin);
      ReviewAPI.postMessage(formData);
      (evt.target as HTMLElement)
        .closest(".modal")
        .classList.add("js-nodisplay");
      (form as HTMLFormElement).reset();
      ajaxRender();
    })
  );
}
