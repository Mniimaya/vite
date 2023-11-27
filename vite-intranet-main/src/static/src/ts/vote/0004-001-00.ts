import { VoteAPI } from "../../js/API/voteApi.js";

const form = document.querySelector(".voit__form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  (form.querySelector(".voit__submit") as HTMLButtonElement).disabled = true;
  const id = Date.now();
  (form.querySelector(".voit__input--id") as HTMLInputElement).value =
    id.toString();
  const formData = new FormData(evt.target as HTMLFormElement);
  VoteAPI.postVote(form, formData);
});
