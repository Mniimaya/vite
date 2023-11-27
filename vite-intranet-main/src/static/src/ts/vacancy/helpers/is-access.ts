// Helpers;
import { getActiveParticipants } from "../helpers/form/get-active-participants";
import { VACANCY_ADMINISTRATOR_ROLE } from "../const";

// Types;
import type { TYPE_PARTICIPANT } from "../types/participant";

export const isAccess = (
  myAccount: string,
  participants: TYPE_PARTICIPANT[],
  administratorRole: number
) => {
  if (
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `HR` ||
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `SUPER_USER`
  ) {
    return true;
  }

  const activeParticipants = getActiveParticipants(participants);

  const isExist = activeParticipants.find(
    ({ account_number }) => myAccount === account_number
  );

  return Boolean(isExist);
};
