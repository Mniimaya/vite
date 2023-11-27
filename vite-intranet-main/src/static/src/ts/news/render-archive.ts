import { NewsAPI } from "../../js/API/newsApi";
import { TYPE_NEWS } from "../TYPES";
import { handlerClosePopup } from "../util";

// отрисовка новостей на вкладках все новости
export const renderPaginationData = () => {};
// const renderApprovedPastNews = (data) => {
//   const pastTemplate = document
//     .querySelector(".past-template")
//     .content.querySelector(".past__item");
//   const pastWrapper = document.querySelector(".past__list");
//   pastWrapper.textContent = "";
//   for (let i = 0; i < data.length; i++) {
//     if (i >= 0) {
//       const item = pastTemplate.cloneNode(true);
//       item.dataset.id = data[i].id;
//       item.dataset.sono = data[i].sono;
//       if (data[i].userlogin) {
//         item.dataset.userlogin = data[i].userlogin;
//       }
//       item.querySelector(".past__date").textContent = data[i].date;
//       item.querySelector(".past__title").textContent = data[i].title;
//       item.querySelector(".past__views").textContent = data[i].views;
//       item.querySelector(".past__likes").textContent = data[i].likes;
//       item.querySelector(".past__description").innerHTML = data[i].description;
//       item.querySelector(".past__image").src = `${apiPath}` + data[i].avatar;
//       if (
//         data[i].images &&
//         data[i].images !== "Все фотографии удалены модератером"
//       ) {
//         for (let j = 0; j < data[i].images.length; j++) {
//           const imageSecondary = item
//             .querySelector(".past__image")
//             .cloneNode(true);
//           imageSecondary.src = `${apiPath}` + data[i].images[j].photos;
//           imageSecondary.classList.add("js-nodisplay");
//           item.appendChild(imageSecondary);
//         }
//       }
//       if (data[i].admin) {
//         for (let j = 0; j < data[i].admin.length; j++) {
//           const imageSecondary = item
//             .querySelector(".past__image")
//             .cloneNode(true);
//           imageSecondary.src = `${apiPath}` + data[i].admin[j];
//           imageSecondary.classList.add("js-nodisplay");
//           item.appendChild(imageSecondary);
//         }
//       }
//       if (data[i].pdf) {
//         item.querySelector(".past__pdf").href = `${apiPath}` + data[i].pdf;
//       } else {
//         item.querySelector(".past__pdf").remove();
//       }

//       if (data[i].video) {
//         item.querySelector(".past__video").src = `${apiPath}` + data[i].video;
//       } else {
//         item.querySelector(".past__video").remove();
//       }
//       pastWrapper.appendChild(item);
//     }
//   }
//   openPopupPast();
// };
