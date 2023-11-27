import { VACANCY_HELPERS_HIDDEN, ROLE_TO_TEXT } from "../../../const";
// Types;
import { TYPE_PARTICIPANT } from "../../../types/participant";

const participantHeaderItemTemplate = document.querySelector(
  `.template--header-participant-item`
) as HTMLTemplateElement;

const participantHeaderItemEmptyTemplate = document.querySelector(
  `.template--header-participant-item-empty`
) as HTMLTemplateElement;

export const createHeaderParticipants = (
  container: HTMLElement,
  participants: TYPE_PARTICIPANT[]
) => {
  if (participants.length === 0) {
    const participantHeaderItemEmptyElement = (
      participantHeaderItemEmptyTemplate.content.cloneNode(true) as HTMLElement
    ).firstElementChild;
    container.append(participantHeaderItemEmptyElement);
    return;
  }

  participants
    .sort((a, b) => a.role - b.role)
    .forEach(({ role, full_name, is_view, is_interview }) => {
      const participantHeaderItemElement = (
        participantHeaderItemTemplate.content.cloneNode(true) as HTMLElement
      ).firstElementChild;

      // Containers;
      const roleElement = participantHeaderItemElement.querySelector(
        `.vacancy-form-header-participants__role`
      );
      const fullNameElement = participantHeaderItemElement.querySelector(
        `.vacancy-form-header-participants__fullname`
      );
      const isViewElement = participantHeaderItemElement.querySelector(
        `.vacancy-form-header-participants__view`
      );
      const isInterviewElement = participantHeaderItemElement.querySelector(
        `.vacancy-form-header-participants__interview`
      );

      // FillContainers;
      roleElement.textContent = ROLE_TO_TEXT[role];
      fullNameElement.textContent = full_name;
      Boolean(is_view) &&
        isViewElement.classList.remove(VACANCY_HELPERS_HIDDEN);
      Boolean(is_interview) &&
        isInterviewElement.classList.remove(VACANCY_HELPERS_HIDDEN);

      container.append(participantHeaderItemElement);
    });
};
