// Types;
import { TYPE_PARTICIPANT } from "../types/participant";

export const getRequstCardStatus = (participants: TYPE_PARTICIPANT[]) => {
  const isApprove = participants
    .filter(({ status }) => Number(status) === 0)
    .every(
      ({ is_approve }) => Number(is_approve) === 1 || Number(is_approve) === 3
    );
  const isReject = participants.some(
    ({ is_approve }) => Number(is_approve) === 4
  );

  if (isApprove) {
    return [`Согласована`, `approve`];
  }

  if (isReject) {
    return [`Отклонена`, `reject`];
  }

  return [`На согласовании`, `waiting`];
};
