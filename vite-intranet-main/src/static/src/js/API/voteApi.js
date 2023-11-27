import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class VoteApi {
  async postVote(form, formData) {
    fetch(`${apiPath}/connect/votes/api/post.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Спасибо за Ваше участие в опросе");
        } else {
          showMessage("Сервер не отвечает, попробуйте позже");
        }
      })
      .then(() => form.reset())
      .catch(() => {
        showMessage("Сервер не отвечает, попробуйте позже");
      });
  }
}

export const VoteAPI = new VoteApi();
