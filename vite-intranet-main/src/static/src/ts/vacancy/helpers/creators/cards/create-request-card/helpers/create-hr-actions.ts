// Helpers;
import { redirectTo } from "../../../../redirect-to";
import { VacancyPage, Mode } from "../../../../../const";

// Modals;
import { createApproveSheet } from "../../../modals/create-approve-sheet";
import { createEditParticipants } from "../../../modals/create-edit-participants";

// Templates;
const template = document.querySelector(
  `.template--request-hr-actions`
) as HTMLTemplateElement;

export const createHrActions = (
  container: HTMLElement,
  data: { id: number; status: number }
) => {
  const actionsElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild as HTMLElement;

  // Find buttons;
  const chatButton = actionsElement.querySelector(`.vacancy-button--chat`);
  const editRequestButton = actionsElement.querySelector(
    `.vacancy-button--edit`
  );
  const editParticipantButton = actionsElement.querySelector(
    `.vacancy-button--participants`
  );
  const approveSheetButton = actionsElement.querySelector(
    `.vacancy-button--approve-sheet`
  );
  const vacancyButton = actionsElement.querySelector(
    `.vacancy-button--vacancy`
  ) as HTMLButtonElement;
  const candidateButton = actionsElement.querySelector(
    `.vacancy-button--candidate`
  ) as HTMLButtonElement;

  // Buttons;
  chatButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    console.log(`TODO: Сделать клик по актуальному чату`);
    redirectTo(`/service/notification.html`);
  });

  editRequestButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(
      `/service/vacancy/${VacancyPage.FORM}?mode=${Mode.EDIT}&id=${data.id}`
    );
  });

  editParticipantButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    createEditParticipants();
  });

  approveSheetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    createApproveSheet();
  });

  vacancyButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    console.log(`TODO: Сделать редирект на вакансию`);
  });

  candidateButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    console.log(`TODO: Сделать редирект на страницу кандидатов`);
  });

  [vacancyButton, candidateButton].forEach((button) => {
    button.disabled = true;
  });

  container.append(actionsElement);
};
