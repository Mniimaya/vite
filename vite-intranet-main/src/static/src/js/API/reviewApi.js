import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class ReviewApi {
  async postReview(formData) {
    await fetch(`${apiPath}/connect/review/api/post-review.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(() => showMessage("Данные отправлены успешно"))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async postStatus(formData) {
    await fetch(`${apiPath}/connect/review/api/post-status.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(() => showMessage("Данные отправлены успешно"))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async postComment(formData) {
    await fetch(`${apiPath}/connect/review/api/post-comment.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(() => showMessage("Данные отправлены успешно"))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getCommentsById(formData, cb) {
    await fetch(`${apiPath}/connect/review/api/getCommentsById.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async postMessage(formData) {
    await fetch(`${apiPath}/connect/review/api/post-message.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(() => showMessage("Данные отправлены успешно"))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }

  async getReviews(cb) {
    await fetch(`${apiPath}/connect/review/api/get.php`, {
      method: "Get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  async getReviewsArchive(cb) {
    await fetch(`${apiPath}/connect/review/api/getArchive.php`, {
      method: "Get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export const ReviewAPI = new ReviewApi();
