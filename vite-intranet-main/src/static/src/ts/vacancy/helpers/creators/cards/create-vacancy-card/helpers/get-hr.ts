// Helpers;
import { ParticipantStatus, UserRole } from "../../../../../const";
// Types;
import type { TYPE_PARTICIPANT } from "../../../../../types/participant";

export const getHr = (participants: TYPE_PARTICIPANT[] | []): string => {
  if (participants.length === 0) {
    return `Не указан`;
  }

  const hr = participants.find(
    ({ role, status }) =>
      role === UserRole.HR && status === ParticipantStatus.ACTIVE
  );

  return hr ? hr.full_name : `Не указан`;
};
