// Helpers;
import { ParticipantStatus } from "../../../../../const";
import { UserRole } from "../../../../../const";

// Types;
import { TYPE_PARTICIPANT } from "../../../../../types/participant";

export const getApplicant = (participants: TYPE_PARTICIPANT[]) => {
  const applicant = participants.find(({ status, role }) => {
    return ParticipantStatus.ACTIVE === status && UserRole.APPLICANT === role;
  });

  if (applicant) {
    return applicant.full_name;
  }

  return `Не указан`;
};
