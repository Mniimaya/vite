// Types;
import { VacancyAPI } from "../../../../../js/API/vacancyApi.js";
import { VACANCY_HELPERS_HIDDEN } from "../../../const";
// import { getActiveParticipants } from "../../../helpers/get-active-participants";
import { createHeaderParticipants } from "./create-header-participants";

export const updateHeaderParticipants = async (
  headerParticipantsContainer: HTMLElement,
  buttonsContainer: HTMLElement,
  idRequest: number
) => {
  Array.from(headerParticipantsContainer.children).forEach((child) =>
    child.remove()
  );
  headerParticipantsContainer.innerHTML = ``;

  buttonsContainer.classList.add(VACANCY_HELPERS_HIDDEN);

  const formData = new FormData();
  formData.append(`id_request`, String(idRequest));

  // const data = await VacancyAPI.getParticipants(formData);

  // const participants = getActiveParticipants(data);

  // createHeaderParticipants(headerParticipantsContainer, participants);
};
