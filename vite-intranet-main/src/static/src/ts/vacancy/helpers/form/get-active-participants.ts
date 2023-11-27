// Helpers;
import { ParticipantStatus } from "../../const";

// Types;
import type { TYPE_PARTICIPANT } from "../../types/participant";

export const getActiveParticipants = (participants: TYPE_PARTICIPANT[]) => {
  return participants.filter(
    ({ status }) => Number(status) === ParticipantStatus.ACTIVE
  );
};
