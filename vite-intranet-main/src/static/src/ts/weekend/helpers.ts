import { clearQueryParams } from "../util";

//редактирование путевки
export const editTrip = (evt: Event) => {
  const date = new Date();
  let dayActual = date.getDate();
  let day;
  let month;
  if (dayActual < 10) {
    day = `0${dayActual}`;
  } else {
    day = dayActual;
  }
  let monthActual = date.getMonth() + 1;
  if (monthActual < 10) {
    month = `0${monthActual}`;
  } else {
    month = monthActual;
  }
  const modal = document.querySelector(".modal__edit");
  if (modal.classList.contains("js-edit-nodisplay")) {
    modal.classList.remove("js-edit-nodisplay");
    modal.classList.add("js-edit-display");
  }

  const parent = (evt.target as HTMLElement).closest(
    ".weekend__row"
  ) as HTMLElement;
  (modal as HTMLElement).dataset.id = parent.dataset.id;
  const year = date.getFullYear().toString().slice(2);

  (
    modal.querySelector(".edit-form__input--date") as HTMLInputElement
  ).value = `${day}.${month}.${year}`;
  const optionsHotel = modal.querySelectorAll(".option--hotel");
  for (let i = 0; i < optionsHotel.length; i++) {
    if (
      (optionsHotel[i] as HTMLOptionElement).value ==
      parent.querySelector(".weekend__data-link").textContent
    ) {
      (optionsHotel[i] as HTMLOptionElement).selected = true;
    }
  }
  const optionsRoom = modal.querySelectorAll(".option--room");
  for (let i = 0; i < optionsRoom.length; i++) {
    if (
      (optionsRoom[i] as HTMLOptionElement).value ==
      parent.querySelector(".weekend__data--room").textContent
    ) {
      (optionsRoom[i] as HTMLOptionElement).selected = true;
    }
  }
  const optionsHouse = modal.querySelectorAll(".option--house");
  for (let i = 0; i < optionsHouse.length; i++) {
    console.log(
      +(optionsHouse[i] as HTMLOptionElement).value ==
        +parent.querySelector(".weekend__data--house").textContent
    );
    if (
      +(optionsHouse[i] as HTMLOptionElement).value ==
      +parent.querySelector(".weekend__data--house").textContent
    ) {
      (optionsHouse[i] as HTMLOptionElement).selected = true;
    }
  }
  if (
    parent
      .querySelector(".weekend__data--date")
      .classList.contains("weekend__data--hot")
  ) {
    (
      modal.querySelector(".edit-form__input--true") as HTMLInputElement
    ).checked = true;
  }
  if (
    parent
      .querySelector(".weekend__data--date")
      .classList.contains("weekend__data--super")
  ) {
    (
      modal.querySelector(".edit-form__input--super") as HTMLInputElement
    ).checked = true;
  }
  const dates = parent.querySelector(".weekend__data--dates").textContent;
  (
    modal.querySelector(".edit-form__input--checkin") as HTMLInputElement
  ).value =
    20 +
    dates[6] +
    dates[7] +
    "-" +
    dates[3] +
    dates[4] +
    "-" +
    dates[0] +
    dates[1];
  (
    modal.querySelector(".edit-form__input--checkout") as HTMLInputElement
  ).value =
    20 +
    dates[17] +
    dates[18] +
    "-" +
    dates[14] +
    dates[15] +
    "-" +
    dates[11] +
    dates[12];
  const checkIn = (
    modal.querySelector(".edit-form__input--checkin") as HTMLInputElement
  ).value;
  const checkOut = (
    modal.querySelector(".edit-form__input--checkout") as HTMLInputElement
  ).value;
  const newCheckIn =
    checkIn[8] +
    checkIn[9] +
    "." +
    checkIn[5] +
    checkIn[6] +
    "." +
    checkIn[2] +
    checkIn[3];
  const newCheckOut =
    checkOut[8] +
    checkOut[9] +
    "." +
    checkOut[5] +
    checkOut[6] +
    "." +
    checkOut[2] +
    checkOut[3];
  (
    modal.querySelector(".edit-form__input--dates") as HTMLInputElement
  ).value = `${newCheckIn} - ${newCheckOut}`;

  modal.addEventListener("change", (evt) => {
    if (
      (evt.target as HTMLElement).classList.contains(
        "edit-form__input--checkin"
      ) ||
      (evt.target as HTMLElement).classList.contains(
        "edit-form__input--checkout"
      )
    ) {
      const checkIn = (
        modal.querySelector(".edit-form__input--checkin") as HTMLInputElement
      ).value;
      const checkOut = (
        modal.querySelector(".edit-form__input--checkout") as HTMLInputElement
      ).value;
      const newCheckIn =
        checkIn[8] +
        checkIn[9] +
        "." +
        checkIn[5] +
        checkIn[6] +
        "." +
        checkIn[2] +
        checkIn[3];
      const newCheckOut =
        checkOut[8] +
        checkOut[9] +
        "." +
        checkOut[5] +
        checkOut[6] +
        "." +
        checkOut[2] +
        checkOut[3];
      (
        modal.querySelector(".edit-form__input--dates") as HTMLInputElement
      ).value = `${newCheckIn} - ${newCheckOut}`;
    }
  });
};

//закрытие модального окна редактирования путевок
export const closeEditModal = () => {
  const modal = document.querySelector(".modal__edit");
  if (modal.classList.contains("js-edit-display")) {
    modal.classList.remove("js-edit-display");
    modal.classList.add("js-edit-nodisplay");
  }
};

//Открытие модального окна
const modal = document.querySelector(".modal");
export const openModal = () => {
  if (modal.classList.contains("js-modal-nodisplay")) {
    modal.classList.remove("js-modal-nodisplay");
    modal.classList.add("js-modal-display");
  }
};

//добавление информации о взрослых

const addAdult = (quality: number) => {
  const adults = document.querySelectorAll(".adult__wrapper");
  const templateAdult = (
    document.querySelector(".adult-template") as HTMLTemplateElement
  ).content;
  const containerAdult = document.querySelector(".adult");

  if (adults.length > 0) {
    adults.forEach((item) => item.remove());
  }
  for (let i = 1; i < quality; i++) {
    const newAdult = templateAdult.cloneNode(true);
    containerAdult.appendChild(newAdult);
  }
};

//событие обновления информации при бронировании

export const getInfo = (evt: Event) => {
  const modal = document.querySelector(".modal");
  const target = evt.target as HTMLElement;
  if (target.classList.contains("modal__select--adult")) {
    const quality = +(
      modal.querySelector(".modal__select--adult") as HTMLInputElement
    ).value;
    addAdult(quality);
  }
  if (
    target.classList.contains("modal__button-child--remove") ||
    target.classList.contains("modal__select--adult-person") ||
    target.classList.contains("modal__input--adult-person") ||
    target.classList.contains("modal__select--adult") ||
    target.classList.contains("modal__select--place") ||
    target.classList.contains("modal__select--child") ||
    target.classList.contains("modal__input--child")
  ) {
    const adultsWrapper = document.querySelectorAll(".adult__wrapper");
    let personsMessage = ``;
    if (adultsWrapper.length > 0) {
      adultsWrapper.forEach((adult) => {
        const role = (
          adult.querySelector(
            ".modal__select--adult-person"
          ) as HTMLInputElement
        ).value;
        const name = (
          adult.querySelector(".modal__input--adult-person") as HTMLInputElement
        ).value;
        personsMessage += `<br>${role}: ${name}`;
      });
    }

    const place = modal.querySelector(
      ".modal__select--place"
    ) as HTMLInputElement;
    let placeInfo = ``;
    if (place.value !== "0") {
      const quality = place.value;
      placeInfo = `доп мест: ${quality} <br>`;
    }

    const adults = (
      modal.querySelector(".modal__select--adult") as HTMLInputElement
    ).value;
    const childs = document.querySelectorAll(".modal__select--child");
    const childsFio = document.querySelectorAll(".modal__input--child");

    const childsQuality = childs.length;
    let message = ``;

    for (let i = 0; i < childs.length; i++) {
      message +=
        "<br>" +
        (childsFio[i] as HTMLInputElement).value +
        ": " +
        (childs[i] as HTMLInputElement).value;
    }

    if (childsQuality > 0) {
      (
        modal.querySelector(".modal__input--info") as HTMLInputElement
      ).value = `${placeInfo} взрослых: ${adults} ${personsMessage} <br> детей: ${childsQuality} ${message}`;
    }

    if (childsQuality < 1) {
      (
        modal.querySelector(".modal__input--info") as HTMLInputElement
      ).value = `${placeInfo} взрослых: ${adults} ${personsMessage}`;
    }
  }
  const inputFreeDate = modal.querySelector(
    ".modal__input--free-date"
  ) as HTMLInputElement;

  const freeDate = modal.querySelectorAll(".modal__input--radio-date");
  freeDate.forEach((radio: HTMLInputElement) => {
    if (!radio.checked) {
      inputFreeDate.value = radio.value;
    }
  });
};

export const searchHotel = () => {
  const setFilter = (id: string) => {
    const hotels = document.querySelectorAll(".sort__input--checkbox-hotel");
    hotels.forEach((hotel: HTMLInputElement) => {
      if (hotel.value.toLowerCase().includes(id.toLowerCase())) {
        hotel.checked = true;
        (
          document.querySelector(
            ".sort__input--checkbox-hotelall"
          ) as HTMLInputElement
        ).checked = false;
        let event = new Event("change");
        document.querySelector(".sort__form").dispatchEvent(event);
      }
    });
  };

  // clearQueryParams("filter", "/service/weekend/0001-trips.html", setFilter); ??unknown function
};

//переключение между вкладками и удаление активной страницы
export const toggleTab = () => {
  const actual = document.querySelector(".button-service--active");
  if (actual) {
    actual.classList.remove("button-service--active");
  }
};

// Редактируем комментарии на вкладке подтвержденные заявки
//закрытие модального окна редактирование примечаний
const modalArchive = document.querySelector(".modal-archive");

const closeModalArchive = () => {
  const btnCloseModalArchive = document.querySelector(
    ".modal-archive__btn-close"
  );
  btnCloseModalArchive.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (modalArchive.classList.contains("js-archive-display")) {
      modalArchive.classList.remove("js-archive-display");
      modalArchive.classList.add("js-archive-nodisplay");
      (
        modalArchive.querySelector(".modal-archive__form") as HTMLFormElement
      ).reset();
    }
  });
};
export const setComment = () => {
  document.querySelectorAll(".weekend__archive--extra").forEach((item) => {
    item.addEventListener("dblclick", (evt) => {
      const target = evt.target as HTMLElement;
      if (modalArchive.classList.contains("js-archive-nodisplay")) {
        modalArchive.classList.remove("js-archive-nodisplay");
        modalArchive.classList.add("js-archive-display");
        (
          modalArchive.querySelector(
            ".modal-archive__input"
          ) as HTMLInputElement
        ).value = target.textContent;
        if (
          target
            .closest(".weekend__row--request")
            .classList.contains("weekend__request--reject")
        ) {
          (
            modalArchive.querySelector(
              ".modal-archive__input--reject"
            ) as HTMLInputElement
          ).checked = true;
        }
        (
          modalArchive.querySelector(".modal-archive__id") as HTMLInputElement
        ).value = (
          target.closest(".weekend__row--request") as HTMLElement
        ).dataset.id;
      }
      closeModalArchive();
    });
  });
};

//закрытие модального окна
export const closeModal = () => {
  if (modal.classList.contains("js-modal-display")) {
    modal.classList.remove("js-modal-display");
    modal.classList.add("js-modal-nodisplay");
    const adults = document.querySelectorAll(".adult__wrapper");
    if (adults.length > 0) {
      adults.forEach((item) => item.remove());
    }
    const childs = document.querySelectorAll(".child__wrapper");
    if (childs.length > 0) {
      childs.forEach((item) => item.remove());
    }
  }
};
