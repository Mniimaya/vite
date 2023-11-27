console.log("events before");

// import { WeekendAPI } from "../js/API/weekendApi.js";
// import { loaderTrue } from "./util";
// import { setEventAfterLoadTrips } from "./weekend/handlers-trips";
// import { renderTrips } from "./weekend/render-trips";
// import { getRoles } from "./weekend/role";
// import { handlerSort } from "./utils/sort";

// let auth;
// setTimeout(() => {
//   if (sessionStorage.getItem("auth") == null) {
//     console.log("not auth");
//   } else {
//     auth = JSON.parse(sessionStorage.getItem("auth"));
//     if (document.location.pathname == "/service/weekend/0001-trips.html") {
//       loaderTrue();
//       getRoles(auth).then(() =>
//         WeekendAPI.get(renderTrips, setEventAfterLoadTrips, 0)
//       );
//     } else {
//       getRoles(auth);
//     }
//   }
// }, 300);

// if (document.location.pathname == "/service/weekend/0001-faq.html") {
//   //раскрытие внутренней информации на вкладке FAQ

//   const titles = document.querySelectorAll(".faq__title");
//   titles.forEach((title) => {
//     title.addEventListener("click", (evt) => {
//       const parent = (evt.target as HTMLElement).parentElement as HTMLElement;
//       if (
//         parent.querySelector(".faq__links").classList.contains("js-nodisplay")
//       ) {
//         parent.querySelector(".faq__links").classList.remove("js-nodisplay");
//         parent.querySelector(".faq__links").classList.add("js-displayflex");
//       } else {
//         parent.querySelector(".faq__links").classList.remove("js-displayflex");
//         parent.querySelector(".faq__links").classList.add("js-nodisplay");
//       }
//     });
//   });
// }

// //сортировка таблицы

// const sortingOn = () => {
//   const form = document.querySelector(".sort__form");
//   const inputs = form.querySelectorAll(".sort__input");
//   inputs.forEach((input: HTMLInputElement) => (input.disabled = false));

//   const checkboxUniversalHotel = form.querySelector(
//     ".sort__input--checkbox-hotelall"
//   ) as HTMLInputElement;
//   const checkboxesHotel = form.querySelectorAll(".sort__input--checkbox-hotel");
//   const checkboxUniversalPlace = form.querySelector(
//     ".sort__input--checkbox-placeall"
//   ) as HTMLInputElement;
//   const checkboxesPlace = form.querySelectorAll(".sort__input--checkbox-place");
//   const checkboxUniversalRoom = form.querySelector(
//     ".sort__input--checkbox-roomall"
//   ) as HTMLInputElement;
//   const checkboxesRoom = form.querySelectorAll(".sort__input--checkbox-room");
//   form.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });
//   const sortingTable = (evt: Event) => {
//     const target = evt.target as HTMLInputElement;
//     console.log("sorting");
//     //события чекбоксов отелей
//     if (
//       target.classList.contains("sort__input--checkbox-hotel") &&
//       target.checked
//     ) {
//       checkboxUniversalHotel.checked = false;
//     }

//     if (
//       target.classList.contains("sort__input--checkbox-hotelall") &&
//       target.checked
//     ) {
//       checkboxesHotel.forEach(
//         (item: HTMLInputElement) => (item.checked = false)
//       );
//     }
//     //события чекбоксов мест
//     if (
//       target.classList.contains("sort__input--checkbox-place") &&
//       target.checked
//     ) {
//       checkboxUniversalPlace.checked = false;
//     }

//     if (
//       target.classList.contains("sort__input--checkbox-placeall") &&
//       target.checked
//     ) {
//       checkboxesPlace.forEach(
//         (item: HTMLInputElement) => (item.checked = false)
//       );
//     }
//     //события чекбоксов комнат
//     if (
//       target.classList.contains("sort__input--checkbox-room") &&
//       target.checked
//     ) {
//       checkboxUniversalRoom.checked = false;
//     }

//     if (
//       target.classList.contains("sort__input--checkbox-roomall") &&
//       target.checked
//     ) {
//       checkboxesRoom.forEach(
//         (item: HTMLInputElement) => (item.checked = false)
//       );
//     }

//     //ищем актуальную таблицу
//     let containerActual: HTMLElement;
//     const containers = document.querySelectorAll(".weekend__container");
//     containers.forEach((container: HTMLElement) => {
//       if (container.classList.contains("js-display")) {
//         containerActual = container;
//       }
//     });

//     const rowsNoDisplay = containerActual.querySelectorAll(
//       ".js-sortrownodisplay"
//     );
//     if (rowsNoDisplay.length > 0) {
//       rowsNoDisplay.forEach((row: HTMLElement) => {
//         row.classList.remove("js-sortrownodisplay");
//       });
//     }
//     //сортировка отелей
//     const hotelList = form.querySelector(".sort__list--hotel");
//     const hotelsValues: string[] = [];
//     const hotelsCheckboxes = hotelList.querySelectorAll(
//       "input[type=checkbox]:checked"
//     );
//     for (let i = 0; i < hotelsCheckboxes.length; i++) {
//       hotelsValues.push((hotelsCheckboxes[i] as HTMLInputElement).value);
//     }
//     const hotelsCell = containerActual.querySelectorAll(".hotel");
//     hotelsCell.forEach((cell) => {
//       if (!hotelsValues.includes(cell.textContent) && hotelsValues[0] !== "1") {
//         cell.closest(".weekend__row").classList.add("js-sortrownodisplay");
//       }
//     });
//     //сортировка мест
//     const placeList = form.querySelector(".sort__list--place");
//     const placeValues: string[] = [];
//     const placeCheckboxes = placeList.querySelectorAll(
//       "input[type=checkbox]:checked"
//     );
//     for (let i = 0; i < placeCheckboxes.length; i++) {
//       placeValues.push((placeCheckboxes[i] as HTMLInputElement).value);
//     }
//     const placeCell = containerActual.querySelectorAll(".place");
//     placeCell.forEach((cell) => {
//       const validate = (item: string) => cell.textContent.includes(item);
//       if (!placeValues.some(validate) && placeValues[0] !== "1") {
//         cell.closest(".weekend__row").classList.add("js-sortrownodisplay");
//       }
//     });

//     //сортировка комнат
//     const roomList = form.querySelector(".sort__list--room");
//     const roomValues: string[] = [];
//     const roomCheckboxes = roomList.querySelectorAll(
//       "input[type=checkbox]:checked"
//     );
//     for (let i = 0; i < roomCheckboxes.length; i++) {
//       roomValues.push((roomCheckboxes[i] as HTMLInputElement).value);
//     }
//     const roomCell = containerActual.querySelectorAll(".room");
//     roomCell.forEach((cell) => {
//       const validate = (item: string) => cell.textContent.includes(item);
//       if (!roomValues.some(validate) && roomValues[0] !== "1") {
//         cell.closest(".weekend__row").classList.add("js-sortrownodisplay");
//       }
//     });

//     //сортировка даты заезда
//     const checkin = (
//       form.querySelector(".sort__input--date-checkin") as HTMLInputElement
//     ).value;
//     const checkinOneValue =
//       checkin[2] +
//       checkin[3] +
//       checkin[5] +
//       checkin[6] +
//       checkin[8] +
//       checkin[9];
//     const checkinCell = containerActual.querySelectorAll(".dates");
//     checkinCell.forEach((cell) => {
//       const cellValue = cell.textContent;
//       const cellOneValue =
//         cellValue[6] +
//         cellValue[7] +
//         cellValue[3] +
//         cellValue[4] +
//         cellValue[0] +
//         cellValue[1];
//       if (checkinOneValue && cellOneValue < checkinOneValue) {
//         cell.closest(".weekend__row").classList.add("js-sortrownodisplay");
//       }
//     });

//     //сортировка даты выезда
//     const checkout = (
//       form.querySelector(".sort__input--date-checkout") as HTMLInputElement
//     ).value;
//     const checkoutOneValue =
//       checkout[2] +
//       checkout[3] +
//       checkout[5] +
//       checkout[6] +
//       checkout[8] +
//       checkout[9];

//     const checkoutCell = containerActual.querySelectorAll(".dates");
//     checkoutCell.forEach((cell) => {
//       const cellValue = cell.textContent;
//       const cellOneValue =
//         cellValue[17] +
//         cellValue[18] +
//         cellValue[14] +
//         cellValue[15] +
//         cellValue[11] +
//         cellValue[12];

//       if (checkoutOneValue && cellOneValue > checkoutOneValue) {
//         cell.closest(".weekend__row").classList.add("js-sortrownodisplay");
//       }
//     });
//     //сортировка по инпуту
//     const inputValue = form.querySelector(".sort__input--search");
//     const rows = containerActual.querySelectorAll(".weekend__row");
//     rows.forEach((row) => {
//       if (
//         !row.textContent
//           .toLowerCase()
//           .includes((inputValue as HTMLInputElement).value.toLowerCase()) &&
//         !row.classList.contains("weekend__row--headline")
//       ) {
//         row.classList.add("js-sortrownodisplay");
//       }
//     });
//   };
//   // form.removeEventListener('change', sortingTable)
//   // form.removeEventListener('input', sortingTable)
//   form.addEventListener("change", sortingTable);
//   form.addEventListener("input", sortingTable);
//   const resetBtn = form.querySelector(".sort__btn");
//   if (resetBtn) {
//     resetBtn.addEventListener("click", () => {
//       (form as HTMLFormElement).reset();
//       //ищем актуальную таблицу
//       let containerActual: HTMLElement;
//       const containers = document.querySelectorAll(".weekend__container");
//       containers.forEach((container: HTMLElement) => {
//         if (container.classList.contains("js-display")) {
//           containerActual = container;
//         }
//       });
//       const rowsNoDisplay = containerActual.querySelectorAll(
//         ".js-sortrownodisplay"
//       );
//       if (rowsNoDisplay.length > 0) {
//         rowsNoDisplay.forEach((row) => {
//           row.classList.remove("js-sortrownodisplay");
//         });
//       }
//     });
//   }
// };
// sortingOn();
// handlerSort();

console.log("events before");
document.querySelectorAll(".weekend__hotels-title")?.forEach((item) =>
  item.addEventListener("click", () => {
    console.log("hello from ts");
  })
);
// //обработчик события скрытия сортировки
// const sort = document.querySelector(".sort") as HTMLElement;
// let count = 0;
// const btnSort = sort.querySelector(".toggle-side");
// btnSort.addEventListener("click", (evt) => {
//   const mark = sort.querySelector(".toggle-side__mark--left");
//   if (count % 2 == 0) {
//     // sort.style.left = "0";
//     mark.classList.add("toggle-side__mark--left-active");
//     (
//       btnSort.querySelector(".toggle-side__text") as HTMLElement
//     ).style.visibility = "hidden";
//   } else {
//     // sort.style.left = "-275px";
//     mark.classList.remove("toggle-side__mark--left-active");
//     (
//       btnSort.querySelector(".toggle-side__text") as HTMLElement
//     ).style.visibility = "visible";
//   }
//   count++;
// });
