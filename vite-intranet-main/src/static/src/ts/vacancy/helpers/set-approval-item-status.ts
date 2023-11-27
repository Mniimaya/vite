import { VACANCY_HELPERS_HIDDEN, UserRole, UserApprove } from "../const";
import { TYPE_PARTICIPANT } from "../types/participant";
import { getApprovalItemStatus } from "./get-approval-item-status";

export const setApprovalItemStatus = (
  container: HTMLElement,
  isAccess: Boolean,
  isApproved: Boolean,
  data: TYPE_PARTICIPANT
) => {
  const statusElement = container.querySelector(
    `.vacancy-modal-approval-sheet__status`
  );
  const actionsAllElement = container.querySelector(
    `.vacancy-modal-approval-sheet-actions--all`
  );
  const actionsHrElement = container.querySelector(
    `.vacancy-modal-approval-sheet-actions--hr`
  );
  const postVacancyButton = container.querySelector(
    `.vacancy-request-button--post-vacancy`
  );

  const allContainers = [statusElement, actionsAllElement, actionsHrElement];

  if (!isAccess) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );

    const [text, statusClass] = getApprovalItemStatus(
      `${data.is_approve}`,
      data.reason_reject
    );
    statusElement.textContent = text;
    statusElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    statusElement.classList.add(
      `vacancy-modal-approval-sheet__status--${statusClass}`
    );

    return;
  }

  if (
    (Number(data.role) === UserRole.DIRECTOR ||
      Number(data.role) === UserRole.HR) &&
    Number(data.is_approve) === UserApprove.PARTICIPATE
  ) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    actionsAllElement.classList.remove(VACANCY_HELPERS_HIDDEN);
  } else if (
    ((Number(data.role) === UserRole.DIRECTOR ||
      Number(data.role) === UserRole.HR) &&
      Number(data.is_approve) === UserApprove.UNDECIDED) ||
    Number(data.is_approve) === UserApprove.REJECT
  ) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    const [text, statusClass] = getApprovalItemStatus(
      `${data.is_approve}`,
      data.reason_reject
    );
    statusElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    statusElement.classList.add(
      `vacancy-modal-approval-sheet__status--${statusClass}`
    );
    statusElement.textContent = text;
  } else if (
    (Number(data.role) === UserRole.DIRECTOR ||
      Number(data.role) === UserRole.HR) &&
    Number(data.is_approve) === UserApprove.NOT_REQUIRED &&
    data.reason_reject
  ) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    statusElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    const [text, statusClass] = getApprovalItemStatus(
      `${data.is_approve}`,
      data.reason_reject
    );
    statusElement.classList.add(
      `vacancy-modal-approval-sheet__status--${statusClass}`
    );
    statusElement.textContent = text;
  } else if (Number(data.role) === UserRole.HR && isApproved) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    actionsHrElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    postVacancyButton.removeAttribute(`disabled`);
  } else if (Number(data.role) === UserRole.HR && !isApproved) {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    actionsHrElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    postVacancyButton.setAttribute(`disabled`, `true`);
  } else {
    allContainers.forEach((container) =>
      container.classList.add(VACANCY_HELPERS_HIDDEN)
    );
    statusElement.classList.remove(VACANCY_HELPERS_HIDDEN);
    const [text, statusClass] = getApprovalItemStatus(
      `${data.is_approve}`,
      data.reason_reject
    );
    statusElement.textContent = text;
    statusElement.classList.add(
      `vacancy-modal-approval-sheet__status--${statusClass}`
    );
  }
};
