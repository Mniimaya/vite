import { WeekendAPI } from "../../js/API/weekendApi";
import { IRequest, ITrip } from "./handlers-create";
import {
  closeEditModal,
  closeModal,
  editTrip,
  getInfo,
  openModal,
  searchHotel,
} from "./helpers";
import { creator001 } from "./role";

//редактирование путевок и отправка на сервер
const saveEditTrips = () => {
  const form = document.querySelector(".edit-form__trip");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data: ITrip = {};
    const checkIn = (
      form.querySelector(".edit-form__input--checkin") as HTMLInputElement
    ).value;
    const checkOut = (
      form.querySelector(".edit-form__input--checkout") as HTMLInputElement
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
    data.dates = `${newCheckIn} - ${newCheckOut}`;
    data.hotel = (
      (evt.target as HTMLFormElement).querySelector(
        ".edit-form__select--hotel"
      ) as HTMLInputElement
    ).value;
    data.house = (
      (evt.target as HTMLFormElement).querySelector(
        ".form__select--house"
      ) as HTMLInputElement
    ).value;
    data.room = (
      (evt.target as HTMLFormElement).querySelector(
        ".edit-form__select--room"
      ) as HTMLInputElement
    ).value;
    data.half = (
      (evt.target as HTMLFormElement).querySelector(
        'input[name="hot"]'
      ) as HTMLInputElement
    ).value;
    data.hot = (
      (evt.target as HTMLFormElement).querySelector(
        'input[name="super"]'
      ) as HTMLInputElement
    ).value;
    data.status = "0";
    WeekendAPI.patch(
      data,
      +(document.querySelector(".modal__edit") as HTMLElement).dataset.id
    );
  });
};

//События по клику редактирования путевки
const editTrips = () => {
  const btnsEdit = document.querySelectorAll(".weekend__btn--edit");
  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", editTrip);
    const btnCloseEditModal = document.querySelector(".edit-form__btn--reset");
    btnCloseEditModal.addEventListener("click", closeEditModal);
  });
};

//удаление путевок
const delTrips = () => {
  const sendSuccess = (evt: Event) => {
    const trip = (evt.target as HTMLElement).parentElement.parentElement;
    trip.remove();
  };
  const formDel = document.querySelectorAll(".weekend__data-form--del");
  formDel.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target as HTMLFormElement);
      WeekendAPI.postDel(
        sendSuccess,
        (
          (evt.target as HTMLInputElement).querySelector(
            ".weekend__request-id--reject"
          ) as HTMLInputElement
        ).value,
        evt
      );
    });
  });
};
const modal = document.querySelector(".modal");

const handlerTrip = () => {
  // Клонирование и размещение новой брони на вкладке поданные заявки

  const requestForm = modal.querySelector(".modal__form");
  requestForm.addEventListener("submit", (evt) => {
    const data: IRequest = {};
    evt.preventDefault();
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    if (auth) {
      data.login = auth.samaccountname;
      data.sono = auth.sono;
      data.title = auth.title;
      //здесь;
      data.name = (
        requestForm.querySelector(".modal__input--guest") as HTMLInputElement
      ).value;
      data.tel = (
        requestForm.querySelector(".modal__input--tel") as HTMLInputElement
      ).value;
      data.mail = (
        requestForm.querySelector(".modal__input--mail") as HTMLInputElement
      ).value;
      data.work = (
        requestForm.querySelector(".modal__input--work") as HTMLInputElement
      ).value;
      data.info = (
        requestForm.querySelector(".modal__input--info") as HTMLInputElement
      ).value;
      data.status = "1";
      if (
        (
          requestForm.querySelector(
            ".modal__input--radio-part"
          ) as HTMLInputElement
        ).checked
      ) {
        data.part = "1";
        data.freedate = (
          requestForm.querySelector(
            ".modal__input--free-date"
          ) as HTMLInputElement
        ).value;

        requestForm
          .querySelectorAll(".modal__input--radio-date")
          .forEach((radio: HTMLInputElement) => {
            if (radio.checked) {
              data.newdate = radio.value;
            }
          });
      }

      data.comments = (
        requestForm.querySelector(".modal__input--comment") as HTMLInputElement
      ).value;
      (requestForm as HTMLFormElement).reset();
      requestForm
        .querySelectorAll(".child__wrapper")
        .forEach((item) => item.remove());
      WeekendAPI.patch(
        data,
        (
          (evt.target as HTMLElement).querySelector(
            ".modal__input--id"
          ) as HTMLInputElement
        ).value
      );
    }
  });
  // Добавление детей в форму бронирования

  const btnAddChild = document.querySelector(".modal__button-child");
  const templateChild = (
    document.querySelector(".child") as HTMLTemplateElement
  ).content;
  const addChild = () => {
    btnAddChild.addEventListener("click", (evt) => {
      evt.preventDefault();
      const containerChild = document.querySelector(".modal_wrapper-child");
      //добавляем ребенка с обработчиком удаления
      const newChild = templateChild.cloneNode(true) as HTMLElement;
      newChild
        .querySelector(".modal__button-child--remove")
        .addEventListener("click", (evt) => {
          (evt.target as HTMLElement).closest(".child__wrapper").remove();
          getInfo(evt);
        });
      containerChild.appendChild(newChild);
      //обновляем информацию в инпутах
      getInfo(evt);
    });
  };

  addChild();

  //закрытие модального окна на странице путевок
  const btnCloseModal = modal.querySelector(".modal__btn-reset");
  btnCloseModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    closeModal();
  });
};
//открытие модального окна бронирования
const getOrder = () => {
  const btnTripsOrder = document.querySelectorAll(".weekend__btn--order");
  btnTripsOrder.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
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
      const parent = (evt.target as HTMLElement).closest(
        ".weekend__row"
      ) as HTMLElement;
      const dates = parent.querySelector(".weekend__data--dates").textContent;
      const checkIn = dates.slice(0, 8);
      const checkOut = dates.slice(11);
      parent.classList.add("js-nodisplay");
      openModal();
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      if (auth) {
        (
          modal.querySelector(".modal__input--guest") as HTMLInputElement
        ).value = auth.cn;
        (
          modal.querySelector(".modal__input--title") as HTMLInputElement
        ).value = auth.title;
        (modal.querySelector(".modal__input--mail") as HTMLInputElement).value =
          auth.mail;
        (modal.querySelector(".modal__input--work") as HTMLInputElement).value =
          auth.telephonenumber;
      }
      (modal.querySelector(".modal__input--hotel") as HTMLInputElement).value =
        parent.querySelector(".weekend__data--hotel").textContent.trim();
      (modal.querySelector(".modal__input--house") as HTMLInputElement).value =
        parent.querySelector(".weekend__data--house").textContent;
      (modal.querySelector(".modal__input--room") as HTMLInputElement).value =
        parent.querySelector(".weekend__data--room").textContent;
      const year = date.getFullYear().toString().slice(2);
      (
        modal.querySelector(".modal__input--date") as HTMLInputElement
      ).value = `${day}.${month}.${year}`;
      (modal.querySelector(".modal__input--id") as HTMLInputElement).value =
        parent.dataset.id;
      (modal.querySelector(".modal__input--number") as HTMLInputElement).value =
        parent.querySelector(".weekend__data--number").textContent;
      (modal.querySelector(".modal__input--dates") as HTMLInputElement).value =
        parent.querySelector(".weekend__data--dates").textContent;
      (
        modal.querySelector(".modal__input--checkin") as HTMLInputElement
      ).value = checkIn;
      (
        modal.querySelector(".modal__input--checkout") as HTMLInputElement
      ).value = checkOut;
      if (parent.dataset.part == "2") {
        (
          modal.querySelector(".modal__input--radio") as HTMLInputElement
        ).value = "2";
      }
      //подсчёт количества дней путевки
      const checkInMonth = +checkIn.slice(3, 5);
      const checkOutMonth = +checkOut.slice(3, 5);
      const checkInDay = +checkIn.slice(0, 2);
      const checkOutDay = +checkOut.slice(0, 2);
      const checkInYear = +checkIn.slice(6, 8);
      const checkOutYear = +checkOut.slice(6, 8);
      //считаем количество дней в путевке
      let all;
      //количество дней до конца месяца
      let firstPart;
      //количество дней в месяце
      let dayPerMonth;

      if (
        checkInMonth == 1 ||
        checkInMonth == 3 ||
        checkInMonth == 5 ||
        checkInMonth == 7 ||
        checkInMonth == 8 ||
        checkInMonth == 10 ||
        checkInMonth == 12
      ) {
        dayPerMonth = 31;
      }

      if (
        checkInMonth == 4 ||
        checkInMonth == 6 ||
        checkInMonth == 9 ||
        checkInMonth == 11
      ) {
        dayPerMonth = 30;
      }

      if (checkInMonth == 2) {
        if (
          checkInYear == 24 ||
          checkInYear == 28 ||
          checkInYear == 32 ||
          checkInYear == 36 ||
          checkInYear == 40
        ) {
          dayPerMonth = 29;
        } else {
          dayPerMonth = 28;
        }
      }
      //новый день выезда первой половины
      let newCheckOutDay;

      //новая день заезда второй половины
      let newCheckInDay;

      //новый месяц выезда первой половины
      let newCheckOutMonth = checkInMonth;

      //новый месяц заезда второй половины
      let newCheckInMonth = checkInMonth;

      //новый год выезда первой половины
      let newCheckOutYear = checkInYear;

      //новый год заезда второй половины
      let newCheckInYear = checkInYear;

      //считаем количество дней в путевке

      if (checkInMonth == checkOutMonth) {
        all = checkOutDay - checkInDay + 1;
      } else {
        //считаем в не високосные года количество дней до конца месяца
        firstPart = dayPerMonth - checkInDay + 1;
        all = firstPart + checkOutDay;
      }

      // Если четное количество дней можем предложить забронировать половину
      if (all == 18) {
        if (
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.contains("js-nodisplay")
        ) {
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.remove("js-nodisplay");
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.add("js-displayflex");
        }
        const half = all / 2 - 1;
        //определяем день выезда первой половины
        if (checkInDay + half <= dayPerMonth) {
          newCheckOutDay = checkInDay + half;
        } else {
          newCheckOutDay = checkInDay + half - dayPerMonth;
          newCheckOutMonth = newCheckOutMonth + 1;
        }

        //определяем день заезда второй половины
        newCheckInDay = newCheckOutDay + 1;

        if (newCheckInDay > dayPerMonth) {
          newCheckInDay = newCheckInDay - dayPerMonth;
          newCheckInMonth = newCheckInMonth + 1;
        }

        //проверяем переход через год выезд
        if (newCheckOutMonth > 12) {
          newCheckOutMonth = newCheckOutMonth - 12;
          newCheckOutYear = newCheckOutYear + 1;
        }

        //проверяем переход через год второй заезд
        if (newCheckInMonth > 12) {
          newCheckInMonth = newCheckInMonth - 12;
          newCheckInYear = newCheckInYear + 1;
        }

        //проверяем новый день на больше или меньше 10
        if (newCheckOutDay < 10) {
          newCheckOutDay = "0" + newCheckOutDay;
        }

        if (newCheckInDay < 10) {
          newCheckInDay = "0" + newCheckInDay;
        }

        //проверяем новый месяц на больше или меньше 10
        if (newCheckOutMonth < 10) {
          newCheckOutMonth = +("0" + newCheckOutMonth);
        }

        if (newCheckInMonth < 10) {
          newCheckInMonth = +("0" + newCheckInMonth);
        }

        const newCheckOutDate = `${newCheckOutDay}.${newCheckOutMonth}.${newCheckOutYear}`;
        const newCheckInDate = `${newCheckInDay}.${newCheckInMonth}.${newCheckInYear}`;
        modal.querySelector(
          ".modal__radio-title--first"
        ).textContent = `${checkIn} - ${newCheckOutDate}`;
        (
          modal.querySelector(".modal__input--first-date") as HTMLInputElement
        ).value = `${checkIn} - ${newCheckOutDate}`;
        modal.querySelector(
          ".modal__radio-title--second"
        ).textContent = `${newCheckInDate} - ${checkOut}`;
        (
          modal.querySelector(".modal__input--second-date") as HTMLInputElement
        ).value = `${newCheckInDate} - ${checkOut}`;
        (
          modal.querySelector(".modal__input--free-date") as HTMLInputElement
        ).value = `${newCheckInDate} - ${checkOut}`;
      } else {
        if (
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.contains("js-displayflex")
        ) {
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.remove("js-displayflex");
          modal
            .querySelector(".modal__fieldset-radio--part")
            .classList.add("js-nodisplay");
        }
      }

      modal.addEventListener("change", (evt) => {
        getInfo(evt);
      });
      modal.addEventListener("input", (evt) => {
        getInfo(evt);
      });
      modal.querySelector(".modal__btn-reset").addEventListener("click", () => {
        const partDate = modal.querySelector(
          ".modal__fieldset-radio--part-date"
        );
        if (partDate.classList.contains("js-displayflex")) {
          partDate.classList.remove("js-displayflex");
          partDate.classList.add("js-nodisplay");
          const radios = partDate.querySelectorAll(".modal__input--radio-date");
          radios.forEach((radio: HTMLInputElement) => {
            radio.disabled = true;
          });
        }
        (modal.querySelector(".modal__form") as HTMLFormElement).reset();
        parent.classList.remove("js-nodisplay");
      });
    });
  });
  // добавление события отлика на радио половины путевки
  modal.addEventListener("change", () => {
    const partDate = modal.querySelector(".modal__fieldset-radio--part-date");
    const part = modal.querySelector(
      ".modal__input--radio-part"
    ) as HTMLInputElement;
    const radios = partDate.querySelectorAll(".modal__input--radio-date");
    if (part.checked) {
      partDate.classList.remove("js-nodisplay");
      partDate.classList.add("js-displayflex");
      radios.forEach((radio: HTMLInputElement) => {
        radio.disabled = false;
      });
    } else {
      partDate.classList.add("js-nodisplay");
      partDate.classList.remove("js-displayflex");
      radios.forEach((radio: HTMLInputElement) => {
        radio.disabled = true;
      });
    }
  });
};

//обработчики событий данных с сервера
export const setEventAfterLoadTrips = () => {
  if (creator001) {
    delTrips();
    editTrips();
    saveEditTrips();
  }
  getOrder();
  searchHotel();
  handlerTrip();
};
