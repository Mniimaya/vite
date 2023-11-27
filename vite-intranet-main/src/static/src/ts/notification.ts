// import { NotificationAPI } from "./API/notificationApi";
import { NotificationAPI } from "../js/API/notificationApi";
import { PhoneAPI } from "../js/API/phoneApi";
import { debounce } from "../js/libraries/debounce";
import { getSearchParams } from "./vacancy/helpers/get-search-params";
import {
  TYPE_CHAT,
  TYPE_CHAT_MESSAGES,
  TYPE_CHAT_PARTICIPANT,
  TYPE_CHAT_INFO,
} from "./TYPES";
import { showMessage } from "./util";

import { TYPE_AUTH } from "./types/common";
import { StringLiteral } from "@babel/types";

const auth = JSON.parse(sessionStorage.getItem("auth"));
const samaccountname = auth.samaccountname;

let data: TYPE_AUTH;

// Проверка есть ли в url id чата
const handlerChatId = () => {
  const [id] = getSearchParams(window.location.search, [`id`]);

  if (!id) {
    return;
  }

  const chatItemsElement = document.querySelectorAll(`.notification__item`);

  [...chatItemsElement].forEach((element: HTMLElement) => {
    if (element.dataset.id === id) {
      element.click();
      return;
    }

    return;
  });
};

const handlerChats = (data: TYPE_CHAT_INFO[]) => {
  renderChats(data);
};

//get my actual chats

const updateChats = () => {
  if (sessionStorage.getItem("auth") != null) {
    data = JSON.parse(sessionStorage.getItem("auth"));
    document.querySelector(".notification__chats").textContent = "";
    NotificationAPI.postId(data.samaccountname, handlerChats).then(() => {
      handlerChatId();
    });
  }
};
setTimeout(updateChats, 300);

//clear and give messages
const renderMessages = (messages: TYPE_CHAT_MESSAGES[]) => {
  document.querySelector(".notification__messages").textContent = "";
  const container = document.querySelector(".notification__messages");
  let date = "";
  let authorString = "";
  messages.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("notification__message-item");
    const author = document.createElement("span");
    author.textContent = item.full_name;
    author.classList.add("notification__author-message");
    const body = document.createElement("div");
    body.classList.add("notification__body-text");
    const time = document.createElement("span");
    const dateJs = new Date(`${item.createdAt} GMT`);
    time.textContent = dateJs.toLocaleTimeString("it-IT").slice(0, -3);
    if (date != dateJs.toDateString()) {
      const newDate = document.createElement("li");
      newDate.classList.add("notification__message");
      newDate.classList.add("notification__message--date");
      newDate.textContent = dateJs.toLocaleDateString();
      container.appendChild(newDate);
    }
    date = dateJs.toDateString();
    time.classList.add("notification__time");
    body.innerHTML = `<p>${item.body}</p>`;
    if (item.account_number == data.samaccountname) {
      li.classList.add("notification__message--my");
    } else {
      li.classList.add("notification__message--opponent");
    }
    const div = document.createElement("div");
    div.classList.add("notification__links-wrapper");
    const link = document.createElement("a");
    if (item.link != null) {
      link.classList.add("notification__link-file");
      link.href = item.link;
      link.textContent = "Открыть";
      link.target = "_blank";
      body.appendChild(link);
    }
    const download = document.createElement("a");
    if (item.link != null) {
      download.classList.add("notification__link-file");
      download.href = item.link;
      download.textContent = "Скачать";
      download.download = "true";
      body.appendChild(link);
    }
    div.append(link, download);
    li.classList.add("notification__message");
    if (item.full_name != authorString) {
      body.append(time);
      li.append(author, body);
    } else {
      body.append(time);
      li.append(body, div);
    }
    authorString = item.full_name;
    container.appendChild(li);
  });
  container.scrollTop = container.scrollHeight;
};

const renderChats = (chats: TYPE_CHAT_INFO[]) => {
  console.log(chats);
  const sortByLastMessage = (a: TYPE_CHAT_INFO, b: TYPE_CHAT_INFO) => {
    if (a.last_message > b.last_message) {
      return -1;
    }
    if (a.last_message < b.last_message) {
      return 1;
    }
    return 0;
  };
  const container = document.querySelector(".notification__chats");
  chats.sort(sortByLastMessage).forEach((item) => {
    const template = (
      document.querySelector(".template-chat") as HTMLTemplateElement
    ).content.querySelector(".notification__item");
    const newChat = template.cloneNode(true) as HTMLElement;
    if (item.notification_service != null) {
      newChat.querySelector(".notification__service").textContent =
        item.notification_service;
    }
    if (item.participants.length == 2) {
      item.participants.forEach((participant) => {
        if (participant.full_name != data.cn) {
          newChat.querySelector(".notification__author").textContent =
            participant.full_name;
        }
      });
    }
    if (item.participants.length > 2) {
      newChat.querySelector(".notification__author").textContent =
        "Групповой чат";
    }
    // if (item.quality.length > 0) {
    //   newChat.querySelector(".notification__unread").textContent =
    //     item.quality.length.toString();
    //   if (
    //     newChat
    //       .querySelector(".notification__unread")
    //       .classList.contains("js-nodisplay")
    //   ) {
    //     newChat
    //       .querySelector(".notification__unread")
    //       .classList.remove("js-nodisplay");
    //   }
    // } else {
    //   newChat
    //     .querySelector(".notification__unread")
    //     .classList.add("js-nodisplay");
    // }
    newChat.querySelector(".notification__theme").textContent =
      item.notification_theme;
    if (item.messages.length > 0) {
      newChat.querySelector(".notification__past").textContent = `${
        item.messages[item.messages.length - 1].full_name
      }: ${item.messages[item.messages.length - 1].body}...`;
    }
    //click on the chat
    newChat.addEventListener("click", (evt) => {
      newChat
        .querySelector(".notification__unread")
        .classList.add("js-nodisplay");
      NotificationAPI.getMessages(item.id, data.samaccountname, renderMessages);
      item.notification_author == data.samaccountname
        ? document
            .querySelector(".notification__admin-btn--remove")
            .classList.remove("js-nodisplay")
        : document
            .querySelector(".notification__admin-btn--remove")
            .classList.add("js-nodisplay");

      if (
        document
          .querySelector(".notification__chats-wrapper")
          .classList.contains("js-nodisplay")
      ) {
        document
          .querySelector(".notification__chats-wrapper")
          .classList.remove("js-nodisplay");
      }
      const headline = document.querySelector(
        ".notification__headline"
      ) as HTMLElement;
      headline.dataset.id = item.id.toString();
      if (item.notification_service != null) {
        headline.querySelector(".notification__service").textContent =
          item.notification_service;
      }
      if (item.participants.length == 2 && item.participants[0].full_name) {
        item.participants.forEach((participant) => {
          if (participant.full_name != data.cn) {
            headline.querySelector(".notification__author").textContent =
              participant.full_name;
          }
        });
      }
      if (item.participants.length > 2) {
        headline.querySelector(".notification__author").textContent =
          "Групповой чат";
        headline.querySelector(
          ".notification__participants"
        ).textContent = `${item.participants.length} участников`;
      }
      if (item.participants.length == 2) {
        headline.querySelector(".notification__participants").textContent =
          "2 участника";
        item.participants.forEach((participant) => {
          if (participant.full_name != data.cn) {
            newChat.querySelector(".notification__author").textContent =
              participant.full_name;
          }
        });
      }

      if (item.participants.length == 1) {
        headline.querySelector(".notification__participants").textContent =
          "1 участник";
        headline.querySelector(".notification__author").textContent = "";
      }
      (document.querySelector(".chats_id") as HTMLInputElement).value =
        item.id.toString();
      headline.querySelector(".notification__theme").textContent =
        item.notification_theme;
    });
    newChat.dataset.id = item.id.toString();
    container.appendChild(newChat);
  });
};
//update chats on the click
document
  .querySelector(".notification__update-chats")
  .addEventListener("click", (evt) => {
    updateChats();
    const deg = 180;
    const actualDeg = (evt.target as HTMLElement).style.transform.replace(
      /[^\d;]/g,
      ""
    );
    const summ = deg + +actualDeg;
    (evt.target as HTMLElement).style.transform = `rotate(${summ}deg)`;
  });

//post message
const form = document.querySelector(".notification__form") as HTMLFormElement;
form.addEventListener("submit", (evt) => {
  (
    document.querySelector(".notification__info-input") as HTMLInputElement
  ).required = true;
  evt.preventDefault();
  document
    .querySelectorAll(".notification__label-file--true")
    .forEach((item) => item.classList.remove("notification__label-file--true"));

  const formData = new FormData(evt.target as HTMLFormElement);
  const data = JSON.parse(sessionStorage.getItem("auth"));
  formData.append("account_number", data.samaccountname);
  formData.append("full_name", data.cn);
  const updateChat = () => {
    const chatId = Number(
      (form.querySelector(".chats_id") as HTMLInputElement).value
    );
    NotificationAPI.getMessages(chatId, data.samaccountname, renderMessages);
  };
  NotificationAPI.postMessage(formData, updateChats, updateChat);
  form.reset();
});

//new chat
const buttonNewChat = document.querySelector(".notification__new-chat");
buttonNewChat.addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("js-nodisplay");
});

const resetForm = () => {
  (document.querySelector(".modal__form") as HTMLFormElement).reset();
  const inputs = document
    .querySelector(".modal__form")
    .querySelectorAll(".notification__search-wrapper");
  for (let i = 0; i < inputs.length; i++) {
    if (i != 0) {
      inputs[i].remove();
    }
  }
  document.querySelector(".modal").classList.add("js-nodisplay");
  document.querySelector(".notification__list-search").textContent = "";
  document.querySelector(".notification__validation").textContent = "";
};

//close modal
const buttonCloseModal = document.querySelector(".notification__reset");
buttonCloseModal.addEventListener("click", resetForm);

//add new participants in new chats
const inputSearch = document.querySelector(".notification__input--name");

const handlerValidation = (evt: Event) => {
  const parent = (evt.target as HTMLElement).closest(
    ".notification__search-wrapper"
  ) as HTMLElement;
  (parent.querySelector(".input--account") as HTMLInputElement).value = "";
  parent.querySelector(".notification__validation").textContent = "";
  parent.querySelector(".notification__list-search").textContent = "";
  if ((evt.target as HTMLInputElement).value.length > 2) {
    const formData = new FormData();
    formData.append("search", (evt.target as HTMLInputElement).value);
    formData.append("sono", "");
    PhoneAPI.postUsers(formData, (data: TYPE_AUTH[]) => {
      if (data.length == 0) {
        parent.querySelector(
          ".notification__validation"
        ).textContent = `Ничего не найдено, измените условия поиска`;
      }
      if (data.length >= 40) {
        parent.querySelector(
          ".notification__validation"
        ).textContent = `Продолжайте вводить, результатов поиска: ${data.length}`;
      }
      if (data.length <= 39) {
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("notification__find");
          li.innerHTML = `${item.cn} <br> ${item.company}<br> ${item.department} <hr>`;
          parent.querySelector(".notification__list-search").appendChild(li);
          li.addEventListener("click", () => {
            (evt.target as HTMLInputElement).value = item.cn;
            (
              parent.querySelector(".input--account") as HTMLInputElement
            ).value = item.samaccountname;
            parent.querySelector(".notification__list-search").textContent = "";
            parent.querySelector(".notification__validation").textContent = "";
          });
        });
      }
    });
  }
};

inputSearch.addEventListener("input", debounce(handlerValidation, 500));

const addPart = (data, userObj) => {
  const idChat = data.id;

  const dataPart = {
    account_number: userObj.samaccountname,
    full_name: userObj.name,
  };

  updateChats;
};

//new chat submit
const modalForm = document.querySelector(".modal__form");
modalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (
    (modalForm.querySelector(".input--account") as HTMLInputElement).value == ""
  ) {
    showMessage("Добавьте хотя бы одного участника из выпадающего списка");
  } else {
    const inputTheme = (evt.target as HTMLFormElement).querySelector(
      'input[name="notification_theme"]'
    ) as HTMLInputElement;
    const data = JSON.parse(sessionStorage.getItem("auth"));
    const dataChat = {
      notification_theme: inputTheme.value,
      notification_author: data.samaccountname,
      notification_fullname: data.cn,
    };

    const name: string = (
      modalForm.querySelector(".notification__input--name") as HTMLInputElement
    ).value;

    const samaccountnameUser: string = (
      modalForm.querySelector(".input--account") as HTMLInputElement
    ).value;
    NotificationAPI.postChat(dataChat, addPart);
    document.querySelector(".modal").classList.add("js-nodisplay");
    resetForm();
  }
});

const handlerAddParticipant = (evt: Event) => {
  const container = (evt.target as HTMLElement).closest(
    ".notification__participants-wrapper"
  );
  const template = (
    document.querySelector(".extra-participant") as HTMLTemplateElement
  ).content.querySelector(".notification__search-wrapper");
  const newParticipant = template.cloneNode(true) as HTMLElement;
  newParticipant
    .querySelector(".notification__input--name")
    .addEventListener("input", handlerValidation);
  newParticipant
    .querySelector(".notification__button-remove")
    .addEventListener("click", (evt) => {
      (evt.target as HTMLElement)
        .closest(".notification__search-wrapper")
        .remove();
    });
  container.appendChild(newParticipant);
};

const buttonsExtra = document.querySelectorAll(".notification__button-add");
buttonsExtra.forEach((button) => {
  button.addEventListener("click", handlerAddParticipant);
});

//control logic admin panel
//open modal add participants
const modalSecond = document.querySelector(".notification__modal");
document
  .querySelector(".notification__admin-btn--modal")
  .addEventListener("click", (evt) => {
    const id = (
      (evt.target as HTMLElement).closest(
        ".notification__headline"
      ) as HTMLElement
    ).dataset.id;
    (modalSecond.querySelector(".id") as HTMLInputElement).value = id;
    modalSecond.classList.remove("js-nodisplay");
  });

//close modal
modalSecond
  .querySelector(".notification__reset")
  .addEventListener("click", () => {
    modalSecond.classList.add("js-nodisplay");
    const inputs = document
      .querySelector(".modal__form")
      .querySelectorAll(".notification__search-wrapper");
    for (let i = 0; i < inputs.length; i++) {
      if (i != 0) {
        inputs[i].remove();
      }
    }
    (document.querySelector(".modal__form--new") as HTMLFormElement).reset();
  });

//input handler
modalSecond
  .querySelector(".notification__input--name")
  .addEventListener("input", handlerValidation);

//second submit add new participant

modalSecond.querySelector(".modal__form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (
    (modalSecond.querySelector(".input--account") as HTMLInputElement).value ==
    ""
  ) {
    showMessage("Добавьте хотя бы одного участника из выпадающего списка");
  } else {
    const logicAfterAdd = (datas: TYPE_CHAT_PARTICIPANT[]) => {
      updateChats();

      const itemId: HTMLInputElement = modalSecond.querySelector(".id");
      const id = itemId.value;
      NotificationAPI.getMessages(id, samaccountname, renderMessages);

      if (datas.length >= 3) {
        document
          .querySelector(".notification__headline")
          .querySelector(
            ".notification__participants"
          ).textContent = `${datas.length} участников`;

        document.querySelector(".notification__author").textContent =
          "Групповой чат";
      }
      if (datas.length == 2) {
        document
          .querySelector(".notification__headline")
          .querySelector(
            ".notification__participants"
          ).textContent = `2 участника`;
        datas.forEach((participant) => {
          if (participant.full_name != data.cn) {
            document
              .querySelector(".notification__headline")
              .querySelector(".notification__author").textContent =
              participant.full_name;
          }
        });
      }
    };

    const form = evt.target as HTMLElement;
    const fullName = (
      form.querySelector(".notification__input--name") as HTMLInputElement
    ).value;
    const accountNumber = (
      document.querySelector(".input--account") as HTMLInputElement
    ).value;
    const formData = new FormData(evt.target as HTMLFormElement);
    const dataPraticipant = {
      account_number: accountNumber,
      full_name: fullName,
    };
    const idChat = (modalSecond.querySelector(".id") as HTMLInputElement).value;
    NotificationAPI.postNewParticipants(dataPraticipant, idChat, logicAfterAdd);
    (evt.target as HTMLElement).closest(".modal").classList.add("js-nodisplay");
    (modalSecond.querySelector(".modal__form") as HTMLFormElement).reset();
  }
});

//render participants in chat

const renderParticipants = (myData: TYPE_CHAT_PARTICIPANT[]) => {
  const container = document.querySelector(".notification__messages");
  document
    .querySelectorAll(".notification__participant")
    .forEach((item) => item.remove());
  myData.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("notification__participant");
    const name = document.createElement("span");
    name.textContent = item.full_name;
    const del = document.createElement("button");
    del.dataset.id = String(item.id);
    del.classList.add("notification__participant-button");
    del.addEventListener("click", (evt) => {
      const logicAfterRemove = (datas: TYPE_CHAT_PARTICIPANT[]) => {
        if (datas.length >= 3) {
          document
            .querySelector(".notification__headline")
            .querySelector(
              ".notification__participants"
            ).textContent = `${datas.length} участников`;
        }
        if (datas.length == 2) {
          document
            .querySelector(".notification__headline")
            .querySelector(".notification__participants").textContent =
            "2 участника";
          datas.forEach((participant) => {
            if (participant.full_name != data.cn) {
              document
                .querySelector(".notification__headline")
                .querySelector(".notification__author").textContent =
                participant.full_name;
            }
          });
        }
        if (datas.length == 1) {
          document
            .querySelector(".notification__headline")
            .querySelector(".notification__participants").textContent =
            "1 участник";
          document
            .querySelector(".notification__headline")
            .querySelector(".notification__author").textContent = "";
        }

        li.remove();
        updateChats();
      };

      const idUser = +(evt.target as HTMLButtonElement).dataset.id;
      NotificationAPI.removeParticipant(
        item.chats_id,
        idUser,
        logicAfterRemove
      );
    });
    li.append(name, del);
    container.appendChild(li);
  });
  container.scrollTop = container.scrollHeight;
};

//show participants

document
  .querySelector(".notification__participants")
  .addEventListener("click", (evt) => {
    const id = (
      (evt.target as HTMLElement).closest(
        ".notification__headline"
      ) as HTMLElement
    ).dataset.id;
    NotificationAPI.getParticipants(id, renderParticipants);
  });

//remove chat
document
  .querySelector(".notification__admin-btn--remove")
  .addEventListener("click", (evt) => {
    const parentChatsId = evt.target as HTMLElement;
    const id = (parentChatsId.closest(".notification__headline") as HTMLElement)
      .dataset.id;

    NotificationAPI.removeChat(id, updateChats);
    document
      .querySelector(".notification__chats-wrapper")
      .classList.add("js-nodisplay");
  });

//exit chat
document
  .querySelector(".notification__admin-btn--exit")
  .addEventListener("click", (evt) => {
    const logicAfterExit = () => {
      updateChats();
      document
        .querySelector(".notification__chats-wrapper")
        .classList.add("js-nodisplay");
    };
    const id = (
      (evt.target as HTMLElement).closest(
        ".notification__headline"
      ) as HTMLElement
    ).dataset.id;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("account_number", data.samaccountname);
    NotificationAPI.postExit(formData, logicAfterExit);
  });

//file input

document
  .querySelector(".notification__file")
  .addEventListener("click", (evt) => {
    if ((evt.target as HTMLInputElement).value) {
      evt.preventDefault();
      (evt.target as HTMLInputElement).value = "";
      (evt.target as HTMLInputElement)
        .closest(".notification__label-file")
        .classList.remove("notification__label-file--true");
      (
        document.querySelector(".notification__info-input") as HTMLInputElement
      ).required = true;
    }
  });

document
  .querySelector(".notification__file")
  .addEventListener("change", (evt) => {
    if ((evt.target as HTMLInputElement).value) {
      (evt.target as HTMLInputElement)
        .closest(".notification__label-file")
        .classList.add("notification__label-file--true");
      (
        document.querySelector(".notification__info-input") as HTMLInputElement
      ).required = false;
    }
  });
// } else {
//   // showMessage("Permission denied");
// }
