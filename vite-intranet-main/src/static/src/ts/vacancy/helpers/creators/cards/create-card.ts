// Helpers;
import { VacancyCard } from "../../../const";
import { VACANCY_ADMINISTRATOR_ROLE } from "../../../const";

// Creators;
import { createVacancyCard } from "./create-vacancy-card/create-vacancy-card";
import { createRequestCard } from "./create-request-card/create-request-card";
import { createReplyCard } from "./create-reply-card/create-reply-card";
import { createResumeDatabaseCard } from "./create-resume-database-card/create-resume-database-card";
import { createDraftCard } from "./create-draft-card/create-draft-card";
import { createArchiveCard } from "./create-archive-card/create-archive-card";
import { createExpiredCard } from "./create-expired-card/create-expired-card";

// Types;
import { TYPE_REQUEST } from "../../../types/request";
import { TYPE_REPLY } from "../../../types/reply";
import { TYPE_RESUME_DATABASE } from "../../../types/resume-database";

export const createCard = (
  cardName: VacancyCard,
  data: TYPE_REQUEST | TYPE_REPLY | TYPE_RESUME_DATABASE,
  administratorRole: VACANCY_ADMINISTRATOR_ROLE
) => {
  switch (cardName) {
    case VacancyCard.VACANCY:
      return createVacancyCard(data, administratorRole);
    case VacancyCard.REQUEST:
      return createRequestCard(data, administratorRole);
    case VacancyCard.REPLY:
      return createReplyCard(data, administratorRole);
    case VacancyCard.RESUME_DATABASE:
      return createResumeDatabaseCard(data, administratorRole);
    case VacancyCard.DRAFT:
      return createDraftCard(data, administratorRole);
    case VacancyCard.ARCHIVE:
      return createArchiveCard(data, administratorRole);
    case VacancyCard.EXPIRED:
      return createExpiredCard(data, administratorRole);
    default:
      return createVacancyCard(data, administratorRole);
  }
};
